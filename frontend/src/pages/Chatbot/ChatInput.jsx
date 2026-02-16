import React from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import  { Button} from '@/components/ui/button';

const ChatInput = ({ 
  inputMessage, 
  setInputMessage, 
  onSendMessage, 
  isLoading, 
  isRecording,
  onStartRecording,
  onStopRecording
}) => {
  return (
    <form className='p-4 bg-white border-t border-gray-200 flex gap-2 items-center' onSubmit={onSendMessage}>
      <Input
        type='text'
        placeholder='Type your message...'
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        disabled={isLoading || isRecording}
        className='flex-1 rounded-full px-4 py-2 h-10'
      />
      <Button 
        type='button' 
        className={`w-9 h-9 rounded-full border-none text-white cursor-pointer flex items-center justify-center transition-all shrink-0 ${
          isRecording
            ? 'bg-linear-to-br from-red-500 to-red-700 animate-[pulse_1.5s_infinite]'
            : 'bg-linear-to-br from-green-500 to-green-600 hover:scale-105 hover:shadow-[0_4px_12px_rgba(40,167,69,0.4)]'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        onClick={isRecording ? onStopRecording : onStartRecording}
        disabled={isLoading}
      >
        {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
      </Button>
      <Button 
        type='submit' 
        disabled={isLoading || !inputMessage.trim() || isRecording}
        variant='submit'
        size = 'lg'
      >
        <Send size={18} />
      </Button>
    </form>
  );
};

export default ChatInput;
