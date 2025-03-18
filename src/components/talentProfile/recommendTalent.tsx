import TalentCard from "@/components/findTalent/talentCard.tsx";
import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {ProfileType} from "@/types/profileType.ts";
import {getAllProfiles} from "@/services/profileService.tsx";

const RecommendTalent = () => {
    const {id} = useParams();
    const [profiles, setProfiles] = useState<ProfileType[]>();

    const getAllApplicantProfiles = useCallback(
        async () => {
            const profilesData = await getAllProfiles();
            const filteredProfiles = profilesData?.filter(pro => pro.id !== Number(id));
            setProfiles(filteredProfiles);
        },
        [id],
    );

    useEffect(() => {
        getAllApplicantProfiles().then()
    }, []);

    return (
        <div>
            <div className={'text-xl font-semibold mb-5'}>
                Recommended Talent
            </div>
            <div className={'flex flex-col flex-wrap justify-between gap-5 '}>
                {
                    profiles?.map((talent,index) => index < 4 && (
                        <TalentCard key={index} applicantProfile={talent} />
                    ))
                }
            </div>
        </div>
    )
}
export default RecommendTalent
