import {IconCalendarMonth, IconHeart, IconMapPin} from "@tabler/icons-react";
import {Avatar, Button, Divider, Modal, Text} from "@mantine/core";
import {Link} from "react-router-dom";
import {useDisclosure} from "@mantine/hooks";
import {DateInput, TimeInput} from "@mantine/dates";
import {useRef, useState} from "react";

const TalentCard = (props: any) => {
    const [value, setValue] = useState<Date | null>(null);
    const [opened, {open, close}] = useDisclosure(false);
    const ref = useRef<HTMLInputElement>(null);

    return (
        <div
            className={'flex flex-col gap-3 rounded-xl bg-mine-shaft-900 p-4 w-96 hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400'}>
            <div className={'flex justify-between'}>
                <div className={'flex items-center gap-2'}>
                    <div className={'p-2 bg-mine-shaft-800 rounded-full'}><Avatar size={"lg"}
                                                                                  src={`/src/assets/${props.image}.png`}
                                                                                  alt="microsoft"/></div>
                    <div className={'flex flex-col gap-1'}>
                        <div className={'font-semibold text-lg'}>{props.name}</div>
                        <div
                            className={'text-sm text-mine-shaft-300'}>{props.role} &bull; {props.company}
                        </div>
                    </div>
                </div>
                <IconHeart className={'text-mine-shaft-300 cursor-pointer'}/>
            </div>
            <div
                className={'flex gap-2 '}>
                {
                    props.topSkills.map((skill: string[], index: number) => (
                        <div key={index}
                             className={'p-2 py-1 bg-mine-shaft-800 text-bright-sun-400 rounded-lg text-xs'}>{skill}</div>
                    ))
                }
            </div>
            <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
                {props.about}
            </Text>
            <Divider color={'mine-shaft.7'} size={'xs'}/>
            {
                props.invited ? <div className={'flex items-center text-mine-shaft-200 text-sm gap-1'}>
                        <IconCalendarMonth className={'w-5 h-5'}/>Interview: August 27, 2024 10:00 AM
                    </div>
                    :
                    <div className={'flex justify-between'}>
                        <div className={'font-semibold text-mine-shaft-200'}>
                            {props.expectedCtc}
                        </div>
                        <div className={'flex gap-1 text-xs text-mine-shaft-400 items-center'}>
                            <IconMapPin className={'h-5 w-5'} stroke={1.5}/>
                            {props.location}
                        </div>
                    </div>
            }
            <Divider color={'mine-shaft.7'} size={'xs'}/>
            <div className={'flex [&>*]:w-1/2 [&>*]:p-1'}>
                {!props.invited && <>
                <Link to={'/talent-profile'}>
                    <Button color={'bright-sun.4'} variant={"outline"} fullWidth>Profile</Button>
                </Link>
                    <div>
                        {props.posted ?
                            <Button onClick={open} rightSection={<IconCalendarMonth className={'w-5 h-5'}/>}
                                    color={'bright-sun.4'} variant={"light"} fullWidth>Schedule
                            </Button>
                            : <Button color={'bright-sun.4'} variant={"light"} fullWidth>Message</Button>}
                    </div>
                </>
                }
                {
                    props.invited &&
                    <>
                        <div>
                            <Button color={'bright-sun.4'} variant={"outline"} fullWidth>Accept</Button>
                        </div>
                        <div>
                            <Button color={'red.7'} variant={"light"} fullWidth>Reject</Button>
                        </div>
                    </>
                }
            </div>
            <Modal opened={opened} onClose={close} title={'Schedule Interview'} centered>
                <div className={'flex flex-col gap-4'}>
                    <DateInput
                        minDate={new Date()}
                        value={value}
                        onChange={setValue}
                        label={'Date'}
                        placeholder={'Enter Date'}
                    />
                    <TimeInput
                        minTime={'09:00'}
                        maxTime={'17:00'}
                        ref={ref}
                        onClick={() => ref.current?.showPicker()}
                        label={'Time'}
                    />
                    <Button color={'bright-sun.4'} variant={"light"} fullWidth>Schedule</Button>
                </div>
            </Modal>
        </div>
    )
}
export default TalentCard
