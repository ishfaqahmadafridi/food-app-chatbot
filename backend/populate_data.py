#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import Category, FoodItem

# Create superuser
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print('Admin user created')

# Create categories
categories_data = [
    {'name': 'Salad', 'is_active': True},
    {'name': 'Rolls', 'is_active': True},
    {'name': 'Deserts', 'is_active': True},
    {'name': 'Sandwich', 'is_active': True},
    {'name': 'Cake', 'is_active': True},
    {'name': 'Pure Veg', 'is_active': True},
    {'name': 'Pasta', 'is_active': True},
    {'name': 'Noodles', 'is_active': True},
]

categories = {}
for cat_data in categories_data:
    cat, created = Category.objects.get_or_create(name=cat_data['name'], defaults={'is_active': cat_data['is_active']})
    categories[cat_data['name']] = cat
    if created:
        print(f"Created category: {cat.name}")

# Create food items
food_data = [
    {'name': 'Greek salad', 'price': 12, 'description': 'Food provides essential nutrients for overall health and well-being', 'category': categories['Salad'], 'is_available': True, 'rating': 4.5},
    {'name': 'Veg salad', 'price': 18, 'description': 'Food provides essential nutrients for overall health and well-being', 'category': categories['Salad'], 'is_available': True, 'rating': 4.3},
    {'name': 'Clover Salad', 'price': 16, 'description': 'Food provides essential nutrients for overall health and well-being', 'category': categories['Salad'], 'is_available': True, 'rating': 4.4},
    {'name': 'Chicken Roll', 'price': 14, 'description': 'Delicious chicken roll with spices', 'category': categories['Rolls'], 'is_available': True, 'rating': 4.6},
    {'name': 'Fish Roll', 'price': 15, 'description': 'Fresh fish roll with herbs', 'category': categories['Rolls'], 'is_available': True, 'rating': 4.5},
    {'name': 'Veg Roll', 'price': 12, 'description': 'Healthy vegetable roll', 'category': categories['Rolls'], 'is_available': True, 'rating': 4.2},
    {'name': 'Chocolate Cake', 'price': 8, 'description': 'Rich chocolate cake', 'category': categories['Deserts'], 'is_available': True, 'rating': 4.9},
    {'name': 'Vanilla Dessert', 'price': 6, 'description': 'Sweet vanilla dessert', 'category': categories['Deserts'], 'is_available': True, 'rating': 4.7},
    {'name': 'Paneer Sandwich', 'price': 11, 'description': 'Paneer cheese sandwich', 'category': categories['Sandwich'], 'is_available': True, 'rating': 4.3},
    {'name': 'Chicken Sandwich', 'price': 13, 'description': 'Roasted chicken sandwich', 'category': categories['Sandwich'], 'is_available': True, 'rating': 4.5},
    {'name': 'Black Forest Cake', 'price': 10, 'description': 'Classic black forest cake', 'category': categories['Cake'], 'is_available': True, 'rating': 4.8},
    {'name': 'Cheesecake', 'price': 9, 'description': 'Delicious cheesecake', 'category': categories['Cake'], 'is_available': True, 'rating': 4.7},
    {'name': 'Broccoli curry', 'price': 9, 'description': 'Healthy broccoli curry', 'category': categories['Pure Veg'], 'is_available': True, 'rating': 4.4},
    {'name': 'Veg Biryani', 'price': 12, 'description': 'Aromatic vegetable biryani', 'category': categories['Pure Veg'], 'is_available': True, 'rating': 4.6},
    {'name': 'Alfredo Pasta', 'price': 13, 'description': 'Creamy alfredo pasta', 'category': categories['Pasta'], 'is_available': True, 'rating': 4.5},
    {'name': 'Tomato Pasta', 'price': 12, 'description': 'Fresh tomato pasta', 'category': categories['Pasta'], 'is_available': True, 'rating': 4.4},
    {'name': 'Singapore Noodles', 'price': 11, 'description': 'Spicy singapore noodles', 'category': categories['Noodles'], 'is_available': True, 'rating': 4.7},
    {'name': 'Hakka Noodles', 'price': 10, 'description': 'Stir fried hakka noodles', 'category': categories['Noodles'], 'is_available': True, 'rating': 4.5},
]

for food in food_data:
    _, created = FoodItem.objects.get_or_create(name=food['name'], defaults=food)
    if created:
        print(f"Created food item: {food['name']}")

print('✅ Sample data setup completed!')
