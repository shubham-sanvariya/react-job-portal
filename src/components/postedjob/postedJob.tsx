import {Tabs} from "@mantine/core";
import PostedJobCard from "@/components/postedjob/postedJobCard.tsx";
import {useSelector} from "react-redux";
import {useMemo, useState} from "react";
import {selectPostedJobs} from "@/slices/postedJobSlice.ts";

const PostedJob = () => {

    const [activeJob, setActiveJob] = useState<string | null>("ACTIVE");
    const postedJobsState = useSelector(selectPostedJobs);

    const activeJobs = useMemo(() => {
        return postedJobsState?.filter(job => job.jobStatus === "ACTIVE") ?? [];
    },[postedJobsState])

    const draftJobs = useMemo(() => {
        return postedJobsState?.filter(job => job.jobStatus === "DRAFT") ?? [];
    },[postedJobsState])

    const closedJobs = useMemo(() => {
        return postedJobsState?.filter(job => job.jobStatus === "CLOSED") ?? [];
    },[postedJobsState])

    const filteredJobs = useMemo(() => {
        return postedJobsState?.filter(job => job.jobStatus === activeJob) ?? [];
    },[activeJob, postedJobsState])

    return (
        <div className={'w-1/6 mt-5'}>
            <div className={'text-2xl font-semibold mb-5'}>
                Jobs
            </div>
            <div>
                <Tabs autoContrast variant={"pills"} value={activeJob} onChange={setActiveJob}>
                    <Tabs.List className={'font-medium [&_button[aria-selected="false"]]:bg-mine-shaft-900'}>
                        <Tabs.Tab value={'ACTIVE'}>Active {activeJobs?.length}</Tabs.Tab>
                        <Tabs.Tab value={'DRAFT'}>Draft {draftJobs?.length}</Tabs.Tab>
                        <Tabs.Tab value={'CLOSED'}>Closed {closedJobs?.length}</Tabs.Tab>
                    </Tabs.List>
                </Tabs>

                <div className={'flex flex-col gap-5 mt-5'}>
                    {filteredJobs.map((item, index) => (
                        <PostedJobCard key={index} {...item}/>
                    ))}
                </div>

            </div>
        </div>
    )
}
export default PostedJob
