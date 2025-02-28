import {IconBriefcase, IconMapPin} from "@tabler/icons-react";
import {Button, Divider} from "@mantine/core";
import ExpCard from "@/components/talentProfile/expCard.tsx";
import CertiCard from "@/components/talentProfile/certiCard.tsx";

const Profile = (props: any) => {
    return (
        <div className={'w-2/3'}>
            <div className={'relative'}>
                <img className={'rounded-t-2xl'} src={`src/assets/Profile/banner.jpg`} alt={""}/>
                <img
                    className={'w-48 h-48 mb-10 rounded-full -bottom-1/3 absolute left-3 border-8 border-mine-shaft-950'}
                    src={`src/assets/avatar.png`} alt={""}/>
            </div>
            <div className={'px-3 mt-16'}>
                <div className={'flex justify-between text-3xl font-semibold '}>{props.name}<Button
                    color={'bright-sun.4'} variant={"light"}>Message</Button></div>
                <div className={'text-xl flex gap-1 items-center'}><IconBriefcase
                    className={'h-5 w-5'}/> {props.role} &bull; {props.company}
                </div>
                <div className={'flex gap-1 text-xs text-mine-shaft-400 items-center'}>
                    <IconMapPin className={'h-5 w-5'} stroke={1.5}/> {props.location}
                </div>
            </div>
            <Divider mx={'xs'} my={"xl"}/>
            <div className={'px-3'}>
                <div className={'text-2xl font-semibold mb-3'}>About</div>
                <div className={'text-sm text-mine-shaft-300 text-justify'}>
                    {props.about}
                </div>
            </div>
            <Divider mx={'xs'} my={"xl"}/>
            <div className={'px-3'}>
                <div className={'text-2xl font-semibold mb-3'}>Skills</div>
                <div className={'flex flex-wrap gap-2'}>
                    {
                        props.skills.map((skill: string, index: number) => (
                            <div key={index}
                                 className={'bg-bright-sun-300 font-medium fow bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1'}>
                                {skill}
                            </div>
                        ))
                    }
                </div>
            </div>
            <Divider mx={'xs'} my={"xl"}/>
            <div className={'px-3'}>
                <div className={'text-2xl font-semibold mb-5'}>Experience</div>
                <div className={'flex flex-col gap-8'}>
                    {
                        props.experience.map((exp: object, index: number) => (
                            <ExpCard key={index} {...exp}/>
                        ))
                    }
                </div>
            </div>
            <Divider mx={'xs'} my={"xl"}/>
            <div className={'px-3'}>
                <div className={'text-2xl font-semibold mb-5'}>Certifications</div>
                <div className={'flex flex-col gap-8'}>
                    {
                        props.certifications.map((certi: object, index: number) => (
                            <CertiCard key={index} {...certi}/>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}
export default Profile
