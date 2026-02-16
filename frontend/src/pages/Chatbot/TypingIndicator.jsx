import React from 'react';
import { Bot } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <div className='message message-bot'>
      <div className='message-icon'>
        <Bot size={20} />
      </div>
      <div className='message-content'>
        <p className='typing-indicator'>
          <span></span>
          <span></span>
          <span></span>
        </p>
      </div>
    </div>
  );
};

export default TypingIndicator;
