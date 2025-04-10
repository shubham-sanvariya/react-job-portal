import { verifyOtp } from "@/services/authService";
import { errorNotification, successNotification } from "@/services/notificationUtils.tsx";
import { setUserVerified } from "@/slices/userSlice";
import { AppDispatch } from "@/store";
import { Button, Modal, PinInput } from "@mantine/core"
import axios from "axios";
import { useDispatch } from "react-redux";

interface OtpBoxProps {
    opened: boolean;
    closeFn: () => void;
    seconds: number;
    email : string;
    otpSent : boolean;
    otpSending : boolean;
    resendLoader : boolean;
    resendOtp: () => Promise<void>
}

const OtpBox: React.FC<OtpBoxProps> = ({ opened, closeFn, seconds, email, otpSent, otpSending, resendLoader, resendOtp }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleVerifyOtp = async (otp: string) => {
        try {
            const res = await verifyOtp(email, otp);
            console.log(res);
            dispatch(setUserVerified(true));
            successNotification("OTP verified", "Email Verified Successfully");
            closeFn();
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

    return (
        <Modal opened={opened} onClose={closeFn} title={"Verify Email"}>
            <div className={'flex flex-col gap-6'}>
                <PinInput className={'mx-auto'} size={"md"} gap={"lg"} length={6} type={"number"}
                    onComplete={handleVerifyOtp}
                />
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
                </div>}

            </div>
        </Modal>
    )
}

export default OtpBox
