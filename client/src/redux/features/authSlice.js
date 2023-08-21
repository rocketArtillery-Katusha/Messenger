import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
    me: null,
    user: null,
    users: [],
    friends: [],
    usersWhoSentFriendRequest: [],
    token: null,
    message: null,
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

export const socketUpdateMe = createAsyncThunk('auth/socketUpdateMe', (data) => {
    try {
        // console.log(data);
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

export const getUsers = createAsyncThunk('auth/getUsers', async () => {
    try {
        const { data } = await axios.get('auth/get-users');

        return data;

    } catch (error) {
        console.log(error);
    }

});

export const getUserById = createAsyncThunk('auth/getUserById', async (userId) => {
    try {
        const { data } = await axios.get(`auth/get-user-by-id${userId}`);

        return data;

    } catch (error) {
        console.log(error);
    }

});

export const deleteFriend = createAsyncThunk('auth/deleteFriend', async (userId) => {
    try {
        const { data } = await axios.post('auth/delete-friend', { userId });

        return data;

    } catch (error) {
        console.log(error);
    }
});

export const acceptFriend = createAsyncThunk('auth/acceptFriend', async (userId) => {
    try {
        const { data } = await axios.post('auth/accept-friend', { userId });

        return data;

    } catch (error) {
        console.log(error);
    }
});

export const getFriends = createAsyncThunk('auth/getFriends', async () => {
    try {
        const { data } = await axios.get('auth/get-friends');

        return data;

    } catch (error) {
        console.log(error);
    }
});

export const getUsersWhoSentFriendRequest = createAsyncThunk('auth/getFriendRequestUsers', async () => {
    try {
        const { data } = await axios.get('auth/get-friend-request-users');

        return data;

    } catch (error) {
        console.log(error);
    }
});

export const sendFriendRequest = createAsyncThunk('user/sendFriendRequest', async (userId) => {
    try {
        const { data } = await axios.post('auth/friend-request', { userId });

        return data;

    } catch (error) {
        console.log(error);
    }
});

export const cancelFriendRequest = createAsyncThunk('auth/cancelFriendRequest', async (userId) => {
    try {
        const { data } = await axios.post('auth/friend-unsubscribe', { userId });

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
            state.me = null;
            state.token = null;
            state.isLoading = false;

        },
    },
    extraReducers: {


        [socketUpdateMe.pending]: (state) => {
            state.isLoading = true;
        },
        [socketUpdateMe.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.me = action.payload?.updatedUser;
            if (action.payload.addedFriend) {
                state.friends.push(action.payload.addedFriend);
                state.usersWhoSentFriendRequest.pop((user) => user._id === action.payload.addedFriend._id);
            }
            action.payload.deletedFriend && state.friends.pop((user) => user._id === action.payload.deletedFriend._id);
            action.payload.deletedRequest && state.usersWhoSentFriendRequest.pop((user) => user._id === action.payload.deletedRequest._id);
            action.payload.newRequest && state.usersWhoSentFriendRequest.push(action.payload.newRequest);
        },
        [socketUpdateMe.rejected]: (state) => {
            state.isLoading = false;
        },


        [registerUser.pending]: (state) => {
            state.isLoading = true;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.me = action.payload?.newUser;
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
            state.me = action.payload?.user;
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
            state.me = action.payload?.user;
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
            state.me = action.payload?.user;
            state.message = action.payload?.message;
        },
        [getMe.rejected]: (state) => {
            state.isLoading = false;
        },


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
            state.user = action?.payload.user;
        },
        [getUserById.rejected]: (state) => {
            state.isLoading = false;
        },



        [deleteFriend.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteFriend.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.me = action.payload.me;
            state.user = action.payload.user;
            state.friends.pop((user) => user._id === action.payload.user._id);
        },
        [deleteFriend.rejected]: (state) => {
            state.isLoading = false;
        },


        [acceptFriend.pending]: (state) => {
            state.isLoading = true;
        },
        [acceptFriend.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.me = action.payload.me;
            state.user = action.payload.user;
            state.usersWhoSentFriendRequest.pop((user) => user._id === action.payload.user._id)
            state.friends.push(action.payload.user);
        },
        [acceptFriend.rejected]: (state) => {
            state.isLoading = false;
        },


        [getFriends.pending]: (state) => {
            state.isLoading = true;
        },
        [getFriends.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.friends = action?.payload;
        },
        [getFriends.rejected]: (state) => {
            state.isLoading = false;
        },


        [sendFriendRequest.pending]: (state) => {
            state.isLoading = true;
        },
        [sendFriendRequest.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        [sendFriendRequest.rejected]: (state) => {
            state.isLoading = false;
        },


        [cancelFriendRequest.pending]: (state) => {
            state.isLoading = true;
        },
        [cancelFriendRequest.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        [cancelFriendRequest.rejected]: (state) => {
            state.isLoading = false;
        },


        [getUsersWhoSentFriendRequest.pending]: (state) => {
            state.isLoading = true;
        },
        [getUsersWhoSentFriendRequest.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.usersWhoSentFriendRequest = action?.payload;
        },
        [getUsersWhoSentFriendRequest.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;