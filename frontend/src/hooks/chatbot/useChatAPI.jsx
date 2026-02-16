import api from '../../services/api';

const useChatAPI = () => {
  const sendChatMessage = async (messageText) => {
    const response = await api.post('/chatbot/', { message: messageText });
    const data = await response.data;
    return data.reply || data.error || 'No response';
  };

  return { sendChatMessage };
};

export default useChatAPI;
