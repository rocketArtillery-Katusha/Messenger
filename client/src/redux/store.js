import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import postSlice from './features/postSlice';
import profileSlice from './features/profileSlice';


export const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
        profile: profileSlice
    },
});