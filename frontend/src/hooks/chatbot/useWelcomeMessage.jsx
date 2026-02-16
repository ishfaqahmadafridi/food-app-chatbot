import { useEffect } from 'react';

const useWelcomeMessage = (isAdmin, setMessages) => {
  useEffect(() => {
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
    
    setMessages([welcomeMessage]);
  }, [isAdmin, setMessages]);
};

export default useWelcomeMessage;
