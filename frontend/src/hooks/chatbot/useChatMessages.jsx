import { useState } from 'react';

const useChatMessages = () => {
  const [messages, setMessages] = useState([]);

  const addUserMessage = (text) => {
    const userMessage = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    return userMessage;
  };

  const addBotMessage = (text) => {
    const botMessage = { id: Date.now() + 1, text, sender: 'bot' };
    setMessages(prev => [...prev, botMessage]);
    return botMessage;
  };

  return {
    messages,
    setMessages,
    addUserMessage,
    addBotMessage
  };
};

export default useChatMessages;
