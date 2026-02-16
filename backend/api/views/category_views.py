from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from ..models import Category
from ..serializers import CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling category operations.
    Lists all active categories.
    """
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
