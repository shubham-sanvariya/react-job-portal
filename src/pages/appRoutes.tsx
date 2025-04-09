import Header from "@/components/Header/header.tsx";
import {Divider} from "@mantine/core";
import {BrowserRouter, Route, Routes} from "react-router-dom";
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
import ProtectedRoute from "@/pages/protectedRoute.tsx";

const AppRoutes = () => {
    const user = useSelector(selectUser);

    return (
        <BrowserRouter>
            <div className={'relative'}>
                <Header/>
                <Divider size={'xs'}/>
                <Routes>
                    <Route element={<ProtectedRoute role={"APPLICANT"}/>}>
                        <Route path={'/find-jobs'} element={<FindJobs/>}/>
                        <Route path={'/job-history'} element={<JobHistoryPage/>}/>
                        <Route path={'/apply-job/:id'} element={<ApplyJobPage/>}/>
                        <Route path={'/jobs/:id'} element={<JobDescPage/>}/>
                        <Route path={'*'} element={<HomePage/>}/>
                    </Route>
                    <Route element={<ProtectedRoute role={"EMPLOYER"}/>}>
                        <Route path={'/find-talent'} element={<FindTalent/>}/>
                        <Route path={'/talent-profile/:id'} element={<TalentProfilePage/>}/>
                        <Route path={`/posted-jobs/:id?`} element={<PostedJobPage/>}/>
                        <Route path={'/post-job/:id?'} element={<PostJobPage/>}/>
                        <Route path={'*'} element={<HomePage/>}/>
                    </Route>
                    <Route element={<ProtectedRoute/>}>
                        <Route path={'/company/:name'} element={<CompanyPage/>}/>
                        <Route path={'/profile'} element={<ProfilePage/>}/>
                    </Route>
                    <Route path={'/signup'} element={user ? <HomePage/> : <SignUpPage/>}/>
                    <Route path={'/login'} element={user ? <HomePage/> : <SignUpPage/>}/>
                </Routes>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}

export default AppRoutes;
