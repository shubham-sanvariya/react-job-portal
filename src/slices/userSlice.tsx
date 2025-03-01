import {createSlice} from "@reduxjs/toolkit";
import {getItem, removeItem, setItem} from "@/services/localStorageService.tsx";

interface User {
    id: string;
    name: string;
    email: string;
    accountType: "APPLICANT" | "EMPLOYER";
}

const initialState : User | null = getItem("user") || null;


const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser : (state, action) => {
            const user = action.payload;
            setItem("user", {
                id: user.id,
                name: user.name,
                email: user.email,
                accountType: user.accountType
            });
            state = getItem("user");
            return state;
        },
        removeUser : () => {
            removeItem("user");
            return null;
        }
    }
})

export const {setUser, removeUser} = UserSlice.actions;

export const selectUser = (state : {user : User}) => state.user;

export default UserSlice.reducer;
