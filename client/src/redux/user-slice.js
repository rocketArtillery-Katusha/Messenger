import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    otherUser: null,
    users: null,
    friends: null,
    sendersRequestFrined: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUsersOrUser: (state, action) => {
            state.otherUser = action.payload?.otherUser;
            state.users = action.payload?.users;
            state.friends = action.payload?.friends;
            state.sendersRequestFrined = action.payload?.sendersRequestFrined;
        },
    },
});

export const { getUsersOrUser } = userSlice.actions;

export default userSlice.reducer;
