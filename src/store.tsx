import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/userSlice.tsx'

export default  configureStore({
    reducer: {
        user : userReducer
    }
})
