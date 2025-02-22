import PostedJob from "@/postedjob/postedJob.tsx";
import {Divider} from "@mantine/core";
import PostedJobDesc from "@/postedjob/postedJobDesc.tsx";


const PostedJobPage = () => {
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-[poppins] px-4">
            <Divider size={"xs"}/>
            <div className={'flex gap-5'}>
                <PostedJob/>
                <PostedJobDesc/>
            </div>
        </div>
    )
}
export default PostedJobPage
