
from langchain_core.tools import tool
from api.models import FoodItem, Cart, CartItem, Category
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.db.models import Q


# Store for request context (user and session)
_request_context = {}

def set_request_context(user, session_key):
    """Set the current request context for tools to use"""
    _request_context['user'] = user
    _request_context['session_key'] = session_key

def get_request_context():
    """Get the current request context"""
    return _request_context.get('user'), _request_context.get('session_key')


@tool
def get_menu_items(category: str = None) -> str:
    """
    Get the list of available menu items. 
    If category is provided, filter by category (e.g., 'burgers', 'pizza', 'salads').
    Use this when user asks about the menu, items, or specific food categories.
    """
    items = FoodItem.objects.filter(is_available=True)
    
    if category:
        items = items.filter(Q(category__name__icontains=category) | Q(name__icontains=category))
    
    if not items.exists():
        return "No items available right now."
    
    menu = []
    for item in items[:15]:  # Limit to 15 items
        menu.append(f"{item.name} - Rs. {int(item.price)} ({item.category.name})")
    
    return "🍽️ Available items:\n" + "\n".join(menu)


@tool
def search_food_item(item_name: str) -> str:
    """
    Search for a specific food item by name.
    Use this to find details about a specific dish before adding to cart.
    Returns name, price, description, and availability.
    """
    items = FoodItem.objects.filter(name__icontains=item_name, is_available=True)
    
    if not items.exists():
        return f"Sorry, I couldn't find any item matching '{item_name}'. Try asking to see the menu."
    
    result = []
    for item in items[:5]:
        result.append(
            f"{item.name} - Rs. {int(item.price)}\n"
            f"Description: {item.description}\n"
            f"Category: {item.category.name}"
        )
    
    return "\n\n".join(result)


@tool
def add_to_cart(item_name: str, quantity: int = 1) -> str:
    """
    Add a dish to the user's cart.
    Args:
        item_name: Name of the food item to add (e.g., 'Burger', 'Pizza')
        quantity: Number of items to add (default: 1)
    Use this when user wants to add, order, or buy something.
    """
    user, session_key = get_request_context()
    
    # Find the food item
    try:
        item = FoodItem.objects.filter(name__icontains=item_name, is_available=True).first()
        if not item:
            # Try harder - find items that contain the keywords
            keywords = item_name.lower().split()
            for keyword in keywords:
                item = FoodItem.objects.filter(name__icontains=keyword, is_available=True).first()
                if item:
                    break
        
        if not item:
            return f"Sorry, '{item_name}' is not available or not found in our menu. Try asking to see the menu first."
    except Exception as e:
        return f"Error finding item: {str(e)}"
    
    # Get or create cart
    try:
        if user and user.is_authenticated:
            cart, _ = Cart.objects.get_or_create(user=user)
        elif session_key:
            cart, _ = Cart.objects.get_or_create(session_key=session_key)
        else:
            return "Unable to add to cart. Please make sure you're logged in or have a session."
        
        # Add or update cart item
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            dish=item,
            defaults={'quantity': quantity}
        )
        
        if not created:
            cart_item.quantity += quantity
            cart_item.save()
        
        total_items = CartItem.objects.filter(cart=cart).count()
        return f"✅ Added {quantity} x {item.name} to your cart! You now have {total_items} items in cart. Total: Rs. {int(item.price * quantity)}"
    
    except Exception as e:
        return f"Error adding to cart: {str(e)}"


@tool
def remove_from_cart(item_name: str, quantity: int = None) -> str:
    """
    Remove an item from the user's cart.
    Args:
        item_name: Name of the food item to remove
        quantity: Number to remove (if None, removes all of that item)
    Use this when user wants to remove, delete, or decrease items from cart.
    """
    user, session_key = get_request_context()
    
    try:
        # Get cart
        if user and user.is_authenticated:
            cart = Cart.objects.filter(user=user).first()
        elif session_key:
            cart = Cart.objects.filter(session_key=session_key).first()
        else:
            return "No cart found. Please make sure you're logged in or have a session."
        
        if not cart:
            return "Your cart is empty. Nothing to remove!"
        
        # Find the cart item
        cart_items = CartItem.objects.filter(cart=cart).select_related('dish')
        matched_item = None
        
        for cart_item in cart_items:
            if item_name.lower() in cart_item.dish.name.lower():
                matched_item = cart_item
                break
        
        if not matched_item:
            return f"'{item_name}' not found in your cart. Say 'show cart' to see what's in your cart."
        
        # Remove the item
        if quantity is None or quantity >= matched_item.quantity:
            item_name = matched_item.dish.name
            matched_item.delete()
            return f"✅ Removed {item_name} from your cart!"
        else:
            matched_item.quantity -= quantity
            matched_item.save()
            return f"✅ Reduced {matched_item.dish.name} quantity by {quantity}. Now you have {matched_item.quantity} in cart."
    
    except Exception as e:
        return f"Error removing from cart: {str(e)}"


