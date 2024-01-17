import api from "../axios";

export const createPost = async (data) => {
    const res = await api.post("/post/create-post", data);

    return res;
};

export const getAllPosts = async () => {
    const res = await api.get("/post/get-posts");

    return res;
};

export const getMyPosts = async () => {
    const res = await api.get("/post/get-my-posts");

    return res;
};

export const getUserPosts = async (userId) => {
    const res = await api.get(`/post/get-user-posts${userId}`);

    return res;
};

export const toggleLikePost = async (postId) => {
    const res = await api.patch("/post/toggle-like", { postId });

    return res;
};
