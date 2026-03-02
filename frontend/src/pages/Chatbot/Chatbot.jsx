
import ChatbotHeader from '../../components/chatbot/ChatbotHeader';
import ChatMessageList from '../../components/chatbot/ChatMessageList';
import ChatInput from '../../components/chatbot/ChatInput';

const Chatbot = () => {

  return (
    <div className='min-h-[calc(150vh-200px)] md:min-h-[calc(100vh-80px)] p-5 md:p-10  from-[#667eea] to-[#764ba2]'>
      <div className='max-w-1400px mx-auto bg-white rounded-none md:rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col h-[calc(100vh-40px)] md:h-[85vh]'>
        <ChatbotHeader />
        <ChatMessageList  />
        <ChatInput  />
      </div>
    </div>
  );
};

export default Chatbot;