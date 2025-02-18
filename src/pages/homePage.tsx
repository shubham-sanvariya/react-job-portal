import DreamJob from "@/landingPage/dreamJob.tsx";
import Companies from "@/landingPage/companies.tsx";
import JobCategory from "@/landingPage/jobCategory.tsx";
import Working from "@/landingPage/working.tsx";
import Testimonials from "@/landingPage/testimonials.tsx";
import Subscribe from "@/landingPage/subscribe.tsx";

const HomePage = () => {
    return (
        <div className={'min-h-[100vh] bg-mine-shaft-950 font-[poppins]'}>
            <DreamJob/>
            <Companies/>
            <JobCategory/>
            <Working/>
            <Testimonials/>
            <Subscribe/>
        </div>
    )
}
export default HomePage
