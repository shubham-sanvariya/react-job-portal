import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getItem, removeItem, setItem} from "@/services/localStorageService.tsx";
import {updateUserName} from "@/services/userService.tsx";

interface User {
    id: string;
    name: string;
    email: string;
    accountType: "APPLICANT" | "EMPLOYER";
    profileId : number;
}

interface UserStateType {
    user : User | null;
    loading : boolean;
    error : string | null;
}

const initialState: UserStateType = {
    user: getItem("user") ? getItem("user") : null,
    loading: false,
    error: null,
};

export const updateUserNameAsyncThunk = createAsyncThunk("updateUserName", async ({ id, userName }: {id : number, userName : string},{ rejectWithValue, dispatch })=> {
    try {
        const data = await updateUserName(id,userName);
        if (data) dispatch(setUser(data));
        return data;
    }catch (errMessage : unknown){
        return rejectWithValue(errMessage);
    }
})


const UserSlice = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        setUser : (state, action) => {
            const user = action.payload;
            setItem("user", {
                id: user.id,
                name: user.name,
                email: user.email,
                accountType: user.accountType,
                profileId : user.profileId
            });
            state.user = getItem("user");
            return state;
        },
        removeUser : (state) => {
            removeItem("user");
            state.user = null;
            return state;
        }
    },
})

export const {setUser, removeUser} = UserSlice.actions;

export const selectUser = (state : { userReducer : { user : User }}) => state.userReducer.user;

export default UserSlice.reducer;
