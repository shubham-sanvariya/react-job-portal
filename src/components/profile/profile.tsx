import {IconBriefcase, IconDeviceFloppy, IconMapPin, IconPencil, IconPlus} from "@tabler/icons-react";
import {ActionIcon, Divider, TagsInput, Textarea} from "@mantine/core";
import CertiCard from "@/components/profile/certiCard.tsx";
import ExpCard from "@/components/profile/expCard.tsx";
import {profile} from "@/Data/TalentData.tsx";
import {useState} from "react";
import SelectInput from "@/components/profile/selectInput.tsx";
import fields from "@/Data/Profile.tsx";
import ExpInput from "@/components/profile/expInput.tsx";
import CertiInput from "@/components/profile/certiInput.tsx";


const Profile = () => {
    const [edit, setEdit] = useState<boolean[]>([false, false, false, false, false]);
    const [addExp, setAddExp] = useState(false);
    const [addCerti, setAddCerti] = useState(false);
    const [about, setAbout] = useState(profile.about);
    const [skills, setSkills] = useState(profile.skills);

    const handleEdit = (index: number) => {
        const editNew = [...edit];
        editNew[index] = !editNew[index];
        setEdit(editNew);
    }
    return (
        <div className={'w-4/5 mx-auto'}>
            <div className={'relative'}>
                <img className={'rounded-t-2xl'} src={`src/assets/Profile/banner.jpg`} alt={""}/>
                <img
                    className={'w-48 h-48 mb-10 rounded-full -bottom-1/3 absolute left-3 border-8 border-mine-shaft-950'}
                    src={`src/assets/avatar.png`} alt={""}/>
            </div>
            <div className={'px-3 mt-16'}>
                <div className={'flex justify-between text-3xl font-semibold '}>{profile.name}
                    <ActionIcon size={"lg"} color={'bright-sun.4'} variant={'subtle'}
                                onClick={() => handleEdit(0)}
                    >
                        {edit[0] ? <IconDeviceFloppy className={'h-4/5 w-4/5'}/> :
                            <IconPencil className={'h-4/5 w-4/5'}/>}
                    </ActionIcon>
                </div>
                {edit[0] ? <>
                        <div className={'flex gap-10 [&>*]:w-1/2'}>
                            <SelectInput {...fields[0]} />
                            <SelectInput {...fields[1]} />
                        </div>
                        <SelectInput {...fields[2]} />
                    </>
                    :
                    <>
                        <div className={'text-xl flex gap-1 items-center'}><IconBriefcase
                            className={'h-5 w-5'}/> {profile.role} &bull; {profile.company}
                        </div>
                        <div className={'flex gap-1 text-xs text-mine-shaft-400 items-center'}>
                            <IconMapPin className={'h-5 w-5'} stroke={1.5}/> {profile.location}
                        </div>
                    </>
                }
            </div>
            <Divider mx={'xs'} my={"xl"}/>
            <div className={'px-3'}>
                <div className={'flex justify-between text-2xl font-semibold mb-3'}>About
                    <ActionIcon size={"lg"} color={'bright-sun.4'} variant={'subtle'}
                                onClick={() => handleEdit(1)}
                    >
                        {edit[1] ? <IconDeviceFloppy className={'h-4/5 w-4/5'}/> :
                            <IconPencil className={'h-4/5 w-4/5'}/>}
                    </ActionIcon>
                </div>
                {edit[1] ? <Textarea
                        placeholder={'Enter About YourSelf...'}
                        minRows={3}
                        autosize
                        value={about}
                        onChange={(event) => setAbout(event.currentTarget.value)}
                    />
                    :
                    <div className={'text-sm text-mine-shaft-300 text-justify'}>
                        {about}
                    </div>
                }
            </div>
            <Divider mx={'xs'} my={"xl"}/>
            <div className={'px-3'}>
                <div className={'flex justify-between text-2xl font-semibold mb-3'}>Skills
                    <ActionIcon size={"lg"} color={'bright-sun.4'} variant={'subtle'}
                                onClick={() => handleEdit(2)}
                    >
                        {edit[2] ? <IconDeviceFloppy className={'h-4/5 w-4/5'}/> :
                            <IconPencil className={'h-4/5 w-4/5'}/>}
                    </ActionIcon>
                </div>
                {
                    edit[2] ? <TagsInput
                            value={skills}
                            onChange={setSkills}
                            placeholder={'Enter tag'}
                            splitChars={[',', ' ', '|']}
                        />
                        :
                        <div className={'flex flex-wrap gap-2'}>
                            {
                                skills.map((skill: string, index: number) => (
                                    <div key={index}
                                         className={'bg-bright-sun-300 font-medium fow bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1'}>
                                        {skill}
                                    </div>
                                ))
                            }
                        </div>
                }
            </div>
            <Divider mx={'xs'} my={"xl"}/>
            <div className={'px-3'}>
                <div className={'flex justify-between text-2xl font-semibold mb-5'}>Experience
                    <div className={'flex gap-2'}>
                        <ActionIcon size={"lg"} color={'bright-sun.4'} variant={'subtle'}
                                    onClick={() => setAddExp(true)}
                        >
                            <IconPlus
                                className="h-4/5 w-4/5"
                            />
                        </ActionIcon>
                        <ActionIcon size={"lg"} color={'bright-sun.4'} variant={'subtle'}
                                    onClick={() => handleEdit(3)}
                        >
                            {edit[3] ? <IconDeviceFloppy className={'h-4/5 w-4/5'}/> :
                                <IconPencil className={'h-4/5 w-4/5'}/>}
                        </ActionIcon>
                    </div>
                </div>
                <div className={'flex flex-col gap-8'}>
                    {
                        profile.experience.map((exp: object, index: number) => (
                            <ExpCard key={index} {...exp} edit={edit[3]}/>
                        ))
                    }
                    {addExp && <ExpInput add setEdit={setAddExp}/>}
                </div>
            </div>
            <Divider mx={'xs'} my={"xl"}/>
            <div className={'px-3'}>
                <div className={'flex justify-between text-2xl font-semibold mb-5'}>Certifications
                    <div className={'flex gap-2'}>
                        <ActionIcon size={"lg"} color={'bright-sun.4'} variant={'subtle'}
                                    onClick={() => setAddCerti(true)}
                        >
                            <IconPlus
                                className="h-4/5 w-4/5"
                            />
                        </ActionIcon>
                        <ActionIcon size={"lg"} color={'bright-sun.4'} variant={'subtle'}
                                    onClick={() => handleEdit(4)}
                        >
                            {edit[4] ? <IconDeviceFloppy className={'h-4/5 w-4/5'}/> :
                                <IconPencil className={'h-4/5 w-4/5'}/>}
                        </ActionIcon>
                    </div>
                </div>
                <div className={'flex flex-col gap-8'}>
                    {
                        profile.certifications.map((certi: object, index: number) => (
                            <CertiCard key={index} edit={edit[4]} {...certi}/>
                        ))
                    }
                    {
                       addCerti && <CertiInput setEdit={setAddCerti}/>
                    }
                </div>
            </div>

        </div>
    )
}
export default Profile
