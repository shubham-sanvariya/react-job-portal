import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/userSlice.tsx'
import profileReducer from "@/slices/profileSlice.tsx";
import jobsReducer from "@/slices/jobSlice.ts";
import postedJobsReducer from '@/slices/postedJobSlice.ts'
import applicantProfileReducer from '@/slices/applicantProfile.ts'

const store = configureStore({
    reducer: {
        userReducer,
        profile: profileReducer,
        jobsReducer,
        postedJobsReducer,
        applicantProfileReducer
    },
});

export default store;

export type AppDispatch = typeof store.dispatch;
