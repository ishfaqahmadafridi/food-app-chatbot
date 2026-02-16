import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/frontend_assets/assets";
import api from "../services/api";
import toast from "react-hot-toast";

// Create context
export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [foodItems, setFoodItems] = useState(food_list);
  const [loading, setLoading] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  // Fetch food items from API
  useEffect(() => {
    fetchFoodItems();
  }, []);

  // Update cart total whenever cartItems or foodItems change
  useEffect(() => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = foodItems.find(
          (product) => String(product.id) === itemId || String(product._id) === itemId
        );
        if (itemInfo) {
          totalAmount += cartItems[itemId] * itemInfo.price;
        }
      }
    }
    setCartTotal(totalAmount);
  }, [cartItems, foodItems]);

  const fetchFoodItems = async () => {
    try {
      setLoading(true);
      const response = await api.get('/items/');
      const items = Array.isArray(response.data) ? response.data : [];
      if (items.length > 0) {
        setFoodItems(items);
      } else {
        // Fall back to mock data if API returns empty
        setFoodItems(food_list);
      }
    } catch (error) {
      console.error('Error fetching food items:', error);
      // Fall back to mock data
      setFoodItems(food_list);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (itemId) => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      toast.error('No guest option. Please sign up or sign in first.');
      return;
    }

    // Normalize itemId to string for consistent key usage
    const normalizedId = String(itemId);

    if (!cartItems[normalizedId]) {
      setCartItems((prev) => ({ ...prev, [normalizedId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [normalizedId]: prev[normalizedId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    // Normalize itemId to string for consistent key usage
    const normalizedId = String(itemId);
    
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[normalizedId] > 1) {
        updated[normalizedId] -= 1;
      } else {
        delete updated[normalizedId];
      }
      return updated;
    });
  };

  const getTotalCartAmount = () => {
    return cartTotal;
  };

  const getTotalCartItems = () => {
    let total = 0;
    for (const item in cartItems) {
      total += cartItems[item];
    }
    return total;
  };

  const contextValue = {
    foodItems,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    loading,
    food_list: foodItems,
    refreshFoodItems: fetchFoodItems,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export const StoreProvider = StoreContextProvider;
export default StoreContextProvider;
