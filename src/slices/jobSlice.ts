import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {getJobs, postJob} from "@/services/jobService.tsx";
import {JobType} from "@/types/jobType.ts";

interface JobState {
    jobs: JobType[];
    loading: boolean;
    error: string | null;
}

const initialState: JobState = {
    jobs: [],
    loading: false,
    error: null
}

export const postJobAsyncThunk = createAsyncThunk("postJob", async (job: any, thunkAPI) => {
    try {
        return await postJob(job);
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            thunkAPI.rejectWithValue(err.response?.data?.errorMessage);
        } else {
            thunkAPI.rejectWithValue("An unexpected error occurred");
        }
    }
})

export const getJobsAsyncThunk = createAsyncThunk("getJobs", async ({jobStatus, page = 0, size = 5, sort}:
                                                                    {
                                                                        jobStatus?: string;
                                                                        page?: number;
                                                                        size?: number;
                                                                        sort?: string
                                                                    }, thunkAPI) => {
    try {
        const res = await getJobs(jobStatus, page, size, sort);
        const {content} = res;

        return content;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            thunkAPI.rejectWithValue(err.response?.data?.errorMessage);
        } else {
            thunkAPI.rejectWithValue("An unexpected error occurred");
        }
    }
})


const jobSlice = createSlice({
    initialState,
    name: "jobsReducer",
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postJobAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(postJobAsyncThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = [...state.jobs, action.payload];
            })
            .addCase(postJobAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getJobsAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getJobsAsyncThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(getJobsAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export const selectJobs = (state: { jobsReducer: { jobs: JobType[] | null } }) => state.jobsReducer.jobs;

export default jobSlice.reducer;
