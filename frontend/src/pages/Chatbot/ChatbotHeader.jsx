import React from 'react';
import { Bot } from 'lucide-react';

const ChatbotHeader = ({ isAdmin }) => {
  return (
    <div className='bg-linear-to-br from-[#667eea] to-[#764ba2] text-white p-5 flex items-center gap-4'>
      <Bot size={32} />
      <h2 className='m-0 text-xl md:text-2xl font-semibold'>RestoBot Assistant</h2>
      {isAdmin && (
        <span className='bg-linear-to-br from-[#667eea] to-[#764ba2] text-white px-3 py-1 rounded-[20px] text-xs font-bold ml-2.5'>
          ADMIN MODE
        </span>
      )}
    </div>
  );
};

export default ChatbotHeader;
