import MultiInput from "@/findjobs/multiInput.tsx";
import {dropdownData} from "@/Data/JobsData.tsx";
import {Divider} from "@mantine/core";

const SearchBar = () => {
    return (
        <div className={'flex px-5 py-8'}>
            {
                dropdownData.map((item, index) =>
                    <>
                        <div key={index} className={'w-1/5'}>
                            <MultiInput {...item} />
                        </div>
                        <Divider mr={'xs'} size={'xs'} orientation={'vertical'}/>
                    </>
                )
            }
        </div>
    )
}
export default SearchBar
