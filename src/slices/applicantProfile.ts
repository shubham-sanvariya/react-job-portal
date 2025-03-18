import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ProfileType} from "@/types/profileType.ts";
import {getProfile} from "@/services/profileService.tsx";
import axios from "axios";

interface ProfileState {
    Profile: ProfileType | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProfileState = {
    Profile: null,
    loading: false,
    error: null,
};

export const getApplicantProfileAsyncThunk = createAsyncThunk("getApplicantProfile", async (applicantProfileId: number, thunkAPI) => {
    try {
        const res = await getProfile(applicantProfileId, "Failed to fetch user profile");
        return res as ProfileType;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            if (err.response?.data?.errorMessage)
                return thunkAPI.rejectWithValue(err.response?.data?.errorMessage);
            return thunkAPI.rejectWithValue(err.message);
        }
        return thunkAPI.rejectWithValue("An unexpected error occurred");
    }
})

const ApplicantProfile = createSlice({
    initialState,
    name: "applicantProfile",
    reducers: {
        clearProfileApplicantError : (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getApplicantProfileAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getApplicantProfileAsyncThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.Profile = action.payload as ProfileType;
            })
            .addCase(getApplicantProfileAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export const { clearProfileApplicantError } = ApplicantProfile.actions;

export const selectApplicantProfile = (state: { applicantProfile: { profile: ProfileType | null } }) => state.applicantProfile.profile;

export default ApplicantProfile.reducer;
