import api from "../axios";

export const createComment = async (data, postId) => {
    const res = await api.post("/comment/create-comment", { data, postId });

    return res;
};

export const getAllCommets = async (postId) => {
    const res = await api.get(`/comment/get-comments${postId}`);

    return res;
};
