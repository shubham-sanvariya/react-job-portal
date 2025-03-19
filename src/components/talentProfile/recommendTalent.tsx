import TalentCard from "@/components/findTalent/talentCard.tsx";
import {useParams} from "react-router-dom";
import useProfiles from "@/hooks/useProfiles.tsx";


const RecommendTalent = () => {
    const {id} = useParams();

    const { profiles} = useProfiles();

    return (
        <div>
            <div className={'text-xl font-semibold mb-5'}>
                Recommended Talent
            </div>
            <div className={'flex flex-col flex-wrap justify-between gap-5 '}>
                {
                    profiles?.filter(pro => pro.id !== Number(id))
                        .map((talent,index) => index < 4 && (
                        <TalentCard key={index} applicantProfile={talent} />
                    ))
                }
            </div>
        </div>
    )
}
export default RecommendTalent
