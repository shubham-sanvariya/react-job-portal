import {Button} from "@mantine/core";
import NavLinks from "@/components/Header/navLinks.tsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import ProfileMenu from "@/components/Header/profileMenu.tsx";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "@/slices/userSlice.tsx";
import {AppDispatch} from "@/store.tsx";
import {getProfileAsyncThunk} from "@/slices/profileSlice.tsx";
import {useEffect} from "react";
import NotificationMenu from "@/components/Header/notificationMenu.tsx";

const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    useEffect(() => {
        if (user?.profileId) {
            dispatch(getProfileAsyncThunk(Number(user?.profileId)));
        }
    }, [dispatch, user?.profileId]);
    const location = useLocation();
    return location.pathname != '/signup' && location.pathname != '/login' ?(
        <div className={'w-full text-white flex justify-between items-center p-6 bg-mine-shaft-950 h-20 font-[poppins]'}>
            <div className={'flex gap-3 items-center text-bright-sun-400 cursor-pointer'} onClick={() => navigate("/")}>
                <img src="src/assets/Fishing-Rod.svg" alt="SVG Icon" className="w-12 h-12"/>
                <div className={'text-3xl font-bold'}>
                    JobFetch
                </div>
            </div>
            <NavLinks/>
            <div className={'flex gap-3 items-center'}>
                {user ? <ProfileMenu/> : <Link to={'/login'}>
                    <Button variant={'subtle'} color={'bright-sun.4'}>
                        Login / Signup
                    </Button>
                </Link>}
                {user ? <NotificationMenu/> : null}
                {/*<div className={'bg-mine-shaft-900 p-1.5 rounded-full'}>*/}
                {/*    <IconSettings stroke={'1.5'}/>*/}
                {/*</div>*/}
            </div>
        </div>
    ) : <></>
}
export default Header
