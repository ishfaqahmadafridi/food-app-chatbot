import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const chatMessagesSlice = createSlice({
  name: 'chatMessages',
  initialState,
  reducers: {
    addUserMessage: (state, action) => {
      const userMessage = {
        id: Date.now(),
        text: action.payload,
        sender: 'user'
      };
      state.messages.push(userMessage);
    },
    addBotMessage: (state, action) => {
      const botMessage = {
        id: Date.now() + 1,
        text: action.payload,
        sender: 'bot'
      };
      state.messages.push(botMessage);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setWelcomeMessage: (state, action) => {
      const isAdmin = action.payload;
      const welcomeMessage = isAdmin 
        ? {
            id: 1,
            text: "Hello Admin! I'm your RestoBot assistant. You can manage items through chat:\n\n🔹 Add item: 'add item [name] price [amount] category [category] description [text]'\n🔹 Remove item: 'remove [item name]'\n🔹 Update item: 'update [item name] price [amount]'\n🔹 List items: 'list items'\n\nOr ask me general questions about the menu!",
            sender: 'bot'
          }
        : {
            id: 1,
            text: "Hello! I'm your RestoBot assistant. How can I help you today?",
            sender: 'bot'
          };
      state.messages = [welcomeMessage];
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { 
  addUserMessage, 
  addBotMessage, 
  setMessages, 
  setWelcomeMessage,
  clearMessages 
} = chatMessagesSlice.actions;

export default chatMessagesSlice.reducer;
