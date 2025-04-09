
import axios from "axios";
import {ProfileType} from "@/types/profileType.ts";
import {errorNotification} from "@/services/notificationServices.tsx";
import api from "@/services/axiosConfig.ts";

const base_URL = "http://localhost:8080/profiles"

export const getProfile = async ( id: number, notificationMessage : string) => {
    try {
        const res = await api.get(`${base_URL}/${id}`);
        return res.data;
    }catch (err : unknown){
        let errMsg: string;
        if (axios.isAxiosError(err) && err.response?.data?.errorMessage) {
            errMsg = err.response?.data?.errorMessage
            console.log(errMsg);
        } else {
            errMsg = "An unexpected error occurred"
            console.log(errMsg, err);
        }
        errorNotification(notificationMessage, errMsg);
    }
}

export const getAllProfiles = async (page = 0, size = 5, sort? :string) => {
    try {
        let params : Record<string, number | string> = { page, size };

        if (sort !== undefined){
            params = {...params,sort}
        }
        const res = await api.get(base_URL, { params });
        return res.data;
    }catch (err : unknown){
        let errMsg: string;
        if (axios.isAxiosError(err) && err.response?.data?.errorMessage) {
            errMsg = err.response?.data?.errorMessage
            console.log(errMsg);
        } else {
            errMsg = "An unexpected error occurred"
            console.log(errMsg, err);
        }
        errorNotification("Failed to fetch all Talents", errMsg);
    }
}

export const updateProfile = async (profile : ProfileType) => {
    try {
        const res = await api.put(`${base_URL}/update`,profile);
        return res.data;
    }catch (err : unknown){
        let errMsg: string;
        if (axios.isAxiosError(err) && err.response?.data?.errorMessage) {
            errMsg = err.response?.data?.errorMessage
            console.log(errMsg);
        } else {
            errMsg = "An unexpected error occurred"
            console.log(errMsg, err);
        }
        errorNotification("Failed to update Profile", errMsg);
    }
}

export const updateProfileSavedJobs = async (profileId : number, jobIds : number[]) => {
    try {
        const res = await api.patch(`${base_URL}/update/saved-jobs/${profileId}`,jobIds);
        return res.data;
    }catch (err : unknown){
        let errMsg: string;
        if (axios.isAxiosError(err) && err.response?.data?.errorMessage) {
            errMsg = err.response?.data?.errorMessage
            console.log(errMsg);
        } else {
            errMsg = "An unexpected error occurred"
            console.log(errMsg, err);
        }
        errorNotification("Failed to update saved jobs.", errMsg);
    }
}
