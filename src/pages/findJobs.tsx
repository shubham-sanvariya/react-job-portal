import SearchBar from "@/findjobs/searchBar.tsx";
import {Divider} from "@mantine/core";

const FindJobs = () => {
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-[poppins]">
            <Divider mr={'md'} size={'xs'}/>
            <SearchBar/>
        </div>
    )
}
export default FindJobs
