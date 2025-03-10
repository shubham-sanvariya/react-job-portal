import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {JobType} from "@/types/jobType.ts";
import {getPostedByJobs} from "@/services/jobService.tsx";
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
        if (axios.isAxiosError(err)) {
            thunkAPI.rejectWithValue(err.response?.data?.errorMessage);
        } else {
            thunkAPI.rejectWithValue("An unexpected error occurred");
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
    }
})

export const selectPostedJobs = (state : { postedJobsReducer : { jobs : JobType[] | null} }) => state.postedJobsReducer.jobs;

export default postedJobSlice.reducer;
