import Sort from "@/components/findjobs/sort.tsx";

import {talents} from "@/Data/TalentData.tsx";
import TalentCard from "@/components/findTalent/talentCard.tsx";

const Talents = () => {
    return (
        <div className={'p-5'}>
            <div className={'flex justify-between'}>
                <div className={'text-2xl font-semibold'}>Talents</div>
                <Sort/>
            </div>
            <div className={'flex flex-wrap mt-10 gap-5 justify-between'}>
                {
                    talents.map((talent,index) => (
                <TalentCard key={index} {...talent}/>

                    ))
                }
            </div>
        </div>
    )
}
export default Talents
