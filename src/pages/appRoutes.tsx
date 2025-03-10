import Header from "@/components/Header/header.tsx";
import {Divider} from "@mantine/core";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import FindJobs from "@/pages/findJobs.tsx";
import FindTalent from "@/pages/findTalent.tsx";
import JobDescPage from "@/pages/jobDescPage.tsx";
import ApplyJobPage from "@/pages/applyJobPage.tsx";
import CompanyPage from "@/pages/companyPage.tsx";
import PostJobPage from "@/pages/postJobPage.tsx";
import SignUpPage from "@/pages/signUpPage.tsx";
import ProfilePage from "@/pages/profilePage.tsx";
import PostedJobPage from "@/pages/postedJobPage.tsx";
import JobHistoryPage from "@/pages/jobHistoryPage.tsx";
import TalentProfilePage from "@/pages/talentProfilePage.tsx";
import HomePage from "@/pages/homePage.tsx";
import Footer from "@/components/footer/footer.tsx";
import {useSelector} from "react-redux";
import {selectUser} from "@/slices/userSlice.tsx";

const AppRoutes = () => {
    const user = useSelector(selectUser);

    return (
        <BrowserRouter>
            <div className={'relative'}>
                <Header/>
                <Divider size={'xs'}/>
                <Routes>
                    <Route path={'/find-jobs'} element={<FindJobs/>}/>
                    <Route path={'/find-talent'} element={<FindTalent/>}/>
                    <Route path={'/jobs/:id'} element={<JobDescPage/>}/>
                    <Route path={'/apply-job/:id'} element={<ApplyJobPage/>}/>
                    <Route path={'/company/:name'} element={<CompanyPage/>}/>
                    <Route path={'/post-job'} element={<PostJobPage/>}/>
                    <Route path={'/signup'} element={user ? <Navigate to={'/'}/> :<SignUpPage/>}/>
                    <Route path={'/login'} element={user ? <Navigate to={'/'}/> :<SignUpPage/>}/>
                    <Route path={'/profile'} element={<ProfilePage/>}/>
                    <Route path={'/posted-jobs/:id'} element={<PostedJobPage/>}/>
                    <Route path={'/job-history'} element={<JobHistoryPage/>}/>
                    <Route path={'/talent-profile'} element={<TalentProfilePage/>}/>
                    <Route path={'*'} element={<HomePage/>}/>
                </Routes>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}

export default AppRoutes;
