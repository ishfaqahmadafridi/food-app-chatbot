import logging
import traceback
import re
import json

from django.conf import settings
from django.http import StreamingHttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.renderers import JSONRenderer

from api.models import FoodItem, Category, Cart, CartItem

# Configure logging
logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Try to import LangChain - use fallback if not available
try:
    from .chains import agent_executor
    LANGCHAIN_AVAILABLE = True
    logger.info("✓ LangChain imported successfully")
except ImportError as e:
    logger.warning(f" LangChain import failed: {e}. Using fallback responses.")
    LANGCHAIN_AVAILABLE = False
    agent_executor = None

try:
    from .tools import set_request_context, get_menu_items, search_food_item, add_to_cart, get_cart_items
    TOOLS_AVAILABLE = True
    logger.info("✓ Chatbot tools imported successfully")
except ImportError as e:
    logger.warning(f" Chatbot tools import failed: {e}")
    TOOLS_AVAILABLE = False

try:
    from .food_knowledge import (
        get_food_info,
        get_recipe,
        get_ingredients,
        get_cooking_tips,
        get_general_knowledge,
        FOOD_KNOWLEDGE
    )
    KNOWLEDGE_AVAILABLE = True
    logger.info("✓ Food knowledge base imported successfully")
except ImportError as e:
    logger.warning(f" Food knowledge base import failed: {e}")
    KNOWLEDGE_AVAILABLE = False


