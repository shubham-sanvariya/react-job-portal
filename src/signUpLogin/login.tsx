import {Button, PasswordInput, rem, TextInput} from "@mantine/core";
import {IconAt, IconLock} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {useState} from "react";
import * as React from "react";
import {loginUser} from "@/services/userService.tsx";

const form = {
    email: "",
    password : "",
}

const Login = () => {
    const [data, setData] = useState(form);

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
         setData({...data, [event.target.name]:event.target.value})
    }

    const handleSubmit = async () => {
        try{
            const res = await loginUser(data);
            console.log(res);
        }catch (e : any) {
            console.log(e.response.data);
        }
    }
    return (
        <div className={'flex flex-col justify-center gap-3 w-1/2 px-20'}>
            <div className={'text-2xl font-semibold'}>
                Login
            </div>
            <TextInput
                name={"email"}
                value={data.email}
                onChange={handleChange}
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
                withAsterisk
                leftSection={<IconLock style={{width: rem(18), height: rem(18)}} stroke={1.5}/>}
                label={'Password'}
                placeholder={'Password'}
            />

            <Button onClick={handleSubmit} autoContrast variant={'filled'}>Login</Button>
            <div className={'mx-auto'}>don't have an Account ? &nbsp;
                <Link to={'/signup'} className={'text-bright-sun-400 hover:underline'}>
                    SignUp
                </Link>
            </div>
        </div>
    )
}
export default Login
