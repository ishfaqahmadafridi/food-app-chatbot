import { configureStore } from '@reduxjs/toolkit'
import adminAccessReducer from './features/admin/adminAccess/adminAcessSlice'
import formReducer from './features/admin/fromStateSlice'
import itemManagementReducer from './features/admin/itemManagement/itemManagementSlice'
import imagePreviewReducer from './features/admin/imagePreviewSlice'
import adminLogoutReducer from './features/admin/adminLogout/adminLogoutSlice'
import chatMessagesReducer from './features/chatbot/chatMessagesSlice'
import chatAPIReducer from './features/chatbot/chatApi/chatAPISlice'
import voiceRecordingReducer from './features/chatbot/voiceRecordingSlice'
import cartIntentReducer from './features/chatbot/cartIntent/cartIntentSlice'
import adminStatusReducer from './features/chatbot/adminStatus/adminStatusSlice'
import contactFormReducer from './features/contact/contactFormSlice'
import loginStateReducer from './features/auth/loginStateSlice'
import loginFormReducer from './features/auth/loginFormSlice'
import authReducer from './features/auth/authThunk/authSlice'
import profileDataReducer from './features/profile/profileData/profileDataSlice'
import menuReducer from './features/menu/menuSlice'
import profileImage from './features/profile/profileImageThunk/profileImageSlice'

export const store = configureStore({
  reducer: {
    // Admin reducers
    adminAccess: adminAccessReducer,
    form: formReducer,
    items: itemManagementReducer,
    image: imagePreviewReducer,
    adminLogout: adminLogoutReducer,
    // Chatbot reducers
    chatMessages: chatMessagesReducer,
    chatAPI: chatAPIReducer,
    voiceRecording: voiceRecordingReducer,
    cartIntent: cartIntentReducer,
    adminStatus: adminStatusReducer,
    // Contact reducers
    contactForm: contactFormReducer,
    // Auth reducers
    loginState: loginStateReducer,
    loginForm: loginFormReducer,
    auth: authReducer,
    // Profile reducers
    profileData: profileDataReducer,
    profileImage: profileImage,
    // Menu reducers
    menu: menuReducer,
  },
})