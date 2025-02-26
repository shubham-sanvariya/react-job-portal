import {Anchor, Button, Checkbox, Group, PasswordInput, Radio, rem, TextInput} from "@mantine/core";
import {IconAt, IconLock} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {useState} from "react";

const SignUp = () => {
    const [value, setValue] = useState('react');
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
            <PasswordInput
                withAsterisk
                leftSection={<IconLock style={{width: rem(18), height: rem(18)}} stroke={1.5}/>}
                label={'Confirm Password'}
                placeholder={'Confirm Password'}
            />
            <Radio.Group
                value={value}
                onChange={setValue}
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
