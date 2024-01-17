import api from "../axios";

export const register = async (data) => {
    const res = await api.post("/auth/register", data);

    if (res.data.token) localStorage.setItem("token", res.data.token);

    return res;
};

export const login = async (data) => {
    const res = await api.post("/auth/login", data);

    if (res.data.token) localStorage.setItem("token", res.data.token);

    return res;
};

export const getMe = async () => {
    const res = await api.get("/auth/get-me");

    if (res.data.token) localStorage.setItem("token", res.data.token);

    return res;
};
