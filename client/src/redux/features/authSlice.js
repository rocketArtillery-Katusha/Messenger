import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
    user: null,
    token: null,
    message: null,
    test: null,
    isLoading: false,
}

export const registerUser = createAsyncThunk('auth/registerUser', async (userData) => {
    try {
        let messageError = null;
        const { data } = await axios.post('/auth/register', userData).catch((err) => messageError = err.response.data);

        if (data && data.token) {
            window.localStorage.setItem('token', data.token);

            return data;

        } else if (messageError) {

            return messageError;
        }

    } catch (error) {
        console.log(error);
    }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (userData) => {
    try {
        let messageError = null;
        const { data } = await axios.post('/auth/login', userData).catch((err) => messageError = err.response.data);

        if (data && data.token) {
            window.localStorage.setItem('token', data.token);

            return data;

        } else if (messageError) {

            return messageError;
        }

    } catch (error) {
        console.log(error);
    }
});

export const updateUserInfo = createAsyncThunk('auth/updateUserInfo', async (updatedUserData) => {
    try {
        const { data } = await axios.put('/auth/update-user-info', updatedUserData);

        return data;

    } catch (error) {
        console.log(error);
    }
})

export const getMe = createAsyncThunk('auth/getMe', async () => {
    try {
        const { data } = await axios.get('/auth/get-me');

        return data;

    } catch (error) {
        console.log(error);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoading = false;

        },
    },
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.isLoading = true;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.user = action.payload?.newUser;
            state.token = action.payload?.token;
            state.message = action.payload?.message;
        },
        [registerUser.rejected]: (state) => {
            state.isLoading = false;
        },

        [loginUser.pending]: (state) => {
            state.isLoading = true;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.user = action.payload?.user;
            state.message = action.payload?.message;
        },
        [loginUser.rejected]: (state) => {
            state.isLoading = false;
        },

        [updateUserInfo.pending]: (state) => {
            state.isLoading = true;
        },
        [updateUserInfo.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.user = action.payload?.user;
            state.message = action.payload?.message;
        },
        [updateUserInfo.rejected]: (state) => {
            state.isLoading = false;
        },

        [getMe.pending]: (state) => {
            state.isLoading = true;
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.user = action.payload?.user;
            state.message = action.payload?.message;
        },
        [getMe.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

export default authSlice.reducer;
