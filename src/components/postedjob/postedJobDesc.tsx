import {Badge, Tabs} from "@mantine/core";
import JobDesc from "@/components/jobDesc/jobDesc.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectPostedJobs} from "@/slices/postedJobSlice.ts";
import {useEffect, useState, useMemo, useCallback} from "react";
import {JobInitialValues, ApplicationStatusEnum} from "@/types/jobType.ts";
import ApplicantTalentCard from "@/components/findTalent/applicantTalentCard.tsx";


const PostedJobDesc = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const postedJobsState = useSelector(selectPostedJobs);
    const [job, setJob] = useState(JobInitialValues);
    const [activeTab, setActiveTab] = useState<string | null>("overview");

    useEffect(() => {
        if (!id){
            let firstJobId: number | undefined;

            if (postedJobsState && postedJobsState.length > 0) {
                firstJobId = postedJobsState[0].id;
            }

            // Navigate only if ID is undefined and we have a first job
            if (firstJobId) {
                navigate(`/posted-jobs/${firstJobId}`, { replace: true });
                return; // Prevent further execution in this effect
            }
        }
    }, [id,postedJobsState]);

    useEffect(() => {
        const foundJob = postedJobsState?.find(job => job.id === Number(id));

        if (foundJob) {
            setJob(foundJob);
        }
        return () => {}
    }, [id, postedJobsState]);

    const handleJobStatus = useCallback(() => {
        if (activeTab === "applicants"){
            return ApplicationStatusEnum.APPLIED;
        }else if (activeTab === "invited"){
            return ApplicationStatusEnum.INTERVIEWING;
        }else return ApplicationStatusEnum.OFFERED;
    },[activeTab])

    const filteredTalents = useMemo(() => {
        return job?.applicants?.filter(applicant => applicant.applicationStatus === handleJobStatus()) ?? [];
    }, [job?.applicants, handleJobStatus]);

    return (
        <div className={'mt-5 w-3/4 px-5 md-mx:w-full md-mx:p-0 md-mx:-mt-4'}>
            {job.jobTitle? <>
                <div className={'flex items-center text-2xl font-semibold mb-5 xs-mx:text-xl'}>
                    {job.jobTitle}
                    <Badge variant={'light'} ml={'sm'} size={"sm"} color={'bright-sun.4'}
                    >
                        {job.jobStatus}
                    </Badge>
                </div>
                <div className={'font-medium text-mine-shaft-300 mb-5 xs-mx:text-sm'}>
                    {job.location}
                </div>
                <div>
                    <Tabs variant={"outline"} radius={"lg"} onChange={setActiveTab} value={activeTab}>
                        <Tabs.List
                            className={'[&_button]:text-xl mb-5 font-semibold [&_button[data-active="true"]]:text-bright-sun-400 sm-mx:[&_button]:!text-lg xs-mx:[&_button]:!text-base xsm-mx:[&_button]:!text-sm xs-mx:[&_button]:!px-1.5 xs-mx:[&_button]:!py-1.5 xs-mx:font-bold'}>
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
