import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import postSlice from './features/postSlice';
import socketSlice from './features/socketSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
        socket: socketSlice,
    },
});