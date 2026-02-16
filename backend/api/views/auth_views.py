from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from ..models import UserProfile
from ..serializers import RegisterSerializer, UserSerializer


class RegisterView(APIView):
    """
    API view for user registration.
    POST /api/register/
    """
    renderer_classes = [JSONRenderer]
    permission_classes = [AllowAny]

    def post(self, request):
        """
        Register a new user.
        Body: {"username": str, "email": str, "password": str}
        Returns: JWT tokens and user data
        """
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """
    API view for user login.
    POST /api/login/
    """
    renderer_classes = [JSONRenderer]
    permission_classes = [AllowAny]

    def post(self, request):
        """
        Authenticate user and return JWT tokens.
        Body: {"username": str, "password": str}
        Returns: JWT tokens and user data
        """
        username = request.data.get('username')
        password = request.data.get('password')
        
        # Authenticate user
        user = authenticate(username=username, password=password)
        
        if user:
            # Ensure user has a profile (with error handling)
            try:
                UserProfile.objects.get_or_create(user=user)
            except Exception:
                pass  # Table might not exist yet, continue without error
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user, context={'request': request}).data
            })
        
        # Authentication failed - provide specific error messages
        user_exists = User.objects.filter(username=username).exists()
        if user_exists:
            return Response(
                {'error': 'Password is wrong. Try again'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        else:
            return Response(
                {'error': 'Username not found'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
