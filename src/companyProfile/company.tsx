
import {Avatar, Divider, Tabs} from "@mantine/core";
import {IconMapPin} from "@tabler/icons-react";
import AboutCompany from "@/companyProfile/aboutCompany.tsx";

const Company = () => {
    return (
        <div className={'w-3/4'}>
            <div className={'relative'}>
                <img className={'rounded-t-2xl'} src={`src/assets/Profile/banner.jpg`} alt={""}/>
                <img
                    className={'w-48 h-48 mb-10 rounded-3xl p-2 -bottom-1/3 absolute left-5 border-8 border-mine-shaft-950 bg-mine-shaft-950'}
                    src={`src/assets/Icons/Google.png`} alt={""}/>
            </div>
            <div className={'px-3 mt-12'}>
                <div className={'flex justify-between text-3xl font-semibold '}>name
                    <Avatar.Group>
                        <Avatar src={'src/assets/avatar.png'}/>
                        <Avatar src={'src/assets/avatar1.png'}/>
                        <Avatar src={'src/assets/avatar2.png'}/>
                        <Avatar>+10K</Avatar>
                    </Avatar.Group>
                </div>
                <div className={'flex gap-1 text-xs text-mine-shaft-400 items-center'}>
                    <IconMapPin className={'h-5 w-5'} stroke={1.5}/> location
                </div>
            </div>
            <Divider mx={'xs'} my={"xl"}/>
            <div>
                <Tabs variant={"outline"} radius={"lg"} defaultValue={"about"}>
                    <Tabs.List className={'[&_button]:text-xl mb-5 font-semibold [&_button[data-active="true"]]:text-bright-sun-400'}>
                        <Tabs.Tab value={'about'}>About</Tabs.Tab>
                        <Tabs.Tab value={'jobs'}>Jobs</Tabs.Tab>
                        <Tabs.Tab value={'employees'}>Employees</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value={'about'}><AboutCompany/></Tabs.Panel>
                    <Tabs.Panel value={'jobs'}>Second Panel</Tabs.Panel>
                    <Tabs.Panel value={'employees'}>Emp</Tabs.Panel>
                </Tabs>
            </div>
        </div>
    )
}
export default Company
