import PostedJob from "@/components/postedjob/postedJob.tsx";
import {Divider} from "@mantine/core";
import PostedJobDesc from "@/components/postedjob/postedJobDesc.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@/store.tsx";
import {selectUser} from "@/slices/userSlice.tsx";
import {useEffect} from "react";
import {getPostedByJobsAsyncThunk, selectPostedJobs} from "@/slices/postedJobSlice.ts";


const PostedJobPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector(selectUser);
    const postedJobsState = useSelector(selectPostedJobs);

    useEffect(() => {
        getJobsPostedByUser()
    }, [postedJobsState]);

    const getJobsPostedByUser = () => {
        dispatch(getPostedByJobsAsyncThunk(Number(userState.id)));
    }
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-[poppins] px-4">
            <Divider size={"xs"}/>
            <div className={'flex gap-4'}>
                <PostedJob/>
                <PostedJobDesc/>
            </div>
        </div>
    )
}
export default PostedJobPage
