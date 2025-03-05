
import {Divider} from "@mantine/core";
import {useEffect} from "react";
import {getProfileAsyncThunk} from "@/slices/profileSlice.tsx";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "@/slices/userSlice.tsx";
import Info from "@/components/profile/info.tsx";
import {AppDispatch} from "@/store.tsx";
import About from "@/components/profile/about.tsx";
import Skills from "@/components/profile/skills.tsx";
import Experience from "@/components/profile/experience.tsx";
import Certification from "@/components/profile/certification.tsx";


const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector(selectUser);

    useEffect(() => {
        if (userState.profileId) {
            dispatch(getProfileAsyncThunk(Number(userState.profileId)));
        }
    }, [dispatch, userState.profileId]);

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
                <Experience/>
            </div>
            <Divider mx={'xs'} my={"xl"}/>
                <Certification/>

        </div>
    )
}
export default Profile
