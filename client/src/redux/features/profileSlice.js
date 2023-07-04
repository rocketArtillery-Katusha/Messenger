import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
    myPosts: null,
    message: null,
    isLoading: false,
}

export const getMyPosts = createAsyncThunk('profile/getMyPosts', async (userId) => {

    const { data } = axios.get(`profile/get-my-posts${userId}`);

    return data;

});

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: {

        [getMyPosts.pending]: (state) => {
            state.isLoading = false;
        },
        [getMyPosts.fulfilled]: (state, action) => {
            state.isLoading = true;
            state.myPosts = action.payload?.myPosts;
            state.message = action.payload?.message;
        },
        [getMyPosts.rejected]: (state) => {
            state.isLoading = true;
        }
    },
});

export default profileSlice.reducer;
