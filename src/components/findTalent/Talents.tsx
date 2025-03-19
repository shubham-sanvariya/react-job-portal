import Sort from "@/components/findjobs/sort.tsx";

import TalentCard from "@/components/findTalent/talentCard.tsx";

import useProfiles from "@/hooks/useProfiles.tsx";
import {useSelector} from "react-redux";
import {selectUser} from "@/slices/userSlice.tsx";

const Talents = () => {
    const userState = useSelector(selectUser);
    const { profiles } = useProfiles();

    return (
        <div className={'p-5'}>
            <div className={'flex justify-between'}>
                <div className={'text-2xl font-semibold'}>Talents</div>
                <Sort/>
            </div>
            <div className={'flex flex-wrap mt-10 gap-5 justify-between'}>
                {
                    profiles?.filter(pro => pro.id !== userState.profileId)
                        .map((talent, index) => (
                        <TalentCard key={index} applicantProfile={talent}/>
                    ))
                }
            </div>
        </div>
    )
}
export default Talents
