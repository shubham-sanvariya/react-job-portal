import Sort from "@/components/findjobs/sort.tsx";

import TalentCard from "@/components/findTalent/talentCard.tsx";
import {useSelector} from "react-redux";
import {selectUser} from "@/slices/userSlice.tsx";
import {useCallback, useEffect, useState} from "react";
import {ProfileType} from "@/types/profileType.ts";
import {getAllProfiles} from "@/services/profileService.tsx";

const Talents = () => {
    const userState = useSelector(selectUser);
    const [profiles, setProfiles] = useState<ProfileType[]>();

    const getAllApplicantProfiles = useCallback(
        async () => {
            const profilesData = await getAllProfiles();
            const filteredProfiles = profilesData?.filter(pro => pro.id !== Number(userState.id));
            setProfiles(filteredProfiles);
        },
        [],);

    useEffect(() => {
        getAllApplicantProfiles().then()
    }, []);
    return (
        <div className={'p-5'}>
            <div className={'flex justify-between'}>
                <div className={'text-2xl font-semibold'}>Talents</div>
                <Sort/>
            </div>
            <div className={'flex flex-wrap mt-10 gap-5 justify-between'}>
                {
                    profiles?.map((talent, index) => (
                        <TalentCard key={index} applicantProfile={talent}/>
                    ))
                }
            </div>
        </div>
    )
}
export default Talents
