import axios from "axios";
import {ApplicantType, JobType} from "@/types/jobType.ts";

const base_URL = "http://localhost:8080/jobs"

export const postJob = async ( job : Omit<JobType, "id" | "applicants" | "postTime"> ) => {
    try {
        const res = await axios.post(`${base_URL}/post`, job);
        return res.data;
    }catch (err : unknown){
        console.log(err);
        throw err;
    }
}

export const applyJob = async ( id : number ,job : Omit<ApplicantType, "applicantId" | "applicationStatus" | "timeStamp"> ) => {
    try {
        const res = await axios.post(`${base_URL}/apply/${id}`, job);
        return res.data;
    }catch (err : unknown){
        console.log(err);
        throw err;
    }
}

export const getAllJobs = async () => {
    try {
        const res = await axios.get(base_URL);
        return res.data;
    }catch (err : unknown){
        console.log(err);
        throw err;
    }
}

export const getJobById = async ( id : number ) => {
    try {
        const res = await axios.get(`${base_URL}/${id}`);
        return res.data;
    }catch (err : unknown){
        console.log(err);
        throw err;
    }
}
