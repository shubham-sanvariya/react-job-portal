import Header from "@/Header/header.tsx";
import DreamJob from "@/landingPage/dreamJob.tsx";

const HomePage = () => {
    return (
        <div className={'min-h-[100vh] bg-mine-shaft-950 font-[poppins]'}>
            <Header/>
            <DreamJob/>
        </div>
    )
}
export default HomePage
