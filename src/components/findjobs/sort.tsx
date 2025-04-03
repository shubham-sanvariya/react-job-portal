import React, {useState} from 'react';
import {Combobox, useCombobox} from '@mantine/core';
import {IconAdjustments} from "@tabler/icons-react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store.tsx";
import {getJobsAsyncThunk} from "@/slices/jobSlice.ts";

interface SortProps {
    sortFor : string;
}

const Sort : React.FC<SortProps> =  ( { sortFor } ) => {
    const dispatch = useDispatch<AppDispatch>();

    const opts = sortFor === "jobs" ? [
        'Relevance',
        'Most Recent',
        'Salary (Low to High)',
        'Salary (High to Low)'
    ] : [
        'Relevance',
        'Exp (Low to High)',
        'Exp (High to Low)'
    ];
    const [selectedItem, setSelectedItem] = useState<string | null>('Relevance');
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const options = opts.map((item) => (
        <Combobox.Option className="!text-xs" value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    const handleRelevanceJobs = (relevance: string) => {
        let sort: string;
        if (relevance === opts[1]) {
            sort = "postTime,desc"
        } else if (relevance === opts[2]) {
            sort = "packageOffered,asc"
        } else if (relevance === opts[3]) {
            sort = "packageOffered,desc"
        } else {
            dispatch(getJobsAsyncThunk({jobStatus: "ACTIVE"}))
            return;
        }

        dispatch(getJobsAsyncThunk({jobStatus: "ACTIVE", sort}))
    }

    const handleRelevanceExperience = (relevance: string) => {
        let sort: string;
        if (relevance === opts[1]) {
            sort = "totalExperience,asc"
        } else if (relevance === opts[2]) {
            sort = "totalExperience,desc"
        } else {
            dispatch(getJobsAsyncThunk({jobStatus: "ACTIVE"}))
            return;
        }

        dispatch(getJobsAsyncThunk({jobStatus: "ACTIVE", sort}))
    }

    return (
        <>
            <Combobox
                store={combobox}
                width={250}
                position="bottom-start"
                onOptionSubmit={(val) => {
                    if (sortFor === "jobs") {
                        handleRelevanceJobs(val)
                    } else {
                        handleRelevanceExperience(val);
                    }
                    setSelectedItem(val);
                    combobox.closeDropdown();
                }}
            >
                <Combobox.Target>
                    <div onClick={() => combobox.toggleDropdown()}
                         className={'flex items-center gap-2 px-2 py-1 text-sm rounded-xl border border-bright-sun-400 cursor-pointer'}>
                        {selectedItem}<IconAdjustments className="h-5 w-5 text-bright-sun-400"/>
                    </div>
                </Combobox.Target>

                <Combobox.Dropdown>
                    <Combobox.Options>{options}</Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </>
    );
}
export default Sort
