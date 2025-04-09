import {Indicator, Menu, Notification, rem} from "@mantine/core";
import {
    IconBell, IconCheck
} from "@tabler/icons-react";
import {useEffect, useRef, useState} from "react";
import {getAllNotificationByUserId, readNotificationById} from "@/services/notificationService.ts";
import {selectUser} from "@/slices/userSlice.tsx";
import {useSelector} from "react-redux";
import {NotificationType} from "@/types/notificationType.ts";
import {useNavigate} from "react-router-dom";

const NotificationMenu = () => {
    const navigate = useNavigate();
    const userState = useSelector(selectUser);
    const [opened, setOpened] = useState(false);
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const ref = useRef(false);

    useEffect(() => {
        if (!ref.current) {
            getAllNotificationByUserId(Number(userState?.id))
                .then(res => {
                    console.log(res);
                    setNotifications(res as NotificationType[]);
                }).catch(err => console.log(err)
            )
            ref.current = true;
        }
    }, [userState?.id]);

    const unRead = async (removeIndex: number) => {
        try {
            await readNotificationById(removeIndex);
            setNotifications((values) => {
                const res = values.filter((_, index) => index !== removeIndex);
                console.log(res);
                return res;
            })
        }catch (err : unknown){
            console.log(err);
        }
    };


    return (
        <Menu opened={opened} onChange={setOpened} shadow="md" width={400}>
            <Menu.Target>
                <div className={'bg-mine-shaft-900 p-1.5 rounded-full'}>
                    <Indicator disabled={notifications?.length===0} color={'bright-sun.4'} offset={6} size={7} processing>
                        <IconBell stroke={'1.5'}/>
                    </Indicator>
                </div>
            </Menu.Target>

            <Menu.Dropdown onChange={() => setOpened(true)}>
                <div className={'flex flex-col gap-1'}>
                    {
                        notifications?.map((item: NotificationType, index: number) => (
                            <Notification onClick={() => {
                                navigate(item.route);
                                setOpened(false);
                                unRead(index).then();
                            }} tabIndex={index} onClose={() => unRead(index)}
                                          className={'cursor-pointer hover:bg-mine-shaft-900'}
                                          icon={<IconCheck style={{width: rem(20), height: rem(20)}}/>} color="teal"
                                          title={item.action} mt="md">
                                {item.message}
                            </Notification>
                        ))
                    }
                    {
                        notifications?.length === 0 && (
                            <div className="text-center text-mine-shaft-300">
                                No Notifications
                            </div>
                        )
                    }
                </div>


                <Menu.Divider/>


            </Menu.Dropdown>
        </Menu>
    )
}
export default NotificationMenu
