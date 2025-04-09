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
import {useEffect} from "react";
import NotFoundPage from "@/pages/notFoundPage.tsx";

const AppRoutes = () => {
    const user = useSelector(selectUser);
    useEffect(() => {
        console.log(user);
    }, [user]);
    return (
        <BrowserRouter>
            <div className={'relative'}>
                {user !== null ? (<>
                    <Header/>
                    <Divider size={'xs'}/>
                </>) : null
            }
                <Routes>
                    <Route element={<ProtectedRoute role={"APPLICANT"}/>}>
                        <Route path={'/find-jobs'} element={<FindJobs/>}/>
                        <Route path={'/job-history'} element={<JobHistoryPage/>}/>
                        <Route path={'/apply-job/:id'} element={<ApplyJobPage/>}/>
                        <Route path={'/jobs/:id'} element={<JobDescPage/>}/>
                        <Route path={'*'} element={<NotFoundPage/>}/>
                    </Route>
                    <Route element={<ProtectedRoute role={"EMPLOYER"}/>}>
                        <Route path={'/find-talent'} element={<FindTalent/>}/>
                        <Route path={'/talent-profile/:id'} element={<TalentProfilePage/>}/>
                        <Route path={`/posted-jobs/:id?`} element={<PostedJobPage/>}/>
                        <Route path={'/post-job/:id?'} element={<PostJobPage/>}/>
                        <Route path={'*'} element={<NotFoundPage/>}/>
                    </Route>
                    <Route element={<ProtectedRoute/>}>
                        <Route path={'/'} element={<HomePage/>}/>
                        <Route path={'/company/:name'} element={<CompanyPage/>}/>
                        <Route path={'/profile'} element={<ProfilePage/>}/>
                    </Route>
                    <Route path={'/signup'} element={user?.id ? <HomePage/> : <SignUpPage/>}/>
                    <Route path={'/login'} element={user?.id ? <HomePage/> : <SignUpPage/>}/>
                </Routes>
                {user !== null ?
                    <Footer/> : null}
            </div>
        </BrowserRouter>
    )
}

export default AppRoutes;
