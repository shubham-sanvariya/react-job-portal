import {IconBriefcase, IconMapPin} from "@tabler/icons-react";
import {Avatar, Button, Divider} from "@mantine/core";
import ExpCard from "@/components/talentProfile/expCard.tsx";
import CertiCard from "@/components/talentProfile/certiCard.tsx";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@/store.tsx";
import {getApplicantProfileAsyncThunk, selectApplicantProfile} from "@/slices/applicantProfile.ts";
import {useCallback, useEffect} from "react";
import {CertificationType} from "@/types/profileType.ts";
import banner from '@/assets/Profile/banner.jpg';

const Profile = () => {
    const {id} = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const profileApplicantState = useSelector(selectApplicantProfile);
    const getApplicantProfileByApplicantId = useCallback(async () => {
        if (id) {
            dispatch(getApplicantProfileAsyncThunk(Number(id)));
        }
    }, [dispatch, id]);

    useEffect(() => {
        getApplicantProfileByApplicantId().then();
        console.log(profileApplicantState);
    }, [id]);


    return (profileApplicantState &&
        <div className={'w-2/3 mx-auto'}>
            <div className={'relative'}>
                <img className={'rounded-t-2xl'} src={banner} alt={"banner"}/>
                <div className={'absolute flex items-center justify-center -bottom-1/4 left-3'}>
                    <Avatar className="!w-48 !h-48  border-mine-shaft-950 border-8 rounded-full"
                            src={profileApplicantState?.picture ? `data:image/jpeg;base64,${profileApplicantState.picture}` : 'src/assets/avatar.png'}/>
                </div>
            </div>
            <div className={'px-3 mt-16'}>
                <div className={'flex justify-between text-3xl font-semibold '}>{profileApplicantState.name}<Button
                    color={'bright-sun.4'} variant={"light"}>Message</Button></div>
                <div className={'text-xl flex gap-1 items-center'}><IconBriefcase
                    className={'h-5 w-5'}/> {profileApplicantState.jobTitle} &bull; {profileApplicantState.company}
                </div>
                <div className={'flex gap-1 text-lg text-mine-shaft-400 items-center'}>
                    <IconMapPin className={'h-5 w-5'} stroke={1.5}/> {profileApplicantState.location}
                </div>
                <div className={'flex gap-1 text-lg text-mine-shaft-400 items-center'}>
                    <IconBriefcase className={'h-5 w-5'} stroke={1.5}/> Experience: {profileApplicantState.totalExperience} {profileApplicantState.totalExperience > 1 ? "years" : "year"}
                </div>
            </div>
            <Divider mx={'xs'} my={"xl"}/>
            <div className={'px-3'}>
                <div className={'text-2xl font-semibold mb-3'}>About</div>
                <div className={'text-sm text-mine-shaft-300 text-justify'}>
                    {profileApplicantState.about}
                </div>
            </div>
            <Divider mx={'xs'} my={"xl"}/>
            <div className={'px-3'}>
                <div className={'text-2xl font-semibold mb-3'}>Skills</div>
                <div className={'flex flex-wrap gap-2'}>
                    {
                        profileApplicantState.skills.map((skill: string, index: number) => (
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
                        profileApplicantState.experiences.map((exp: object, index: number) => (
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
                        profileApplicantState.certificates.map((certi: CertificationType, index: number) => (
                            <CertiCard key={index} {...certi}/>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}
export default Profile
