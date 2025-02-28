import Sort from "@/components/findjobs/sort.tsx";
import JobCard from "@/components/findjobs/jobCard.tsx";
import {jobList} from "@/Data/JobsData.tsx";

const Jobs = () => {
    return (
        <div className={'p-5'}>
            <div className={'flex justify-between'}>
                <div className={'text-2xl font-semibold'}>Recommended Jobs</div>
                <Sort/>
            </div>
            <div className={'flex flex-wrap mt-10 gap-5'}>
                {
                    jobList.map((job, index) => (
                        <JobCard key={index} {...job}/>
                    ))
                }
            </div>
        </div>
    )
}
export default Jobs
