import { IconBell, IconSettings} from "@tabler/icons-react";
import {Avatar} from "@mantine/core";

const Header = () => {
    return (
        <div className={'w-full text-white flex justify-between items-center p-6 bg-mine-shaft-950 h-28'}>
            <div className={'flex gap-3 items-center'}>
                <img src="src/assets/Fishing-Rod.svg" alt="SVG Icon" className="w-12 h-12"/>
                <div className={'text-3xl font-bold'}>
                    JobFetch
                </div>
            </div>
            <div className={'flex gap-4'}>
                <a href="">Find Job</a>
                <a href="">Find Talent</a>
                <a href="">Upload Jobs</a>
                <a href="">About Us</a>
            </div>
            <div className={'flex gap-5 items-center'}>
                <IconBell/>
                <div className={'flex items-center gap-2'}>
                    <div>
                        Marshal
                    </div>
                    <Avatar src={'avatar.png'} alt={"it's me"}/>
                </div>
                <IconSettings/>
            </div>
        </div>
    )
}
export default Header
