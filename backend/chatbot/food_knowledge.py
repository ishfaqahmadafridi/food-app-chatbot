"""
Food knowledge base for chatbot to answer recipe and food-related questions
"""

FOOD_KNOWLEDGE = {
    "burger": {
        "description": "A burger is a sandwich consisting of a cooked patty placed inside a sliced bun, typically garnished with vegetables and sauces.",
        "recipe": """**Classic Burger Recipe:**
1. Mix 500g ground beef with salt, pepper, and garlic powder
2. Form into 4 equal patties
3. Grill for 4-5 minutes each side (medium-well)
4. Toast burger buns lightly
5. Assemble: bun bottom + lettuce + patty + cheese + tomato + onion + pickles + sauce + bun top
6. Serve hot with fries!""",
        "ingredients": "Ground beef, burger buns, lettuce, tomato, onion, cheese, pickles, ketchup, mustard, salt, pepper",
        "cooking_time": "15-20 minutes",
        "tips": "Don't press the patty while cooking - it releases juices. Let it rest for 2 minutes after grilling."
    },
    "pizza": {
        "description": "Pizza is a flatbread topped with tomato sauce, cheese, and various toppings, baked in a hot oven.",
        "recipe": """**Homemade Pizza Recipe:**
1. **Dough:** Mix 500g flour + 300ml warm water + 2 tsp yeast + 1 tsp sugar + salt. Knead for 10 min, let rise 1 hour
2. Roll dough into thin circle
3. Spread tomato sauce evenly
4. Add mozzarella cheese
5. Add toppings (peppers, onions, mushrooms, pepperoni)
6. Bake at 250°C for 12-15 minutes until golden
7. Slice and enjoy!""",
        "ingredients": "Pizza dough, tomato sauce, mozzarella cheese, olive oil, oregano, basil, toppings of choice",
        "cooking_time": "30 minutes (plus 1 hour rise time)",
        "tips": "High heat is crucial! Preheat oven to maximum. Use pizza stone for crispy crust."
    },
    "pasta": {
        "description": "Pasta is an Italian dish made from wheat dough, shaped into various forms and cooked in boiling water.",
        "recipe": """**Simple Pasta Recipe:**
1. Boil 4L water with 2 tbsp salt
2. Add 400g pasta, cook 8-10 minutes (al dente)
3. **Sauce:** Heat olive oil, sauté garlic
4. Add tomatoes, basil, salt, pepper
5. Simmer 15 minutes
6. Drain pasta (save 1 cup pasta water)
7. Toss pasta with sauce, add pasta water if needed
8. Top with parmesan cheese""",
        "ingredients": "Pasta (penne/spaghetti), tomatoes, garlic, olive oil, basil, parmesan, salt, pepper",
        "cooking_time": "25-30 minutes",
        "tips": "Always salt pasta water generously. Save pasta water - it helps sauce stick to pasta!"
    },
    "salad": {
        "description": "A salad is a dish of mixed vegetables, fruits, and other ingredients served with dressing.",
        "recipe": """**Fresh Garden Salad:**
1. Wash all vegetables thoroughly
2. Chop lettuce, cucumber, tomato, bell peppers
3. Add carrots (shredded), onions (sliced thin)
4. **Dressing:** Mix olive oil + lemon juice + salt + pepper + honey
5. Toss vegetables with dressing
6. Top with feta cheese or nuts
7. Serve immediately""",
        "ingredients": "Lettuce, cucumber, tomato, carrots, bell peppers, onion, olive oil, lemon, feta cheese",
        "cooking_time": "10 minutes (no cooking)",
        "tips": "Keep vegetables crisp by adding dressing just before serving. Use cold, fresh ingredients."
    },
    "biryani": {
        "description": "Biryani is a fragrant rice dish with spiced meat or vegetables, popular in South Asian cuisine.",
        "recipe": """**Chicken Biryani Recipe:**
1. Marinate 500g chicken with yogurt, spices (2 hours)
2. Soak 2 cups basmati rice for 30 min
3. Cook rice 70% done, drain
4. Fry onions until golden brown
5. Cook marinated chicken until done
6. Layer: rice + chicken + fried onions + saffron milk
7. Dum cook (sealed pot) on low heat 20 minutes
8. Serve with raita!""",
        "ingredients": "Basmati rice, chicken, yogurt, onions, spices (garam masala, turmeric, chili), saffron, ghee, mint, coriander",
        "cooking_time": "1 hour (plus marination)",
        "tips": "Layering is key! Don't mix. Saffron in warm milk adds color and aroma."
    },
    "sandwich": {
        "description": "A sandwich is two slices of bread with fillings like meat, cheese, and vegetables between them.",
        "recipe": """**Club Sandwich Recipe:**
1. Toast 3 bread slices lightly
2. Spread mayo on all slices
3. Layer 1: lettuce + tomato + cucumber
4. Add cheese slice
5. Layer 2: grilled chicken + bacon
6. Stack all layers
7. Secure with toothpicks, cut diagonally
8. Serve with chips!""",
        "ingredients": "Bread slices, chicken, bacon, lettuce, tomato, cucumber, cheese, mayonnaise, butter",
        "cooking_time": "15 minutes",
        "tips": "Toast bread for better texture. Cut diagonally for easier eating."
    },
    "chicken": {
        "description": "Chicken is versatile poultry that can be grilled, fried, roasted, or used in curries.",
        "recipe": """**Grilled Chicken Recipe:**
1. **Marinade:** Mix yogurt + lemon + garlic + paprika + salt + pepper
2. Coat chicken pieces thoroughly
3. Marinate 2-4 hours (or overnight)
4. Preheat grill to medium-high
5. Grill 6-7 minutes each side
6. Check internal temp (75°C)
7. Rest 5 minutes before serving
8. Garnish with herbs""",
        "ingredients": "Chicken, yogurt, lemon, garlic, paprika, olive oil, herbs, salt, pepper",
        "cooking_time": "30 minutes (plus marination)",
        "tips": "Don't overcook! Use meat thermometer. Marinade adds flavor and keeps meat juicy."
    },
    "fries": {
        "description": "French fries are deep-fried potato strips, crispy outside and soft inside.",
        "recipe": """**Crispy French Fries:**
1. Cut potatoes into even strips (1cm thick)
2. Soak in cold water 30 minutes (removes starch)
3. Dry completely with towel
4. Heat oil to 160°C
5. First fry: 5 minutes (pale and soft)
6. Remove, let cool 10 minutes
7. Second fry: 180°C for 2-3 minutes (golden crispy)
8. Season with salt immediately""",
        "ingredients": "Potatoes, vegetable oil, salt",
        "cooking_time": "45 minutes",
        "tips": "Double frying is the secret! First fry cooks inside, second fry makes it crispy."
    }
}

