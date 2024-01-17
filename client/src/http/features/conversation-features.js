import api from "../axios";

export const createConversation = async (userId) => {
    const res = await api.post("/conversation/create-conversation", { userId });

    return res;
};

export const getConversationById = async (userId) => {
    const res = await api.get(`/conversation/get-conversation:${userId}`);

    return res;
};

export const getConversations = async () => {
    const res = await api.get("/conversation/get-conversations");

    return res;
};
