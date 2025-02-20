import {Divider} from "@mantine/core";
import SearchBar from "@/findTalent/searchBar.tsx";
import Talents from "@/findTalent/Talents.tsx";

const FindTalent = () => {
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-[poppins]">
            <SearchBar/>
            <Divider size={'xs'} mx={'md'}/>
            <Talents/>
        </div>
    )
}
export default FindTalent
