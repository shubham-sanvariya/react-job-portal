import {Button, PasswordInput, rem, TextInput} from "@mantine/core";
import {IconAt, IconLock} from "@tabler/icons-react";
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <div className={'flex flex-col justify-center gap-3 w-1/2 px-20'}>
            <div className={'text-2xl font-semibold'}>
                Login
            </div>
            <TextInput
                withAsterisk
                leftSectionPointerEvents={'none'}
                leftSection={<IconAt style={{width: rem(16), height: rem(16)}}/>}
                label={"Your Email"}
                placeholder={'Your Email'}
            />
            <PasswordInput
                withAsterisk
                leftSection={<IconLock style={{width: rem(18), height: rem(18)}} stroke={1.5}/>}
                label={'Password'}
                placeholder={'Password'}
            />

            <Button autoContrast variant={'filled'}>Sign Up</Button>
            <div className={'mx-auto'}>don't have an Account ? &nbsp;
                <Link to={'/signup'} className={'text-bright-sun-400 hover:underline'}>
                    SignUp
                </Link>
            </div>
        </div>
    )
}
export default Login
