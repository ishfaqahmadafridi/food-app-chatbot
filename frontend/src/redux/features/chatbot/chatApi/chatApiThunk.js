import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../services/api';
import { addUserMessage, addBotMessage } from '../chatMessagesSlice';


export const sendChatMessage = createAsyncThunk(
  'chatAPI/sendMessage',
  async ({ messageText, isAdmin }, { dispatch, rejectWithValue }) => {
    try {
      
      dispatch(addUserMessage(messageText));

      const response = await api.post('/chatbot/', { message: messageText });
      const replyText = response.data.reply || response.data.error || 'No response';

      dispatch(addBotMessage(replyText));

      return { replyText, isAdmin };
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = "Sorry, I'm having trouble connecting. Try again.";
      dispatch(addBotMessage(errorMessage));
      return rejectWithValue(error.message);
    }
  }
);


export const transcribeAudio = createAsyncThunk(
  'chatAPI/transcribeAudio',
  async (audioBlob, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.webm');

      const response = await api.post('/chatbot/voice-to-text/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data.text?.trim() || '';
    } catch (error) {
      console.error('Transcription error:', error);
      return rejectWithValue(error.message);
    }
  }
);


export const processVoiceMessage = createAsyncThunk(
  'chatAPI/processVoice',
  async (audioBlob, { dispatch, rejectWithValue }) => {
    try {
     
      const transcribedText = await dispatch(transcribeAudio(audioBlob)).unwrap();
      
      if (!transcribedText) {
        throw new Error('No transcription received');
      }

    
      await dispatch(sendChatMessage({ messageText: transcribedText, isAdmin: false })).unwrap();

      return transcribedText;
    } catch (error) {
      console.error('Voice processing error:', error);
      const errorMessage = "Sorry, I couldn't process your voice. Please type instead.";
      dispatch(addBotMessage(errorMessage));
      return rejectWithValue(error.message);
    }
  }
);