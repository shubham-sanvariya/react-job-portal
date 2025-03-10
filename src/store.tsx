import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/userSlice.tsx'
import profileReducer from "@/slices/profileSlice.tsx";
import jobsReducer from "@/slices/jobSlice.ts";
import postedJobsReducer from '@/slices/postedJobSlice.ts'

const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        jobsReducer,
        postedJobsReducer
    },
});

export default store;

export type AppDispatch = typeof store.dispatch;
