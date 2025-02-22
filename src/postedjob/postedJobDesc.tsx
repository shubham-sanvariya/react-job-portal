import {Badge, Tabs} from "@mantine/core";
import JobDesc from "@/jobDesc/jobDesc.tsx";
import {talents} from "@/Data/TalentData.tsx";
import TalentCard from "@/findTalent/talentCard.tsx";

const PostedJobDesc = () => {
    return (
        <div className={'mt-5 w-3/4 px-5'}>
            <div className={'flex items-center text-2xl font-semibold mb-5'}>
                Software Engineer
                <Badge variant={'light'} ml={'sm'} size={"sm"} color={'bright-sun.4'}
                >
                    Badge
                </Badge>
            </div>
            <div className={'font-medium text-mine-shaft-300 mb-5'}>
                New York, United States
            </div>
            <div>
                <Tabs variant={"outline"} radius={"lg"} defaultValue={"overview"}>
                    <Tabs.List className={'[&_button]:!text-lg mb-5 font-semibold [&_button[data-active="true"]]:text-bright-sun-400'}>
                        <Tabs.Tab value={'overview'}>Overview</Tabs.Tab>
                        <Tabs.Tab value={'applicants'}>Applicants</Tabs.Tab>
                        <Tabs.Tab value={'invited'}>Invited</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel className="[&>div]:w-full" value={'overview'}><JobDesc edit/></Tabs.Panel>
                    <Tabs.Panel value={'applicants'}>
                        <div className={'flex justify-around flex-wrap mt-10 gap-5'}>
                            {
                                talents.map((talent,index) => index < 6 && (
                                    <TalentCard key={index} {...talent} posted/>

                                ))
                            }
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value={'invited'}>
                        <div className={'flex justify-around flex-wrap mt-10 gap-5'}>
                            {
                                talents.map((talent,index) => index < 6 && (
                                    <TalentCard key={index} {...talent} invited/>

                                ))
                            }
                        </div>
                    </Tabs.Panel>
                </Tabs>
            </div>
        </div>
    )
}
export default PostedJobDesc
