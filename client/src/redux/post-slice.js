import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    post: null,
    posts: [],
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        likePost: (state, action) => {
            const index = state.posts.findIndex((post) => post.id === action.payload.post.id);

            state.posts[index].likes = action.payload.post.likes;
        },
        getPostsOrPost: (state, action) => {
            if (action.payload.newPost) {
                state.posts.unshift(action.payload.newPost);
            } else {
                state.post = action.payload?.post;
                state.posts = action.payload?.posts;
            }
        },
    },
});

export const { getPostsOrPost, likePost } = postSlice.actions;

export default postSlice.reducer;
