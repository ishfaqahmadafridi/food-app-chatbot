import { useState } from 'react';
import useChatMessages from './useChatMessages';
import useChatAPI from '../../hooks/chatbot/useChatAPI';
import useCartIntent from '../../hooks/chatbot/useCartIntent';
import useAdminActions from '../../hooks/chatbot/useAdminActions';

const useChatbot = (isAdmin) => {
  const [isLoading, setIsLoading] = useState(false);
  const { messages, setMessages, addUserMessage, addBotMessage } = useChatMessages();
  const { sendChatMessage } = useChatAPI();
  const { handleAddToCartIntent } = useCartIntent(addBotMessage);
  const { handleAdminResponse } = useAdminActions();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    const messageText = e.target.elements[0].value.trim();
    if (!messageText) return;

    addUserMessage(messageText);

    // Handle cart intent for non-admin users
    if (!isAdmin && handleAddToCartIntent(messageText)) {
      return;
    }

    setIsLoading(true);

    try {
      const replyText = await sendChatMessage(messageText);
      addBotMessage(replyText);

      // Handle admin-specific actions
      if (isAdmin) {
        await handleAdminResponse(replyText);
      }
    } catch (error) {
      console.error('Chat error:', error);
      addBotMessage("Sorry, I'm having trouble connecting. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    handleSendMessage
  };
};

export default useChatbot;
