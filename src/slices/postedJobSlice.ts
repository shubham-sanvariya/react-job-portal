import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApplicationType, ApplicationStatusEnum, JobType} from "@/types/jobType.ts";
import {getPostedByJobs, updateApplicantStatus} from "@/services/jobService.tsx";
import axios from "axios";
import {errorNotification, successNotification} from "@/services/notificationUtils.tsx";

interface JobState {
    jobs : JobType[];
    loading : boolean;
    error : string | null;
}

const initialState : JobState = {
    jobs: [],
    loading: false,
    error: null
}

export const getPostedByJobsAsyncThunk = createAsyncThunk("getPostedByJobs", async (id : number, thunkAPI) => {
    try {
        return await getPostedByJobs(id);
    } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.data?.errorMessage) {
           return  thunkAPI.rejectWithValue(err.response?.data?.errorMessage);
        } else {
           return  thunkAPI.rejectWithValue("An unexpected error occurred");
        }
    }
})

const checkStatus = (status : string) => {
    if (status === ApplicationStatusEnum.INTERVIEWING){
        return { title : "Interview Scheduled", message : "Interview Scheduled Successfully" }
    }else if (status === ApplicationStatusEnum.OFFERED){
        return { title : "Offer Send", message : "Offer has been send successfully." }
    }
     return { title : "Rejected Applicant", message : "Rejected Applicant Successfully" }
}

export const updateApplicantStatusAsyncThunk = createAsyncThunk("updateApplicantStatus", async ({ application, postedById}: {application: ApplicationType, postedById : number}, thunkAPI) => {
    try {
         await updateApplicantStatus(application);

         thunkAPI.dispatch(getPostedByJobsAsyncThunk(postedById))
        const { title, message } = checkStatus(application.applicationStatus);
        successNotification(title, message);
    } catch (err: unknown) {
        errorNotification("Failed To Update Application Status","Please try again after some time.");
        if (axios.isAxiosError(err) && err.response?.data?.errorMessage) {
           return  thunkAPI.rejectWithValue(err.response?.data?.errorMessage);
        } else {
           return  thunkAPI.rejectWithValue("An unexpected error occurred");
        }
    }
})

const postedJobSlice = createSlice({
    initialState,
    name: "postedJobsReducer",
    reducers: {
        setPostedJobs : (state, action) => {
            const  updatedPostedJob = action.payload as JobType;
            state.jobs = state.jobs.map(job => job.id === updatedPostedJob.id ? updatedPostedJob : job);
        }
    },
    extraReducers: (builder) =>{
        builder
            .addCase(getPostedByJobsAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPostedByJobsAsyncThunk.fulfilled,(state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(getPostedByJobsAsyncThunk.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateApplicantStatusAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateApplicantStatusAsyncThunk.fulfilled,(state) => {
                state.loading = false;
            })
            .addCase(updateApplicantStatusAsyncThunk.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export const selectPostedJobs = (state : { postedJobsReducer : { jobs : JobType[] | null} }) => state.postedJobsReducer.jobs;

export const { setPostedJobs } = postedJobSlice.actions;

export default postedJobSlice.reducer;
