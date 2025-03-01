import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/userSlice.tsx'
import profileReducer from "@/slices/profileSlice.tsx";

export default  configureStore({
    reducer: {
        user : userReducer,
        profile : profileReducer
    }
})
