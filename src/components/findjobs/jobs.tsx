import Sort from "@/components/findjobs/sort.tsx";
import JobCard from "@/components/findjobs/jobCard.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@/store.tsx";
import {getJobsAsyncThunk, selectJobs} from "@/slices/jobSlice.ts";
import {useEffect, useMemo, useRef} from "react";
import {resetFieldFilter, selectFilteredFieldState} from "@/slices/filterSlice.ts";
import {JobType} from "@/types/jobType.ts";

const Jobs = () => {
    const dispatch = useDispatch<AppDispatch>();
    const jobsState = useSelector(selectJobs);
    const filteredFields = useSelector(selectFilteredFieldState);
    const oneRef = useRef(false);

    useEffect(() => {
        if (jobsState?.length === 0 && !oneRef.current) {
            dispatch(getJobsAsyncThunk({jobStatus : "ACTIVE"}));
            oneRef.current = true;
        }
        return () => {
            dispatch(resetFieldFilter());
        }
    }, []);


    const filteredJobs = useMemo(() => {
        if (!filteredFields && typeof filteredFields !== "object") return jobsState;
        const keys = Object.keys(filteredFields);
        const check = new Array(keys.length).fill(false);

        return jobsState?.filter(job => {
            keys.forEach((key, index) => {
                if (Array.isArray(filteredFields[key]) && typeof filteredFields[key][0] === "string"){
                    const stringArray = filteredFields[key] as string[];
                    check[index] = stringArray.some((val : string) => val === job[key as keyof JobType]);
                }else if (Array.isArray(filteredFields[key]) && typeof filteredFields[key][0] === "number"){
                    const numberField = filteredFields[key] as number[];
                    check[index] = numberField[0] <= job.packageOffered && numberField[1] >= job.packageOffered
                }
            })
            return check.every(val => val === true);
        })
    }, [filteredFields, jobsState])

    return (
        <div className={'p-5'}>
            <div className={'flex justify-between'}>
                <div className={'text-2xl font-semibold'}>Recommended Jobs</div>
                <Sort sortFor="jobs" />
            </div>
            <div className={'flex flex-wrap mt-10 gap-5'}>
                {
                    filteredJobs?.map((job, index) => (
                        <JobCard key={index} {...job}/>
                    ))
                }
            </div>
        </div>
    )
}
export default Jobs
