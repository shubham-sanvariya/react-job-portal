import {Tabs} from "@mantine/core";

import JobHistoryCard from "@/components/jobHistory/jobHistoryCard.tsx";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getJobsAsyncThunk, selectJobs} from "@/slices/jobSlice.ts";
import {AppDispatch} from "@/store.tsx";
import {JobType} from "@/types/jobType.ts";
import {selectUser} from "@/slices/userSlice.tsx";
import {selectProfile} from "@/slices/profileSlice.tsx";

const JobHistory = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [activeTab, setActiveTab] = useState<string>('APPLIED');
    const jobsState = useSelector(selectJobs);
    const userState = useSelector(selectUser);
    const profileState = useSelector(selectProfile);
    const [filteredJobs, setFilteredJobs] = useState<JobType[]>();
    const refConst = useRef(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!refConst.current){
            if (!jobsState || jobsState.length === 0) {
                dispatch(getJobsAsyncThunk({jobStatus:"ACTIVE"}));
            }
            else handleFilterByStatus(activeTab);
        }
        else if (activeTab === "SAVED") {
            handleSavedTab();
        }
         refConst.current = true;
    }, [dispatch, jobsState, activeTab,profileState]);

    const handleActiveTab = (value: string | null) => {
        setActiveTab(value ?? "");
        if (value === "SAVED") {
            handleSavedTab();
        } else {
            handleFilterByStatus(value);
        }
    }

    const handleSavedTab = () => {
        if (jobsState && jobsState.length > 0 && profileState?.id) {

            const list = jobsState.filter(job => {
                return profileState.savedJobs.includes(job.id);
            })
            setFilteredJobs(list);
        }
    }

    const handleFilterByStatus = (value: string | null) => {
        const list = jobsState?.filter(job => {
            return job.applicants?.some(applicant => {
                return applicant.applicantId === Number(userState?.id) && applicant.applicationStatus === value
            })
        })

        setFilteredJobs(list);
    }

    return (
        <div>
            <div className={'text-2xl font-semibold mb-5'}>
                Job History
            </div>
            <div>
                <Tabs variant={"outline"} onChange={handleActiveTab} radius={"lg"} value={activeTab}>
                    <Tabs.List
                        className={'[&_button]:text-xl mb-5 font-semibold [&_button[data-active="true"]]:text-bright-sun-400 sm-mx:[&_button]:!text-lg xs-mx:[&_button]:!text-base xsm-mx:[&_button]:!text-sm xs-mx:[&_button]:!px-1.5 xs-mx:[&_button]:!py-1.5 xs-mx:font-bold'}>
                        <Tabs.Tab value={'APPLIED'}>Applied</Tabs.Tab>
                        <Tabs.Tab value={'SAVED'}>Saved</Tabs.Tab>
                        <Tabs.Tab value={'OFFERED'}>Offered</Tabs.Tab>
                        <Tabs.Tab value={'INTERVIEWING'}>Ongoing</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value={activeTab}>
                        <div className={'flex flex-wrap mt-10 gap-5'}>
                            {
                                filteredJobs?.map((job, index) => (
                                    <JobHistoryCard key={index} job={job} jobStatus={activeTab}/>
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
