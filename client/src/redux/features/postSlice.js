import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
    posts: [],
    comments: [],
    message: null,
    loading: false
}

export const createPost = createAsyncThunk('post/createPost', async (postData) => {
    try {
        const { data } = await axios.post('/post/create-post', postData);

        return data;
    } catch (error) {
        console.log(error);
    }
});

export const getAllPosts = createAsyncThunk('post/getAllPosts', async () => {
    try {
        const { data } = await axios.get('/post/get-all-posts');

        return data;

    } catch (error) {
        console.log(error);
    }
});

export const likePost = createAsyncThunk('post/likePost', async (postId) => {
    try {
        const { data } = await axios.patch(`/post/like${postId}`);

        return data;

    } catch (error) {
        console.log(error);
    }
});

export const createComment = createAsyncThunk('post/createComment', async (commentData) => {
    try {
        const { data } = await axios.post('/post/create-comment', commentData);

        return data;

    } catch (error) {
        console.log(error);
    }
});

export const getComments = createAsyncThunk('post/getComments', async (postId) => {
    try {
        const { data } = await axios.get(`/post/get-comments${postId}`);

        return data;

    } catch (error) {
        console.log(error);
    }
});

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: {

        [createPost.pending]: (state) => {
            state.loading = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts.unshift(action.payload);
        },
        [createPost.rejected]: (state) => {
            state.loading = false;
        },

        [getAllPosts.pending]: (state) => {
            state.loading = true;
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        },
        [getAllPosts.rejected]: (state) => {
            state.loading = false;
        },

        [likePost.pending]: (state) => {
            state.loading = true;
        },
        [likePost.fulfilled]: (state, action) => {
            state.loading = false;
            const index = state.posts.findIndex(
                (post) => post._id === action.payload._id,
            );
            state.posts[index] = action.payload;
        },
        [likePost.rejected]: (state) => {
            state.loading = false;
        },

        [createComment.pending]: (state) => {
            state.loading = true;
        },
        [createComment.fulfilled]: (state, action) => {
            state.loading = false;
            state.comments.unshift(action.payload.newComment);
            const index = state.posts.findIndex(
                (post) => post._id === action.payload.updatedPost._id,
            );
            state.posts[index] = action.payload.updatedPost;
        },
        [createComment.rejected]: (state) => {
            state.loading = false;
        },

        [getComments.pending]: (state) => {
            state.loading = true;
        },
        [getComments.fulfilled]: (state, action) => {
            state.loading = false;
            state.comments = action.payload;
        },
        [getComments.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default postSlice.reducer;
