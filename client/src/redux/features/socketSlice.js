import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
    conversations: [],
    messages: [],
    isLoading: false,
}

export const createConversation = createAsyncThunk('conversation/createConversation', async (receiverId) => {
    try {
        const { data } = await axios.post('conversation/create-conversation', { receiverId });

        return data;

    } catch (error) {
        console.log(error);
    }
});

export const updateMessageState = createAsyncThunk('conversation/updateMessageState', (data) => {
    try {
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const getConversations = createAsyncThunk('conversation/getConversations', async () => {
    try {
        const { data } = await axios.get('conversation//get-conversations');

        return data;

    } catch (error) {
        console.log(error);
    }
});

export const createConversationMessage = createAsyncThunk('conversation/createConversationMessage', async (messageData) => {
    try {
        const { data } = await axios.post('conversation/create-message', messageData);

        return data;

    } catch (error) {
        console.log(error);
    }
})

export const getConversationMessages = createAsyncThunk('conversation/getConversationMessages', async (conversationId) => {
    try {
        const { data } = await axios.get(`conversation/get-messages${conversationId}`);

        return data;

    } catch (error) {
        console.log(error);
    }
});

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {},
    extraReducers: {

        [createConversation.pending]: (state) => {
            state.isLoading = true;
        },
        [createConversation.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.conversations.push(action.payload)
        },
        [createConversation.rejected]: (state) => {
            state.isLoading = false;
        },


        [updateMessageState.pending]: (state) => {
            state.isLoading = true;
        },
        [updateMessageState.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.messages.push(action.payload)
        },
        [updateMessageState.rejected]: (state) => {
            state.isLoading = false;
        },


        [getConversations.pending]: (state) => {
            state.isLoading = true;
        },
        [getConversations.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.conversations = action?.payload;
        },
        [getConversations.rejected]: (state) => {
            state.isLoading = false;
        },


        [createConversationMessage.pending]: (state) => {
            state.isLoading = true;
        },
        [createConversationMessage.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.messages.push(action.payload);
        },
        [createConversationMessage.rejected]: (state) => {
            state.isLoading = false;
        },


        [getConversationMessages.pending]: (state) => {
            state.isLoading = true;
        },
        [getConversationMessages.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.messages = action?.payload;
        },
        [getConversationMessages.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});

export default socketSlice.reducer;