@tool  
def get_cart_items() -> str:
    """
    Get current items in the user's cart.
    Use this when user asks about their cart, what's in cart, or cart contents.
    """
    user, session_key = get_request_context()
    
    try:
        if user and user.is_authenticated:
            cart = Cart.objects.filter(user=user).first()
        elif session_key:
            cart = Cart.objects.filter(session_key=session_key).first()
        else:
            return "No cart found. Please add some items first!"
        
        if not cart:
            return "Your cart is empty. Would you like to see our menu?"
        
        cart_items = CartItem.objects.filter(cart=cart).select_related('dish')
        
        if not cart_items.exists():
            return "Your cart is empty. Would you like to see our menu?"
        
        items_list = []
        total = 0
        for item in cart_items:
            subtotal = float(item.dish.price) * item.quantity
            total += subtotal
            items_list.append(f"{item.quantity} x {item.dish.name} - Rs. {int(subtotal)}")
        
        return "🛒 Your Cart:\n" + "\n".join(items_list) + f"\n\nTotal: Rs. {int(total)}"
    
    except Exception as e:
        return f"Error getting cart: {str(e)}"


@tool
def create_food_item(name: str, price: float, category_name: str, description: str = "") -> str:
    """
    Create a new food item in the menu (ADMIN ONLY).
    Args:
        name: Name of the dish
        price: Price in rupees
        category_name: Category name (e.g., 'Burgers', 'Pizza', 'Salads')
        description: Optional description of the dish
    """
    user, _ = get_request_context()
    
    if not user or not user.is_staff:
        return "Sorry, only admin users can create new menu items."
    
    if FoodItem.objects.filter(name__iexact=name).exists():
        return f"A dish named '{name}' already exists in the menu."
    
    try:
        category, _ = Category.objects.get_or_create(
            name=category_name.capitalize(),
            defaults={'is_active': True}
        )
        
        item = FoodItem.objects.create(
            name=name,
            price=price,
            category=category,
            description=description or f"Delicious {name}",
            is_available=True
        )
        
        return f"✅ Successfully added '{item.name}' (Rs. {int(item.price)}) to {category.name} category!"
    
    except Exception as e:
        return f"Error creating item: {str(e)}"


@tool
def delete_food_item(item_name: str) -> str:
    """
    Delete a food item from the menu (ADMIN ONLY).
    Use this to remove items from the menu.
    """
    user, _ = get_request_context()
    
    if not user or not user.is_staff:
        return "Sorry, only admin users can delete menu items."
    
    items = FoodItem.objects.filter(name__icontains=item_name)
    
    if not items.exists():
        return f"No item found matching '{item_name}'."
    
    count = items.count()
    item_names = [item.name for item in items]
    items.delete()
    
    return f"✅ Successfully deleted {count} item(s): {', '.join(item_names)}"


@tool
def update_food_item(item_name: str, new_price: float = None, new_description: str = None, availability: bool = None) -> str:
    """
    Update a food item's details (ADMIN ONLY - requires login).
    Args:
        item_name: Name of the item to update
        new_price: New price in rupees (optional)
        new_description: New description (optional)
        availability: Set availability True/False (optional)
    """
    user, _ = get_request_context()
    
    # Check authentication and admin status
    if not user or not user.is_authenticated:
        return "⛔ Authentication required! Please login to perform admin operations."
    
    if not user.is_staff:
        return "⛔ Admin access required! Only staff members can update menu items."
    
    item = FoodItem.objects.filter(name__icontains=item_name).first()
    
    if not item:
        return f"❌ No item found matching '{item_name}'. Check the menu and try again."
    
    updates = []
    if new_price is not None:
        old_price = item.price
        item.price = new_price
        updates.append(f"price from Rs. {int(old_price)} to Rs. {int(new_price)}")
    
    if new_description:
        item.description = new_description
        updates.append("description")
    
    if availability is not None:
        item.is_available = availability
        status = "available" if availability else "unavailable"
        updates.append(f"availability to {status}")
    
    if updates:
        item.save()
        return f"✅ Successfully updated {item.name}: {', '.join(updates)}!"
    else:
        return "Please specify what to update (price, description, or availability)."


@tool
def get_food_recipe(food_name: str) -> str:
    """
    Get the recipe and cooking instructions for a specific food item.
    Use this when user asks 'how to make', 'recipe for', or cooking instructions.
    Args:
        food_name: Name of the food (e.g., 'burger', 'pizza', 'pasta')
    """
    from .food_knowledge import get_recipe
    return get_recipe(food_name)


@tool
def get_food_ingredients(food_name: str) -> str:
    """
    Get the ingredients needed for a specific food item.
    Use when user asks about ingredients, what's needed, or components.
    Args:
        food_name: Name of the food
    """
    from .food_knowledge import get_ingredients
    return get_ingredients(food_name)


@tool
def get_cooking_tips(food_name: str) -> str:
    """
    Get cooking tips and tricks for preparing a food item.
    Use when user asks for tips, tricks, or advice on cooking.
    Args:
        food_name: Name of the food
    """
    from .food_knowledge import get_cooking_tips
    return get_cooking_tips(food_name)
