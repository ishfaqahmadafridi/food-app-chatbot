import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { handleCartIntent } from '../../redux/features/chatbot/cartIntent/cartIntentThunk';
import { sendChatMessage } from '../../redux/features/chatbot/chatApi/chatApiThunk';
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';
import toast from 'react-hot-toast';

const ChatInputText = () => {
    const dispatch = useDispatch();
    const { isAdmin } = useSelector((state) => state.adminStatus);
    const [inputMessage, setInputMessage] = useState('');
    const chatLoading = useSelector((state) => state.chatAPI.loading);
    const { addToCart, foodItems } = useContext(StoreContext);
    const { refreshFoodItems } = useContext(StoreContext);


    const handleAdminResponse = async (replyText) => {
        if (!replyText.includes('✅')) return;
        await refreshFoodItems();
        if (replyText.includes('added')) {
            toast.success('Item added!');
        } else if (replyText.includes('removed')) {
            toast.success('Item removed!');
        } else if (replyText.includes('updated')) {
            toast.success('Item updated!');
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const messageText = inputMessage.trim();
        if (!messageText) return;
        setInputMessage('');
        if (!isAdmin) {
            const result = await dispatch(handleCartIntent({ messageText, foodItems, addToCart })).unwrap();
            if (result.handled) return;
        }
        try {
            const response = await dispatch(sendChatMessage({ messageText, isAdmin })).unwrap();
            if (isAdmin && response.replyText && handleAdminResponse) {
                await handleAdminResponse(response.replyText);
            }
        } catch (error) {
            console.error('Chat error:', error);
        }
    };

    return (
        <Input
            type='text'
            placeholder='Type your message...'
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={chatLoading}
            className='flex-1 rounded-full px-4 py-2 h-10'
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(e)}
        />
    );
};

export default ChatInputText;
