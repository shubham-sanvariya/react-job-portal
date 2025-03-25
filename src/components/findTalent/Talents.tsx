import Sort from "@/components/findjobs/sort.tsx";

import TalentCard from "@/components/findTalent/talentCard.tsx";

import useProfiles from "@/hooks/useProfiles.tsx";
import {useSelector} from "react-redux";
import {selectUser} from "@/slices/userSlice.tsx";
import {useEffect, useMemo} from "react";
import {selectFilteredFieldState} from "@/slices/filterSlice.ts";

const Talents = () => {
    const { profiles } = useProfiles();
    const userState = useSelector(selectUser);
    const filteredFields = useSelector(selectFilteredFieldState);

    const filteredProfiles = useMemo(() => {
        if (!filteredFields && typeof filteredFields !== "object") return profiles;
        const keys = Object.keys(filteredFields);
        const check = new Array(keys.length).fill(false);
        return profiles.filter(profile => {
            keys.forEach((key,index) => {
                if (typeof profile[key] === "string" ){
                    check[index] = key === "name" ? profile[key].includes(filteredFields[key].toString()) : (filteredFields[key] as string[]).some((val : string) => val === profile[key]);
                }else if (Array.isArray(filteredFields[key]) && typeof filteredFields[key][0] === "number"){
                    check[index] = filteredFields[key][0] <= profile[key] && filteredFields[key][1] >= profile[key]
                }else if (Array.isArray(profile[key])){
                    check[index] = profile[key].some((field : string) => (filteredFields[key] as string[]).some(val => val === field));
                }
            })

            return check.every(val => val === true);
        })
    },[filteredFields, profiles])

    return (
        <div className={'p-5'}>
            <div className={'flex justify-between'}>
                <div className={'text-2xl font-semibold'}>Talents</div>
                <Sort/>
            </div>
            <div className={'flex flex-wrap mt-10 gap-5 justify-between'}>
                {
                    filteredProfiles?.filter(pro => pro.id !== userState.profileId)
                        .map((talent, index) => (
                        <TalentCard key={index} applicantProfile={talent}/>
                    ))
                }
            </div>
        </div>
    )
}
export default Talents
