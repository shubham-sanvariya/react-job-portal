import {IconBell, IconSettings} from "@tabler/icons-react";
import { Indicator} from "@mantine/core";
import NavLinks from "@/components/Header/navLinks.tsx";
import {useLocation} from "react-router-dom";
import ProfileMenu from "@/components/Header/profileMenu.tsx";

const Header = () => {
    const location = useLocation();
    return location.pathname != '/signup' && location.pathname != '/login' ?(
        <div className={'w-full text-white flex justify-between items-center p-6 bg-mine-shaft-950 h-20 font-[poppins]'}>
            <div className={'flex gap-3 items-center text-bright-sun-400'}>
                <img src="../../assets/Fishing-Rod.svg" alt="SVG Icon" className="w-12 h-12"/>
                <div className={'text-3xl font-bold'}>
                    JobFetch
                </div>
            </div>
            <NavLinks/>
            <div className={'flex gap-3 items-center'}>
                <ProfileMenu/>
                <div className={'bg-mine-shaft-900 p-1.5 rounded-full'}>
                    <IconSettings stroke={'1.5'}/>
                </div>
                <div className={'bg-mine-shaft-900 p-1.5 rounded-full'}>
                    <Indicator color={'bright-sun.4'} offset={6} size={7} processing>
                        <IconBell stroke={'1.5'}/>
                    </Indicator>
                </div>
            </div>
        </div>
    ) : <></>
}
export default Header
