
import axios from "axios";
import {ProfileType} from "@/types/profileType.ts";
import {errorNotification} from "@/services/notificationServices.tsx";

const base_URL = "http://localhost:8080/profiles"

export const getProfile = async ( id: number, notificationMessage : string) => {
    try {
        const res = await axios.get(`${base_URL}/${id}`);
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

export const getAllProfiles = async () => {
    try {
        const res = await axios.get(base_URL);
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
        const res = await axios.put(`${base_URL}/update`,profile);
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
        const res = await axios.patch(`${base_URL}/update/saved-jobs/${profileId}`,jobIds);
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