class ChatView(APIView):
    """Main chatbot endpoint with non-streaming response"""
    permission_classes = [AllowAny]  # Allow both authenticated and anonymous users

    def post(self, request):
        print("\n" + "="*80)
        print(" CHATBOT REQUEST RECEIVED")
        print("="*80)
        
        message = request.data.get('message', '').strip()
        
        if not message:
            print("❌ No message provided")
            return Response(
                {"error": "No message provided"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Get user and session info
            user = request.user if request.user.is_authenticated else None
            session_key = request.session.session_key

            if not session_key:
                request.session.create()
                session_key = request.session.session_key

            logger.info(f" User message: '{message}'")
            logger.info(f" User: {user}, Session: {session_key}")
            print(f" Message: {message}")
            print(f" User: {user}")

            # Try to set request context if tools are available
            if TOOLS_AVAILABLE:
                try:
                    set_request_context(user, session_key)
                    logger.info("✓ Request context set successfully")
                    print("✓ Request context set")
                except Exception as e:
                    logger.warning(f" Could not set request context: {e}")
                    print(f" Request context error: {e}")

            # Process message - Try LangChain first, fallback if unavailable
            reply = None
            
            if LANGCHAIN_AVAILABLE and agent_executor:
                logger.info(" Attempting LangChain agent...")
                print(" Attempting LangChain agent...")
                try:
                    result = agent_executor.invoke({"input": message})
                    reply = result.get("output", "")
                    
                    # Check if reply contains error messages
                    if reply and not any(err in reply.lower() for err in ['error code:', 'quota', 'api error', 'sorry, i encountered']):
                        logger.info(f"✓ LangChain response: {reply[:100]}...")
                        print(f"✓ LangChain success ({len(reply)} chars)")
                    else:
                        logger.warning(f"❌ LangChain returned error message, using fallback")
                        print(f"❌ LangChain returned error, using fallback")
                        reply = None
                        
                except Exception as e:
                    logger.error(f" LangChain exception: {str(e)[:100]}")
                    print(f" LangChain failed: {str(e)[:100]}")
                    reply = None
            
            # Use fallback if LangChain failed or not available
            if not reply:
                logger.info(" Using DATABASE fallback response...")
                print(" Using DATABASE fallback...")
                reply = self.get_fallback_response(message, user, session_key)
                logger.info(f"✓ Fallback response: {reply[:100]}...")
                print(f"✓ Fallback response created ({len(reply)} chars)")

            logger.info(f"✅ Chat completed successfully")
            print("✅ Response ready to send")
            print("="*80 + "\n")
            
            return Response(
                {"reply": reply, "status": "success"},
                status=status.HTTP_200_OK
            )

        except Exception as e:
            logger.error(f" CRITICAL ERROR: {str(e)}")
            logger.error(f"Traceback: {traceback.format_exc()}")
            print(f" ERROR: {e}")
            print("="*80 + "\n")
            
            return Response(
                {"error": "Unable to process your request. Please try again.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def get_fallback_response(self, message, user, session_key):
        """Fallback responses when OpenAI API is not available - QUERIES REAL DATABASE"""
        message_lower = message.lower()

        print(f" Processing fallback for: '{message[:50]}...'")
        logger.debug(f"Fallback processing for message: {message}")

        # ===== HANDLE REMOVE FROM CART REQUESTS =====
        if any(keyword in message_lower for keyword in ['remove', 'delete', 'take out', 'remove from cart', 'delete from cart']):
            print(" Detected remove from cart request")
            logger.info(f"Remove from cart detected in message: {message}")
            
            try:
                # Get cart
                if user and user.is_authenticated:
                    cart = Cart.objects.filter(user=user).first()
                elif session_key:
                    cart = Cart.objects.filter(session_key=session_key).first()
                else:
                    return "Please start a session first. Refresh the page and try again!"
                
                if not cart:
                    return "🛒 Your cart is empty! Nothing to remove.\n\nSay 'show menu' to start ordering!"
                
                # Extract item name from message
                clean_message = message_lower
                for word in ['remove', 'delete', 'take out', 'from cart', 'from my cart', 'please', 'can you']:
                    clean_message = clean_message.replace(word, ' ')
                clean_message = clean_message.strip()
                
                print(f" Looking for item to remove: '{clean_message}'")
                logger.info(f"Searching for item: '{clean_message}'")
                
                # Find matching cart item
                cart_items = CartItem.objects.filter(cart=cart).select_related('dish')
                matched_item = None
                
                for cart_item in cart_items:
                    item_name_lower = cart_item.dish.name.lower()
                    if clean_message in item_name_lower or item_name_lower in clean_message:
                        matched_item = cart_item
                        break
                
                if matched_item:
                    item_name = matched_item.dish.name
                    matched_item.delete()
                    print(f"✓ Removed {item_name} from cart")
                    
                    remaining_count = CartItem.objects.filter(cart=cart).count()
                    if remaining_count > 0:
                        return f"✅ Removed **{item_name}** from your cart!\n\n🛒 You have {remaining_count} item(s) left in cart.\n\nSay 'show cart' to see remaining items."
                    else:
                        return f"✅ Removed **{item_name}** from your cart!\n\n🛒 Your cart is now empty.\n\nSay 'show menu' to start ordering again!"
                else:
                    print("❌ Item not found in cart")
                    # Show what's in cart
                    cart_item_names = [ci.dish.name for ci in cart_items]
                    if cart_item_names:
                        items_list = "\n".join([f"  • {name}" for name in cart_item_names])
                        return f"I couldn't find that item in your cart.\n\n🛒 **Items in your cart:**\n{items_list}\n\nTry saying 'remove [item name]' with one of these!"
                    else:
                        return "🛒 Your cart is empty! Nothing to remove.\n\nSay 'show menu' to start ordering!"
                        
            except Exception as e:
                logger.error(f"Error removing from cart: {e}")
                print(f"❌ Error: {e}")
                return f"Sorry, I had trouble removing that item. Error: {str(e)}"

        # ===== HANDLE RECIPE REQUESTS =====
        if any(keyword in message_lower for keyword in ['recipe', 'how to make', 'how do i make', 'how to cook', 'recipe for', 'cooking instructions']):
            print(" Detected recipe request")
            logger.info(f"Recipe request detected: {message}")
            
            if KNOWLEDGE_AVAILABLE:
                try:
                    # Extract food name
                    clean_message = message_lower
                    for word in ['recipe', 'how to make', 'how do i make', 'how to cook', 'recipe for', 'cooking instructions', 'for', 'the', 'a']:
                        clean_message = clean_message.replace(word, ' ')
                    food_name = clean_message.strip()
                    
                    print(f" Looking for recipe: '{food_name}'")
                    
                    # Get recipe from knowledge base
                    recipe = get_recipe(food_name)
                    print(f"✓ Found recipe")
                    return recipe
                except Exception as e:
                    logger.error(f"Error getting recipe: {e}")
                    print(f"❌ Recipe error: {e}")
                    return "Sorry, I couldn't find a recipe for that. Try asking about burgers, pizza, pasta, or other common dishes!"
            else:
                return "Recipe feature is currently unavailable. Please try again later!"

        # ===== HANDLE INGREDIENT REQUESTS =====
        if any(keyword in message_lower for keyword in ['ingredients', 'what do i need', 'what\'s in', 'components']):
            print(" Detected ingredients request")
            logger.info(f"Ingredients request: {message}")
            
            if KNOWLEDGE_AVAILABLE:
                try:
                    # Extract food name
                    clean_message = message_lower
                    for word in ['ingredients', 'what do i need', 'what\'s in', 'components', 'for', 'the', 'a', 'of']:
                        clean_message = clean_message.replace(word, ' ')
                    food_name = clean_message.strip()
                    
                    print(f" Looking for ingredients: '{food_name}'")
                    
                    # Get ingredients from knowledge base
                    ingredients = get_ingredients(food_name)
                    print(f"✓ Found ingredients")
                    return ingredients
                except Exception as e:
                    logger.error(f"Error getting ingredients: {e}")
                    print(f"❌ Ingredients error: {e}")
                    return "Sorry, I couldn't find ingredient information for that dish!"
            else:
                return "Ingredient information is currently unavailable!"

        # ===== HANDLE ADD TO CART REQUESTS =====
        if any(keyword in message_lower for keyword in ['add', 'order', 'buy', 'want', 'get me']):
            print(" Detected add to cart request")
            logger.info(f"Add to cart detected in message: {message}")
            
            # Extract quantity (default to 1)
            quantity = 1
            qty_match = re.search(r'(\d+)\s*x?\s*', message_lower)
            if qty_match:
                quantity = int(qty_match.group(1))
                logger.info(f"Extracted quantity: {quantity}")
            
            # Find matching food item in database
            try:
                # Get all available items
                all_items = FoodItem.objects.filter(is_available=True)
                matched_item = None
                best_match_score = 0
                
                # Remove common action words to extract item name
                clean_message = message_lower
                for word in ['add', 'order', 'buy', 'want', 'get me', 'to cart', 'please', 'can i have', 'i want', 'give me']:
                    clean_message = clean_message.replace(word, ' ')
                clean_message = re.sub(r'\d+\s*x?', '', clean_message)  # Remove quantity
                clean_message = clean_message.strip()
                
                logger.info(f"Cleaned message for matching: '{clean_message}'")
                print(f" Searching for: '{clean_message}'")
                
                # Try to match item names - prioritize exact matches
                for item in all_items:
                    item_name_lower = item.name.lower()
                    
                    # Exact match (highest priority)
                    if item_name_lower == clean_message:
                        matched_item = item
                        best_match_score = 100
                        break
                    
                    # Item name fully contained in message
                    if item_name_lower in clean_message:
                        score = len(item_name_lower)
                        if score > best_match_score:
                            matched_item = item
                            best_match_score = score
                    
                    # Message fully contained in item name
                    elif clean_message in item_name_lower and len(clean_message) > 4:
                        score = len(clean_message)
                        if score > best_match_score:
                            matched_item = item
                            best_match_score = score
                    
                    # Word overlap (for multi-word items)
                    else:
                        item_words = set(item_name_lower.split())
                        message_words = set(clean_message.split())
                        common_words = item_words & message_words
                        if common_words and len(common_words) >= len(item_words) * 0.6:
                            score = sum(len(w) for w in common_words)
                            if score > best_match_score:
                                matched_item = item
                                best_match_score = score
                
                if matched_item:
                    print(f"✓ Found item to add: {matched_item.name}")
                    
                    # Get or create cart
                    if user and user.is_authenticated:
                        cart, _ = Cart.objects.get_or_create(user=user)
                    elif session_key:
                        cart, _ = Cart.objects.get_or_create(session_key=session_key)
                    else:
                        return "Please start a session to add items to cart. Refresh the page and try again!"
                    
                    # Add or update cart item
                    cart_item, created = CartItem.objects.get_or_create(
                        cart=cart,
                        dish=matched_item,
                        defaults={'quantity': quantity}
                    )
                    
                    if not created:
                        cart_item.quantity += quantity
                        cart_item.save()
                    
                    total_items = CartItem.objects.filter(cart=cart).count()
                    total_price = float(matched_item.price) * quantity
                    
                    print(f"✓ Added {quantity} x {matched_item.name} to cart")
                    return f"✅ Added {quantity} x **{matched_item.name}** to your cart!\n\n💰 Subtotal: ${total_price:.2f}\n🛒 Total items in cart: {total_items}\n\nSay 'show cart' to see all items, or add more items!"
                else:
                    print("❌ No matching item found for cart request")
                    # Show available items instead
                    sample_items = FoodItem.objects.filter(is_available=True)[:8]
                    if sample_items:
                        items_list = "\n".join([f"  • {item.name} - ${item.price}" for item in sample_items])
                        return f"I couldn't find that exact item. Here are some available items:\n\n{items_list}\n\nTry saying 'add [item name]' with one of these!"
                    else:
                        return "I couldn't find that item. Say 'show menu' to see all available items!"
                        
            except Exception as e:
                logger.error(f"Error in add to cart fallback: {e}")
                print(f"❌ Error: {e}")
                return f"Sorry, I had trouble adding that to your cart. Error: {str(e)}"

        # Check if asking about menu or items
        if any(word in message_lower for word in ['menu', 'show', 'list', 'what do you have', 'what items', 'available', 'dishes']):
            print(" Querying database for menu items...")
            try:
                categories = Category.objects.filter(is_active=True).prefetch_related('items')
                if not categories.exists():
                    return "We're currently updating our menu. Please check back soon!"
                
                response = " **Our Menu:**\n\n"
                total_items = 0
                for category in categories:
                    items = category.items.filter(is_available=True)
                    if items.exists():
                        response += f"**{category.name}**\n"
                        for item in items[:10]:  # Limit to 10 per category
                            response += f"  • {item.name} - ${item.price}"
                            if item.description:
                                response += f" - {item.description[:50]}"
                            response += "\n"
                            total_items += 1
                        response += "\n"
                
                if total_items == 0:
                    return "We're currently updating our menu. Please check back soon!"
                    
                response += f" Say the name of any item to learn more, or say 'add [item name]' to order!"
                print(f"✓ Found {total_items} items in {categories.count()} categories")
                return response
            except Exception as e:
                logger.error(f"Database error: {e}")
                print(f" Database error: {e}")
                return "I'm having trouble accessing the menu. Please try again."

        # Check if asking about specific item
        try:
            # Try to find the item in database
            food_items = FoodItem.objects.filter(is_available=True)
            matched_item = None
            
            # Check for item name in message
            for item in food_items:
                if item.name.lower() in message_lower or any(word in item.name.lower() for word in message_lower.split()):
                    matched_item = item
                    break
            
            if matched_item:
                print(f"✓ Found item in database: {matched_item.name}")
                response = f" **{matched_item.name}**\n\n"
                response += f" **Price:** ${matched_item.price}\n"
                response += f" **Description:** {matched_item.description}\n"
                if matched_item.rating:
                    response += f" **Rating:** {matched_item.rating}/5.0\n"
                response += f" **Category:** {matched_item.category.name}\n\n"
                response += f" Say 'add {matched_item.name}' to add it to your cart!"
                return response
        except Exception as e:
            logger.error(f"Database query error: {e}")
            print(f"❌ Error querying items: {e}")

        # Cart queries - SHOW CART CONTENTS (only if not adding)
        if any(keyword in message_lower for keyword in ['show cart', 'view cart', 'my cart', 'cart contents', 'what\'s in my cart', 'my order', 'what did i order']):
            print(" Checking cart contents")
            logger.debug(f"Handling cart view request: {message}")
            
            try:
                # Get cart
                if user and user.is_authenticated:
                    cart = Cart.objects.filter(user=user).first()
                elif session_key:
                    cart = Cart.objects.filter(session_key=session_key).first()
                else:
                    return "Please start a session to use the cart. Refresh the page and try again!"
                
                if not cart:
                    return " Your cart is empty!\n\nSay 'show menu' to see what we have, or say 'add [item name]' to start ordering!"
                
                # Get cart items
                cart_items = CartItem.objects.filter(cart=cart).select_related('dish')
                
                if not cart_items.exists():
                    return " Your cart is empty!\n\nSay 'show menu' to see what we have, or say 'add [item name]' to start ordering!"
                
                # Build cart response
                response = " **Your Cart:**\n\n"
                total = 0
                for cart_item in cart_items:
                    subtotal = float(cart_item.dish.price) * cart_item.quantity
                    total += subtotal
                    response += f"  • {cart_item.quantity} x {cart_item.dish.name} - ${subtotal:.2f}\n"
                
                response += f"\n **Total: ${total:.2f}**\n\n"
                response += "Ready to order? Say 'add [item name]' to add more items!"
                
                return response
                
            except Exception as e:
                logger.error(f"Error viewing cart: {e}")
                return "Sorry, I had trouble accessing your cart. Please try again!"

        # Default fallback response
        return """Hi! I'm RestoBot, your food ordering assistant!

I can help you with:
• View our menu (say "show menu")
• Learn about items (say "tell me about pizza")
• Add items to cart (say "add burger")
• View your cart (say "show my cart")
• Get recipes (say "how to make pasta")

What would you like to do?"""


class VoiceToText(APIView):
    """Voice-to-text endpoint"""
    renderer_classes = [JSONRenderer]
    permission_classes = [AllowAny]

    def post(self, request):
        print("\n" + "="*80)
        print(" VOICE-TO-TEXT REQUEST RECEIVED")
        print("="*80)
        
        logger.info(" Voice upload request received")
        print(f" Files received: {list(request.FILES.keys())}")
        
        if 'file' not in request.FILES:
            logger.warning("❌ No audio file provided")
            print("❌ No audio file in request")
            return Response(
                {"error": "No audio file provided"},
                status=status.HTTP_400_BAD_REQUEST
            )

        audio_file = request.FILES['file']
        logger.info(f" Audio file: {audio_file.name} ({audio_file.size} bytes)")
        print(f" File: {audio_file.name}")
        print(f" Size: {audio_file.size} bytes")

        # Current simulation mode
        response_data = {
            "text": "Voice processing is currently in simulation mode. Please use text for now!",
            "note": "To enable real voice processing, install 'openai' and configure Whisper API.",
            "status": "simulation_mode"
        }
        
        logger.info("✓ Returning simulation response")
        print("✓ Returning simulation mode response")
        print("="*80 + "\n")
        
        return Response(response_data, status=status.HTTP_200_OK)


class ChatStreamView(APIView):
    """Streaming chatbot endpoint with SSE (Server-Sent Events)"""
    permission_classes = [AllowAny]  # Allow both authenticated and anonymous users
    
    def post(self, request):
        """Handle streaming chat requests"""
        print("\n" + "="*80)
        print(" STREAMING CHAT REQUEST RECEIVED")
        print("="*80)
        
        message = request.data.get('message', '').strip()
        
        if not message:
            print("❌ No message provided")
            return Response(
                {"error": "No message provided"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Get user and session info
            user = request.user if request.user.is_authenticated else None
            session_key = request.session.session_key

            if not session_key:
                request.session.create()
                session_key = request.session.session_key

            logger.info(f" User message: '{message}'")
            logger.info(f" User: {user}, Session: {session_key}")
            print(f" Message: {message}")
            print(f" User: {user} (Authenticated: {user.is_authenticated if user else False})")

            # Set request context for tools
            if TOOLS_AVAILABLE:
                try:
                    set_request_context(user, session_key)
                    logger.info("✓ Request context set successfully")
                    print("✓ Request context set")
                except Exception as e:
                    logger.warning(f" Could not set request context: {e}")
                    print(f" Request context error: {e}")
            
            # Create streaming response function
            def generate_response():
                """Generator function for streaming response"""
                try:
                    if LANGCHAIN_AVAILABLE and agent_executor:
                        logger.info(" Starting LangChain streaming...")
                        print(" Streaming with LangChain")
                        
                        # Stream from agent
                        for chunk in agent_executor.stream({"input": message}):
                            # Format as SSE (Server-Sent Events)
                            data = json.dumps({"chunk": chunk, "done": False})
                            yield f"data: {data}\n\n"
                        
                        # Send completion signal
                        yield f"data: {json.dumps({'chunk': '', 'done': True})}\n\n"
                        print(" Streaming completed")
                    else:
                        # Fallback response (non-streaming)
                        logger.info(" Using fallback (non-streaming)")
                        print(" Using fallback response")
                        reply = self.get_fallback_response(message, user, session_key)
                        
                        # Stream the fallback response word by word for effect
                        words = reply.split()
                        for i, word in enumerate(words):
                            chunk = word + (" " if i < len(words) - 1 else "")
                            data = json.dumps({"chunk": chunk, "done": False})
                            yield f"data: {data}\n\n"
                        
                        # Send completion signal
                        yield f"data: {json.dumps({'chunk': '', 'done': True})}\n\n"
                        print("✅ Fallback streaming completed")
                        
                except Exception as e:
                    logger.error(f" Streaming error: {str(e)}")
                    print(f" ERROR: {e}")
                    error_msg = json.dumps({
                        "chunk": f"Sorry, I encountered an error: {str(e)}", 
                        "done": True,
                        "error": True
                    })
                    yield f"data: {error_msg}\n\n"
            
            # Return StreamingHttpResponse with SSE content type
            response = StreamingHttpResponse(
                generate_response(),
                content_type='text/event-stream'
            )
            response['Cache-Control'] = 'no-cache'
            response['X-Accel-Buffering'] = 'no'
            return response
            
        except Exception as e:
            logger.error(f" CRITICAL ERROR: {str(e)}")
            logger.error(f"Traceback: {traceback.format_exc()}")
            print(f" ERROR: {e}")
            print("="*80 + "\n")
            
            return Response(
                {"error": "Unable to process your request. Please try again.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def get_fallback_response(self, message, user, session_key):
        """Fallback responses when LangChain is not available"""
        message_lower = message.lower()
        
        # Check for recipe requests
        if any(keyword in message_lower for keyword in ['recipe', 'how to make', 'how do i make', 'cook']):
            if KNOWLEDGE_AVAILABLE:
                from .food_knowledge import get_recipe
                # Extract food name
                for food in ['burger', 'pizza', 'pasta', 'salad', 'biryani', 'sandwich', 'chicken']:
                    if food in message_lower:
                        return get_recipe(food)
                return "What recipe would you like? Try asking about burger, pizza, pasta, biryani, or other dishes!"
        
        # Check for ingredients requests
        if 'ingredient' in message_lower:
            if KNOWLEDGE_AVAILABLE:
                from .food_knowledge import get_ingredients
                for food in ['burger', 'pizza', 'pasta', 'salad', 'biryani', 'sandwich', 'chicken']:
                    if food in message_lower:
                        return get_ingredients(food)
                return "Which dish ingredients do you want to know about?"
        
        # Default greeting
        return """Hi! I'm RestoBot. I can help you with:
•  View menu and order food
•  Manage your cart
•  Get recipes and cooking tips
•  Admin features (login required)

What would you like to do?"""
