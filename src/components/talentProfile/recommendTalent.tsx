import TalentCard from "@/components/findTalent/talentCard.tsx";
import useProfiles from "@/hooks/useProfiles.tsx";


const RecommendTalent = () => {

    const { allProfileState } = useProfiles();

    return (
        <div>
            <div className={'text-xl font-semibold mb-5'}>
                Recommended Talent
            </div>
            <div className={'flex flex-col flex-wrap justify-between gap-5 '}>
                {
                    allProfileState
                        .map((talent,index) => index < 4 && (
                        <TalentCard key={index} applicantProfile={talent} />
                    ))
                }
            </div>
        </div>
    )
}
export default RecommendTalent
