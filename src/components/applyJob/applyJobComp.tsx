import {
    Divider,
} from "@mantine/core";
import {useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@/store.tsx";
import {selectJobs} from "@/slices/jobSlice.ts";
import {getJobById} from "@/services/jobService.tsx";
import {JobInitialValues, JobType} from "@/types/jobType.ts";
import {timeAgo} from "@/services/utilService.tsx";
import ApplicationForm from "@/components/applyJob/applicationForm.tsx";

const ApplyJobComp = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {id} = useParams();
    const jobsState = useSelector(selectJobs);
    const memoizedJobs = useMemo(() => jobsState ?? [], [jobsState]);
    const [job, setJob] = useState<JobType>(JobInitialValues);


    useEffect(() => {
        window.scrollTo(0, 0);
        const applyJob = memoizedJobs?.find((item) => item.id === Number(id));
        if (applyJob) {
            setJob(applyJob);
        } else {
            (async () => {
                const res = await getJobById(Number(id));
                setJob(res);
            })()
        }
    }, [dispatch, id, memoizedJobs]);

    return (<>
            <div className={'w-2/3 mx-auto bs-mx:w-4/5 sm-mx:w-full'}>

                <div className={'flex justify-between'}>
                    <div className={'flex items-center gap-2'}>
                        <div className={'p-3 bg-mine-shaft-800 rounded-xl shrink-0'}><img className={'h-14 xs-mx:h-10 xs-mx:w-10'}
                                                                                 src={`/dist/assets/Icons/${job.company}.png`}
                                                                                 alt="microsoft"/></div>
                        <div>
                            <div className={'font-semibold text-2xl xs-mx:text-xl'}>{job.jobTitle}</div>
                            <div
                                className={'text-lg text-mine-shaft-300'}>{job?.company} &bull; {timeAgo(job?.postTime ?? "")} &bull;
                                &nbsp;
                                {job?.applicants ? job?.applicants.length : 0} Applicants
                            </div>
                        </div>
                    </div>
                </div>
                <Divider my={'xl'}/>
                <ApplicationForm/>
            </div>
        </>
    )
}
export default ApplyJobComp
