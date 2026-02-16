import useMediaRecorder from '../../hooks/chatbot/useMediaRecorder';
import useVoiceToText from './useVoiceToText';
import useVoiceChat from '../../hooks/chatbot/useVoiceChat';

const useVoiceRecording = (setInputMessage, setMessages, setIsLoading) => {
  const { isRecording, startRecording: startMediaRecording, stopRecording } = useMediaRecorder();
  const { transcribeAudio } = useVoiceToText();
  const { processVoiceMessage } = useVoiceChat(setInputMessage, setMessages, setIsLoading);

  const handleAudioProcessing = async (audioBlob) => {
    try {
      const transcribedText = await transcribeAudio(audioBlob);
      await processVoiceMessage(transcribedText);
    } catch (error) {
      console.error('Audio processing error:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Sorry, I couldn't process your voice. Please type instead.",
        sender: 'bot'
      }]);
    }
  };

  const startRecording = async () => {
    await startMediaRecording(handleAudioProcessing);
  };

  return {
    isRecording,
    startRecording,
    stopRecording
  };
};

export default useVoiceRecording;
