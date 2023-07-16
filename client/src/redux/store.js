import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import postSlice from './features/postSlice';
import actionUserSlice from './features/actionUserSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
        actionsUsers: actionUserSlice,
    },
});