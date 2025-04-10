import {useSelector} from "react-redux";
import {selectUser} from "@/slices/userSlice.tsx";

const UseNavLinks = () => {
    const userState = useSelector(selectUser);

    const links = userState?.accountType === "APPLICANT" ? [
        {name: "Find Jobs", url: "find-jobs"},
        {name: "Job History", url: "job-history"},
    ] : [
        {name: "Find Talent", url: "find-talent"},
        {name: "Post Jobs", url: "post-job"},
        {name: "Posted Job", url: "posted-jobs"},
    ]

    return  { links };
}
export default UseNavLinks
