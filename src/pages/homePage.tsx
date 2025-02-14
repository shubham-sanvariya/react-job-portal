import Header from "@/Header/header.tsx";
import DreamJob from "@/landingPage/dreamJob.tsx";
import Companies from "@/landingPage/companies.tsx";

const HomePage = () => {
    return (
        <div className={'min-h-[100vh] bg-mine-shaft-950 font-[poppins]'}>
            <Header/>
            <DreamJob/>
            <Companies/>
        </div>
    )
}
export default HomePage
