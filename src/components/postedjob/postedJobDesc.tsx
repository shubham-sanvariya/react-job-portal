import {Badge, Tabs} from "@mantine/core";
import JobDesc from "@/components/jobDesc/jobDesc.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectPostedJobs} from "@/slices/postedJobSlice.ts";
import {useEffect, useState} from "react";
import {JobInitialValues, JobStatusEnum} from "@/types/jobType.ts";
import ApplicantTalentCard from "@/components/findTalent/applicantTalentCard.tsx";


const PostedJobDesc = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const postedJobsState = useSelector(selectPostedJobs);
    const [job, setJob] = useState(JobInitialValues);
    const [activeTab, setActiveTab] = useState<string | null>("overview");

    useEffect(() => {
        let firstJobId: number | undefined;

        if (postedJobsState && postedJobsState.length > 0) {
            firstJobId = postedJobsState[0].id;
        }

        // Navigate only if ID is undefined and we have a first job
        if (!id && firstJobId) {
            navigate(`/posted-jobs/${firstJobId}`, { replace: true });
            return; // Prevent further execution in this effect
        }

        const foundJob = postedJobsState?.find(job => job.id === Number(id));

        if (foundJob) {
            setJob(foundJob);
        }
    }, [id, navigate, postedJobsState]);

    const handleJobStatus = () => {
        if (activeTab === "applicants"){
            return JobStatusEnum.APPLIED;
        }else if (activeTab === "invited"){
            return JobStatusEnum.INTERVIEWING;
        }else return JobStatusEnum.OFFERED;
    }

    const filteredTalents = job?.applicants?.filter(job => job.applicationStatus === handleJobStatus());

    return (
        <div className={'mt-5 w-3/4 px-5'}>
            {job.jobTitle? <>
                <div className={'flex items-center text-2xl font-semibold mb-5'}>
                    {job.jobTitle}
                    <Badge variant={'light'} ml={'sm'} size={"sm"} color={'bright-sun.4'}
                    >
                        {job.jobStatus}
                    </Badge>
                </div>
                <div className={'font-medium text-mine-shaft-300 mb-5'}>
                    {job.location}
                </div>
                <div>
                    <Tabs variant={"outline"} radius={"lg"} onChange={setActiveTab} value={activeTab}>
                        <Tabs.List
                            className={'[&_button]:!text-lg mb-5 font-semibold [&_button[data-active="true"]]:text-bright-sun-400'}>
                            <Tabs.Tab value={'overview'}>Overview</Tabs.Tab>
                            <Tabs.Tab value={'applicants'}>Applicants</Tabs.Tab>
                            <Tabs.Tab value={'invited'}>Invited</Tabs.Tab>
                            <Tabs.Tab value={'offered'}>Offered</Tabs.Tab>
                            <Tabs.Tab value={'rejected'}>Rejected</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel className="[&>div]:w-full" value={'overview'}>
                            <JobDesc edit={true} closed={job.jobStatus === "CLOSED"}/>
                        </Tabs.Panel>

                        {activeTab !== "overview" && <Tabs.Panel value={activeTab ?? ""}>
                            <div className={'flex justify-around flex-wrap mt-10 gap-5'}>
                                {
                                    filteredTalents?.length === 0 ? <div className={'text-2xl font-semibold'}>
                                            No {activeTab} Candidates
                                        </div> :
                                        filteredTalents?.map((talent, index) => (
                                            <ApplicantTalentCard key={index} applicant={talent}
                                                                 jobStatus={handleJobStatus()}/>
                                        ))
                                }
                            </div>
                        </Tabs.Panel>}
                    </Tabs>
                </div>
            </> : <div className="flex justify-center items-center font-semibold text-2xl min-h-[70vh]">
                Job Not Found
            </div>}
        </div>
    )
}
export default PostedJobDesc
