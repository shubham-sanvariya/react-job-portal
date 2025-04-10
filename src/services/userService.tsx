import axios from "axios";
import {errorNotification} from "@/services/notificationUtils.tsx";
import api from "@/services/axiosConfig.ts";

const base_URL = "/users"


const changePassword = async ( email : string, password : string) => {
    try {
        const res = await api.post(`${base_URL}/changePass`, {email,password});
        return res.data;
    }catch (error : unknown) {
        console.log(error);
        throw error;
    }
}

const updateUserName = async ( id : number, newUsername : string) => {
    try {
        const res = await api.patch(`${base_URL}/update/${id}/username?userName=${newUsername}`);
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
        errorNotification("Failed to update User Name", errMsg);
        throw errMsg;
    }
}

export { changePassword, updateUserName};
