import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        getMessagesOrMessage: (state, action) => {
            if (action.payload.message) {
                state.messages.push(action.payload.message);
            } else {
                state.messages = action.payload?.messages;
            }
        },
    },
});

export const { getMessagesOrMessage } = messageSlice.actions;

export default messageSlice.reducer;
