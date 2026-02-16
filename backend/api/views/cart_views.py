from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import Cart, CartItem, FoodItem
from ..serializers import CartItemSerializer, CartSerializer


class CartItemViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling individual cart item operations.
    Users can only access their own cart items.
    """
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Filter cart items to only show current user's items"""
        return CartItem.objects.filter(cart__user=self.request.user)

    def perform_create(self, serializer):
        """Automatically associate cart item with user's cart"""
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        serializer.save(cart=cart)
    
    def perform_destroy(self, instance):
        """Remove item from cart"""
        instance.delete()


class CartViewSet(viewsets.ViewSet):
    """
    ViewSet for handling cart operations.
    Provides list and add-to-cart functionality.
    """
    permission_classes = [IsAuthenticated]
    
    def list(self, request):
        """
        GET /api/cart/ - Retrieve current user's cart
        """
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    def create(self, request):
        """
        POST /api/cart/ - Add item to cart
        Body: {"dish_id": int, "quantity": int}
        """
        dish_id = request.data.get('dish_id')
        quantity = request.data.get('quantity', 1)
        
        try:
            dish = FoodItem.objects.get(id=dish_id)
            cart, _ = Cart.objects.get_or_create(user=request.user)
            cart_item, created = CartItem.objects.get_or_create(
                cart=cart, 
                dish=dish
            )
            
            if not created:
                # Item already in cart, increase quantity
                cart_item.quantity += int(quantity)
            else:
                # New item, set quantity
                cart_item.quantity = int(quantity)
            cart_item.save()
            
            serializer = CartSerializer(cart)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except FoodItem.DoesNotExist:
            return Response(
                {'error': 'Dish not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
