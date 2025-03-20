import DreamJob from "@/components/landingPage/dreamJob.tsx";
import Companies from "@/components/landingPage/companies.tsx";
import JobCategory from "@/components/landingPage/jobCategory.tsx";
import Working from "@/components/landingPage/working.tsx";
import Testimonials from "@/components/landingPage/testimonials.tsx";
import Subscribe from "@/components/landingPage/subscribe.tsx";

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
