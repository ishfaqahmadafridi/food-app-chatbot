from rest_framework import serializers
from .models import FoodItem, Category, Cart, CartItem, Rating, UserProfile, ContactMessage
from django.contrib.auth.models import User
from django.db.models import Avg


class FoodItemSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category = serializers.CharField(write_only=True, required=False)
    average_rating = serializers.SerializerMethodField()
    rating_count = serializers.SerializerMethodField()
    
    class Meta:
        model = FoodItem
        fields = ['id', 'name', 'image', 'price', 'description', 'category', 'category_name', 'is_available', 'rating', 'average_rating', 'rating_count', 'created_at','updated_at']
    
    def create(self, validated_data):
        category_name = validated_data.pop('category', 'Others')
        category, _ = Category.objects.get_or_create(
            name=category_name,
            defaults={'is_active': True}
        )
        validated_data['category'] = category
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        if 'category' in validated_data:
            category_name = validated_data.pop('category')
            category, _ = Category.objects.get_or_create(
                name=category_name,
                defaults={'is_active': True}
            )
            validated_data['category'] = category
        return super().update(instance, validated_data)
    
    def get_average_rating(self, obj):
        avg = obj.ratings.aggregate(Avg('rating'))['rating__avg']
        return float(avg) if avg else 4.5
    
    def get_rating_count(self, obj):
        return obj.ratings.count()


class CategorySerializer(serializers.ModelSerializer):
    items_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'image', 'is_active', 'items_count']
    
    def get_items_count(self, obj):
        return obj.items.filter(is_available=True).count()


class cartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart

class CartItemSerializer(serializers.ModelSerializer):
    dish = FoodItemSerializer(read_only=True)
    dish_id = serializers.IntegerField(write_only=True, source='dish.id')
    subtotal = serializers.SerializerMethodField()
    
    class Meta:
        model = CartItem
        fields = ['id', 'dish', 'dish_id', 'quantity', 'subtotal']
    
    def get_subtotal(self, obj):
        return float(obj.dish.price * obj.quantity)


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()
    
    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total_price', 'created_at']
    
    def get_total_price(self, obj):
        return float(sum(item.dish.price * item.quantity for item in obj.items.all()))


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    password2 = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']

    def validate(self, data):
        if data['password'] != data.pop('password2'):
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['profile_image', 'bio', 'phone']


class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'profile_image']
    
    def get_profile_image(self, obj):
        try:
            profile = UserProfile.objects.get(user=obj)
            if profile.profile_image:
                request = self.context.get('request')
                if request:
                    return request.build_absolute_uri(profile.profile_image.url)
                return profile.profile_image.url
        except UserProfile.DoesNotExist:
            return None
        except Exception:
            return None
        return None


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'user', 'food_item', 'rating', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'message', 'status', 'created_at', 'updated_at', 'admin_notes']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Format created_at for better display
        if instance.created_at:
            data['created_at_formatted'] = instance.created_at.strftime('%B %d, %Y at %I:%M %p')
        return data

