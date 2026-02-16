from django.shortcuts import render
from .serializers import FoodItemSerializer, CategorySerializer, CartItemSerializer, RegisterSerializer, UserSerializer, CartSerializer, RatingSerializer, UserProfileSerializer
from .models import FoodItem, Category, CartItem, Cart, Rating, UserProfile
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.renderers import JSONRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models import Avg


class FoodItemViewSet(viewsets.ModelViewSet):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ['category', 'is_available']
    ordering_fields = ['price', 'rating', 'created_at']
    ordering = ['-created_at']

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return super().get_permissions()

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def rate(self, request, pk=None):
        food_item = self.get_object()
        rating = request.data.get('rating')
        
        if not rating or not (1 <= int(rating) <= 5):
            return Response({'error': 'Rating must be between 1 and 5'}, status=status.HTTP_400_BAD_REQUEST)
        
        user_rating, created = Rating.objects.update_or_create(
            user=request.user,
            food_item=food_item,
            defaults={'rating': int(rating)}
        )
        
        # Calculate average rating and count
        ratings_data = food_item.ratings.aggregate(Avg('rating'))
        avg_rating = ratings_data['rating__avg']
        rating_count = food_item.ratings.count()
        
        return Response({
            'message': 'Rating submitted successfully',
            'average_rating': avg_rating or 4.5,
            'rating_count': rating_count,
            'rating': RatingSerializer(user_rating).data
        }, status=status.HTTP_200_OK)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(cart__user=self.request.user)

    def perform_create(self, serializer):
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        serializer.save(cart=cart)
    
    def perform_destroy(self, instance):
        instance.delete()


class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    def list(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    def create(self, request):
        dish_id = request.data.get('dish_id')
        quantity = request.data.get('quantity', 1)
        
        try:
            dish = FoodItem.objects.get(id=dish_id)
            cart, _ = Cart.objects.get_or_create(user=request.user)
            cart_item, created = CartItem.objects.get_or_create(cart=cart, dish=dish)
            
            if not created:
                cart_item.quantity += int(quantity)
            else:
                cart_item.quantity = int(quantity)
            cart_item.save()
            
            serializer = CartSerializer(cart)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except FoodItem.DoesNotExist:
            return Response({'error': 'Dish not found'}, status=status.HTTP_404_NOT_FOUND)
class RegisterView(APIView):
    renderer_classes = [JSONRenderer]
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    renderer_classes = [JSONRenderer]
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        if user:
            # Ensure user has a profile (with error handling for missing table)
            try:
                UserProfile.objects.get_or_create(user=user)
            except Exception:
                pass  # Table might not exist yet, continue without error
            
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user, context={'request': request}).data
            })
        
        # Better error messaging: Check if user exists
        user_exists = User.objects.filter(username=username).exists()
        if user_exists:
            return Response({'error': 'Password is wrong. Try again'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error': 'Username not found'}, status=status.HTTP_401_UNAUTHORIZED)


class UserProfileView(APIView):
    renderer_classes = [JSONRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # GET /api/profile/ - Retrieve current user's profile
        # Get or create user profile
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        return Response(UserSerializer(request.user, context={'request': request}).data)
    
    def put(self, request):
        # PUT /api/profile/ - Update user profile (name, email) or change password or upload image
        user = request.user
        
        # Check if updating password
        if 'currentPassword' in request.data and 'newPassword' in request.data:
            # Password change request
            currentPassword = request.data.get('currentPassword')
            newPassword = request.data.get('newPassword')
            
            # Verify current password is correct
            if not user.check_password(currentPassword):
                return Response(
                    {'message': 'Current password is incorrect'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Set new password
            user.set_password(newPassword)
            user.save()
            
            return Response({
                'message': 'Password updated successfully',
                'user': UserSerializer(user, context={'request': request}).data
            }, status=status.HTTP_200_OK)
        
        # Check if uploading profile image
        elif 'profile_image' in request.FILES or 'profile_image' in request.data:
            try:
                # Get or create user profile
                profile, created = UserProfile.objects.get_or_create(user=user)
                
                # Check if it's a delete request (empty string sent)
                if 'profile_image' in request.data and request.data.get('profile_image') == '':
                    # Delete image
                    if profile.profile_image:
                        profile.profile_image.delete(save=False)
                    profile.profile_image = None
                    profile.save()
                    return Response({
                        'message': 'Profile image deleted successfully',
                        'user': UserSerializer(user, context={'request': request}).data
                    }, status=status.HTTP_200_OK)
                
                # Otherwise it's an upload
                elif 'profile_image' in request.FILES:
                    # Delete old image if exists
                    if profile.profile_image:
                        profile.profile_image.delete(save=False)
                    
                    # Update profile image
                    profile.profile_image = request.FILES['profile_image']
                    profile.save()
                    
                    return Response({
                        'message': 'Profile image updated successfully',
                        'user': UserSerializer(user, context={'request': request}).data
                    }, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({
                    'message': f'Error processing image: {str(e)}'
                }, status=status.HTTP_400_BAD_REQUEST)
        
        # Profile update request (name, email)
        else:
            name = request.data.get('name')
            email = request.data.get('email')
            
            if name:
                user.username = name
            if email:
                user.email = email
            
            user.save()
            
            return Response({
                'message': 'Profile updated successfully',
                'user': UserSerializer(user, context={'request': request}).data
            }, status=status.HTTP_200_OK)



