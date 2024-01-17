import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import userSlice from "./user-slice";
import postSlice from "./post-slice";
import commnetSlice from "./comment-slice";
import conversationSlice from "./conversation-slice";
import messageSlice from "./message-slice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        post: postSlice,
        comment: commnetSlice,
        conversation: conversationSlice,
        message: messageSlice,
    },
});

export default store;
