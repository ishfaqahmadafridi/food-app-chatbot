import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  isRecording: false,
  audioChunks: [],
  mediaRecorder: null,
  stream: null,
  error: null,
};

const voiceRecordingSlice = createSlice({
  name: 'voiceRecording',
  initialState,
  reducers: {
    setRecording: (state, action) => {
      state.isRecording = action.payload;
    },
    setAudioChunks: (state, action) => {
      state.audioChunks = action.payload;
    },
    addAudioChunk: (state, action) => {
      state.audioChunks.push(action.payload);
    },
    clearAudioChunks: (state) => {
      state.audioChunks = [];
    },
    setError: (state, action) => {
      state.error = action.payload;
      if (action.payload) {
        toast.error('Could not access microphone. Check permissions.');
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    resetRecording: (state) => {
      state.isRecording = false;
      state.audioChunks = [];
      state.error = null;
    },
  },
});

export const {
  setRecording,
  setAudioChunks,
  addAudioChunk,
  clearAudioChunks,
  setError,
  clearError,
  resetRecording,
} = voiceRecordingSlice.actions;

export default voiceRecordingSlice.reducer;
