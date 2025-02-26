import axios from "axios";

const base_URL = "http://localhost:8080/users"

const registerUser = async ( user: any ) => {
    try {
        const response = await axios.post(`${base_URL}/register`, user);
        return response.data;
    } catch (error : any) {
        console.log(error);
        throw error;
    }
}

const loginUser = async ( login: any ) => {
    try {
        const response = await axios.post(`${base_URL}/login`, login);
        return response.data;
    } catch (error : any) {
        console.log(error);
        throw error;
    }
}

export {registerUser, loginUser};
