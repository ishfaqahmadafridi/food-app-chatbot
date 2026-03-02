
import ChatInputText from './ChatInputText';
import ChatInputVoice from './ChatInputVoice';
import ChatInputSend from './ChatInputSend';
import { StoreContext } from '../../context/StoreContext';


const ChatInput = () => {

  return (
    <form className='p-4 bg-white border-t border-gray-200 flex gap-2 items-center'>
      <ChatInputText  />
      <ChatInputVoice />
      <ChatInputSend />
    </form>
  );
};

export default ChatInput;
