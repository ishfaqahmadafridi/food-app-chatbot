import React from 'react';
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';

const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div 
      className={`flex gap-2.5 items-start animate-[slideIn_0.3s_ease] ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
        isUser 
          ? 'bg-green-500 text-white' 
          : 'bg-linear-to-br from-[#667eea] to-[#764ba2] text-white'
      }`}>
        {isUser ? <User size={20} /> : <Bot size={20} />}
      </div>

      <div className={`max-w-[75%] md:max-w-[85%] p-3 px-4 rounded-[15px] wrap-break-word ${
        isUser
          ? 'bg-linear-to-br from-[#667eea] to-[#764ba2] text-white rounded-br-none'
          : 'bg-white border border-gray-200 rounded-bl-none'
      }`}>
        {message.sender === 'bot' ? (
          <div className="markdown-bot-message prose prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
            >
              {message.text || 'No message'}
            </ReactMarkdown>
          </div>
        ) : (
          <p className='m-0 leading-6 whitespace-pre-line'>{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
