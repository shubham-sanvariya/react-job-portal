import {talents} from "@/Data/TalentData.tsx";
import TalentCard from "@/components/findTalent/talentCard.tsx";

const CompanyEmployees = () => {
    return (
        <div className={'flex flex-wrap mt-10 gap-10'}>
            {
                talents.map((talent,index) => index < 6 && (
                    <TalentCard key={index} {...talent}/>

                ))
            }
        </div>
    )
}
export default CompanyEmployees
