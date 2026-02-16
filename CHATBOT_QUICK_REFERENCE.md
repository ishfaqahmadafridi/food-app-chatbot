# 📋 RestoBot Quick Reference Card

## 🚀 Quick Start
```bash
cd backend
python manage.py runserver
python ../test_chatbot_complete.py
```

## 📡 API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chatbot/` | POST | Regular chat (non-streaming) |
| `/api/chatbot/stream/` | POST | Streaming chat (SSE) |
| `/api/chatbot/voice-to-text/` | POST | Voice input (simulation) |

## 💬 User Commands (No Login Required)

### Cart Management 🛒
| Command | Example | Result |
|---------|---------|--------|
| Add item | `"Add 2 burgers"` | Adds to cart |
| Remove item | `"Remove pizza"` | Removes from cart |
| View cart | `"Show my cart"` | Displays cart contents |
| Clear item | `"Delete burger from cart"` | Removes all of that item |

### Menu Browsing 🍽️
| Command | Example | Result |
|---------|---------|--------|
| Show menu | `"Show menu"` | Lists all items |
| Filter category | `"Show burgers"` | Category-specific items |
| Item details | `"Tell me about pasta"` | Item information |
| Search item | `"Do you have biryani?"` | Search results |

### Food Knowledge 📖
| Command | Example | Result |
|---------|---------|--------|
| Get recipe | `"How to make burger?"` | Full recipe with steps |
| Get ingredients | `"Ingredients for pizza"` | Ingredient list |
| Cooking tips | `"Tips for cooking pasta"` | Cooking advice |
| General knowledge | `"Tell me about healthy eating"` | Food info |

## 👨‍💼 Admin Commands (Login Required)

### Update Operations 🔧
| Command | Example | Auth Required |
|---------|---------|---------------|
| Update price | `"Update burger price to 300"` | ✅ Yes (staff) |
| Update description | `"Update pizza description to ..."` | ✅ Yes (staff) |
| Change availability | `"Make pasta unavailable"` | ✅ Yes (staff) |

### Create/Delete Operations ➕➖
| Command | Example | Auth Required |
|---------|---------|---------------|
| Create item | `"Create new item Sandwich, price 200"` | ✅ Yes (staff) |
| Delete item | `"Delete old burger"` | ✅ Yes (staff) |

## 🔐 Authentication Matrix

| User Type | Cart | Menu | Recipes | Update | Create | Delete |
|-----------|------|------|---------|--------|--------|--------|
| Anonymous | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Logged In | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Admin | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## 🌊 Streaming vs Regular

| Feature | Regular (`/`) | Streaming (`/stream/`) |
|---------|---------------|------------------------|
| Response time | Wait for full response | Real-time tokens |
| User experience | All at once | Progressive |
| Best for | Quick queries | Long responses |
| Frontend complexity | Simple | Moderate (SSE) |

## 🛠️ Tool Reference

| Tool Name | Purpose | Auth Required |
|-----------|---------|---------------|
| `get_menu_items` | List menu items | No |
| `search_food_item` | Search for item | No |
| `add_to_cart` | Add to cart | No |
| `remove_from_cart` | Remove from cart | No |
| `get_cart_items` | View cart | No |
| `get_food_recipe` | Get recipe | No |
| `get_food_ingredients` | Get ingredients | No |
| `get_cooking_tips` | Get cooking tips | No |
| `update_food_item` | Update item | Yes (staff) |
| `create_food_item` | Create item | Yes (staff) |
| `delete_food_item` | Delete item | Yes (staff) |

## 📊 Response Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Request processed |
| 400 | Bad Request | Missing message |
| 401 | Unauthorized | Not logged in (admin action) |
| 403 | Forbidden | Not admin (admin action) |
| 500 | Server Error | Internal error |

## 🎯 Example Workflows

### User Journey: Order Food
```
1. "Show menu" → Browse items
2. "Tell me about burger" → Get details
3. "Add 2 burgers" → Add to cart
4. "Add 1 pizza" → Add more
5. "Show my cart" → Review cart
6. "Remove 1 burger" → Adjust quantity
7. "Show my cart" → Final check
```

### Admin Journey: Update Menu
```
1. Login as admin
2. "Show menu" → Check current items
3. "Update burger price to 300" → Update price
4. "Update burger description to Premium beef burger" → Update description
5. "Make old item unavailable" → Change availability
6. "Create new item Sandwich, price 200" → Add new item
```

### User Journey: Learn Recipe
```
1. "How to make pizza?" → Get full recipe
2. "What ingredients for pizza?" → Get ingredient list
3. "Cooking tips for pizza?" → Get tips
4. "Tell me about healthy eating" → General knowledge
```

## 🧪 Testing Commands

### Curl Tests
```bash
# Regular chat
curl -X POST http://localhost:8000/api/chatbot/ \
  -H "Content-Type: application/json" \
  -d '{"message": "Add burger"}'

# Streaming chat
curl -X POST http://localhost:8000/api/chatbot/stream/ \
  -H "Content-Type: application/json" \
  -d '{"message": "How to make pizza?"}' \
  --no-buffer
```

### Python Test
```bash
python test_chatbot_complete.py
# Select: 1 (Comprehensive), 2 (Interactive), 3 (Quick)
```

## 📝 Response Format

### Regular Response
```json
{
  "reply": "✅ Added 2 x Burger to your cart!",
  "status": "success"
}
```

### Streaming Response (SSE)
```
data: {"chunk": "Here's", "done": false}
data: {"chunk": " how", "done": false}
data: {"chunk": " to", "done": false}
data: {"chunk": " make", "done": false}
data: {"chunk": " pizza", "done": false}
data: {"chunk": ":", "done": false}
data: {"chunk": "", "done": true}
```

## 🔍 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Authentication required" | Login as admin user |
| "Admin access required" | Need staff status |
| "Item not found" | Check menu first |
| "Cart is empty" | Add items to cart |
| Streaming not working | Check browser SSE support |
| Tools not working | Verify OpenAI API key |

## 📞 Quick Links

- **Full Guide**: `CHATBOT_GUIDE.md`
- **Implementation Summary**: `CHATBOT_IMPLEMENTATION_SUMMARY.md`
- **Frontend Example**: `frontend_integration_example.js`
- **Test Script**: `test_chatbot_complete.py`

## 🎨 Status Icons Legend

- ✅ = Available/Enabled
- ❌ = Not Available/Disabled
- 🔐 = Authentication Required
- 🛒 = Cart Operation
- 🍽️ = Menu Operation
- 📖 = Knowledge Base
- 👨‍💼 = Admin Only
- 🌊 = Streaming

## 🚀 Production Checklist

- [ ] Set `OPENAI_API_KEY` in environment
- [ ] Configure CORS for frontend
- [ ] Enable HTTPS/SSL
- [ ] Set up rate limiting
- [ ] Configure session storage
- [ ] Set up logging and monitoring
- [ ] Add error tracking (Sentry, etc.)
- [ ] Test authentication flow
- [ ] Test streaming on production

## 💡 Tips & Best Practices

1. **Use streaming for recipes** - Better UX for long responses
2. **Check auth before admin actions** - Show login prompt
3. **Update cart badge** - After add/remove operations
4. **Handle session expiry** - Graceful session refresh
5. **Cache menu items** - Reduce database queries
6. **Log all errors** - For debugging and monitoring
7. **Rate limit requests** - Prevent abuse
8. **Validate user input** - Before sending to API

---

**Version:** 1.0.0  
**Last Updated:** February 10, 2026  
**Status:** ✅ Production Ready
