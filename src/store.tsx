import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/userSlice.tsx'
import profileReducer from "@/slices/profileSlice.tsx";
import jobsReducer from "@/slices/jobSlice.ts";
import postedJobsReducer from '@/slices/postedJobSlice.ts'
import applicantProfileReducer from '@/slices/applicantProfile.ts'
import filterFieldsReducer from '@/slices/filterSlice.ts'

const store = configureStore({
    reducer: {
        userReducer,
        profileReducer,
        jobsReducer,
        postedJobsReducer,
        applicantProfileReducer,
        filterFieldsReducer
    },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;