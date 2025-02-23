import {Anchor, Button, Checkbox, PasswordInput, rem, TextInput} from "@mantine/core";
import {IconAt, IconLock} from "@tabler/icons-react";
import {Link} from "react-router-dom";

const SignUp = () => {
    return (
        <div className={'flex flex-col justify-center gap-3 w-1/2 px-20'}>
            <div className={'text-2xl font-semibold'}>
                Create Account
            </div>
            <TextInput
                withAsterisk
                label={"Full Name"}
                placeholder={'Your Name'}
            /><TextInput
                withAsterisk
                leftSectionPointerEvents={'none'}
                leftSection={<IconAt style={{ width: rem(16), height: rem(16)}}/>}
                label={"Your Email"}
                placeholder={'Your Email'}
            />
            <PasswordInput
                withAsterisk
                leftSection={<IconLock style={{ width: rem(18), height: rem(18)}} stroke={1.5}/>}
                label={'Password'}
                placeholder={'Password'}
            />
            <PasswordInput
                withAsterisk
                leftSection={<IconLock style={{ width: rem(18), height: rem(18)}} stroke={1.5}/>}
                label={'Confirm Password'}
                placeholder={'Confirm Password'}
            />
            <Checkbox
                autoContrast
                label={<>
                    I accept{''}<Anchor>
terms & conditions
                </Anchor>
                </>}
                />
            <Button autoContrast variant={'filled'}>Sign Up</Button>
            <div className={'mx-auto'}>Already have an Account ? &nbsp;
                <Link to={'/login'} className={'text-bright-sun-400 hover:underline'}>
                    Login
                </Link>
            </div>
        </div>
    )
}
export default SignUp
