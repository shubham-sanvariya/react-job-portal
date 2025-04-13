import {IconBookmark, IconBookmarkFilled} from "@tabler/icons-react";
import {ActionIcon, Button, Divider} from "@mantine/core";
import {Link, useParams} from "react-router-dom";
import {card} from "@/Data/JobDescData.tsx";

import DOMPurify from "dompurify";
import {timeAgo} from "@/services/utilService.tsx";
import {useEffect, useRef, useState, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {JobInitialValues, JobType} from "@/types/jobType.ts";
import {getJobById, updateJobStatus} from "@/services/jobService.tsx";
import {formatJobValue} from "@/services/jobUtils.ts";
import {selectProfile} from "@/slices/profileSlice.tsx";
import useJob from "@/hooks/useJob.tsx";
import {selectUser} from "@/slices/userSlice.tsx";
import {selectJobs} from "@/slices/jobSlice.ts";
import {selectPostedJobs, setPostedJobs} from "@/slices/postedJobSlice.ts";
import {AppDispatch} from "@/store.tsx";

const JobDesc = ({edit, closed}: { edit: boolean, closed: boolean }) => {
    const {id} = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const jobsState = useSelector(selectJobs);
    const profileState = useSelector(selectProfile);
    const postedJobsState = useSelector(selectPostedJobs);
    const userState = useSelector(selectUser);
    const [job, setJob] = useState<JobType>(JobInitialValues);
    const [jobs, setJobs] = useState<JobType[]>([JobInitialValues]);
    const [applied, setApplied] = useState<boolean>(false);
    const {handleSaveJobs} = useJob();

    const hasFetched = useRef(false);

    const fetchJobById = useCallback(async (jobId: number) => {
        const res = await getJobById(jobId);
        if (res) setJob(res);
    }, [id]);

    const handleJobStatusChange = useCallback(async (jobStatus: string) => {
        try {
            const res = await updateJobStatus(job.id, jobStatus);
            if (res) {
                setJob({...job, jobStatus: jobStatus.toUpperCase()})
                dispatch(setPostedJobs({...job, jobStatus: jobStatus.toUpperCase()}));
            }
        }catch (err : unknown) {
            console.log(err);
        }
    }, [job])

    const checkIfApplied = useCallback(() => {
        if (profileState && job.applicants?.some(applicant => applicant.applicantId === Number(userState?.id))) {
            setApplied(true);
        } else {
            setApplied(false);
        }
    }, [profileState, job.applicants, userState?.id]);

    useEffect(() => {
        // window.scrollTo(0, 0);
        if (!id) return;

        if (postedJobsState && jobsState) {
            setJobs(edit ? postedJobsState : jobsState);
        }

        const cj = jobs?.find((item) => item.id === Number(id));
        if (cj) {
            setJob(cj);
        } else if (!hasFetched.current) {
            fetchJobById(Number(id)).then();
            hasFetched.current = true;
        }

        checkIfApplied();
    }, [id]);

    return (
        <div className={'w-2/3'}>
            <div className={'flex justify-between'}>
                <div className={'flex items-center gap-2'}>
                    <div className={'p-3 bg-mine-shaft-800 rounded-xl'}><img className={'h-14'}
                                                                             src={`/src/assets/Icons/${job?.company}.png`}
                                                                             alt="company"/></div>
                    <div>
                        <div className={'font-semibold text-2xl'}>{job?.jobTitle}</div>
                        <div
                            className={'text-lg text-mine-shaft-300'}>{job?.company} &bull; {timeAgo(job?.postTime ?? "")} &bull;
                            &nbsp;
                            {job?.applicants ? job?.applicants.length : 0} Applicants
                        </div>
                    </div>
                </div>
                <div className={'flex flex-col items-center gap-2'}>
                    {(edit || !applied) && <Link to={edit ? `/post-job/${job.id}` :  `/apply-job/${job?.id}`} >
                        <Button onClick={closed ? () => handleJobStatusChange("active") : () => {}} size={"sm"} color={'bright-sun.4'} variant={"light"}>
                            {closed ? "Reopen" : edit ? "Edit" : "Apply"}
                        </Button>
                    </Link>}
                    {(!edit && applied) &&
                        <Button size={"sm"} color={'green.8'} variant={"light"}>
                            Applied
                        </Button>
                    }
                    {edit && !closed ?
                        <Button onClick={() => handleJobStatusChange("closed")} size={"sm"} color={'red.5'} variant={"outline"}>
                            Close
                        </Button>
                        :
                        profileState?.savedJobs?.includes(Number(id)) ?
                            <IconBookmarkFilled onClick={(e) => handleSaveJobs(e, Number(id))}
                                                className={'text-bright-sun-400 cursor-pointer'}
                                                stroke={1.5}/>
                            : <IconBookmark onClick={(e) => handleSaveJobs(e, Number(id))}
                                            className={'text-mine-shaft-300 hover:text-bright-sun-400 cursor-pointer'}
                                            stroke={1.5}/>
                    }
                </div>
            </div>
            <Divider my={'xl'}/>
            <div className={'flex justify-between'}>
                {
                    card.map((item, index: number) => (
                        <div key={index} className={'flex flex-col items-center gap-1 '}>
                            <ActionIcon color={'bright-sun.4'} className="!h-12 !w-12" variant="light" radius="xl"
                                        aria-label="Settings">
                                <item.icon className="h-4/5 w-4/5" stroke={1.5}/>
                            </ActionIcon>
                            <div className={'text-sm text-mine-shaft-300'}>{item.name}</div>
                            <div
                                className={'font-semibold'}>{formatJobValue(item.id, job)} {item.id === "packageOffered" && <>LPA</>}</div>
                        </div>
                    ))
                }
            </div>
            <Divider my={'xl'}/>
            <div>
                <div className={'text-xl font-semibold mb-5'}>
                    Required Skills
                </div>
                <div className={'flex flex-wrap gap-2'}>
                    {
                        job?.skillRequired?.map((skill: string, index: number) => (
                            <ActionIcon key={index} color={'bright-sun.4'}
                                        className="!text-sm !h-fit !w-fit font-medium" variant="light"
                                        radius="xl" p={"xs"}
                                        aria-label="Settings">
                                {skill}
                            </ActionIcon>
                        ))
                    }
                </div>
                <Divider my={'xl'}/>
                <div
                    className={'[&_h4]:text-xl [&_*]:text-mine-shaft-300 [&_li]: mb-1 [&_li]:marker:text-bright-sun-400 [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify'}
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(job.description)}}>

                </div>
                <Divider my={'xl'}/>
                <div>
                    <div className={'text-xl font-semibold mb-5'}>
                        About Company
                    </div>

                    <div className={'flex justify-between mb-3'}>
                        <div className={'flex items-center gap-2'}>
                            <div className={'p-3 bg-mine-shaft-800 rounded-xl'}><img className={'h-8'}
                                                                                     src={`/src/assets/Icons/${job.company}.png`}
                                                                                     alt="microsoft"/></div>
                            <div>
                                <div className={'font-medium text-lg'}>{job.company}</div>
                                <div
                                    className={'text-lg text-mine-shaft-300'}>
                                    10K+ Employees
                                </div>
                            </div>
                        </div>

                        <Link to={`/company/${job.company}`}>
                            <Button color={'bright-sun.4'} variant={"light"}>
                                Company Page
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default JobDesc
