# 🤖 RestoBot - Complete Chatbot Guide

## Overview
RestoBot is an intelligent restaurant assistant chatbot with streaming support, authentication, cart management, food knowledge, and admin capabilities.

## 🎯 Features

### 👤 User Features (No Login Required)
1. **Browse Menu**
   - View all available items
   - Filter by category
   - Search for specific dishes

2. **Cart Management**
   - Add items to cart
   - Remove items from cart
   - View cart contents
   - Quantity management

3. **Food Knowledge Base**
   - Get recipes for dishes
   - Learn about ingredients
   - Cooking tips and techniques
   - Nutritional information

### 👨‍💼 Admin Features (Login Required)
1. **Menu Management**
   - Update item prices
   - Update item descriptions
   - Change item availability
   - Create new menu items
   - Delete menu items

## 🔐 Authentication

### For Regular Users
- **No login required** for browsing menu, adding to cart, and getting recipes
- Session-based cart management for anonymous users

### For Admin Users
- **Login is REQUIRED** for:
  - Updating menu items
  - Creating new items
  - Deleting items
  - Changing availability

## 📡 API Endpoints

### 1. Regular Chat (Non-Streaming)
```
POST /api/chatbot/
Content-Type: application/json

{
  "message": "Add 2 burgers to my cart"
}

Response:
{
  "reply": "✅ Added 2 x Burger to your cart!",
  "status": "success"
}
```

### 2. Streaming Chat (Server-Sent Events)
```
POST /api/chatbot/stream/
Content-Type: application/json

{
  "message": "How to make pizza?"
}

Response: (SSE Stream)
data: {"chunk": "Here's", "done": false}
data: {"chunk": " how", "done": false}
data: {"chunk": " to", "done": false}
...
data: {"chunk": "", "done": true}
```

### 3. Voice to Text (Simulation)
```
POST /api/chatbot/voice-to-text/
Content-Type: multipart/form-data

file: <audio_file>
```

## 💬 Example User Interactions

### Adding Items to Cart
```
User: "Add burger"
Bot:  "✅ Added 1 x Burger to your cart! Total: Rs. 250"

User: "Add 3 pizzas"
Bot:  "✅ Added 3 x Pizza to your cart! You now have 4 items in cart."

User: "Order 2 chicken biryani"
Bot:  "✅ Added 2 x Chicken Biryani to your cart!"
```

### Removing Items from Cart
```
User: "Remove burger"
Bot:  "✅ Removed Burger from your cart!"

User: "Remove 1 pizza"
Bot:  "✅ Reduced Pizza quantity by 1. Now you have 2 in cart."

User: "Delete biryani"
Bot:  "✅ Removed Chicken Biryani from your cart!"
```

### Viewing Cart
```
User: "Show my cart"
Bot:  "🛒 Your Cart:
       2 x Pizza - Rs. 800
       1 x Burger - Rs. 250
       
       Total: Rs. 1050"

User: "What's in my cart?"
Bot:  (Shows cart contents)
```

### Menu Browsing
```
User: "Show menu"
Bot:  "🍽️ Available items:
       Burger - Rs. 250 (Burgers)
       Pizza - Rs. 400 (Pizza)
       Pasta - Rs. 300 (Pasta)
       ..."

User: "Show me burgers"
Bot:  (Displays burger category items)
```

### Recipe Requests
```
User: "How to make burger?"
Bot:  "**Classic Burger Recipe:**
       1. Mix 500g ground beef with salt, pepper...
       2. Form into 4 equal patties
       3. Grill for 4-5 minutes each side...
       ..."

User: "Recipe for pizza"
Bot:  (Shows detailed pizza recipe)

User: "What ingredients do I need for pasta?"
Bot:  "Pasta (penne/spaghetti), tomatoes, garlic, olive oil, basil, parmesan, salt, pepper"

User: "Give me cooking tips for biryani"
Bot:  "💡 Cooking Tips for Biryani:
       Layering is key! Don't mix. Saffron in warm milk adds color and aroma."
```

### General Food Questions
```
User: "Tell me about healthy eating"
Bot:  (Provides healthy eating tips)

User: "What are basic cooking techniques?"
Bot:  (Lists cooking techniques with explanations)

User: "Tell me about spices"
Bot:  (Explains common spices and their uses)
```

## 🔧 Admin Operations

### Update Item (Requires Admin Login)
```
User (Admin): "Update burger price to 300"
Bot:           "✅ Successfully updated Burger: price from Rs. 250 to Rs. 300!"

User (Admin): "Update pizza description to Fresh Italian style pizza"
Bot:           "✅ Successfully updated Pizza: description!"

User (Admin): "Make pasta unavailable"
Bot:           "✅ Successfully updated Pasta: availability to unavailable!"

User (Not Admin): "Update burger price"
Bot:               "⛔ Admin access required! Only staff members can update menu items."

User (Not Logged In): "Update burger"
Bot:                   "⛔ Authentication required! Please login to perform admin operations."
```

### Create New Item (Requires Admin Login)
```
User (Admin): "Create new item Sandwich, price 200, category Sandwiches"
Bot:           "✅ Successfully added 'Sandwich' (Rs. 200) to Sandwiches category!"
```

### Delete Item (Requires Admin Login)
```
User (Admin): "Delete old burger"
Bot:           "✅ Successfully deleted 1 item(s): Old Burger"
```

## 🌊 Streaming Implementation

### How Streaming Works
1. Client sends POST request to `/api/chatbot/stream/`
2. Server returns `text/event-stream` response
3. AI response is streamed token by token
4. Each chunk is sent as SSE (Server-Sent Events)
5. Final message includes `"done": true`

