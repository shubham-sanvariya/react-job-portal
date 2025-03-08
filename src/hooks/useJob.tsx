import { AppDispatch } from "@/store";
import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import {selectProfile, updateProfileSavedJobsAsyncThunk} from "@/slices/profileSlice.tsx";


const UseJob = () => {
    const dispatch = useDispatch<AppDispatch>();
    const profileState = useSelector(selectProfile);

    const handleSaveJobs = (e : React.MouseEvent<SVGSVGElement>, profileId : number) => {
        e.preventDefault();
        if (!profileState?.id) {
            console.error("Profile ID is undefined");
            return; // Exit early if profileState.id is undefined
        }
        let savedJobsIds : number[] = [...(profileState?.savedJobs || [])];
        if (savedJobsIds.includes(profileId)){
            savedJobsIds = savedJobsIds?.filter(( id : number) => id !== profileId);
        }else {
            savedJobsIds = [...savedJobsIds, profileId];
        }

        dispatch(updateProfileSavedJobsAsyncThunk({ profileId: profileState?.id, jobIds: savedJobsIds }));
    }

    return { handleSaveJobs }
}
export default UseJob
