# RestoBot - Restaurant Food Ordering Application

A full-stack food ordering application with Django REST API backend and React frontend with AI chatbot support.

## 📋 Features

- **Food Catalog**: Browse food items by category with ratings and prices
- **Shopping Cart**: Add/remove items with real-time cart updates
- **User Authentication**: Register and login with JWT tokens
- **Order Management**: Place and track orders
- **Admin Dashboard**: Manage menu items and orders
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

### Backend
- **Framework**: Django 6.0.1
- **API**: Django REST Framework
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Database**: SQLite (can be replaced with PostgreSQL)
- **CORS**: django-cors-headers

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite 7.1
- **Styling**: Tailwind CSS
- **UI Icons**: Lucide React
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Animations**: Framer Motion

## 📦 Installation

### Backend Setup

```bash
cd backend

# Create virtual environment (optional)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create admin user and sample data
python populate_data.py

# Start development server
python manage.py runserver
```

Backend will run at: `http://localhost:8000`

**Admin credentials:**
- Username: `admin`
- Password: `admin123`
- URL: `http://localhost:8000/admin/`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run at: `http://localhost:5173`

## 📚 API Endpoints

### Public Endpoints
- `GET /api/items/` - Get all food items
- `GET /api/categories/` - Get all categories
- `POST /api/signup/` - Register new user
- `POST /api/login/` - Login user

### Protected Endpoints (Requires JWT Token)
- `GET /api/profile/` - Get user profile
- `GET /api/cart/` - Get user's cart
- `POST /api/cart/` - Add item to cart
- `GET /api/cart-items/` - List cart items
- `DELETE /api/cart-items/{id}/` - Remove from cart

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```
DEBUG=True
SECRET_KEY=your-secret-key
OPENAI_API_KEY=your-openai-key
ALLOWED_HOSTS=localhost,127.0.0.1
```

**Frontend (.env)**
```
VITE_API_URL=http://localhost:8000/api
```

## 📊 Database Models

### User
- Standard Django User model with email and password

### Category
- `name` - Category name
- `image` - Category image
- `is_active` - Active status

### FoodItem
- `name` - Item name
- `price` - Price (Decimal)
- `description` - Item description
- `category` - Foreign key to Category
- `image` - Item image
- `is_available` - Availability status
- `rating` - Rating (1-5)

### Cart
- `user` - One-to-one with User
- `session_key` - For guest carts
- `created_at` - Creation timestamp

### CartItem
- `cart` - Foreign key to Cart
- `dish` - Foreign key to FoodItem
- `quantity` - Item quantity

## 🚀 Usage

1. **Browse Items**: View available food items on the home page
2. **Add to Cart**: Click the + button on any item to add it
3. **Manage Cart**: Adjust quantities or remove items
4. **Checkout**: Review cart and proceed to payment
5. **Register/Login**: Create account or login to save orders

## 📝 Sample Data

The application includes pre-loaded sample data with:
- 4 Food Categories (Burgers, Pizzas, Salads, Desserts)
- 8 Food Items with descriptions and ratings
- Admin account for management

## 🔐 Security

- CORS configured for localhost
- JWT authentication for protected endpoints
- Password validation on registration
- HTTPS recommended for production

## 📱 Mobile Responsive

The frontend is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile phones

## 🐛 Troubleshooting

### CORS Errors
Ensure `CORS_ALLOWED_ORIGINS` in backend settings includes your frontend URL.

### API Connection Issues
Check that:
- Backend is running on `http://localhost:8000`
- `VITE_API_URL` in frontend `.env` is correct
- No firewall blocking the connection

### Database Issues
Reset database:
```bash
rm db.sqlite3
python manage.py migrate
python populate_data.py
```

## 📄 Project Structure

```
rest/
├── backend/
│   ├── api/
│   │   ├── models.py      # Database models
│   │   ├── views.py       # API views
│   │   ├── serializers.py # DRF serializers
│   │   ├── urls.py        # API routes
│   │   └── migrations/
│   ├── backend/
│   │   ├── settings.py    # Django settings
│   │   ├── urls.py        # Project URLs
│   │   └── wsgi.py
│   ├── manage.py
│   ├── populate_data.py   # Sample data script
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Context providers
│   │   ├── services/      # API services
│   │   ├── assets/        # Images and data
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── README.md
```

## 🚢 Deployment

### Backend Deployment
```bash
# Build for production
pip install gunicorn
gunicorn backend.wsgi:application

# Update ALLOWED_HOSTS in settings.py
# Configure CORS_ALLOWED_ORIGINS
# Use PostgreSQL instead of SQLite
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy dist/ folder to static hosting
```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Django REST Framework documentation
3. Check React and Vite documentation

## 📄 License

This project is open source and available under the MIT License.

---

**Last Updated**: February 2026
**Status**: Development ✅
