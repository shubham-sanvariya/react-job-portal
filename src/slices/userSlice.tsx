import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getItem, removeItem} from "@/services/localStorageService.tsx";
import {updateUserName} from "@/services/userService.tsx";
import {jwtDecode} from "jwt-decode";

interface User {
    id: string;
    name: string;
    email: string;
    profileId: number;
    accountType: "APPLICANT" | "EMPLOYER";
}

interface UserStateType {
    user: User | null;
    loading: boolean;
    error: string | null;
    isVerified: boolean;
}

const getUserDetailsFromToken = () => {
    const token = getItem("token");
    const user : any = jwtDecode(token);
    return {
        id: user.id,
        name: user.name,
        email: user.sub,
        accountType: user.accountType,
        profileId: user.profileId,
    }
}

const initialState: UserStateType = {
    user: getItem("token") ? getUserDetailsFromToken() : null,
    loading: false,
    error: null,
    isVerified: false
};


export const updateUserNameAsyncThunk = createAsyncThunk("updateUserName", async ({id, userName}: {
    id: number,
    userName: string
}, {rejectWithValue, dispatch}) => {
    try {
        const data = await updateUserName(id, userName);
        if (data) dispatch(setUser(data));
        return data;
    } catch (errMessage: unknown) {
        return rejectWithValue(errMessage);
    }
})


const UserSlice = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const user = action.payload;
            state.user = {
                id: user.id,
                name: user.name,
                email: user.sub,
                accountType: user.accountType,
                profileId: user.profileId,
            }
            return state;
        },
        removeUser: (state) => {
            removeItem("token");
            state.user = null;
            return state;
        },
        setUserVerified: (state, action: PayloadAction<boolean>) => {
            state.isVerified = action.payload;
            return state;
        },
        setUserLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
            return state;
        }
    },
})

export const {setUser, removeUser, setUserLoading, setUserVerified} = UserSlice.actions;

export const selectUser = (state: { userReducer: { user: User } }) => state.userReducer.user;

export const selectUserLoading = (state: { userReducer: { loading: boolean } }) => state.userReducer.loading;

export const selectUserVerified = (state: { userReducer: { isVerified: boolean } }) => state.userReducer.isVerified;

export default UserSlice.reducer;
