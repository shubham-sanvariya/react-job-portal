import {Button, Modal, PasswordInput, PinInput, rem, TextInput} from "@mantine/core";
import {useState} from "react";
import {IconAt, IconLock} from "@tabler/icons-react";
import {sendOtp, verifyOtp} from "@/services/userService.tsx";
import axios from "axios";
import {signUpValidation} from "@/services/fromValidation.tsx";

const ResetPassword = (props: any) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passError, setPassError] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpSending, setOtpSending] = useState(false);
    const [verified, setVerified] = useState(false);

    const handleSendOtp = async () => {
        try {
            setOtpSending(true);
            const res = await sendOtp(email);
            console.log(res);

            setOtpSent(true);

        } catch (err: unknown) {
            let errMsg: string;
            if (axios.isAxiosError(err)) {
                errMsg = err.response?.data?.errorMessage
                console.log(errMsg);
            } else {
                errMsg = "An unexpected error occurred"
                console.log(errMsg, err);
            }
        } finally {
            setOtpSending(false);
        }
    }

    const handleVerifyOtp = async (otp: string) => {
        try {
            const res = await verifyOtp(email, otp);
            console.log(res);
            setVerified(true);
        } catch (err: unknown) {
            let errMsg: string;
            if (axios.isAxiosError(err)) {
                errMsg = err.response?.data?.errorMessage
                console.log(errMsg);
            } else {
                errMsg = "An unexpected error occurred"
                console.log(errMsg, err);
            }
        }
    };

    const resendOtp = () => {

    }

    const changeEmail = () => {
        setOtpSent(false);
    }

    const handleChangePassword = () => {

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
                        loading={otpSending}
                        size={"xs"} className={'mr-1'} onClick={handleSendOtp} autoContrast
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
                        fullWidth
                        color={'bright-sun.4'}
                        onClick={resendOtp} autoContrast
                        variant={"light"}>
                        Resend OTP
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
