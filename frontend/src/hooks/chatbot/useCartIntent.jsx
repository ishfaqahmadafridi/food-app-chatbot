import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import useItemMatcher from './useItemMatcher';

const useCartIntent = (addBotMessage) => {
  const { addToCart } = useContext(StoreContext);
  const { findMatchingItem } = useItemMatcher();

  const handleAddToCartIntent = (messageText) => {
    const lowerText = messageText.toLowerCase();
    const wantsAdd = lowerText.includes('add') || lowerText.includes('order');
    
    if (!wantsAdd) return false;

    const matchedItem = findMatchingItem(messageText);

    if (!matchedItem) {
      addBotMessage("I couldn't find that item. Try the exact name from the menu.");
      return true;
    }

    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      addBotMessage('Please sign in to add items to cart.');
      return true;
    }

    const itemId = matchedItem.id ?? matchedItem._id;
    addToCart(itemId);
    addBotMessage(`Added ${matchedItem.name} to your cart!`);
    return true;
  };

  return { handleAddToCartIntent };
};

export default useCartIntent;
