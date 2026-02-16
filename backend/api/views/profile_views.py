from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer

from ..models import UserProfile
from ..serializers import UserSerializer


class UserProfileView(APIView):
    """
    API view for user profile operations.
    Handles profile retrieval and updates (name, email, password, image).
    """
    renderer_classes = [JSONRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        GET /api/profile/ - Retrieve current user's profile
        Returns: User data with profile information
        """
        # Get or create user profile
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        return Response(UserSerializer(request.user, context={'request': request}).data)
    
    def put(self, request):
        """
        PUT /api/profile/ - Update user profile
        Supports three types of updates:
        1. Password change: {"currentPassword": str, "newPassword": str}
        2. Profile image: {"profile_image": file} or {"profile_image": ""} to delete
        3. Profile info: {"name": str, "email": str}
        """
        user = request.user
        
        # Check if updating password
        if 'currentPassword' in request.data and 'newPassword' in request.data:
            return self._update_password(request, user)
        
        # Check if uploading/deleting profile image
        elif 'profile_image' in request.FILES or 'profile_image' in request.data:
            return self._update_profile_image(request, user)
        
        # Profile update request (name, email)
        else:
            return self._update_profile_info(request, user)

    def _update_password(self, request, user):
        """Handle password change"""
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

    def _update_profile_image(self, request, user):
        """Handle profile image upload or deletion"""
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

    def _update_profile_info(self, request, user):
        """Handle profile info update (name, email)"""
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
