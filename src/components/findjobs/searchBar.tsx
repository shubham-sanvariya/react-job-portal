import MultiInput from "@/components/findjobs/multiInput.tsx";
import {dropdownData} from "@/Data/JobsData.tsx";
import {Button, Collapse, Divider, RangeSlider, RangeSliderValue} from "@mantine/core";
import React, {useState} from "react";
import {useDebouncedCallback, useDisclosure, useMediaQuery} from "@mantine/hooks";
import {updateFieldFilter} from "@/slices/filterSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store.tsx";

const SearchBar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [value, setValue] = useState<[number, number]>([1, 200]);
    const [opened, {toggle}] = useDisclosure(false);
    const matches = useMediaQuery('(max-width: 475px)');

    const debounceValue = useDebouncedCallback((packageRange: [number, number]) => {
        dispatch(updateFieldFilter({key: "packageOffered", value: packageRange}));
    }, 500);

    const handleSalaryRange = (e: RangeSliderValue) => {
        debounceValue(e);
        setValue(e);
    }

    return (
        <div>
            <div className={'flex justify-end'}>
                {matches && <Button onClick={toggle} my={"sm"} radius={"lg"} variant={"outline"}
                         color={'bright-sun.4'}>{opened ? "Close" : "Filters"}</Button>}
            </div>
            <Collapse in={(opened || !matches)} >
                <div className={'flex px-5 py-8 mr-4 lg-mx:!flex-wrap items-center !text-mine-shaft-100'}>
                    {
                        dropdownData.map((item, index) =>
                            <React.Fragment key={index}>
                                <div key={index} className={'w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%]'}>
                                    <MultiInput {...item} />
                                </div>
                                <Divider className={'sm-mx:hidden'} mr={'xs'} size={'xs'} orientation={'vertical'}/>
                            </React.Fragment>
                        )
                    }
                    <div
                        className={'w-1/5 lg-mx:mt-7 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] [&_.mantine-Slider-label]:!translate-y-10'}>
                        <div className={'flex text-sm justify-between'}>
                            <div>Salary</div>
                            <div>&#8377;{value[0]} LPA - &#8377;{value[1]} LPA</div>
                        </div>
                        <RangeSlider size={'xs'} color={'bright-sun.4'} minRange={1} min={1} max={200} value={value}
                                     onChange={(e) => handleSalaryRange(e)} labelTransitionProps={{
                            transition: "skew-down",
                            duration: 150,
                            timingFunction: 'linear'
                        }}
                        />
                    </div>
                </div>
            </Collapse>

        </div>

    )
}
export default SearchBar
