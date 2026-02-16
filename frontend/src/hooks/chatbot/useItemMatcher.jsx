import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const useItemMatcher = () => {
  const { foodItems } = useContext(StoreContext);

  const findMatchingItem = (messageText) => {
    const lowerText = messageText.toLowerCase();
    
    // Clean the message: remove action words to extract item name
    let cleanMessage = lowerText;
    const actionWords = ['add', 'order', 'buy', 'want', 'get me', 'to cart', 'please', 'can i have', 'i want', 'give me'];
    for (const word of actionWords) {
      cleanMessage = cleanMessage.replace(word, ' ');
    }
    cleanMessage = cleanMessage.trim();

    // Find matching item
    let matchedItem = null;
    let bestMatchScore = 0;

    for (const item of foodItems) {
      const itemNameLower = item.name?.toLowerCase();
      if (!itemNameLower) continue;

      // Exact match (highest priority)
      if (itemNameLower === cleanMessage) {
        matchedItem = item;
        bestMatchScore = 100;
        break;
      }

      // Item name contained in cleaned message
      if (itemNameLower.includes(cleanMessage) && cleanMessage.length > 0) {
        const score = cleanMessage.length;
        if (score > bestMatchScore) {
          matchedItem = item;
          bestMatchScore = score;
        }
      }

      // Message contained in item name
      if (cleanMessage.includes(itemNameLower) && itemNameLower.length > 2) {
        const score = itemNameLower.length;
        if (score > bestMatchScore) {
          matchedItem = item;
          bestMatchScore = score;
        }
      }
    }

    return matchedItem;
  };

  return { findMatchingItem };
};

export default useItemMatcher;
