import { createSlice } from '@reduxjs/toolkit';
import { sendChatMessage, transcribeAudio, processVoiceMessage } from './chatApiThunk';

const initialState = {
  loading: false,
  error: null,
  lastResponse: null,
};

const chatAPISlice = createSlice({
  name: 'chatAPI',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send chat message
      .addCase(sendChatMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.lastResponse = action.payload.replyText;
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Transcribe audio
      .addCase(transcribeAudio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transcribeAudio.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(transcribeAudio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Process voice message
      .addCase(processVoiceMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processVoiceMessage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(processVoiceMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = chatAPISlice.actions;
export default chatAPISlice.reducer;
