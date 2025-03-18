import {Button} from "@mantine/core";
import {Link, useNavigate} from "react-router-dom";
import {IconArrowLeft} from "@tabler/icons-react";
import Profile from "@/components/talentProfile/profile.tsx";
import RecommendTalent from "@/components/talentProfile/recommendTalent.tsx";


const TalentProfilePage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-[poppins] p-4">
            <Link className={'my-4 inline-block'} to={'/find-talent'}>
                <Button onClick={() => navigate(-1)} leftSection={<IconArrowLeft size={20}/>} color={'bright-sun.4'} variant={"light"}>
                    Back
                </Button>
            </Link>
            <div className={'flex gap-5'}>
                <Profile/>
                <RecommendTalent/>
            </div>
        </div>
    )
}
export default TalentProfilePage
