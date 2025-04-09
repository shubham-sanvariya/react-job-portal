import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {errorNotification} from "@/services/notificationServices.tsx";

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
})

api.interceptors.response.use(
    response => response,
    async (error : AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry? : boolean};

        if (error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;

            try {
                await api.post(`/auth/refresh-token`);
                return api(originalRequest);
            }catch (refreshError){
                errorNotification("Session Expired","Please Login again.")
                window.location.href = "/login";
                console.log(refreshError);
            }
        }

        return Promise.reject(error);
    }
)


export default api;
