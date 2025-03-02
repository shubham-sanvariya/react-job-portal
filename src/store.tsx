import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/userSlice.tsx'
import profileReducer from "@/slices/profileSlice.tsx";

const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
    },
});

export default store;

export type AppDispatch = typeof store.dispatch;
