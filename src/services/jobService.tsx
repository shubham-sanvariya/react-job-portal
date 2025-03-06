import axios from "axios";

const base_URL = "http://localhost:8080/jobs"

export const postJob = async ( job : any ) => {
    try {
        const res = await axios.post(`${base_URL}/post`, job);
        return res.data;
    }catch (err : unknown){
        console.log(err);
        throw err;
    }
}
