import {Button, Modal, PasswordInput, PinInput, rem, TextInput} from "@mantine/core";
import {useState} from "react";
import {IconAt, IconLock} from "@tabler/icons-react";
import {changePassword} from "@/services/userService.tsx";
import axios from "axios";
import {signUpValidation} from "@/services/fromValidation.tsx";
import {errorNotification, successNotification} from "@/services/notificationUtils.tsx";
import {useInterval} from "@mantine/hooks";
import { sendOtp, verifyOtp } from "@/services/authService";

const ResetPassword = (props: any) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passError, setPassError] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpSending, setOtpSending] = useState(false);
    const [verified, setVerified] = useState(false);
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
            setOtpSending(true);
            const res = await sendOtp(email, "reset");
            console.log(res);
            setOtpSent(true);
            setResendLoader(true);
            interval.start();
            successNotification("OTP send Successfully", "Enter OTP to reset.")
        } catch (err: unknown) {
            let errMsg: string;
            if (axios.isAxiosError(err)) {
                errMsg = err.response?.data?.errorMessage
                console.log(errMsg);
            } else {
                errMsg = "An unexpected error occurred"
                console.log(errMsg, err);
            }
            errorNotification("OTP sending failed.", errMsg);
        } finally {
            setOtpSending(false);
        }
    }

    const handleVerifyOtp = async (otp: string) => {
        try {
            const res = await verifyOtp(email, otp);
            console.log(res);
            setVerified(true);
            successNotification("OTP verified", "Enter new password");
        } catch (err: unknown) {
            let errMsg: string;
            if (axios.isAxiosError(err)) {
                errMsg = err.response?.data?.errorMessage
                console.log(errMsg);
            } else {
                errMsg = "An unexpected error occurred"
                console.log(errMsg, err);
            }
            errorNotification("OTP verification failed.", errMsg);
        }
    };

    const resendOtp = () => {
        handleSendOtp()
    }

    const changeEmail = () => {
        setOtpSent(false);
        setResendLoader(false);
        setSeconds(60);
        setVerified(false);
        interval.stop();
    }

    const handleChangePassword = async () => {
        try {
            const res = await changePassword(email, password);
            console.log(res);
            setVerified(true);
            successNotification("Password Changed", "Login with new password");
            setPassword("");
            setEmail("");
            props.close();
        } catch (err: unknown) {
            let errMsg: string;
            if (axios.isAxiosError(err)) {
                errMsg = err.response?.data?.errorMessage
                console.log(errMsg);
            } else {
                errMsg = "An unexpected error occurred"
                console.log(errMsg, err);
            }
            errorNotification("Password Reset Failed", errMsg);
        }
    }

    return (
        <Modal opened={props.opened} onClose={props.close} title={"Reset Password"}>
            <div className={'flex flex-col gap-6'}>
                <TextInput
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    leftSection={<IconAt size={16}/>}
                    label={"Email"}
                    withAsterisk
                    placeholder="Your email"
                    rightSectionWidth={"xl"}
                    rightSection={<Button
                        loading={otpSending && !otpSent}
                        size={"xs"} className={'mr-1'} onClick={handleSendOtp} autoContrast={true}
                        disabled={email === "" || otpSent} variant={"filled"}>
                        Send OTP
                    </Button>}
                />
                {otpSent && <PinInput className={'mx-auto'} size={"md"} gap={"lg"} length={6} type={"number"}
                                      onComplete={handleVerifyOtp}
                />}
                {otpSent && <div className={'flex gap-2'}>
                    <Button
                        loading={otpSending}
                        disabled={resendLoader}
                        fullWidth
                        color={'bright-sun.4'}
                        onClick={resendOtp} autoContrast
                        variant={"light"}>
                        {resendLoader ? seconds : 'Resend OTP'}
                    </Button>
                    <Button
                        onClick={changeEmail}
                        autoContrast
                        fullWidth
                        variant={"filled"}>
                        Change Email
                    </Button>
                </div>}

                {verified && <PasswordInput
                    name={"password"}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setPassError(signUpValidation("password", e.target.value) ?? "")
                    }}
                    error={passError}
                    withAsterisk
                    leftSection={<IconLock style={{width: rem(18), height: rem(18)}} stroke={1.5}/>}
                    label={'Password'}
                    placeholder={'Password'}
                />}
                {verified && <Button
                    onClick={handleChangePassword}
                    autoContrast
                    variant={"filled"}>
                    Change Password
                </Button>}
            </div>
        </Modal>
    )
}
export default ResetPassword
