from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Avg

from ..models import FoodItem, Rating
from ..serializers import FoodItemSerializer, RatingSerializer


class FoodItemViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling food item operations.
    Supports CRUD operations and rating functionality.
    """
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ['category', 'is_available']
    ordering_fields = ['price', 'rating', 'created_at']
    ordering = ['-created_at']

    def get_permissions(self):
        """Only admins can create, update, or delete food items"""
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return super().get_permissions()

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def rate(self, request, pk=None):
        """
        Custom action to rate a food item.
        POST /api/items/{id}/rate/
        Body: {"rating": 1-5}
        """
        food_item = self.get_object()
        rating = request.data.get('rating')
        
        if not rating or not (1 <= int(rating) <= 5):
            return Response(
                {'error': 'Rating must be between 1 and 5'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create or update user's rating for this food item
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
