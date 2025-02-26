import {Anchor, Button, Checkbox, Group, PasswordInput, Radio, rem, TextInput} from "@mantine/core";
import {IconAt, IconLock} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {useState} from "react";
import {registerUser} from "@/services/userService.tsx";

const form = {
    name: "",
    email: "",
    password : "",
    confirmPassword: "",
    accountType: "APPLICANT"
}

const SignUp = () => {

    const [data, setData] = useState(form);

    const handleChange = (event) => {
        if (typeof event == "string") setData({...data, accountType: event})
        else setData({...data, [event.target.name]:event.target.value})
    }

    const handleSubmit = async () => {
        try{
            const res = await registerUser(data);
            console.log(res);
        }catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={'flex flex-col justify-center gap-3 w-1/2 px-20'}>
            <div className={'text-2xl font-semibold'}>
                Create Account
            </div>
            <TextInput
                name={"name"}
                value={data.name}
                onChange={handleChange}
                withAsterisk
                label={"Full Name"}
                placeholder={'Your Name'}
            /><TextInput
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
            <PasswordInput
                name={"confirmPassword"}
                value={data.confirmPassword}
                onChange={handleChange}
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
                    I accept{''}<Anchor>
                    terms & conditions
                </Anchor>
                </>}
            />
            <Button onClick={handleSubmit} autoContrast variant={'filled'}>Sign Up</Button>
            <div className={'mx-auto'}>Already have an Account ? &nbsp;
                <Link to={'/login'} className={'text-bright-sun-400 hover:underline'}>
                    Login
                </Link>
            </div>
        </div>
    )
}
export default SignUp
