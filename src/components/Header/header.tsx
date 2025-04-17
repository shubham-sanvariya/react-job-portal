import { Burger, Button, Drawer } from "@mantine/core";
import NavLinks from "@/components/Header/navLinks.tsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "@/components/Header/profileMenu.tsx";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/slices/userSlice.tsx";
import { AppDispatch } from "@/store.tsx";
import { getProfileAsyncThunk } from "@/slices/profileSlice.tsx";
import { useEffect, useRef } from "react";
import NotificationMenu from "@/components/Header/notificationMenu.tsx";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import useNavLinks from "@/hooks/useNavLinks.tsx";

const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const ref = useRef(false);
    const [opened, { open, close }] = useDisclosure(false);
    const { links } = useNavLinks();

    useEffect(() => {
        if (user?.profileId && !ref.current) {
            ref.current = true;
            dispatch(getProfileAsyncThunk(Number(user?.profileId)));
        }
    }, [dispatch, user?.profileId]);
    const location = useLocation();
    return location.pathname != '/signup' && location.pathname != '/login' ? (
        <div className={'w-full text-white flex justify-between items-center p-6 bg-mine-shaft-950 h-20 font-[poppins]'}>
            <div className={'flex gap-3 items-center text-bright-sun-400 cursor-pointer'} onClick={() => navigate("/")}>
                <img src="/assets/Fishing-Rod.svg" alt="SVG Icon" className="w-12 h-12" />
                <div className={'xs-mx:hidden text-3xl font-semibold'}>
                    JobFetch
                </div>
            </div>
            <NavLinks />
            <div className={'flex gap-3 items-center'}>
                {user ? <ProfileMenu /> : <Link to={'/login'}>
                    <Button variant={'subtle'} color={'bright-sun.4'}>
                        Login / Signup
                    </Button>
                </Link>}
                {user ? <NotificationMenu /> : null}
                {/*<div className={'bg-mine-shaft-900 p-1.5 rounded-full'}>*/}
                {/*    <IconSettings stroke={'1.5'}/>*/}
                {/*</div>*/}

                <Burger className="bs:hidden" opened={opened} onClick={open} aria-label="Toggle navigation" />
                <Drawer size={"xs"} overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} opened={opened} onClose={close} position={"right"} title="Authentication" closeButtonProps={{ icon: <IconX size={30} /> }}>
                    <div className={`flex flex-col gap-6 items-center`} onClick={(e) => {
                        const target = e.target as HTMLElement;
                        const targetDiv = target.closest("[datatype='child']")
                        if (targetDiv) close();
                    }}>
                        {links.map((link, index) => (
                            <div key={index}
                                className={`h-full flex items-center`} datatype={"child"}>
                                <Link to={`/${link.url}`} className="hover:text-bright-sun-400 text-xl">
                                    {link.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                </Drawer>
            </div>
        </div>
    ) : <></>
}
export default Header
