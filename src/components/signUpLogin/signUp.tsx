import {Anchor, Button, Checkbox, Group, LoadingOverlay, PasswordInput, Radio, rem, TextInput} from "@mantine/core";
import {IconAt, IconCheck, IconLock, IconX} from "@tabler/icons-react";
import { useNavigate} from "react-router-dom";
import {useState} from "react";
import {registerUser} from "@/services/userService.tsx";
import * as React from "react";
import axios from "axios";
import {signUpValidation} from "@/services/fromValidation.tsx";
import {notifications} from "@mantine/notifications";

const form = {
    name: "",
    email: "",
    password : "",
    confirmPassword: "",
    accountType: "APPLICANT"
}

const SignUp = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<{ [key : string] : string }>(form);
    const [formError, setFormError] = useState(form);
    const [loading, setLoading] = useState(false);

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
                setFormError({...formError, [name]:signUpValidation(name,value), confirmPassword: err})

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
            setFormError(newFormError);
            if (valid){
                setLoading(true);
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
                    setLoading(false);
                    navigate('/login')
                },3000)
            }
        }catch (e : unknown) {
            setLoading(false);
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
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'pink', type: 'bars' }}
            />
        <div className={'flex flex-col justify-center gap-3 w-1/2 px-20'}>
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
                <Group mt={'xs'}>
                    <Radio className="py-4 px-6 border hover:bg-mine-shaft-900 bg-mine-shaft-800 rounded-lg
                     has-[:checked]: bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400" autoContrast value="APPLICANT" label="Applicant"/>
                    <Radio className="py-4 px-6 border hover:bg-mine-shaft-900
                     has-[:checked]: bg-bright-sun-400/5 bg-mine-shaft-800 rounded-lg has-[:checked]:border-bright-sun-400" autoContrast value="EMPLOYER" label="Employer"/>
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
            <Button onClick={handleSubmit} autoContrast variant={'filled'}>Sign Up</Button>
            <div className={'mx-auto'}>Already have an Account ? &nbsp;
                <span onClick={() => {
                    navigate('/login')
                    setData(form)
                    setFormError(form)
                }} className={'text-bright-sun-400 hover:underline cursor-pointer'}>
                    Login
                </span>
            </div>
        </div>
        </>
    )
}
export default SignUp
