import SignUp from "@/signUpLogin/signUp.tsx";
import Login from "@/signUpLogin/login.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {IconArrowLeft} from "@tabler/icons-react";
import {Button} from "@mantine/core";

const SignUpPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-[poppins] overflow-hidden">
            <Button onClick={() => navigate("/")} my={"md"}
                    className="!absolute left-5 z-10" leftSection={<IconArrowLeft size={20}/>}
                    color={'bright-sun.4'} variant={"light"}>
                Home
            </Button>
            <div className={`flex [&>*]:flex-shrink-0 w-[100vw] h-[100vh] transition-all ease-in-out duration-1000 ${location.pathname === '/signup' ? '-translate-x-1/2 ' : 'translate-x-0'}`}>
            <Login/>
                <div
                    className={`flex flex-col justify-center items-center gap-5 w-1/2 h-full transition-all duration-1000  ease-in-out bg-mine-shaft-900 ${location.pathname==='/signup'?'rounded-r-[200px]' : 'rounded-l-[200px]'}`}>
                    <div className={'flex gap-3 items-center text-bright-sun-400'}>
                        <img src="src/assets/Fishing-Rod.svg" alt="SVG Icon" className="w-16 h-16"/>
                        <div className={'text-6xl font-bold'}>
                            JobFetch
                        </div>
                    </div>
                    <div className="text-2xl text-mine-shaft-200 font-semibold">
                        Find the job made for you
                    </div>
                </div>
                <SignUp/>
            </div>
        </div>
    )
}
export default SignUpPage
