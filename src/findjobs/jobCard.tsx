import {IconBookmark, IconClockHour3} from "@tabler/icons-react";
import {Divider, Text} from "@mantine/core";
import {jobListProps} from "@/Data/JobsData.tsx";
import {Link} from "react-router-dom";

const JobCard = (props : jobListProps) => {
    return (
        <Link to={'/jobs'} className={'flex flex-col gap-3 rounded-xl bg-mine-shaft-900 p-4 w-72 hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400'}>
            <div className={'flex justify-between'}>
                <div className={'flex items-center gap-2'}>
                    <div className={'p-2 bg-mine-shaft-800 rounded-md'}><img className={'h-7'} src={`/src/assets/Icons/${props.company}.png`} alt="microsoft"/></div>
                    <div>
                        <div className={'font-semibold'}>{props.jobTitle}</div>
                        <div className={'text-xs text-mine-shaft-300'}>{props.company} &#x2022; {props.applicants} Applicants</div>
                    </div>
                </div>
                <IconBookmark className={'text-mine-shaft-300 cursor-pointer'}/>
            </div>
            <div
                className={'flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs'}>
                <div>{props.experience}</div>
                <div>{props.jobType}</div>
                <div>{props.location}</div>
            </div>
            <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
                {props.description}
            </Text>
            <Divider color={'mine-shaft.7'} size={'xs'}/>
            <div className={'flex justify-between'}>
                <div className={'font-semibold text-mine-shaft-200'}>
                    &#8377; {props.package}
                </div>
                <div className={'flex gap-1 text-xs text-mine-shaft-400 items-center'}>
                    <IconClockHour3 className={'h-5 w-5'} stroke={1.5}/>
                    {props.postedDaysAgo}
                </div>
            </div>
        </Link>
    )
}
export default JobCard
