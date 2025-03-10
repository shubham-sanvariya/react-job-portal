import {timeAgo} from "@/services/utilService.tsx";
import {Link, useParams} from "react-router-dom";

const PostedJobCard = ( props : any) => {
    const {id} = useParams();

    return (
        <Link to={`/posted-jobs/${props.id}`} className={`w-52 rounded-xl p-2 border-l-2 border-l-bright-sun-400 ${props.id == id ? "!bg-bright-sun-400 text-black" : "bg-mine-shaft-900 text-mine-shaft-300"} hover:bg-opacity-80 cursor-pointer`}>
            <div className={'text-sm font-semibold'}>{props.jobTitle}</div>
            <div className={'text-sm  font-medium'}>{props.location}</div>
            <div className={'text-sm '}>{timeAgo(props.postTime)}</div>
        </Link>
    )
}
export default PostedJobCard
