import {Tabs} from "@mantine/core";
import PostedJobCard from "@/components/postedjob/postedJobCard.tsx";
import {useSelector} from "react-redux";
import {useState} from "react";
import {selectPostedJobs} from "@/slices/postedJobSlice.ts";

const PostedJob = () => {

    const [activeJob, setActiveJob] = useState<string | null>("ACTIVE");
    const postedJobsState = useSelector(selectPostedJobs);

    const getJobsByStatus = (status: string) => {
        if (postedJobsState) {
            return postedJobsState?.filter(job => job.jobStatus === status) ?? [];
        }
        return [];
    }

    return (
        <div className={'w-1/6 mt-5'}>
            <div className={'text-2xl font-semibold mb-5'}>
                Jobs
            </div>
            <div>
                <Tabs autoContrast variant={"pills"} value={activeJob} onChange={setActiveJob}>
                    <Tabs.List className={'font-medium [&_button[aria-selected="false"]]:bg-mine-shaft-900'}>
                        <Tabs.Tab value={'ACTIVE'}>Active {getJobsByStatus("ACTIVE")?.length}</Tabs.Tab>
                        <Tabs.Tab value={'DRAFT'}>Draft {getJobsByStatus("DRAFT")?.length}</Tabs.Tab>
                    </Tabs.List>
                </Tabs>

                <div className={'flex flex-col gap-5 mt-5'}>
                    {getJobsByStatus(activeJob ?? "").map((item, index) => (
                        <PostedJobCard key={index} {...item}/>
                    ))}
                </div>

            </div>
        </div>
    )
}
export default PostedJob
