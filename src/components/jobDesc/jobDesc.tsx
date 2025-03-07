import {IconBookmark} from "@tabler/icons-react";
import {ActionIcon, Button, Divider} from "@mantine/core";
import {Link, useParams} from "react-router-dom";
import {card} from "@/Data/JobDescData.tsx";

import DOMPurify from "dompurify";
import {timeAgo} from "@/services/utilService.tsx";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {selectJobs} from "@/slices/jobSlice.ts";
import {JobType} from "@/types/jobType.ts";
import {getJobById} from "@/services/jobService.tsx";
import {formatJobValue} from "@/services/jobUtils.ts";

const JobDesc = () => {
    const {id} = useParams();
    const jobsState = useSelector(selectJobs);
    const [job, setJob] = useState<JobType>({
        about: "",
        applicants: [],
        company: "",
        description: "",
        experience: "",
        id: 0,
        jobTitle: "",
        jobType: "",
        location: "",
        packageOffered: 0,
        postTime: "",
        skillRequired: []
    });
    const [edit, setEdit] = useState(false);

    const hasFetched = useRef(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const cj = jobsState?.find((item) => item.id === Number(id));
        if (cj) {
            setJob(cj);
        } else {
            if (!hasFetched.current) {
                getJobDescById();
                hasFetched.current = true;
            }
        }
    }, [id]);

    const getJobDescById = async () => {
        const res = await getJobById(Number(id));
        setJob(res);

    }

    return (
        <div className={'w-2/3'}>
            <div className={'flex justify-between'}>
                <div className={'flex items-center gap-2'}>
                    <div className={'p-3 bg-mine-shaft-800 rounded-xl'}><img className={'h-14'}
                                                                             src={`/src/assets/Icons/${job?.company}.png`}
                                                                             alt="microsoft"/></div>
                    <div>
                        <div className={'font-semibold text-2xl'}>{job?.jobTitle}</div>
                        <div
                            className={'text-lg text-mine-shaft-300'}>{job?.company} &bull; {timeAgo(job?.postTime ?? "")} &bull;
                            &nbsp;
                            {job?.applicants ? job?.applicants.length : 0} Applicants
                        </div>
                    </div>
                </div>
                <div className={'flex flex-col items-center gap-2'}>
                    <Link to={`/apply-job/${job?.id}`}>
                        <Button size={"sm"} color={'bright-sun.4'} variant={"light"}>
                            Apply
                        </Button>
                    </Link>
                    {edit ?
                        <Button onClick={() => setEdit(true)} size={"sm"} color={'red.5'} variant={"outline"}>
                            Delete
                        </Button>
                        :
                        <IconBookmark className={'text-bright-sun-400 cursor-pointer'}/>
                    }
                </div>
            </div>
            <Divider my={'xl'}/>
            <div className={'flex justify-between'}>
                {
                    card.map((item, index: number) => (
                        <div key={index} className={'flex flex-col items-center gap-1 '}>
                            <ActionIcon color={'bright-sun.4'} className="!h-12 !w-12" variant="light" radius="xl"
                                        aria-label="Settings">
                                <item.icon className="h-4/5 w-4/5" stroke={1.5}/>
                            </ActionIcon>
                            <div className={'text-sm text-mine-shaft-300'}>{item.name}</div>
                            <div
                                className={'font-semibold'}>{formatJobValue(item.id,job)} {item.id === "packageOffered" && <>LPA</>}</div>
                        </div>
                    ))
                }
            </div>
            <Divider my={'xl'}/>
            <div>
                <div className={'text-xl font-semibold mb-5'}>
                    Required Skills
                </div>
                <div className={'flex flex-wrap gap-2'}>
                    {
                        job?.skillRequired?.map((skill : string, index: number) => (
                            <ActionIcon key={index} color={'bright-sun.4'}
                                        className="!text-sm !h-fit !w-fit font-medium" variant="light"
                                        radius="xl" p={"xs"}
                                        aria-label="Settings">
                                {skill}
                            </ActionIcon>
                        ))
                    }
                </div>
                <Divider my={'xl'}/>
                <div
                    className={'[&_h4]:text-xl [&_*]:text-mine-shaft-300 [&_li]: mb-1 [&_li]:marker:text-bright-sun-400 [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify'}
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(job.description)}}>

                </div>
                <Divider my={'xl'}/>
                <div>
                    <div className={'text-xl font-semibold mb-5'}>
                        About Company
                    </div>

                    <div className={'flex justify-between mb-3'}>
                        <div className={'flex items-center gap-2'}>
                            <div className={'p-3 bg-mine-shaft-800 rounded-xl'}><img className={'h-8'}
                                                                                     src={`/src/assets/Icons/Google.png`}
                                                                                     alt="microsoft"/></div>
                            <div>
                                <div className={'font-medium text-lg'}>{job.company}</div>
                                <div
                                    className={'text-lg text-mine-shaft-300'}>
                                    10K+ Employees
                                </div>
                            </div>
                        </div>

                        <Link to={`/company/${job.company}`}>
                            <Button color={'bright-sun.4'} variant={"light"}>
                                Company Page
                            </Button>
                        </Link>
                    </div>
                    <div className={'text-mine-shaft-300 text-justify'}>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default JobDesc
