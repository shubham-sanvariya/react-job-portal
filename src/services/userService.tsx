import axios from "axios";

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

export {registerUser, loginUser, sendOtp, verifyOtp, changePassword};
