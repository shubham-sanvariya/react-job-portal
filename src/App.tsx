import {createTheme, Divider, MantineProvider} from '@mantine/core'
import './App.css'

import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css';
import HomePage from "@/pages/homePage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "@/components/Header/header.tsx";
import Footer from "@/components/footer/footer.tsx";
import FindJobs from "@/pages/findJobs.tsx";
import FindTalent from "@/pages/findTalent.tsx";
import TalentProfilePage from "@/pages/talentProfilePage.tsx";
import PostJobPage from "@/pages/postJobPage.tsx";
import JobDescPage from "@/pages/jobDescPage.tsx";
import ApplyJobPage from "@/pages/applyJobPage.tsx";
import CompanyPage from "@/pages/companyPage.tsx";
import PostedJobPage from "@/pages/postedJobPage.tsx";
import JobHistoryPage from "@/pages/jobHistoryPage.tsx";
import SignUpPage from "@/pages/signUpPage.tsx";
import ProfilePage from "@/pages/profilePage.tsx";
import {Notifications} from "@mantine/notifications";
import {Provider} from "react-redux";
import store from "@/store.tsx";

function App() {

    const theme = createTheme({
        focusRing: "never",
        fontFamily: 'poppins, san-serif',
        primaryColor: 'bright-sun',
        primaryShade: 4,
        colors: {
            'mine-shaft': [
                '#f6f6f6',
                '#e7e7e7',
                '#d1d1d1',
                '#b0b0b0',
                '#888888',
                '#6d6d6d',
                '#5d5d5d',
                '#4f4f4f',
                '#454545',
                '#3d3d3d',
                '#2d2d2d',
            ],
            'bright-sun': [
                '#fffbeb',
                '#fff3c6',
                '#ffe588',
                '#ffd149',
                '#ffbd20',
                '#f99b07',
                '#dd7302',
                '#b75006',
                '#943c0c',
                '#7a330d',
                '#461902',
            ],
        },
    })

    return (
        <Provider store={store}>
            <MantineProvider defaultColorScheme={"dark"} theme={theme}>
                <Notifications position={"top-center"} zIndex={1000}/>
                <BrowserRouter>
                    <div className={'relative'}>
                        <Header/>
                        <Divider size={'xs'}/>
                        <Routes>
                            <Route path={'/find-jobs'} element={<FindJobs/>}/>
                            <Route path={'/find-talent'} element={<FindTalent/>}/>
                            <Route path={'/jobs'} element={<JobDescPage/>}/>
                            <Route path={'/apply-job'} element={<ApplyJobPage/>}/>
                            <Route path={'/company'} element={<CompanyPage/>}/>
                            <Route path={'/post-job'} element={<PostJobPage/>}/>
                            <Route path={'/signup'} element={<SignUpPage/>}/>
                            <Route path={'/login'} element={<SignUpPage/>}/>
                            <Route path={'/profile'} element={<ProfilePage/>}/>
                            <Route path={'/posted-job'} element={<PostedJobPage/>}/>
                            <Route path={'/job-history'} element={<JobHistoryPage/>}/>
                            <Route path={'/talent-profile'} element={<TalentProfilePage/>}/>
                            <Route path={'*'} element={<HomePage/>}/>
                        </Routes>
                        <Footer/>
                    </div>
                </BrowserRouter>
            </MantineProvider>
        </Provider>

    )
}

export default App
