import SelectInput from "@/components/postJob/selectInput.tsx";
import {content, fields} from "@/Data/PostJob.tsx";
import {Button, NumberInput, TagsInput, Textarea} from "@mantine/core";
import TextEditor from "@/components/postJob/textEditor.tsx";
import {hasLength, isNotEmpty, useForm} from "@mantine/form";
import {getJobById, postJob} from "@/services/jobService.tsx";
import {errorNotification, successNotification} from "@/services/notificationUtils.tsx";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "@/slices/userSlice.tsx";
import {JobInitialValues} from "@/types/jobType.ts";
import {useCallback, useEffect, useState} from "react";

const PostJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const userState = useSelector(selectUser);
    const [editorData, setEditorData] = useState(content);
    const { applicants, ...jobInitialValuesWithoutApplicants } = JobInitialValues;

    useEffect(() => {
        if (id) fetchJobById(Number(id)).then();
    }, [id]);

    const fetchJobById = useCallback(async (jobId: number) => {
        const res = await getJobById(jobId);
        if (res) {
            console.log(res);
            const { applicants , ...jobWithoutApplicants} = res;
            form.setValues({applicants, ...jobWithoutApplicants});
            setEditorData(res.description);
        }
    }, [id]);

    const handleSave = async (jobStatus : string) => {
        try {
            const jobId = id ? id : 0;
            const res = await postJob({...form.getValues(), id : Number(jobId) , postedBy : Number(userState?.id), jobStatus});
            navigate(`/posted-jobs/${res.id}`)
            const pass = jobStatus === "ACTIVE" ? "Published" : "Drafted";
            successNotification(pass, `Job ${pass} Successfully`);
        }catch (err: unknown) {
            let errMsg: string;
            if (axios.isAxiosError(err)) {
                errMsg = err.response?.data?.errorMessage
                console.log(errMsg);
            } else {
                errMsg = "An unexpected error occurred"
                console.log(errMsg, err);
            }
            const fail = jobStatus === "ACTIVE" ? "Publish" : "Draft";
            errorNotification(`Failed to ${fail} Job`, errMsg);
        }
    }

    const handlePost = async () => {
        form.validate();
        if (!form.isValid()) {
            for (const key in form.errors) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                errorNotification(key, form.errors[key].toString())
            }
            return;
        }

        await handleSave("ACTIVE");
    }

    const handleDraft = async () => {
        await handleSave("DRAFT");
    }

    const form = useForm({
        mode: "controlled",
        validateInputOnChange: true,
        initialValues: { applicants, ...jobInitialValuesWithoutApplicants } ,
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
        <div className={'px-16 py-5 bs-mx:px-10 md-mx:px-5'}>
            <div className={'text-2xl font-semibold mb-5'}>Post a Job</div>
            <div className={'flex flex-col gap-5'}>
                <div className={'flex gap-10 [&>*]:w-1/2 md-mx:gap-5 sm-mx:flex-wrap sm-mx:[&>*]:w-full'}>
                    <SelectInput form={form} name={"jobTitle"} {...fields[0]} />
                    <SelectInput form={form} name={"company"} {...fields[1]} />
                </div>
                <div className={'flex gap-10 [&>*]:w-1/2 md-mx:gap-5 sm-mx:flex-wrap sm-mx:[&>*]:w-full'}>
                    <SelectInput form={form} name={"experience"} {...fields[2]} />
                    <SelectInput form={form} name={"jobType"} {...fields[3]} />
                </div>
                <div className={'flex gap-10 [&>*]:w-1/2 md-mx:gap-5 sm-mx:flex-wrap sm-mx:[&>*]:w-full'}>
                    <SelectInput form={form} name={"location"} {...fields[4]} />
                    <NumberInput {...form.getInputProps('packageOffered')} label={"Salary"} min={1} max={300}
                            placeholder={"Enter Salary"}  clampBehavior={"strict"}   hideControls />
                </div>
                <TagsInput {...form.getInputProps('skillRequired')}  withAsterisk label={"skills"} placeholder={'Enter Skills'} clearable acceptValueOnBlur
                           splitChars={[',', '|']}
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
                    <TextEditor form={form} data={editorData}/>
                </div>
                <div className={'flex gap-4'}>
                    <Button onClick={handlePost} color={'bright-sun.4'} variant={"light"}>
                        Publish Job
                    </Button>
                    <Button onClick={handleDraft} color={'bright-sun.4'} variant={"outline"}>
                        Save as Draft
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default PostJob