def get_food_info(food_name):
    """Get information about a specific food"""
    food_name = food_name.lower()
    
    for key, info in FOOD_KNOWLEDGE.items():
        if key in food_name or food_name in key:
            return info
    
    return None

def get_recipe(food_name):
    """Get recipe for a specific food"""
    info = get_food_info(food_name)
    if info and 'recipe' in info:
        return info['recipe']
    return None

def get_ingredients(food_name):
    """Get ingredients for a specific food"""
    info = get_food_info(food_name)
    if info and 'ingredients' in info:
        return f"**Ingredients for {food_name.title()}:**\n{info['ingredients']}"
    return None

def get_cooking_tips(food_name):
    """Get cooking tips for a specific food"""
    info = get_food_info(food_name)
    if info and 'tips' in info:
        return f"💡 **Cooking Tips for {food_name.title()}:**\n{info['tips']}"
    return None


# General food and cooking knowledge
GENERAL_FOOD_KNOWLEDGE = {
    "healthy eating": """🥗 **Healthy Eating Tips:**
• Eat 5 servings of fruits and vegetables daily
• Choose whole grains over refined grains
• Include lean proteins (chicken, fish, beans)
• Stay hydrated - drink 8 glasses of water
• Limit processed foods and added sugars
• Practice portion control""",
    
    "cooking techniques": """👨‍🍳 **Basic Cooking Techniques:**
• **Grilling:** High heat, direct cooking for meats
• **Sautéing:** Quick cooking in a pan with oil
• **Roasting:** Dry heat in oven, great for vegetables
• **Boiling:** Cooking in hot water (pasta, rice)
• **Steaming:** Healthy method using steam
• **Frying:** Deep or shallow frying in hot oil""",
    
    "food safety": """🛡️ **Food Safety Tips:**
• Wash hands before cooking
• Keep raw meat separate from other foods
• Cook meat to proper internal temperature
• Refrigerate leftovers within 2 hours
• Check expiration dates
• Use different cutting boards for meat and vegetables""",
    
    "spices": """🌶️ **Common Spices & Uses:**
• **Cumin:** Earthy flavor, great for curries
• **Paprika:** Mild, adds color and sweetness
• **Turmeric:** Anti-inflammatory, golden color
• **Coriander:** Citrusy, pairs with cumin
• **Black Pepper:** Universal, adds heat
• **Garam Masala:** Blend for Indian dishes""",
    
    "nutrition": """💪 **Nutrition Basics:**
• **Proteins:** Build muscles (chicken, fish, beans)
• **Carbs:** Energy source (rice, bread, pasta)
• **Fats:** Healthy fats needed (olive oil, nuts, avocado)
• **Vitamins:** From fruits and vegetables
• **Fiber:** Aids digestion (whole grains, vegetables)
• **Calcium:** Strong bones (dairy, leafy greens)"""
}

def get_general_knowledge(query):
    """Get general food and cooking knowledge"""
    query = query.lower()
    
    for topic, info in GENERAL_FOOD_KNOWLEDGE.items():
        if topic in query or any(word in query for word in topic.split()):
            return info
    
    return None
