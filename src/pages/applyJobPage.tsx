import {Button} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {IconArrowLeft} from "@tabler/icons-react";
import ApplyJobComp from "@/components/applyJob/applyJobComp.tsx";


const ApplyJobPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-[poppins] p-4">
            <Button onClick={() => navigate(-1)} my={"md"} leftSection={<IconArrowLeft size={20}/>} color={'bright-sun.4'}
                    variant={"light"}>
                Back
            </Button>
            <ApplyJobComp/>
        </div>
    )
}
export default ApplyJobPage
