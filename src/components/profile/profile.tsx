
import {Avatar, Divider, FileInput, Overlay} from "@mantine/core";
import {selectProfile, updateProfileAsyncThunk} from "@/slices/profileSlice.tsx";
import {useDispatch, useSelector} from "react-redux";
import Info from "@/components/profile/info.tsx";
import {AppDispatch} from "@/store.tsx";
import About from "@/components/profile/about.tsx";
import Skills from "@/components/profile/skills.tsx";
import Experience from "@/components/profile/experience.tsx";
import Certification from "@/components/profile/certification.tsx";
import {useHover} from "@mantine/hooks";
import {IconEdit} from "@tabler/icons-react";
import {ProfileType} from "@/types/profileType.ts";
import {successNotification} from "@/services/notificationServices.tsx";


const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const profileState = useSelector(selectProfile);
    const { hovered, ref } = useHover();

    const handleFileUpload = async (file: File | null) => {
        if (file == null) return;
        try {
            const picture = await getBase64(file);

            const updatedProfile = {...profileState, picture : picture.split(',')[1]};
            dispatch(updateProfileAsyncThunk(updatedProfile as ProfileType))
            successNotification("Success","Profile Picture Updated Successfully")
        } catch (error) {
            console.error('Error reading file:', error);
        }
    };

    const getBase64 = async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result); // Resolve with the base64 string
                } else {
                    reject(new Error('Failed to read file as base64.'));
                }
            };
            reader.onerror = (error) => reject(error); // Reject on error
        });
    };

    return (
        <div className={'w-4/5 mx-auto'}>
            <div className={'relative'}>
                <img className={'rounded-t-2xl'} src={`src/assets/Profile/banner.jpg`} alt={"profile"}/>
                <div ref={ref} className={'absolute flex items-center justify-center -bottom-1/4 left-3'}>
                    <Avatar className="!w-48 !h-48  border-mine-shaft-950 border-8 rounded-full" src={profileState?.picture?`data:image/jpeg;base64,${profileState.picture}`:'src/assets/avatar.png'}/>
                    {hovered && <Overlay className="!rounded-full" backgroundOpacity={0.75}/>}
                    {hovered && <IconEdit className={'absolute z-[300] !w-16 !h-16'}/>}
                    {hovered && <FileInput className={'absolute [&_*]:!rounded-full z-[301] [&_*]:!h-full !h-full w-full'}
                                           onChange={handleFileUpload}
                                           variant={'transparent'} accept={"image/*"}/> }
                </div>
            </div>
            <div className={'px-3 !mt-24'}>
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
                <Experience/>
            </div>
            <Divider mx={'xs'} my={"xl"}/>
                <Certification/>

        </div>
    )
}
export default Profile
