import api from '../../services/api';

const useVoiceToText = () => {
  const transcribeAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.webm');

    const response = await api.post('/chatbot/voice-to-text/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const transcribedText = response.data.text?.trim() || '';
    return transcribedText;
  };

  return { transcribeAudio };
};

export default useVoiceToText;
