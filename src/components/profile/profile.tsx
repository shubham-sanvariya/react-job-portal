import {IconDeviceFloppy, IconPencil, IconPlus} from "@tabler/icons-react";
import {ActionIcon, Divider} from "@mantine/core";
import CertiCard from "@/components/profile/certiCard.tsx";
import ExpCard from "@/components/profile/expCard.tsx";
import {useEffect, useState} from "react";
import ExpInput from "@/components/profile/expInput.tsx";
import CertiInput from "@/components/profile/certiInput.tsx";
import {getProfileAsyncThunk, selectProfile} from "@/slices/profileSlice.tsx";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "@/slices/userSlice.tsx";
import {Certification, Experience} from "@/types/profileType.ts";
import Info from "@/components/profile/info.tsx";
import {AppDispatch} from "@/store.tsx";
import About from "@/components/profile/about.tsx";
import Skills from "@/components/profile/skills.tsx";


const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector(selectUser);
    const profileState = useSelector(selectProfile);
    const [edit, setEdit] = useState<boolean[]>([false, false, false, false, false]);
    const [addExp, setAddExp] = useState(false);
    const [addCerti, setAddCerti] = useState(false);
    // const [profileState, setProfileState] = useState<ProfileType | null>(ps);

    const handleEdit = (index: number) => {
        const editNew = [...edit];
        editNew[index] = !editNew[index];
        setEdit(editNew);
    }

    useEffect(() => {
        if (userState.profileId) {
            dispatch(getProfileAsyncThunk(Number(userState.profileId)));
        }
    }, [dispatch, userState.profileId]);

    useEffect(()=>{
        console.log(profileState)
    },[profileState])

    return (
        <div className={'w-4/5 mx-auto'}>
            <div className={'relative'}>
                <img className={'rounded-t-2xl'} src={`src/assets/Profile/banner.jpg`} alt={""}/>
                <img
                    className={'w-48 h-48 mb-10 rounded-full -bottom-1/3 absolute left-3 border-8 border-mine-shaft-950'}
                    src={`src/assets/avatar.png`} alt={""}/>
            </div>
            <div className={'px-3 mt-16'}>
                <Info/>
            </div>
            <Divider mx={'xs'} my={"xl"}/>
            <div className={'px-3'}>
                <About/>
            </div>
            <Divider mx={'xs'} my={"xl"}/>
            <div className={'px-3'}>
                <Skills/>
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
                        profileState?.experiences?.map((exp: Experience, index: number) => (
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
                        profileState?.certificates?.map((certi: Certification, index: number) => (
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
