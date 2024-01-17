import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        getCommentsOrComment: (state, action) => {
            if (action.payload.comment) {
                state.comments.unshift(action.payload.comment);
            } else {
                state.comments = action.payload?.comments;
            }
        },
    },
});

export const { getCommentsOrComment } = commentSlice.actions;

export default commentSlice.reducer;
