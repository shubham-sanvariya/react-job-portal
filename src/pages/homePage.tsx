import Header from "@/Header/header.tsx";
import DreamJob from "@/landingPage/dreamJob.tsx";
import Companies from "@/landingPage/companies.tsx";
import JobCategory from "@/landingPage/jobCategory.tsx";
import Working from "@/landingPage/working.tsx";
import Testimonials from "@/landingPage/testimonials.tsx";

const HomePage = () => {
    return (
        <div className={'min-h-[100vh] bg-mine-shaft-950 font-[poppins]'}>
            <Header/>
            <DreamJob/>
            <Companies/>
            <JobCategory/>
            <Working/>
            <Testimonials/>
        </div>
    )
}
export default HomePage
