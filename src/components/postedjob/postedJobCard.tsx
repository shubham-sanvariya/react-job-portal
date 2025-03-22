import {timeAgo} from "@/services/utilService.tsx";
import {Link, useParams} from "react-router-dom";
import {useMemo} from "react";

const PostedJobCard = ( props : any) => {
    const {id} = useParams();

    const status = useMemo(() => {
        if (props.jobStatus === "DRAFT"){
            return "Drafted"
        }else if (props.jobStatus === "CLOSED"){
            return "Closed"
        }else return "Published"
    },[props.jobStatus])

    return (
        <Link to={`/posted-jobs/${props.id}`} className={`w-52 rounded-xl p-2 border-l-2 border-l-bright-sun-400 ${props.id == id ? "!bg-bright-sun-400 text-black" : "bg-mine-shaft-900 text-mine-shaft-300"} hover:bg-opacity-80 cursor-pointer`}>
            <div className={'text-sm font-semibold'}>{props.jobTitle}</div>
            <div className={'text-sm  font-medium'}>{props.location}</div>
            <div className={'text-sm '}>{status} {timeAgo(props.postTime)}</div>
        </Link>
    )
}
export default PostedJobCard
