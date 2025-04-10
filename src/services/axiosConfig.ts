import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {errorNotification} from "@/services/notificationUtils.tsx";
import { removeItem } from "./localStorageService";

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
})

let refreshTokenPromise : Promise<any> | null = null;

api.interceptors.response.use(
    (response) => response,
    async (error : AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry? : boolean};

        if (error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;

            if (!refreshTokenPromise) {
                refreshTokenPromise = api.post(`/auth/refresh-token`)
                    .finally(() => {
                        refreshTokenPromise = null;
                    });
            }

            try {
                await refreshTokenPromise;
                return api(originalRequest);
            }catch (refreshError){
                errorNotification("Session Expired","Please Login again.")
                removeItem("user");
                window.location.href = "/login";
                console.log(refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
)


export default api;
