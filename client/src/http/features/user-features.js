import api from "../axios";

export const updateUserInfo = async (data) => {
    const res = await api.put("/user/update-user-info", data);

    return res;
};

export const getUsers = async () => {
    const res = await api.get("/user/get-users");

    return res;
};

export const getUserById = async (userId) => {
    const res = await api.get(`/user/get-user-by-id${userId}`);

    return res;
};

export const getFriends = async () => {
    const res = await api.get("/user/get-friends");

    return res;
};

export const getSendersRequestFriend = async () => {
    const res = await api.get("/user/get-senders-request-friend");

    return res;
};

export const toggleFrined = async (userId) => {
    const res = await api.patch("/user/toggle-friend", { userId });

    return res;
};

export const toggleRequestFriend = async (userId) => {
    const res = await api.patch("/user/toggle-request-friend", { userId });

    return res;
};
