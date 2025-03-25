import MultiInput from "@/components/findjobs/multiInput.tsx";
import {dropdownData} from "@/Data/JobsData.tsx";
import {Divider, RangeSlider, RangeSliderValue} from "@mantine/core";
import React, {useState} from "react";
import {useDebouncedCallback} from "@mantine/hooks";
import {updateFieldFilter} from "@/slices/filterSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store.tsx";

const SearchBar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [value, setValue] = useState<[number, number]>([1, 200]);
    const debounceValue = useDebouncedCallback((packageRange : [number,number]) => {
        dispatch(updateFieldFilter({ key: "packageOffered", value: packageRange }));
    },500)

    const handleSalaryRange = (e : RangeSliderValue ) => {
        debounceValue(e);
        setValue(e);
    }

    return (
        <div className={'flex px-5 py-8'}>
            {
                dropdownData.map((item, index) =>
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
                    <div>Salary</div>
                    <div>&#8377;{value[0]} LPA - &#8377;{value[1]} LPA</div>
                </div>
                <RangeSlider size={'xs'} color={'bright-sun.4'} minRange={1} min={1} max={200} value={value} onChange={(e) => handleSalaryRange(e)} labelTransitionProps={{
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
