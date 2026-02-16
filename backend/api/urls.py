from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FoodItemViewSet, CategoryViewSet, CartItemViewSet, CartViewSet, 
    RegisterView, LoginView, UserProfileView, ContactMessageViewSet
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'items', FoodItemViewSet, basename='fooditem')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'cart-items', CartItemViewSet, basename='cartitem')
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'contact', ContactMessageViewSet, basename='contact')

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', RegisterView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]