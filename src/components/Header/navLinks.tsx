import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "@/slices/userSlice.tsx";

const NavLinks = () => {
    const userState = useSelector(selectUser);
    const links = userState.accountType === "APPLICANT" ? [
        {name: "Find Jobs", url: "find-jobs"},
        {name: "Job History", url: "job-history"},
    ] : [
        {name: "Find Talent", url: "find-talent"},
        {name: "Post Jobs", url: "post-job"},
        {name: "Posted Job", url: "posted-jobs"},
    ]

    const location = useLocation();

    return (
        <div className={'flex items-center gap-5 h-full  text-mine-shaft-300'}>
            {links.map((link, index) => (
                <div key={index}
                     className={`${location.pathname == "/" + link.url ? "border-bright-sun-400 text-bright-sun-400" : "border-transparent"} flex items-center border-t-[3px] h-full`}>
                    <Link to={`/${link.url}`}>
                        {link.name}
                    </Link>
                </div>
            ))}
        </div>
    )
}
export default NavLinks
