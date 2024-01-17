import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: null,
    message: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            const { user } = action.payload;
            state.user = user;

            state.message = action.payload?.message;

            if (!user) {
                state.isAuth = false;
            } else {
                state.isAuth = true;
            }
        },

        logout: (state) => {
            state.isAuth = false;
            state.user = null;
        },
    },
});

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
