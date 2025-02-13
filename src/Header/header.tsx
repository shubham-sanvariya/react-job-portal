import {IconBell, IconSettings} from "@tabler/icons-react";
import {Avatar, Indicator} from "@mantine/core";

const Header = () => {
    return (
        <div className={'w-full text-white flex justify-between items-center p-6 bg-mine-shaft-950 h-20'}>
            <div className={'flex gap-3 items-center text-bright-sun-400'}>
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
            <div className={'flex gap-3 items-center'}>
                <div className={'flex items-center gap-2'}>
                    <div>
                        Marshal
                    </div>
                    <Avatar src={'avatar.png'} alt={"it's me"}/>
                </div>
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
    )
}
export default Header
