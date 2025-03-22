import axios from "axios";
import {ApplicantType, ApplicationType, JobType} from "@/types/jobType.ts";
import {errorNotification} from "@/services/notificationServices.tsx";

const base_URL = "http://localhost:8080/jobs"

export const postJob = async ( job : Omit<JobType, "applicants" | "postTime"> ) => {
    try {
        const res = await axios.post(`${base_URL}/post`, job);
        return res.data;
    }catch (err : unknown){
        console.log(err);
        throw err;
    }
}

export const applyJob = async ( id : number ,applicant : Omit<ApplicantType, "applicationStatus" | "timeStamp" | "interviewTime"> ) => {
    try {
        const res = await axios.post(`${base_URL}/apply/${id}`, applicant);
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

export const getPostedByJobs= async ( id : number ) => {
    try {
        const res = await axios.get(`${base_URL}/posted-by/${id}`);
        return res.data;
    }catch (err : unknown){
        console.log(err);
        throw err;
    }
}

export const updateApplicantStatus = async ( application :  ApplicationType) => {
    try {
        const res = await axios.put(`${base_URL}/applicant/update`, application);
        return res.data;
    }catch (err : unknown){
        console.log(err);
        throw err;
    }
}

export const updateJobStatus = async ( id : number, jobStatus : string) => {
    try {
        const res = await axios.patch(`${base_URL}/update/${id}/job-status`, null, { params : { jobStatus } });
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
        errorNotification("Failed to update Job Status", errMsg);
    }
}
