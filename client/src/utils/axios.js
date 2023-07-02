import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
});

instance.interceptors.request.use((req) => {
    req.headers.Authorization = window.localStorage.getItem('token');

    return req;
});


export default instance;