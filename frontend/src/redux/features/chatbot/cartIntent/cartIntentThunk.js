import {  createAsyncThunk } from '@reduxjs/toolkit';
import { addBotMessage } from '../chatMessagesSlice';


export const handleCartIntent = createAsyncThunk(
  'cartIntent/handleIntent',
  async ({ messageText, foodItems, addToCart }, { dispatch, rejectWithValue }) => {
    try {
      const lowerText = messageText.toLowerCase();
      const wantsAdd = lowerText.includes('add') || lowerText.includes('order');
      
      if (!wantsAdd) {
        return { handled: false };
      }

      const matchedItem = findMatchingItem(messageText, foodItems);

      if (!matchedItem) {
        dispatch(addBotMessage("I couldn't find that item. Try the exact name from the menu."));
        return { handled: true, success: false };
      }

      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        dispatch(addBotMessage('Please sign in to add items to cart.'));
        return { handled: true, success: false };
      }

      const itemId = matchedItem.id ?? matchedItem._id;
      addToCart(itemId);
      dispatch(addBotMessage(`Added ${matchedItem.name} to your cart!`));
      
      return { handled: true, success: true, itemName: matchedItem.name };
    } catch (error) {
      console.error('Cart intent error:', error);
      return rejectWithValue(error.message);
    }
  }
);


const findMatchingItem = (messageText, foodItems) => {
  const lowerText = messageText.toLowerCase();
  

  let cleanMessage = lowerText;
  const actionWords = ['add', 'order', 'buy', 'want', 'get me', 'to cart', 'please', 'can i have', 'i want', 'give me'];
  for (const word of actionWords) {
    cleanMessage = cleanMessage.replace(word, ' ');
  }
  cleanMessage = cleanMessage.trim();


  let matchedItem = null;
  let bestMatchScore = 0;

  for (const item of foodItems) {
    const itemNameLower = item.name?.toLowerCase();
    if (!itemNameLower) continue;

    if (itemNameLower === cleanMessage) {
      matchedItem = item;
      bestMatchScore = 100;
      break;
    }

   
    if (itemNameLower.includes(cleanMessage) && cleanMessage.length > 0) {
      const score = cleanMessage.length;
      if (score > bestMatchScore) {
        matchedItem = item;
        bestMatchScore = score;
      }
    }

 
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