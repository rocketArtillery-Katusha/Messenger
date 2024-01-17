import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    conversation: null,
    conversations: [],
};

const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        getConversationsOrConversation: (state, action) => {
            state.conversation = action.payload?.conversation;
            state.conversations = action.payload?.conversations;
        },
    },
});

export const { getConversationsOrConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
