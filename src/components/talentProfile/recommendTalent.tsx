import {talents} from "@/Data/TalentData.tsx";
import TalentCard from "@/components/findTalent/talentCard.tsx";

const RecommendTalent = () => {
    return (
        <div>
            <div className={'text-xl font-semibold mb-5'}>
                Recommended Talent
            </div>
            <div className={'flex flex-col flex-wrap justify-between gap-5 '}>
                {
                    talents.map((talent,index) => index < 4 && (
                        <TalentCard key={index} {...talent}/>
                    ))
                }
            </div>
        </div>
    )
}
export default RecommendTalent
