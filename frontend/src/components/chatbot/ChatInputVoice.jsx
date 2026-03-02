import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { setRecording, resetRecording } from '../../redux/features/chatbot/voiceRecordingSlice';
import { processVoiceMessage } from '../../redux/features/chatbot/chatApi/chatApiThunk';
import toast from 'react-hot-toast';

const ChatInputVoice = () => {
  const dispatch = useDispatch();
  const isRecording = useSelector((state) => state.voiceRecording.isRecording);
  const chatLoading = useSelector((state) => state.chatAPI.loading);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      mediaRecorderRef.current = new window.MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        try {
          await dispatch(processVoiceMessage(audioBlob)).unwrap();
        } catch (error) {
          console.error('Voice processing error:', error);
        }
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        dispatch(resetRecording());
      };
      mediaRecorderRef.current.start();
      dispatch(setRecording(true));
    } catch (error) {
      console.error('Microphone error:', error);
      toast.error('Could not access microphone. Check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      dispatch(setRecording(false));
    }
  };

  return (
    <Button
      type='button'
      className={`w-9 h-9 rounded-full border-none text-white cursor-pointer flex items-center justify-center transition-all shrink-0 ${
        isRecording
          ? 'bg-linear-to-br from-red-500 to-red-700 animate-[pulse_1.5s_infinite]'
          : 'bg-linear-to-br from-green-500 to-green-600 hover:scale-105 hover:shadow-[0_4px_12px_rgba(40,167,69,0.4)]'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={isRecording ? stopRecording : startRecording}
      disabled={chatLoading}
    >
      {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
    </Button>
  );
};

export default ChatInputVoice;
