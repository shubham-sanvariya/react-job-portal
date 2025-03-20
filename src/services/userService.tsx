import axios from "axios";
import {errorNotification} from "@/services/notificationServices.tsx";

const base_URL = "http://localhost:8080/users"

const registerUser = async ( user: any ) => {
    try {
        const response = await axios.post(`${base_URL}/register`, user);
        return response.data;
    } catch (error : unknown) {
        console.log(error);
        throw error;
    }
}

const loginUser = async ( login: any ) => {
    try {
        const response = await axios.post(`${base_URL}/login`, login);
        return response.data;
    } catch (error : unknown) {
        console.log(error);
        throw error;
    }
}

const sendOtp = async ( email : string) => {
    try {
        const res = await axios.post(`${base_URL}/sendOtp/${email}`);
        return res.data;
    }catch (error : unknown) {
        console.log(error);
        throw error;
    }
}

const verifyOtp = async ( email : string, otp : string) => {
    try {
        const res = await axios.get(`${base_URL}/verifyOtp/${email}/${otp}`);
        return res.data;
    }catch (error : unknown) {
        console.log(error);
        throw error;
    }
}

const changePassword = async ( email : string, password : string) => {
    try {
        const res = await axios.post(`${base_URL}/changePass`, {email,password});
        return res.data;
    }catch (error : unknown) {
        console.log(error);
        throw error;
    }
}

const updateUserName = async ( id : number, newUsername : string) => {
    try {
        const res = await axios.patch(`${base_URL}/update/${id}/username?userName=${newUsername}`);
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

export {registerUser, loginUser, sendOtp, verifyOtp, changePassword, updateUserName};
