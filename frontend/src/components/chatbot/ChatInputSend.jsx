import {useState} from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useSelector } from 'react-redux';

const ChatInputSend = () => {
    const { isRecording } = useSelector((state) => state.voiceRecording);
    const [inputMessage] = useState('');
    const chatLoading = useSelector((state) => state.chatAPI.loading);
    return (
        <Button
            type='submit'
            disabled={chatLoading || !inputMessage.trim() || isRecording}
            variant='submit'
            size='lg'
        >
            <Send size={18} />
        </Button>
    );
};

export default ChatInputSend;
