import SearchBar from "@/components/findjobs/searchBar.tsx";
import {Divider} from "@mantine/core";
import Jobs from "@/components/findjobs/jobs.tsx";

const FindJobs = () => {
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-[poppins]">
            <SearchBar/>
            <Divider mr={'md'} size={'xs'}/>
            <Jobs/>
        </div>
    )
}
export default FindJobs
