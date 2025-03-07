import Sort from "@/components/findjobs/sort.tsx";
import JobCard from "@/components/findjobs/jobCard.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@/store.tsx";
import {getJobsAsyncThunk, selectJobs} from "@/slices/jobSlice.ts";
import {useEffect} from "react";

const Jobs = () => {
    const dispatch = useDispatch<AppDispatch>();
    const jobsState = useSelector(selectJobs);

    useEffect(() => {
        dispatch(getJobsAsyncThunk());
        console.log(jobsState)

    }, []);
    return (
        <div className={'p-5'}>
            <div className={'flex justify-between'}>
                <div className={'text-2xl font-semibold'}>Recommended Jobs</div>
                <Sort/>
            </div>
            <div className={'flex flex-wrap mt-10 gap-5'}>
                {
                    jobsState?.map((job, index) => (
                        <JobCard key={index} {...job}/>
                    ))
                }
            </div>
        </div>
    )
}
export default Jobs
