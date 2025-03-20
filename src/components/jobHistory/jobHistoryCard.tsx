import {Button, Divider, Text} from "@mantine/core";
import {IconBookmark, IconBookmarkFilled, IconCalendarMonth, IconClockHour3} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {JobType} from "@/types/jobType.ts";
import {timeAgo} from "@/services/utilService.tsx";
import {useSelector} from "react-redux";
import {selectProfile} from "@/slices/profileSlice.tsx";
import useJob from "@/hooks/useJob.tsx";

const JobHistoryCard = ({job , jobStatus} : { job : JobType, jobStatus : string}) => {
    const profileState = useSelector(selectProfile);
    const  { handleSaveJobs } = useJob();

    return (
        <Link to={'/jobs'}
              className={'flex flex-col gap-3 rounded-xl bg-mine-shaft-900 p-4 w-72 hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400'}>
            <div className={'flex justify-between'}>
                <div className={'flex items-center gap-2'}>
                    <div className={'p-2 bg-mine-shaft-800 rounded-md'}><img className={'h-7'}
                                                                             src={`/src/assets/Icons/${job.company}.png`}
                                                                             alt="microsoft"/></div>
                    <div>
                        <div className={'font-semibold'}>{job.jobTitle}</div>
                        <div
                            className={'text-xs text-mine-shaft-300'}>{job.company} &#x2022; {job.applicants ? job.applicants.length : 0} Applicants
                        </div>
                    </div>
                </div>
                {
                    profileState?.savedJobs?.includes(Number(job.id)) ? <IconBookmarkFilled onClick={(e) => handleSaveJobs(e, Number(job.id))} className={'text-bright-sun-400 cursor-pointer'}
                                                                                                                                       stroke={1.5}/>
            :<IconBookmark onClick={(e) => handleSaveJobs(e, Number(job.id))} className={'text-mine-shaft-300 hover:text-bright-sun-400 cursor-pointer'}
                           stroke={1.5}/>
                }
            </div>
            <div
                className={'flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs'}>
                <div>{job.experience}</div>
                <div>{job.jobType}</div>
                <div>{job.location}</div>
            </div>
            <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
                {job.about}
            </Text>
            <Divider color={'mine-shaft.7'} size={'xs'}/>
            <div className={'flex justify-between'}>
                <div className={'font-semibold text-mine-shaft-200'}>
                    &#8377; {job.packageOffered}
                </div>
                <div className={'flex gap-1 text-xs text-mine-shaft-400 items-center'}>
                    <IconClockHour3 className={'h-5 w-5'} stroke={1.5}/>
                    {jobStatus === "APPLIED"|| jobStatus === "INTERVIEWING" ? "Applied" : jobStatus === "OFFERED" ? "Interviewed" : "posted"} &nbsp;
                    {timeAgo(job.postTime)}
                </div>
            </div>
            {(jobStatus === "OFFERED"|| jobStatus === "INTERVIEWING") && <Divider color={'mine-shaft.7'} size={'xs'}/>
            }
            {jobStatus === "OFFERED" &&
                <div className={'flex gap-2'}>
                    <Button color={'bright-sun.4'} variant={"outline"} fullWidth>Accept</Button>
                    <Button color={'red.5'} variant={"light"} fullWidth>Reject</Button>
                </div>
            }
            { jobStatus === "INTERVIEWING" &&
                <div className={'flex items-center text-sm gap-1'}>
                    <IconCalendarMonth className={'text-bright-sun-400 w-5 h-5'} stroke={1.5}/>Sun, 27 August &bull; <span className={'text-mine-shaft-400'}>
                    10:00 AM
                </span>
                </div>
            }
        </Link>
    )
}
export default JobHistoryCard
