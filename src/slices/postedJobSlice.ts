import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApplicationType, JobType} from "@/types/jobType.ts";
import {getPostedByJobs, updateApplicantStatus} from "@/services/jobService.tsx";
import axios from "axios";

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

export const updateApplicantStatusAsyncThunk = createAsyncThunk("updateApplicantStatus", async ({ application, postedById}: {application: ApplicationType, postedById : number}, thunkAPI) => {
    try {
         await updateApplicantStatus(application);

         thunkAPI.dispatch(getPostedByJobsAsyncThunk(postedById))
    } catch (err: unknown) {
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
    reducers: {},
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

export default postedJobSlice.reducer;
