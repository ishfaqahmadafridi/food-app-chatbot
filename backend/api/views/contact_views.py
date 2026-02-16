from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from django.db import models
from ..models import ContactMessage
from ..serializers import ContactMessageSerializer


class ContactMessageViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing contact messages.
    Anyone can create (POST), but only admins can list, retrieve, update, or delete.
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    
    def get_permissions(self):
        """
        Allow anyone to submit a contact message,
        but only admins can view/manage them.
        """
        if self.action == 'create':
            return [AllowAny()]
        return [IsAdminUser()]
    
    def create(self, request, *args, **kwargs):
        """Handle contact form submission"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response({
            'success': True,
            'message': 'Your message has been sent successfully! We\'ll get back to you soon.',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)
    
    def list(self, request, *args, **kwargs):
        """List all contact messages with filtering options"""
        queryset = self.get_queryset()
        
        # Filter by status if provided
        status_filter = request.query_params.get('status', None)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        # Search functionality
        search = request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                models.Q(name__icontains=search) |
                models.Q(email__icontains=search) |
                models.Q(message__icontains=search)
            )
        
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'success': True,
            'count': queryset.count(),
            'messages': serializer.data
        })
    
    @action(detail=True, methods=['patch'], permission_classes=[IsAdminUser])
    def update_status(self, request, pk=None):
        """Update the status of a contact message"""
        message = self.get_object()
        new_status = request.data.get('status')
        
        if new_status not in ['new', 'read', 'replied', 'archived']:
            return Response({
                'success': False,
                'message': 'Invalid status value'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        message.status = new_status
        message.save()
        
        return Response({
            'success': True,
            'message': f'Status updated to {new_status}',
            'data': self.get_serializer(message).data
        })
    
    @action(detail=True, methods=['patch'], permission_classes=[IsAdminUser])
    def add_notes(self, request, pk=None):
        """Add admin notes to a contact message"""
        message = self.get_object()
        notes = request.data.get('admin_notes', '')
        
        message.admin_notes = notes
        message.save()
        
        return Response({
            'success': True,
            'message': 'Notes updated successfully',
            'data': self.get_serializer(message).data
        })
    
    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser])
    def stats(self, request):
        """Get statistics about contact messages"""
        total = ContactMessage.objects.count()
        new_count = ContactMessage.objects.filter(status='new').count()
        read_count = ContactMessage.objects.filter(status='read').count()
        replied_count = ContactMessage.objects.filter(status='replied').count()
        archived_count = ContactMessage.objects.filter(status='archived').count()
        
        return Response({
            'success': True,
            'stats': {
                'total': total,
                'new': new_count,
                'read': read_count,
                'replied': replied_count,
                'archived': archived_count
            }
        })
