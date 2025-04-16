import {Button, LoadingOverlay, PasswordInput, rem, TextInput} from "@mantine/core";
import {IconAt, IconCheck, IconLock, IconX} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import * as React from "react";
import axios from "axios";
import {loginValidation} from "@/services/fromValidation.tsx";
import {notifications} from "@mantine/notifications";
import {useDisclosure} from "@mantine/hooks";
import ResetPassword from "@/components/signUpLogin/resetPassword.tsx";
import {useDispatch, useSelector} from "react-redux";
import {selectUserLoading, setUser, setUserLoading} from "@/slices/userSlice.tsx";
import {loginUser} from "@/services/authService";

type FormType = {
    email: string;
    password: string;
};

const form: FormType = {
    email: "",
    password: "",
}

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState<FormType>(form);
    const [formError, setFormError] = useState<FormType>(form);
    const [opened, {open, close}] = useDisclosure(false);

    const loadingState = useSelector(selectUserLoading);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name, value = event.target.value;
        setData({...data, [name]: value})
        setFormError({...formError, [name]: loginValidation(name, value)})
    }

    const handleSubmit = async () => {
        try {
            dispatch(setUserLoading(true))
            let valid = true
            const newFormError: Partial<FormType> = {};
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    const typedKey = key as keyof FormType; // Ensure key is properly typed
                    newFormError[typedKey] = loginValidation(typedKey, data[typedKey]) ?? "";
                    if (newFormError[typedKey]) valid = false;
                }
            }
            setFormError(newFormError as FormType);
            if (valid) {
                const res = await loginUser(data);
                console.log(res);
                notifications.show({
                    title: 'Login Successfully',
                    message: 'Redirecting to Home Page',
                    withCloseButton: true,
                    icon: <IconCheck style={{width: "90%", height: "90%"}}/>,
                    color: "teal",
                    withBorder: true,
                    className: "!border-green-500"
                })
                setData(form);
                dispatch(setUserLoading(false))
                dispatch(setUser(res))
                navigate('/')
            }
        } catch (e: unknown) {
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
                title: 'Login Failed',
                message: errMsg,
                withCloseButton: true,
                icon: <IconX style={{width: "90%", height: "90%"}}/>,
                color: "red",
                withBorder: true,
                className: "!border-red-700"
            })
        }
    }
    return (<>
            <LoadingOverlay
                visible={loadingState}
                zIndex={1000}
                overlayProps={{radius: 'sm', blur: 2}}
                loaderProps={{color: 'bright-sun.4', type: 'bars'}}
            />
            <div className={'flex flex-col justify-center gap-3 w-1/2 px-20 bs-mx:px-10 md-mx:px-5 sm-mx:w-full'}>
                <div className={'text-2xl font-semibold'}>
                    Login
                </div>
                <TextInput
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

                <Button onClick={handleSubmit} loading={loadingState} autoContrast={true}
                        variant={'filled'}>Login</Button>
                <div className={'mx-auto sm-mx:text-sm xs-mx:text-sm'}>don't have an Account ? &nbsp;
                    <span onClick={() => {
                        navigate('/signup')
                        setData(form)
                        setFormError(form)
                    }} className={'text-bright-sun-400 hover:underline cursor-pointer'}>
                    SignUp
                </span>
                </div>
                <div onClick={open}
                     className={'text-bright-sun-400 hover:underline cursor-pointer text-center sm-mx:text-sm xs-mx:text-sm'}>Forgot
                    Password ?
                </div>
            </div>
            <ResetPassword opened={opened} close={close}/>
        </>

    )
}
export default Login