### Frontend Integration Example (JavaScript)
```javascript
async function sendStreamingMessage(message) {
  const response = await fetch('/api/chatbot/stream/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: JSON.stringify({ message })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullResponse = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = JSON.parse(line.slice(6));
        
        if (data.chunk) {
          fullResponse += data.chunk;
          // Update UI with chunk
          updateChatUI(data.chunk);
        }
        
        if (data.done) {
          console.log('Streaming complete!');
          return fullResponse;
        }
      }
    }
  }
}
```

## 🛠️ Technical Architecture

### Components

1. **chains.py** - LangChain agent with tools and streaming
   - Agent executor with tool binding
   - Streaming support via LLM streaming
   - Tool execution middleware

2. **tools.py** - All chatbot tools
   - Cart management (add, remove, view)
   - Menu operations (search, list)
   - Admin operations (create, update, delete)
   - Food knowledge (recipes, ingredients, tips)

3. **views.py** - Django REST API views
   - ChatView: Regular non-streaming chat
   - ChatStreamView: Streaming chat with SSE
   - VoiceToText: Voice processing endpoint
   - Authentication handling
   - Session management

4. **food_knowledge.py** - Food knowledge base
   - Recipe database
   - Ingredients lists
   - Cooking tips
   - General food knowledge

## 🔑 Key Features Explained

### Authentication Flow
1. **Anonymous Users**: Use session-based cart
2. **Logged In Users**: Cart tied to user account
3. **Admin Users**: Can perform admin operations

### Tool Execution
1. User sends message
2. LLM analyzes and selects appropriate tools
3. Tools execute with user context (user/session)
4. Results are formatted into natural response
5. Response is streamed back to user

### Streaming Benefits
- Real-time response display
- Better user experience
- Perception of faster response
- Progressive rendering

## 📝 Testing Examples

### Test Cart Functions
```bash
# Add item
curl -X POST http://localhost:8000/api/chatbot/ \
  -H "Content-Type: application/json" \
  -d '{"message": "Add 2 burgers"}'

# Remove item
curl -X POST http://localhost:8000/api/chatbot/ \
  -H "Content-Type: application/json" \
  -d '{"message": "Remove pizza"}'

# View cart
curl -X POST http://localhost:8000/api/chatbot/ \
  -H "Content-Type: application/json" \
  -d '{"message": "Show my cart"}'
```

### Test Recipe Functions
```bash
# Get recipe
curl -X POST http://localhost:8000/api/chatbot/ \
  -H "Content-Type: application/json" \
  -d '{"message": "How to make burger?"}'

# Get ingredients
curl -X POST http://localhost:8000/api/chatbot/ \
  -H "Content-Type: application/json" \
  -d '{"message": "What ingredients for pizza?"}'
```

### Test Streaming
```bash
curl -X POST http://localhost:8000/api/chatbot/stream/ \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about healthy eating"}' \
  --no-buffer
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

Required packages:
- django
- djangorestframework
- langchain
- langchain-openai
- openai

### 2. Configure OpenAI API Key
```python
# In backend/settings.py
OPENAI_API_KEY = 'your-api-key-here'
```

### 3. Run Migrations
```bash
cd backend
python manage.py migrate
```

### 4. Create Admin User
```bash
python manage.py createsuperuser
```

### 5. Start Server
```bash
python manage.py runserver
```

### 6. Test Chatbot
```bash
# Non-streaming
curl -X POST http://localhost:8000/api/chatbot/ \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'

# Streaming
curl -X POST http://localhost:8000/api/chatbot/stream/ \
  -H "Content-Type: application/json" \
  -d '{"message": "How to make pizza?"}' \
  --no-buffer
```

## 🎨 Frontend Integration Tips

### Display Streaming Response
```javascript
function displayStreamingMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'bot-message';
  chatContainer.appendChild(messageDiv);
  
  // Stream will update this div
  return messageDiv;
}
```

### Handle Authentication
```javascript
// Check if user is admin before showing admin features
if (userIsAdmin) {
  showAdminControls();
}
```

### Cart Badge Update
```javascript
// Update cart count after bot adds/removes items
function updateCartBadge() {
  fetch('/api/cart/count/')
    .then(r => r.json())
    .then(data => {
      cartBadge.textContent = data.count;
    });
}
```

## 🔒 Security Considerations

1. **Authentication**: Admin operations require staff status
2. **Session Management**: Carts tied to sessions for anonymous users
3. **CSRF Protection**: Django CSRF tokens for all POST requests
4. **Input Validation**: All tool inputs validated
5. **Rate Limiting**: Consider adding rate limiting in production

## 📊 Performance Tips

1. **Streaming**: Use streaming for long responses
2. **Caching**: Cache menu items for faster responses
3. **Database Queries**: Use `select_related` and `prefetch_related`
4. **Tool Execution**: Tools execute quickly with indexed database queries

## 🐛 Troubleshooting

### Issue: Tools not executing
**Solution**: Check request context is set correctly

### Issue: Admin operations fail
**Solution**: Verify user is authenticated and has staff status

### Issue: Streaming not working
**Solution**: Check browser supports EventSource or SSE

### Issue: Cart not persisting
**Solution**: Ensure session middleware is enabled

## 📚 Additional Resources

- LangChain Documentation: https://python.langchain.com/
- Django REST Framework: https://www.django-rest-framework.org/
- Server-Sent Events: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events

## 🎉 Summary

RestoBot provides a complete intelligent chatbot solution with:
✅ Streaming responses for real-time interaction
✅ Authentication-based admin features
✅ Cart management (add, remove, view)
✅ Food recipes and cooking knowledge
✅ Menu browsing and search
✅ Session-based and user-based cart handling
✅ Natural language understanding
✅ Tool-based architecture for extensibility

Happy Chatting! 🍔🍕🍝
