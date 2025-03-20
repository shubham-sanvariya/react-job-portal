import {Divider} from "@mantine/core";
import Profile from "@/components/profile/profile.tsx";

const ProfilePage = () => {
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-[poppins] overflow-hidden">
            <Divider mx={'md'} mb={'xl'}/>
            <Profile/>
        </div>
    )
}
export default ProfilePage
