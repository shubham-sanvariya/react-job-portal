import axios from "axios";
import {errorNotification} from "@/services/notificationUtils.tsx";
import api from "@/services/axiosConfig.ts";

const BASE_URL = "/notifications"

export const getAllNotificationByUserId = async (userId: number) => {
    try {
        const res = await api.get(`${BASE_URL}/unread/${userId}`);
        return res.data;
    } catch (err: unknown) {
        let errMsg: string;
        if (axios.isAxiosError(err) && err.response?.data?.errorMessage) {
            errMsg = err.response?.data?.errorMessage
            console.log(errMsg);
        } else {
            errMsg = "An unexpected error occurred"
            console.log(errMsg, err);
        }
        errorNotification("Failed to fetch notifications", errMsg);
    }
}

export const readNotificationById = async (id: number) => {
    try {
        const res = await api.patch(`${BASE_URL}/read/${id}`);
        return res.data;
    } catch (err: unknown) {
        let errMsg: string;
        if (axios.isAxiosError(err) && err.response?.data?.errorMessage) {
            errMsg = err.response?.data?.errorMessage
            console.log(errMsg);
        } else {
            errMsg = "An unexpected error occurred"
            console.log(errMsg, err);
        }
        errorNotification("Failed to close notification", errMsg);
    }
}
