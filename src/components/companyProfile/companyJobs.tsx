import JobCard from "@/components/findjobs/jobCard.tsx";
import {useEffect, useRef, useState} from "react";
import {getJobsByCompanyName} from "@/services/jobService.tsx";
import {useParams} from "react-router-dom";
import axios from "axios";
import {JobType} from "@/types/jobType.ts";
import {errorNotification} from "@/services/notificationUtils.tsx";

const CompanyJobs = () => {
    const { name } = useParams();
    const ref = useRef(false);
    const [companyJobs, setCompanyJobs] = useState<JobType[] | null>(null);

    useEffect(() => {
        if (ref.current || !name) return;

        getJobsByCompanyName(name)
            .then(res => setCompanyJobs(res.content))
            .catch((err : unknown) => {
                if (axios.isAxiosError(err)){
                    errorNotification("Failed to fetch jobs of company",err.response?.data?.errorMessage);
                }else {
                    errorNotification("An unexpected error occurred","Something went wrong with the server");
                }
            })
        ref.current = true;
    }, [name]);

    return (
        <div className={'flex m-10' +
            ' flex-wrap gap-3'}>
            {
                companyJobs?.map((job, index) => <JobCard key={index} {...job}/>)
            }
        </div>
    )
}
export default CompanyJobs
