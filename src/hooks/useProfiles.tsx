import {useCallback, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { clearProfileError, getAllProfilesAsyncThunk, selectAllProfiles, selectProfileError } from "@/slices/profileSlice";
import { errorNotification } from "@/services/notificationUtils.tsx";

const UseProfiles = () => {
    const dispatch = useDispatch<AppDispatch>();
    const allProfileState = useSelector(selectAllProfiles);
    const errorState = useSelector(selectProfileError);

    if (errorState) {
        errorNotification("Failed to update Saved Jobs", errorState);
        dispatch(clearProfileError());
    }

    const getAllApplicantProfiles = useCallback(async () => {
        dispatch(getAllProfilesAsyncThunk({}))
    },[]);

    useEffect(() => {
        getAllApplicantProfiles().then();
    }, [getAllApplicantProfiles]);

    return { allProfileState, errorState }
}
export default UseProfiles
