import {Anchor, Button, Checkbox, Group, PasswordInput, Radio, rem, TextInput} from "@mantine/core";
import {IconAt, IconLock} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {useState} from "react";
import {registerUser} from "@/services/userService.tsx";
import * as React from "react";
import axios from "axios";
import {signUpValidation} from "@/services/fromValidation.tsx";

const form = {
    name: "",
    email: "",
    password : "",
    confirmPassword: "",
    accountType: "APPLICANT"
}

const SignUp = () => {

    const [data, setData] = useState<{ [key : string] : string }>(form);
    const [formError, setFormError] = useState(form);
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
                    newFormError[key] =  signUpValidation(key, data[key]) || "";
                }else if (data[key] !== data["password"]){
                    newFormError[key] = "Passwords do not match";
                }
                if (newFormError[key]) valid = false;
            }
            setFormError(newFormError);
            if (valid){
                const res = await registerUser(data);
                console.log(res);
            }
        }catch (e : unknown) {
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data);  // '?.' to avoid undefined errors
            } else {
                console.log("An unexpected error occurred", e);
            }
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
