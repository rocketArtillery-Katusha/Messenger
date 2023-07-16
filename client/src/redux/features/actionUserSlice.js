import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
    users: [],
    user: null,
    isLoading: false,
}

export const getUsers = createAsyncThunk('users/getUsers', async () => {

    const { data } = await axios.get('users/get-users');

    return data;

});

export const getUserById = createAsyncThunk('users/getUserById', async (userId) => {

    const { data } = await axios.get(`users/get-user-by-id${userId}`);

    return data;

});

const actionUserSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.isLoading = true;
        },
        [getUsers.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        },
        [getUsers.rejected]: (state) => {
            state.isLoading = false;
        },

        [getUserById.pending]: (state) => {
            state.isLoading = true;
        },
        [getUserById.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
        },
        [getUserById.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});

export default actionUserSlice.reducer;