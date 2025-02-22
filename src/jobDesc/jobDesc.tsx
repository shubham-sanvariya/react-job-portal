import {IconBookmark} from "@tabler/icons-react";
import {ActionIcon, Button, Divider} from "@mantine/core";
import {Link} from "react-router-dom";
import {card, desc, skills} from "@/Data/JobDescData.tsx";

import DOMPurify from "dompurify";

const JobDesc = () => {

    return (
        <div className={'w-2/3'}>
            <div className={'flex justify-between'}>
                <div className={'flex items-center gap-2'}>
                    <div className={'p-3 bg-mine-shaft-800 rounded-xl'}><img className={'h-14'}
                                                                             src={`/src/assets/Icons/Google.png`}
                                                                             alt="microsoft"/></div>
                    <div>
                        <div className={'font-semibold text-2xl'}>jobTitle</div>
                        <div
                            className={'text-lg text-mine-shaft-300'}>company &bull; applicants &bull; Applicants
                        </div>
                    </div>
                </div>
                <div className={'flex flex-col items-center gap-2'}>
                    <Link to={'/apply-job'}>
                        <Button size={"sm"} color={'bright-sun.4'} variant={"light"}>
                            Apply
                        </Button>
                    </Link>
                    <IconBookmark className={'text-bright-sun-400 cursor-pointer'}/>
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
                            <div className={'font-semibold'}>{item.value}</div>
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
                        skills.map((item, index: number) => (
                            <ActionIcon key={index} color={'bright-sun.4'}
                                        className="!text-sm !h-fit !w-fit font-medium" variant="light"
                                        radius="xl" p={"xs"}
                                        aria-label="Settings">
                                {item}
                            </ActionIcon>
                        ))
                    }
                </div>
                <Divider my={'xl'}/>
                <div
                    className={'[&_h4]:text-xl [&_*]:text-mine-shaft-300 [&_li]: mb-1 [&_li]:marker:text-bright-sun-400 [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify'}
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(desc)}}>

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
                                <div className={'font-medium text-lg'}>jobTitle</div>
                                <div
                                    className={'text-lg text-mine-shaft-300'}>company &bull; applicants &bull; Applicants
                                </div>
                            </div>
                        </div>

                        <Link to={'/company'}>
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
