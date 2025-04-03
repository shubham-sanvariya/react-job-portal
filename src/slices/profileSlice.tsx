import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAllProfiles, getProfile, updateProfile, updateProfileSavedJobs} from "@/services/profileService.tsx";
import axios from "axios";
import {ProfileType} from "@/types/profileType.ts";
import { RootState } from "@/store";


interface ProfileState {
    profile : ProfileType | null;
    profiles : ProfileType[];
    loading : boolean;
    error : string | null;
}

const initialState: ProfileState = {
    profile: null,
    profiles: [],
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

export const getAllProfilesAsyncThunk = createAsyncThunk("getAllProfiles", async ({ page = 0, size = 5, sort} : {page? : number, size? : number, sort?: string}, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState;

        const userProfileId = state.profileReducer.profile?.id ?? 0;
        const res = await getAllProfiles(page,size,sort);
        if (!res) {
            return thunkAPI.rejectWithValue("Profiles not found");
        }
        if (!res?.content) {
            return thunkAPI.rejectWithValue("Content is missing in the response");
        }
        const { content } : { content : ProfileType[]} = res;

        const fileteredProfiles = content.filter(pro => pro.id !== userProfileId)
        return fileteredProfiles as ProfileType[];
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
            .addCase(getAllProfilesAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProfilesAsyncThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.profiles = action.payload as ProfileType[];
            })
            .addCase(getAllProfilesAsyncThunk.rejected, (state, action) => {
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

export const selectProfile = (state: { profileReducer: { profile: ProfileType | null } }) => state.profileReducer.profile;

export const selectAllProfiles = (state: { profileReducer: { profiles: ProfileType[] } }) => state.profileReducer.profiles;

export const selectLoading = (state: { profileReducer: { loading: boolean } }) => state.profileReducer.loading;
export const selectProfileError = (state: { profileReducer: { error: string | null } }) => state.profileReducer.error;

export const { clearProfileError } = ProfileSlice.actions;

export default ProfileSlice.reducer;
