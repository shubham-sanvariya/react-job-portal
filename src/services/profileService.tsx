
import axios from "axios";
import {ProfileType} from "@/types/profileType.ts";

const base_URL = "http://localhost:8080/profiles"

const getProfile = async ( id: number) => {
    try {
        const res = await axios.get(`${base_URL}/${id}`);
        return res.data;
    }catch (err : unknown){
        console.log(err);
        throw err;
    }
}

const updateProfile = async (profile : ProfileType) => {
    try {
        const res = await axios.put(`${base_URL}/update`,profile);
        return res.data;
    }catch (err : unknown){
        console.log(err);
        throw err;
    }
}

export { getProfile, updateProfile };
