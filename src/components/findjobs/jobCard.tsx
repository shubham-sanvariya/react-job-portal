import {IconBookmark, IconBookmarkFilled, IconClockHour3} from "@tabler/icons-react";
import {Divider, Text} from "@mantine/core";
import {Link, useNavigate} from "react-router-dom";
import {JobType} from "@/types/jobType.ts";
import {timeAgo} from "@/services/utilService.tsx";
import useJob from "@/hooks/useJob.tsx";
import {useSelector} from "react-redux";
import {selectProfile} from "@/slices/profileSlice.tsx";

const JobCard = (props : JobType) => {
    const navigate = useNavigate();
    const profileState = useSelector(selectProfile);
    const { handleSaveJobs } = useJob();

    return (
        <Link to={`/jobs/${props.id}`} className={'flex flex-col gap-3 rounded-xl bg-mine-shaft-900 p-4 w-72 sm-mx:w-full  hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400'}>
            <div className={'flex justify-between'}>
                <div className={'flex items-center gap-2'}>
                    <div className={'p-2 bg-mine-shaft-800 rounded-md'} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation(); // Prevent parent <Link> navigation
                        navigate(`/company/${props.company}`);
                    }}><img className={'h-7'} src={`/dist/assets/Icons/${props.company}.png`} alt="microsoft"/></div>
                    <div>
                        <div className={'font-semibold'}>{props.jobTitle}</div>
                        <div className={'text-xs text-mine-shaft-300'}><span className="text-mine-shaft-300 cursor-pointer hover:underline" onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation(); // Prevent parent <Link> navigation
                            navigate(`/company/${props.company}`);
                        }}>
                                {props.company}
                            </span>  &#x2022; {props.applicants ? props.applicants.length : 0} Applicants</div>
                    </div>
                </div>
                {profileState?.savedJobs?.includes(props.id) ? <IconBookmarkFilled onClick={(e) => handleSaveJobs(e, props.id)} className={'text-bright-sun-400 cursor-pointer'}
                               stroke={1.5}/>
                    :<IconBookmark onClick={(e) => handleSaveJobs(e, props.id)} className={'text-mine-shaft-300 hover:text-bright-sun-400 cursor-pointer'}
                               stroke={1.5}/>}
            </div>
            <div
                className={'flex flex-wrap gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs'}>
                <div>{props.experience}</div>
                <div>{props.jobType}</div>
                <div>{props.location}</div>
            </div>
            <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
                {props.about}
            </Text>
            <Divider color={'mine-shaft.7'} size={'xs'}/>
            <div className={'flex justify-between'}>
                <div className={'font-semibold text-mine-shaft-200'}>
                    &#8377; {props.packageOffered}
                </div>
                <div className={'flex gap-1 text-xs text-mine-shaft-400 items-center'}>
                    <IconClockHour3 className={'h-5 w-5'} stroke={1.5}/> Posted
                    &nbsp;
                    {timeAgo(props.postTime)}
                </div>
            </div>
        </Link>
    )
}
export default JobCard
