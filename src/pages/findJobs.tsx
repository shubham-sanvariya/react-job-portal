import SearchBar from "@/findjobs/searchBar.tsx";
import {Divider} from "@mantine/core";
import Jobs from "@/findjobs/jobs.tsx";

const FindJobs = () => {
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-[poppins]">
            <Divider mr={'md'} size={'xs'}/>
            <SearchBar/>
            <Divider mr={'md'} size={'xs'}/>
            <Jobs/>
        </div>
    )
}
export default FindJobs
