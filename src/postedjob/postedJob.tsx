import {Tabs} from "@mantine/core";
import CompanyJobs from "@/companyProfile/companyJobs.tsx";
import {activeJobs} from "@/Data/PostedJob.tsx";
import PostedJobCard from "@/postedjob/postedJobCard.tsx";

const PostedJob = () => {
    return (
        <div className={'w-1/6 mt-5'}>
            <div className={'text-2xl font-semibold mb-5'}>
                Jobs
            </div>
            <div>
                <Tabs autoContrast variant={"pills"}  defaultValue={"active"}>
                    <Tabs.List className={'font-medium [&_button[aria-selected="false"]]:bg-mine-shaft-900'}>
                        <Tabs.Tab value={'active'}>Active</Tabs.Tab>
                        <Tabs.Tab value={'draft'}>Jobs</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value={'active'}>
                        <div className={'flex flex-col gap-5 mt-5'}>
                            {activeJobs.map((item,index) => (
                                <PostedJobCard key={index} {...item}/>
                            ))}
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value={'draft'}><CompanyJobs/></Tabs.Panel>
                </Tabs>
            </div>
        </div>
    )
}
export default PostedJob
