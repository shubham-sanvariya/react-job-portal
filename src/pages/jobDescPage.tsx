import {Link} from "react-router-dom";
import {Button} from "@mantine/core";
import {IconArrowLeft} from "@tabler/icons-react";
import JobDesc from "@/jobDesc/jobDesc.tsx";
import RecommendedJobs from "@/jobDesc/RecommendedJobs.tsx";

const JobDescPage = () => {
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-[poppins] p-4">
            <Link className={'my-4 inline-block'} to={'/find-jobs'}>
                <Button leftSection={<IconArrowLeft size={20}/>} color={'bright-sun.4'} variant={"light"}>
                    Back
                </Button>
            </Link>
            <div className={'flex justify-around gap-5'}>
                <JobDesc/>
                <RecommendedJobs/>
            </div>
        </div>
    )
}
export default JobDescPage
