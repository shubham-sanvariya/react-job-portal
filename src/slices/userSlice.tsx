import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {updateUserName} from "@/services/userService.tsx";
import {getItem, removeItem, setItem} from "@/services/localStorageService.tsx";

interface User {
    id: string;
    name: string;
    profileId: number;
    accountType: "APPLICANT" | "EMPLOYER";
}

interface UserStateType {
    user: User | null;
    loading: boolean;
    error: string | null;
    isVerified: boolean;
}

const initialState: UserStateType = {
    user: getItem("user"),
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
            const user : User = action.payload;
            setItem("user",user);
            state.user = {
                id: user.id,
                name: user.name,
                accountType: user.accountType,
                profileId: user.profileId,
            }
            return state;
        },
        removeUser: (state) => {
            removeItem("user")
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

export const selectUser = (state: { userReducer: { user: User | null } }) => state.userReducer.user;

export const selectUserLoading = (state: { userReducer: { loading: boolean } }) => state.userReducer.loading;

export const selectUserVerified = (state: { userReducer: { isVerified: boolean } }) => state.userReducer.isVerified;

export default UserSlice.reducer;
