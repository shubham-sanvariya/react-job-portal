    import { useState } from 'react';
    import { Combobox, useCombobox} from '@mantine/core';
    import {IconAdjustments} from "@tabler/icons-react";

const Sort = () => {
    const opts = [
        'Relevance',
        'Most Recent',
        'Salary (Low to High)',
        'Salary (High to Low)'
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

    return (
        <>
            <Combobox
                store={combobox}
                width={250}
                position="bottom-start"
                onOptionSubmit={(val) => {
                    setSelectedItem(val);
                    combobox.closeDropdown();
                }}
            >
                <Combobox.Target>
                    <div onClick={() => combobox.toggleDropdown()} className={'flex items-center gap-2 px-2 py-1 text-sm rounded-xl border border-bright-sun-400 cursor-pointer'}>
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
