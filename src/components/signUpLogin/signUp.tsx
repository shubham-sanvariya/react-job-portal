import {Anchor, Button, Checkbox, Group, LoadingOverlay, PasswordInput, Radio, rem, TextInput} from "@mantine/core";
import {IconAt, IconCheck, IconLock, IconX} from "@tabler/icons-react";
import { useNavigate} from "react-router-dom";
import { useState} from "react";
import * as React from "react";
import axios from "axios";
import {signUpValidation} from "@/services/fromValidation.tsx";
import {notifications} from "@mantine/notifications";
import { registerUser, sendOtp } from "@/services/authService";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLoading, selectUserVerified, setUserLoading } from "@/slices/userSlice";
import { AppDispatch } from "@/store";
import OtpBox from "./otpBox";
import { useDisclosure, useInterval } from "@mantine/hooks";
import { errorNotification, successNotification } from "@/services/notificationUtils.tsx";

const form = {
    name: "",
    email: "",
    password : "",
    confirmPassword: "",
    accountType: "APPLICANT"
}

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [data, setData] = useState<{ [key : string] : string }>(form);
    const [formError, setFormError] = useState(form);

    const loadingState = useSelector(selectUserLoading);
    const [opened, { open, close }] = useDisclosure(false);

    const isVerifiedState = useSelector(selectUserVerified);

    const [otpSent, setOtpSent] = useState(false);
    const [otpSending, setOtpSending] = useState(false);
    const [resendLoader, setResendLoader] = useState(false);
    const [seconds, setSeconds] = useState(60);

    const interval = useInterval(() => {
            if (seconds === 0) {
                setResendLoader(false);
                setSeconds(60);
                interval.stop();
            }
            else setSeconds((s) => s - 1)
        }, 1000);

    const handleSendOtp = async () => {
        try {
            open();
            setOtpSending(true);
            const res = await sendOtp(data.email, "register");
            console.log(res);
            setOtpSent(true);
            setResendLoader(true);
            interval.start();
            successNotification("OTP send Successfully", "Enter OTP to Verify Email.");
        } catch (err: unknown) {
            let errMsg: string;
            if (axios.isAxiosError(err)) {
                errMsg = err.response?.data?.errorMessage
                console.log(errMsg);
            } else {
                errMsg = "An unexpected error occurred"
                console.log(errMsg, err);
            }
            close();
            errorNotification("OTP sending failed.", errMsg);
        } finally {
            setOtpSending(false);
        }
    }

    const handleChange = (event : React.ChangeEvent<HTMLInputElement> | string) => {
        if (typeof event == "string") setData({...data, accountType: event})
        else{
            const name = event.target.name, value = event.target.value;
            setData({...data, [name]:value})
            setFormError({...formError, [name]:signUpValidation(name,value)})
            if (name === "password" && data.confirmPassword !== ""){
                let err = "";
                if (data.confirmPassword !== value){
                    err = "Password do not match"
                }
                setFormError({...formError, [name as string] :signUpValidation(name,value), confirmPassword: err})

            }
            if (name === "confirmPassword" ){
                if (data.password !== value){
                    setFormError({...formError, [name]:"Confirm Password do not match the Password" })
                }else {
                    setFormError({...formError, confirmPassword:"" })
                }
            }
        }
    }

    const handleSubmit = async () => {
        try{
            let valid = true
            const newFormError : { [key : string] : string } = {};
            for (const key in data){
                if (key === 'accountType')continue;
                if (key !== "confirmPassword") {
                    newFormError[key] =  signUpValidation(key, data[key]) ?? "";
                }else if (data[key] !== data["password"]){
                    newFormError[key] = "Passwords do not match";
                }
                if (newFormError[key]) valid = false;
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setFormError(newFormError);
            if (valid){
                dispatch(setUserLoading(false));
                const res = await registerUser(data);
                console.log(res);
                notifications.show({
                    title: 'Registered Successfully',
                    message: 'Redirecting to Login Page',
                    withCloseButton: true,
                    icon: <IconCheck style={{ width: "90%", height: "90%"}}/>,
                    color: "teal",
                    withBorder: true,
                    className:"!border-green-500"
                })
                setData(form);
                setTimeout(() => {
                    dispatch(setUserLoading(false));
                    navigate('/login')
                },3000)

            }
        }catch (e : unknown) {
            dispatch(setUserLoading(false));
            let errMsg: string;
            if (axios.isAxiosError(e)) {
                errMsg = e.response?.data?.errorMessage
                console.log(errMsg);
            } else {
                errMsg = "An unexpected error occurred"
                console.log(errMsg, e);
            }
            notifications.show({
                title: 'Registration Failed',
                message: errMsg,
                withCloseButton: true,
                icon: <IconX style={{ width: "90%", height: "90%"}}/>,
                color: "red",
                withBorder: true,
                className:"!border-red-700"
            })
        }
    }

    return (
        <>
            <LoadingOverlay
                className="translate-x-1/2"
                visible={loadingState}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'pink', type: 'bars' }}
            />
        <div className={'flex flex-col justify-center gap-3 w-1/2 px-20 bs-mx:px-10 sm-mx:px-5 sm-mx:w-full sm-mx:py-20'}>
            <div className={'text-2xl font-semibold'}>
                Create Account
            </div>
            <TextInput
                name={"name"}
                value={data.name}
                onChange={handleChange}
                error={formError.name}
                withAsterisk
                label={"Full Name"}
                placeholder={'Your Name'}
            /><TextInput
            name={"email"}
            value={data.email}
            onChange={handleChange}
            error={formError.email}
            withAsterisk
            leftSectionPointerEvents={'none'}
            leftSection={<IconAt style={{width: rem(16), height: rem(16)}}/>}
            label={"Your Email"}
            placeholder={'Your Email'}
        />
                <div>
                    <Button
                    disabled={formError.email?.length > 0 || data.email?.length === 0}
                        className={
                            !isVerifiedState
                                ? `!bg-blue-500 !text-white py-2 px-4 rounded hover:!bg-blue-600`
                                : `!bg-green-500 text-white py-2 px-4 rounded hover:!bg-green-600`
                        }
                        onClick={handleSendOtp}
                        variant={'filled'}
                    >
                        {!isVerifiedState ? "Verify Email" : "Verified"}
                    </Button>

                </div>

            <PasswordInput
                name={"password"}
                value={data.password}
                onChange={handleChange}
                error={formError.password}
                withAsterisk
                leftSection={<IconLock style={{width: rem(18), height: rem(18)}} stroke={1.5}/>}
                label={'Password'}
                placeholder={'Password'}
            />
            <PasswordInput
                name={"confirmPassword"}
                value={data.confirmPassword}
                onChange={handleChange}
                error={formError.confirmPassword}
                withAsterisk
                leftSection={<IconLock style={{width: rem(18), height: rem(18)}} stroke={1.5}/>}
                label={'Confirm Password'}
                placeholder={'Confirm Password'}
            />
            <Radio.Group
                value={data.accountType}
                onChange={handleChange}
                label="You are ?"
                withAsterisk
            >
                <Group mt={'xs'} className={"flex gap-6 xs-mx:gap-3"}>
                    <Radio className="py-4 px-6 border hover:bg-mine-shaft-900 bg-mine-shaft-800 rounded-lg
                     has-[:checked]: bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 sm-mx:px-4 sm-mx:py-2" autoContrast value="APPLICANT" label="Applicant"/>
                    <Radio className="py-4 px-6 border hover:bg-mine-shaft-900
                     has-[:checked]: bg-bright-sun-400/5 bg-mine-shaft-800 rounded-lg has-[:checked]:border-bright-sun-400 sm-mx:px-4 sm-mx:py-2" autoContrast value="EMPLOYER" label="Employer"/>
                </Group>
            </Radio.Group>
            <Checkbox
                autoContrast
                label={<>
                    I accept{' '}<Anchor>
                    terms & conditions
                </Anchor>
                </>}
            />
                <Button disabled={!isVerifiedState} className={isVerifiedState ? `` : "!bg-red-500 !text-white"} onClick={handleSubmit} autoContrast variant={'filled'}>Sign Up</Button>
            <div className={'mx-auto sm-mx:text-sm xs-mx:text-sm'}>Already have an Account ? &nbsp;
                <span onClick={() => {
                    navigate('/login')
                    setData(form)
                    setFormError(form)
                }} className={'text-bright-sun-400 hover:underline cursor-pointer sm-mx:text-sm xs-mx:text-sm'}>
                    Login
                </span>
            </div>
        </div>
        <OtpBox opened={opened} closeFn={close} email={data.email} otpSent={otpSent} otpSending={otpSending} resendLoader={resendLoader} seconds={seconds} resendOtp={handleSendOtp}/>
        </>
    )
}
export default SignUp
