import api from "../axios";

export const createMessage = async (data) => {
    const res = await api.post("/message/create-message", data);

    return res;
};

export const getMessages = async (conversationId) => {
    const res = await api.get(`/message/get-messages${conversationId}`);

    return res;
};
