import api from '../../services/api';

const useVoiceChat = (setInputMessage, setMessages, setIsLoading) => {
  const processVoiceMessage = async (transcribedText) => {
    if (!transcribedText) return;

    setIsLoading(true);
    setInputMessage(transcribedText);

    try {
      // Add user message
      const userMessage = { id: Date.now(), text: transcribedText, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);

      // Get chatbot response
      const chatResponse = await api.post('/chatbot/', { message: transcribedText });
      
      const botMessage = {
        id: Date.now() + 1,
        text: chatResponse.data.reply || "I couldn't understand that. Try typing.",
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Voice chat error:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Sorry, I couldn't process your voice. Please type instead.",
        sender: 'bot'
      }]);
    } finally {
      setIsLoading(false);
      setInputMessage('');
    }
  };

  return { processVoiceMessage };
};

export default useVoiceChat;
