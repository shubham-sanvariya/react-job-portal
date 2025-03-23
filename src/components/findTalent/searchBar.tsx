import MultiInput from "@/components/findjobs/multiInput.tsx";
import {Divider, Input, RangeSlider, RangeSliderValue} from "@mantine/core";
import {ChangeEvent, useState} from "react";
import {searchFields} from "@/Data/TalentData.tsx";
import {IconUserCircle} from "@tabler/icons-react";
import React from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store.tsx";
import {updateFieldFilter} from "@/slices/filterSlice.ts";
import { useDebouncedCallback } from "@mantine/hooks";

const SearchBar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [value, setValue] = useState<[number, number]>([0, 50]);
    const [talentName, setTalentName] = useState("");

    const debounceName = useDebouncedCallback((name : string) => {
        dispatch(updateFieldFilter({ key: "name", value: name }));
    },500)

    const debounceValue = useDebouncedCallback((expRange : [number,number]) => {
        dispatch(updateFieldFilter({ key: "exp", value: expRange }));
    },500)

    const handleFieldChange = (e: RangeSliderValue | ChangeEvent<HTMLInputElement>, field: string) => {
        if (field === "exp" && Array.isArray(e)) {
            debounceValue(e);
            setValue(e);
        } else {
            if ("target" in e) {
                debounceName(e.target.value)
                setTalentName(e.target.value);
            }
        }
    }

    return (
        <div className={'flex items-center px-5 py-8 !text-mine-shaft-100'}>
            <div className={'flex items-center'}>
                <div className={'text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2'}><IconUserCircle
                    size={20}/>
                </div>
                <Input value={talentName} onChange={(event) => handleFieldChange(event, "name")}
                       className={'[&_input]:!placeholder-mine-shaft-300'} variant={'unstyled'}
                       placeholder={'Talent Name'}/>
            </div>
            {
                searchFields.map((item, index) =>
                    <React.Fragment key={index}>
                        <div key={index} className={'w-1/5'}>
                            <MultiInput {...item} />
                        </div>
                        <Divider mr={'xs'} size={'xs'} orientation={'vertical'}/>
                    </React.Fragment>
                )
            }
            <div className={'w-1/5 [&_.mantine-Slider-label]:!translate-y-10'}>
                <div className={'flex text-sm justify-between'}>
                    <div>Experience (years)</div>
                    <div>&#8377;{value[0]} - {value[1]} </div>
                </div>
                <RangeSlider size={'xs'} color={'bright-sun.4'} min={0} max={50} value={value}
                             onChange={(e) => handleFieldChange(e, "exp")} labelTransitionProps={{
                    transition: "skew-down",
                    duration: 150,
                    timingFunction: 'linear'
                }}
                />
            </div>
        </div>
    )
}
export default SearchBar
