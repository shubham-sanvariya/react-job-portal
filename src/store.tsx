import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/userSlice.tsx'
import profileReducer from "@/slices/profileSlice.tsx";
import jobsReducer from "@/slices/jobSlice.ts";

const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        jobsReducer
    },
});

export default store;

export type AppDispatch = typeof store.dispatch;
