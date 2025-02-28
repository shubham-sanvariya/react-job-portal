import {Tabs} from "@mantine/core";

import {jobList} from "@/Data/JobsData.tsx";
import JobHistoryCard from "@/components/jobHistory/jobHistoryCard.tsx";

const JobHistory = () => {
    return (
        <div>
            <div className={'text-2xl font-semibold mb-5'}>
                Job History
            </div>
            <div>
                <Tabs variant={"outline"} radius={"lg"} defaultValue={"about"}>
                    <Tabs.List className={'[&_button]:text-xl mb-5 font-semibold [&_button[data-active="true"]]:text-bright-sun-400'}>
                        <Tabs.Tab value={'apply'}>Applied</Tabs.Tab>
                        <Tabs.Tab value={'saved'}>Saved</Tabs.Tab>
                        <Tabs.Tab value={'offered'}>Offered</Tabs.Tab>
                        <Tabs.Tab value={'interviewing'}>Interviewing</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value={'apply'}>
                        <div className={'flex flex-wrap mt-10 gap-5'}>
                        {
                            jobList.map((job, index) => (
                                <JobHistoryCard key={index} {...job} applied/>
                            ))
                        }
                    </div></Tabs.Panel>
                    <Tabs.Panel value={'saved'}>
                        <div className={'flex flex-wrap mt-10 gap-5'}>
                            {
                                jobList.map((job, index) => (
                                    <JobHistoryCard key={index} {...job} saved/>
                                ))
                            }
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value={'offered'}>
                        <div className={'flex flex-wrap mt-10 gap-5'}>
                            {
                                jobList.map((job, index) => (
                                    <JobHistoryCard key={index} {...job}
                                    offered
                                    />
                                ))
                            }
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value={'interviewing'}>
                        <div className={'flex flex-wrap mt-10 gap-5'}>
                            {
                                jobList.map((job, index) => (
                                    <JobHistoryCard key={index} {...job}
                                        interviewing
                                    />
                                ))
                            }
                        </div>
                    </Tabs.Panel>
                </Tabs>
            </div>
        </div>
    )
}
export default JobHistory
