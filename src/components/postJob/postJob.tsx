import SelectInput from "@/components/postJob/selectInput.tsx";
import {content, fields} from "@/Data/PostJob.tsx";
import {Button, NumberInput, TagsInput, Textarea} from "@mantine/core";
import TextEditor from "@/components/postJob/textEditor.tsx";
import {hasLength, isNotEmpty, useForm} from "@mantine/form";
import {postJob} from "@/services/jobService.tsx";
import {errorNotification} from "@/services/notificationServices.tsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const PostJob = () => {
    const navigate = useNavigate();
    const handlePost = async () => {
        form.validate();
        if (!form.isValid()) return;

        try {
            const res = await postJob({...form.getValues(), packageOffered: Number(form.getValues().packageOffered)});
            console.log(res);
            navigate("/posted-jobs")
        }catch (err: unknown) {
            let errMsg: string;
            if (axios.isAxiosError(err)) {
                errMsg = err.response?.data?.errorMessage
                console.log(errMsg);
            } else {
                errMsg = "An unexpected error occurred"
                console.log(errMsg, err);
            }
            errorNotification("OTP sending failed.", errMsg);
        }
    }

    const form = useForm({
        mode: "controlled",
        validateInputOnChange: true,
        initialValues: {
            jobTitle : "",
            company : "",
            // applicants : [],
            experience : "",
            jobType : "",
            location : "",
            packageOffered : "",
            skillRequired : [],
            about : "",
            description : content,
            // jobStatus : "",
        },
        validate:{
            jobTitle: hasLength({min: 4}, 'Must be at least 4 Characters')
            , company: hasLength({min: 4}, 'Must be at least 4 Characters'),
            experience: isNotEmpty('Experience is required.'),
            jobType: isNotEmpty("Job type is required.")
            , location: hasLength({min: 4}, 'Must be at least 3 Characters'),
            packageOffered: isNotEmpty("Package is required"),
            skillRequired: isNotEmpty("Skills are required"),
            about: hasLength({min: 30}, "Must be at least 30 Characters")
            , description: hasLength({min: 50}, 'Must be at least 50 Characters'),
        }
    })
    return (
        <div className={'w-4/5 mx-auto'}>
            <div className={'text-2xl font-semibold mb-5'}>Post a Job</div>
            <div className={'flex flex-col gap-5'}>
                <div className={'flex gap-10 [&>*]:w-1/2'}>
                    <SelectInput form={form} name={"jobTitle"} {...fields[0]} />
                    <SelectInput form={form} name={"company"} {...fields[1]} />
                </div>
                <div className={'flex gap-10 [&>*]:w-1/2'}>
                    <SelectInput form={form} name={"experience"} {...fields[2]} />
                    <SelectInput form={form} name={"jobType"} {...fields[3]} />
                </div>
                <div className={'flex gap-10 [&>*]:w-1/2'}>
                    <SelectInput form={form} name={"location"} {...fields[4]} />
                    <NumberInput {...form.getInputProps('packageOffered')} label={"Salary"} min={1} max={300}
                            placeholder={"Enter Salary"}  clampBehavior={"strict"}   hideControls />
                </div>
                <TagsInput {...form.getInputProps('skillRequired')}  withAsterisk label={"skills"} placeholder={'Enter Skills'} clearable acceptValueOnBlur
                           splitChars={[',', ' ', '|']}
                />
                <Textarea
                    {...form.getInputProps('about')}
                    withAsterisk
                    className="my-3"
                    label={"About Job"}
                    placeholder={"Enter about job..."}
                    minRows={2}
                    autosize
                />
                <div className={'[&_button[data-active="true"]]:!text-bright-sun-400 [&_button[data-active="true"]]:bg-bright-sun-400/20'}>
                    <div className="text-sm font-medium">
                        Job Description
                        <span className="text-red-500">*</span>
                    </div>
                    <TextEditor form={form}/>
                </div>
                <div className={'flex gap-4'}>
                    <Button onClick={handlePost} color={'bright-sun.4'} variant={"light"}>
                        Publish Job
                    </Button>
                    <Button color={'bright-sun.4'} variant={"outline"}>
                        Save as Draft
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default PostJob
