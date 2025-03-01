import {Menu, Avatar, Switch, rem} from '@mantine/core';
import {
    IconMessageCircle, IconUserCircle, IconFileText, IconMoon, IconSun, IconMoonStars, IconLogout2,
} from '@tabler/icons-react';
import { useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {removeUser, selectUser} from "@/slices/userSlice.tsx";

const ProfileMenu = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [opened, setOpened] = useState(false);
    const handleLogout = () => {
        dispatch(removeUser())
    }

    return (
        <Menu opened={opened} onChange={setOpened} shadow="md" width={200}>
            <Menu.Target>
                <div className={'flex items-center gap-2 cursor-pointer'}>
                    <div>
                        {user.name}
                    </div>
                    <Avatar src={'/src/assets/avatar.png'} alt={"it's me"}/>
                </div>
            </Menu.Target>

            <Menu.Dropdown onChange={() => setOpened(true)}>
                <Link to={'/profile'}>
                    <Menu.Item leftSection={<IconUserCircle size={14}/>}>
                        Profile
                    </Menu.Item>
                </Link>
                <Menu.Item leftSection={<IconMessageCircle size={14}/>}>
                    Messages
                </Menu.Item>
                <Menu.Item leftSection={<IconFileText size={14} style={{width: rem(14), height: rem(14)}}/>}>
                    Resume
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconMoon size={14}/>}
                    rightSection={
                        <Switch
                            checked={checked}
                            onChange={(e) => setChecked(e.currentTarget.checked)}
                            size={'md'} color={'dark.4'}
                            onLabel={
                                <IconSun stroke={2.5}
                                         style={{width: rem(16), height: rem(16)}}
                                         color={'yellow'}
                                />}
                            offLabel={<IconMoonStars
                                style={{width: rem(16), height: rem(16)}}
                                stroke={2.5}
                                color={'cyan'}
                            />}
                        />
                    }
                >
                    Dark Mode
                </Menu.Item>

                <Menu.Divider/>

                <Menu.Item
                    onClick={handleLogout}
                    color={'red'}
                    leftSection={<IconLogout2 style={{width: rem(14), height: rem(14)}} size={14}/>}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
export default ProfileMenu
