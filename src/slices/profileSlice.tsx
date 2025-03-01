import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getProfile, updateProfile} from "@/services/profileService.tsx";
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
        const res = await getProfile(profileId);
        console.log(res);
        return res as ProfileType;
    }catch (err : unknown) {
        if (axios.isAxiosError(err)) {
            thunkAPI.rejectWithValue(err.response?.data?.errorMessage);
        } else {
            thunkAPI.rejectWithValue("An unexpected error occurred");
        }
    }
})
export const updateProfileAsyncThunk = createAsyncThunk("updateProfile", async (updatedProfile : ProfileType, thunkAPI) => {
    try {
        const res = await updateProfile(updatedProfile);
        console.log(res);
        return res as ProfileType;
    }catch (err : unknown) {
        if (axios.isAxiosError(err)) {
            thunkAPI.rejectWithValue(err.response?.data?.errorMessage);
        } else {
            thunkAPI.rejectWithValue("An unexpected error occurred");
        }
    }
})


const ProfileSlice = createSlice({
    initialState,
    name: "profile",
    reducers: {},
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
    },

})

// export const {setUser, removeUser} = ProfileSlice.actions;

export const selectProfile = (state : {profile : ProfileType | null}) => state.profile;
export const selectLoading = (state : {loading : boolean}) => state.loading;
export const selectError = (state : {error : string | null}) => state.error;

export default ProfileSlice.reducer;
