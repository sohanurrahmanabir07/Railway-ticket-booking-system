import axios from 'axios';
import { useSelector } from 'react-redux';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    timeout: 5000,
});

api.interceptors.request.use(config => {
    // const token = localStorage.getItem('token');

    const token=useSelector((state)=>state.var.access_token)




    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

api.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 401) {
            try {
                const refreshToken = useSelector((state)=>state.var.refresh_token)
                const response = await axios.post('/', { token: refreshToken });

                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    error.config.headers.Authorization = `Bearer ${response.data.token}`;
                    return api(error.config); // Retry original request
                }
            } catch (err) {
                // Refresh token failed; log out user
                localStorage.clear();
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
