import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getProfile, updateProfile, updateProfileSavedJobs} from "@/services/profileService.tsx";
import axios from "axios";
import {ProfileType} from "@/types/profileType.ts";


interface ProfileState {
    profile : ProfileType | null;
    loading : boolean;
    error : string | null;
}

const initialState: ProfileState = {
    profile: null,
    loading: false,
    error: null,
};

export const getProfileAsyncThunk = createAsyncThunk("getProfile", async ( profileId : number, thunkAPI) => {
    try {
        const res = await getProfile(profileId, "Failed to fetch user profile");
        return res as ProfileType;
    }catch (err : unknown) {
        if (axios.isAxiosError(err)) {
            if (err.response?.data?.errorMessage)
                return thunkAPI.rejectWithValue(err.response?.data?.errorMessage);
            return  thunkAPI.rejectWithValue(err.message);
        }
        return thunkAPI.rejectWithValue("An unexpected error occurred");
    }
})

export const updateProfileAsyncThunk = createAsyncThunk("updateProfile", async (updatedProfile : ProfileType, thunkAPI) => {
    try {
        const res = await updateProfile(updatedProfile);
        return res as ProfileType;
    }catch (err : unknown) {
        if (axios.isAxiosError(err)) {
            if (err.response?.data?.errorMessage)
                return thunkAPI.rejectWithValue(err.response?.data?.errorMessage);
            return  thunkAPI.rejectWithValue(err.message);
        }
        return thunkAPI.rejectWithValue("An unexpected error occurred");
    }
})

export const updateProfileSavedJobsAsyncThunk = createAsyncThunk("updateProfileSavedJobs", async ( {profileId, jobIds} : {profileId: number, jobIds : number[]}, thunkAPI) => {
    try {
        const res = await updateProfileSavedJobs(profileId, jobIds);
        return res as ProfileType;
    }catch (err : unknown) {
        if (axios.isAxiosError(err)) {
            if (err.response?.data?.errorMessage)
              return thunkAPI.rejectWithValue(err.response?.data?.errorMessage);
            return  thunkAPI.rejectWithValue(err.message);
        }
          return thunkAPI.rejectWithValue("An unexpected error occurred");

    }
})


const ProfileSlice = createSlice({
    initialState,
    name: "profile",
    reducers: {
        clearProfileError : (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfileAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProfileAsyncThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload as ProfileType;
            })
            .addCase(getProfileAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateProfileAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProfileAsyncThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload as ProfileType;
            })
            .addCase(updateProfileAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateProfileSavedJobsAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProfileSavedJobsAsyncThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload as ProfileType;
            })
            .addCase(updateProfileSavedJobsAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },

})

// export const {setUser, removeUser} = ProfileSlice.actions;

export const selectProfile = (state: { profile: { profile: ProfileType | null } }) => state.profile.profile;

export const selectLoading = (state : { profile:{loading : boolean}}) => state.profile.loading;
export const selectProfileError = (state : { profile:{error : string | null}}) => state.profile.error;

export const { clearProfileError } = ProfileSlice.actions;

export default ProfileSlice.reducer;
