import {jobList} from "@/Data/JobsData.tsx";
import JobCard from "@/findjobs/jobCard.tsx";

const CompanyJobs = () => {
    return (
        <div className={'flex m-10' +
            ' flex-wrap gap-3'}>
            {
                jobList.map((job,index) => <JobCard key={index} {...job}/>)
            }
        </div>
    )
}
export default CompanyJobs
