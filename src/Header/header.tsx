import {IconAsset} from "@tabler/icons-react";

const Header = () => {
    return (
        <div className={'w-full text-white flex justify-between items-center p-6 bg-black h-28'}>
            <div className={'flex gap-3 items-center'}>
                <IconAsset className={'h-10 w-10'} stroke={1.25}/>
                <div className={'text-3xl font-bold'}>
                    iJobs
                </div>
            </div>
            <div>
                Links
            </div>
            <div>
                Profile
            </div>
        </div>
    )
}
export default Header
