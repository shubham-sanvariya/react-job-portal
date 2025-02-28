import {Button, PasswordInput, rem, TextInput} from "@mantine/core";
import {IconAt, IconCheck, IconLock, IconX} from "@tabler/icons-react";
import { useNavigate} from "react-router-dom";
import {useState} from "react";
import * as React from "react";
import {loginUser} from "@/services/userService.tsx";
import axios from "axios";
import {loginValidation} from "@/services/fromValidation.tsx";
import {notifications} from "@mantine/notifications";
import {useDisclosure} from "@mantine/hooks";
import ResetPassword from "@/components/signUpLogin/resetPassword.tsx";

type FormType = {
    email: string;
    password: string;
};

const form : FormType = {
    email: "",
    password: "",
}

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<FormType>(form);
    const [formError, setFormError] = useState<FormType>(form);
    const [opened, { open, close }] = useDisclosure(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name, value = event.target.value;
        setData({...data, [name]: value})
        setFormError({...formError, [name] : loginValidation(name, value) })
    }

    const handleSubmit = async () => {
        try {
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
                setTimeout(() => {
                    navigate('/')
                }, 3000)
            }
        } catch (e: unknown) {
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
        <div className={'flex flex-col justify-center gap-3 w-1/2 px-20'}>
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

            <Button onClick={handleSubmit} autoContrast variant={'filled'}>Login</Button>
            <div className={'mx-auto'}>don't have an Account ? &nbsp;
                <span onClick={() => {
                    navigate('/signup')
                    setData(form)
                    setFormError(form)
                }} className={'text-bright-sun-400 hover:underline cursor-pointer'}>
                    SignUp
                </span>
            </div>
            <div onClick={open} className={'text-bright-sun-400 hover:underline cursor-pointer text-center'}>Forgot Password ?</div>
        </div>
        <ResetPassword opened={opened} close={close}/>
        </>

    )
}
export default Login
