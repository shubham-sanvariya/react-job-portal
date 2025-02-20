import {createTheme, MantineProvider} from '@mantine/core'
import './App.css'

import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import HomePage from "@/pages/homePage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "@/Header/header.tsx";
import Footer from "@/footer/footer.tsx";
import FindJobs from "@/pages/findJobs.tsx";
import FindTalent from "@/pages/findTalent.tsx";
import TalentProfilePage from "@/pages/talentProfilePage.tsx";

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
        <MantineProvider defaultColorScheme={"dark"} theme={theme}>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path={'/find-jobs'} element={<FindJobs/>}/>
                    <Route path={'/find-talent'} element={<FindTalent/>}/>
                    <Route path={'/post-job'} element={<div></div>}/>
                    <Route path={'/talent-profile'} element={<TalentProfilePage/>}/>
                    <Route path={'*'} element={<HomePage/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </MantineProvider>
    )
}

export default App
