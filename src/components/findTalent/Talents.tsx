import Sort from "@/components/findjobs/sort.tsx";

import TalentCard from "@/components/findTalent/talentCard.tsx";

import useProfiles from "@/hooks/useProfiles.tsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {resetFieldFilter, selectFilteredFieldState} from "@/slices/filterSlice.ts";
import {ProfileType} from "@/types/profileType.ts";
import {AppDispatch} from "@/store.tsx";

const Talents = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { allProfileState } = useProfiles();
    const filteredFields = useSelector(selectFilteredFieldState);

    useEffect(() => {
        return () => {
            dispatch(resetFieldFilter());
        }
    }, [dispatch]);

    const filteredProfiles = useMemo(() => {
        if (!filteredFields && typeof filteredFields !== "object") return allProfileState;
        const keys = Object.keys(filteredFields);
        const check = new Array(keys.length).fill(false);
        return allProfileState.filter(profile => {
            keys.forEach((key, index) => {
                if (typeof profile[key as keyof ProfileType] === "string") {
                    check[index] = key === "name" ? profile[key].includes(filteredFields[key].toString()) : (filteredFields[key] as string[]).some((val: string) => val === profile[key as keyof ProfileType] as string);
                } else if (Array.isArray(filteredFields[key]) && typeof filteredFields[key][0] === "number" && typeof profile[key as keyof ProfileType] === "number") {
                    const s = filteredFields[key][0];
                    const j = profile[key as keyof ProfileType] as unknown as number;
                    check[index] = s <= j && filteredFields[key][1] >= profile[key as keyof ProfileType]
                } else if (Array.isArray(profile[key as keyof ProfileType])) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    check[index] = profile[key].some((field: string) => (filteredFields[key] as string[]).some(val => val === field));
                }

            })

            return check.every(val => val === true);
        })
    }, [filteredFields, allProfileState])

    return (
        <div className={'p-5'}>
            <div className={'flex justify-between'}>
                <div className={'text-2xl font-semibold'}>Talents</div>
                <Sort sortFor={"talents"} />
            </div>
            <div className={'flex flex-wrap mt-10 gap-5 justify-between'}>
                {
                    filteredProfiles?.length > 0 ? filteredProfiles
                        .map((talent, index) => (
                            <TalentCard key={index} applicantProfile={talent}/>
                        )) : <div className="text-xl font-semibold">
                        No Talents Founds
                    </div>
                }
            </div>
        </div>
    )
}
export default Talents
