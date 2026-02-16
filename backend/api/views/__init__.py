# Import all views to make them accessible
from .food_views import FoodItemViewSet
from .category_views import CategoryViewSet
from .cart_views import CartItemViewSet, CartViewSet
from .auth_views import RegisterView, LoginView
from .profile_views import UserProfileView
from .contact_views import ContactMessageViewSet

__all__ = [
    'FoodItemViewSet',
    'CategoryViewSet',
    'CartItemViewSet',
    'CartViewSet',
    'RegisterView',
    'LoginView',
    'UserProfileView',
    'ContactMessageViewSet',
]
