import {IconCalendarMonth, IconHeart, IconMapPin} from "@tabler/icons-react";
import {Avatar, Button, Divider, Modal, Text} from "@mantine/core";
import {Link, useParams} from "react-router-dom";
import {useDisclosure} from "@mantine/hooks";
import {DateInput, TimeInput} from "@mantine/dates";
import {useCallback, useEffect, useRef, useState} from "react";
import {ApplicantType, ApplicationType, ApplicationStatusEnum} from "@/types/jobType.ts";
import {AppDispatch} from "@/store.tsx";
import {useDispatch, useSelector} from "react-redux";
import {updateApplicantStatusAsyncThunk} from "@/slices/postedJobSlice.ts";
import {selectUser} from "@/slices/userSlice.tsx";
import {format} from 'date-fns';
import {openResumeInNewTab} from "@/services/utilService.tsx";
import {getApplicantProfileAsyncThunk, selectApplicantProfile} from "@/slices/applicantProfile.ts";

const ApplicantTalentCard = ({applicant, jobStatus}: { applicant: ApplicantType, jobStatus?: ApplicationStatusEnum }) => {
    const {id} = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector(selectUser);
    const profileApplicantState = useSelector(selectApplicantProfile);
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState("");
    const [opened, {open, close}] = useDisclosure(false);
    const [openedApp, {open: openApp, close: closeApp}] = useDisclosure(false);
    const ref = useRef<HTMLInputElement>(null);

    const getApplicantProfileByApplicantId = useCallback(async () => {
        if (applicant) {
            dispatch(getApplicantProfileAsyncThunk(applicant.applicantId));
        }
    }, [applicant, dispatch]);

    useEffect(() => {
        getApplicantProfileByApplicantId().then();
    }, []);

    const handleOffer = (jobStatus: ApplicationStatusEnum) => {
        const [hours, minutes] = time.split(":").map(Number);
        date?.setHours(hours, minutes);

        if (id && applicant.applicantId && date) {
            const application: ApplicationType = {
                id: Number(id),
                applicantId: applicant.applicantId,
                applicationStatus: jobStatus,
                interviewTime: date.toISOString()
            }

            dispatch(updateApplicantStatusAsyncThunk({application, postedById: Number(userState?.id)}));
        }
        close();
    }

    return (applicant &&
        <div
            className={'flex flex-col gap-3 rounded-xl bg-mine-shaft-900 p-4 w-96 hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400'}>
            <div className={'flex justify-between'}>
                <div className={'flex items-center gap-2'}>
                    <div className={'p-2 bg-mine-shaft-800 rounded-full'}><Avatar size={"lg"}
                                                                                  src={profileApplicantState?.picture ? `data:image/jpeg;base64,${profileApplicantState.picture}` : '/assets/avatar.png'}
                                                                                  alt="profile"/></div>
                    <div className={'flex flex-col gap-1'}>
                        <div className={'font-semibold text-lg'}>{applicant.name}</div>
                        <div
                            className={'text-sm text-mine-shaft-300'}>{profileApplicantState?.jobTitle} &bull; {profileApplicantState?.company}
                        </div>
                    </div>
                </div>
                <IconHeart className={'text-mine-shaft-300 cursor-pointer'}/>
            </div>
            <div
                className={'flex flex-wrap gap-2 '}>
                {
                    profileApplicantState?.skills?.map((skill: string, index: number) => index < 10 && (
                        <div key={index}
                             className={'p-2 py-1 bg-mine-shaft-800 text-bright-sun-400 rounded-lg text-xs'}>{skill}</div>
                    ))
                }
            </div>
            <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
                {profileApplicantState?.about}
            </Text>
            <Divider color={'mine-shaft.7'} size={'xs'}/>
            {
                jobStatus === ApplicationStatusEnum.INTERVIEWING ?
                    <div className={'flex items-center text-mine-shaft-200 text-sm gap-1'}>
                        <IconCalendarMonth className={'w-5 h-5'}/>
                        {format(new Date(applicant.interviewTime + "Z").toISOString(), 'MMMM d, yyyy h:mm a')}
                    </div>
                    :
                    <div className={'flex justify-between'}>
                        <div className={'font-semibold text-mine-shaft-200'}>
                           Exp: {profileApplicantState?.totalExperience} {profileApplicantState?.totalExperience ?? 0 > 1 ? "years" : "year"}
                        </div>
                        <div className={'flex gap-1 text-xs text-mine-shaft-400 items-center'}>
                            <IconMapPin className={'h-5 w-5'} stroke={1.5}/>
                            {profileApplicantState?.location}
                        </div>
                    </div>
            }
            <Divider color={'mine-shaft.7'} size={'xs'}/>
            <div className={'flex [&>*]:w-1/2 [&>*]:p-1'}>
                {jobStatus !== ApplicationStatusEnum.INTERVIEWING && <>
                    <Link to={`/talent-profile/${profileApplicantState?.id}`}>
                        <Button color={'bright-sun.4'} variant={"outline"} fullWidth>Profile</Button>
                    </Link>
                    <div>
                        {jobStatus === ApplicationStatusEnum.APPLIED ?
                            <Button onClick={open} rightSection={<IconCalendarMonth className={'w-5 h-5'}/>}
                                    color={'bright-sun.4'} variant={"light"} fullWidth>Schedule
                            </Button>
                            : <Button color={'bright-sun.4'} variant={"light"} fullWidth>Message</Button>}
                    </div>
                </>
                }
                {
                    jobStatus === ApplicationStatusEnum.INTERVIEWING &&
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
            {(applicant.applicationStatus === ApplicationStatusEnum.INTERVIEWING || applicant.applicationStatus === ApplicationStatusEnum.APPLIED) && (
                <Button onClick={openApp} color={'bright-sun.4'} variant={"filled"} autoContrast={true} fullWidth>
                    View Application
                </Button>
            )}
            <Modal opened={opened} onClose={close} title={'Schedule Interview'} centered>
                <div className={'flex flex-col gap-4'}>
                    <DateInput
                        minDate={new Date()}
                        value={date}
                        onChange={setDate}
                        label={'Date'}
                        placeholder={'Enter Date'}
                    />
                    <TimeInput
                        ref={ref}
                        value={time}
                        onChange={(e) => setTime(e.currentTarget.value)}
                        onClick={() => ref.current?.showPicker()}
                        label={'Time'}
                    />
                    <Button onClick={() => handleOffer(ApplicationStatusEnum.INTERVIEWING)} color={'bright-sun.4'}
                            variant={"light"} fullWidth>Schedule</Button>
                </div>
            </Modal>
            <Modal opened={openedApp} onClose={closeApp} title={'View Application'} centered>
                <div className={'flex flex-col gap-4'}>
                    <div>
                        Email: &emsp; <a href={`mailto:${applicant.email}`}
                                         className="text-bright-sun-400 hover:underline cursor-pointer text-center">{applicant.email}</a>
                    </div>
                    <div>
                        Website: &emsp; <a target={"_blank"} href={`${applicant.website}`}
                                           className="text-bright-sun-400 hover:underline cursor-pointer text-center">{applicant.website}</a>
                    </div>
                    <div>
                        Email: &emsp; <span onClick={() => openResumeInNewTab(applicant.resume)}
                                            className="text-bright-sun-400 hover:underline cursor-pointer text-center">{applicant.name}</span>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default ApplicantTalentCard
