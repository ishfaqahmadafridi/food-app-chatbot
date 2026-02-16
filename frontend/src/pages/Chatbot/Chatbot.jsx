import React, { useState } from 'react';
import ChatbotHeader from './ChatbotHeader';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import useAdminStatus from '../../hooks/chatbot/useAdminStatus';
import useChatbot from '../../hooks/chatbot/useChatbot';
import useVoiceRecording from '../../hooks/chatbot/useVoiceRecording';
import useWelcomeMessage from '../../hooks/chatbot/useWelcomeMessage';

const Chatbot = () => {
  const [inputMessage, setInputMessage] = useState('');
  const isAdmin = useAdminStatus();
  const { messages, setMessages, isLoading, setIsLoading, handleSendMessage } = useChatbot(isAdmin);
  const { isRecording, startRecording, stopRecording } = useVoiceRecording(
    setInputMessage, 
    setMessages, 
    setIsLoading
  );

  useWelcomeMessage(isAdmin, setMessages);

  return (
    <div className='min-h-[calc(150vh-200px)] md:min-h-[calc(100vh-80px)] p-5 md:p-10  from-[#667eea] to-[#764ba2]'>
      <div className='max-w-1400px mx-auto bg-white rounded-none md:rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col h-[calc(100vh-40px)] md:h-[85vh]'>
        <ChatbotHeader isAdmin={isAdmin} />
        
        <ChatMessageList messages={messages} isLoading={isLoading} />
        
        <ChatInput 
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          isRecording={isRecording}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
        />
      </div>
    </div>
  );
};

export default Chatbot;