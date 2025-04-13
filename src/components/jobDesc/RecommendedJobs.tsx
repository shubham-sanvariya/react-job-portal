
import JobCard from "@/components/findjobs/jobCard.tsx";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getJobsAsyncThunk, selectJobs} from "@/slices/jobSlice.ts";
import {useEffect} from "react";
import {AppDispatch} from "@/store.tsx";

const RecommendedJobs = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {id} = useParams();
    const jobsState = useSelector(selectJobs) ?? [];

    useEffect(() => {
        if (jobsState.length === 0){
            dispatch(getJobsAsyncThunk({jobStatus : "ACTIVE"}));
        }
    }, [dispatch, jobsState.length]);

    return (
        <div>
            <div className={'text-xl font-semibold mb-5'}>
                Recommended Jobs
            </div>
            <div className={'flex bs-mx:flex-col flex-wrap justify-between gap-5 '}>
                {
                    jobsState?.map((job,index) => index < 6 && Number(id) !== job.id &&(
                        <JobCard key={index} {...job}/>
                    ))
                }
            </div>
        </div>
    )
}
export default RecommendedJobs
