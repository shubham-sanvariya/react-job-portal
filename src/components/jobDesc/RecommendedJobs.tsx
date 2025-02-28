
import JobCard from "@/components/findjobs/jobCard.tsx";
import {jobList} from "@/Data/JobsData.tsx";

const RecommendedJobs = () => {
    return (
        <div>
            <div className={'text-xl font-semibold mb-5'}>
                Recommended Jobs
            </div>
            <div className={'flex flex-col flex-wrap justify-between gap-5 '}>
                {
                    jobList.map((job,index) => index < 6 && (
                        <JobCard key={index} {...job}/>
                    ))
                }
            </div>
        </div>
    )
}
export default RecommendedJobs
