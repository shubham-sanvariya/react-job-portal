
import axios from "axios";

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

export { getProfile };
