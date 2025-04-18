import {Button, FileInput, LoadingOverlay, NumberInput, Textarea, TextInput} from "@mantine/core";
import {IconPaperclip} from "@tabler/icons-react";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {hasLength, isEmail, isNotEmpty, useForm} from "@mantine/form";
import {getBase64} from "@/services/utilService.tsx";
import {applyJob} from "@/services/jobService.tsx";
import axios from "axios";
import {errorNotification, successNotification} from "@/services/notificationUtils.tsx";
import {useSelector} from "react-redux";
import {selectProfile} from "@/slices/profileSlice.tsx";

const ApplicationForm = () => {
    const {id: jobId} = useParams();
    const profileState = useSelector(selectProfile);
    const navigate = useNavigate();
    const [preview, setPreview] = useState(false);
    const [submit, setSubmit] = useState(false);

    const handlePreview = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
        form.validate();
        if (!form.isValid()) return;
        setPreview(!preview);
        console.log(form.getValues())

    }
    const handleSubmit = async () => {
        setSubmit(true);
        const resume = form.getValues().resume ? await getBase64(form.getValues().resume) : null;
        let applicant;
        if (resume && profileState) {
             applicant = {
                ...form.getValues(),
                applicantId: profileState?.id,
                phone: Number(form.getValues().phone),
                resume: resume.split(',')[1]
            };
        }
        try {
           if (applicant) await applyJob(Number(jobId), applicant);
            successNotification("Success", "Application Submitted Successfully.");
            navigate("/job-history");
        } catch (err: unknown) {
            let errMsg: string;
            if (axios.isAxiosError(err)) {
                errMsg = err.response?.data?.errorMessage
                console.log(errMsg);
            } else {
                errMsg = "An unexpected error occurred"
                console.log(errMsg, err);
            }
            errorNotification("Failed Submission", errMsg);
        } finally {
            setSubmit(false);
        }
    }

    const form = useForm({
        mode: "controlled",
        validateInputOnChange: true,
        initialValues: {
            name: "",
            email: "",
            phone: "",
            website: "",
            resume: null,
            coverLetter: "",
        },
        validate: {
            name: hasLength({min: 4}, 'Must be at least 4 Characters')
            , email: isEmail("Enter a valid email"),
            phone: value =>
                /^\d{10}$/.test(value) ? null : "Enter a valid 10-digit phone number",
            website: isNotEmpty("website is required.")
            , resume: isNotEmpty("resume is required."),
        }
    })
    return (
        <div>
            <LoadingOverlay
                className="!fixed"
                visible={submit}
                zIndex={1000}
                overlayProps={{radius: 'sm', blur: 2}}
                loaderProps={{color: 'bright-sun.4', type: 'bars'}}
            />
            <div className={'text-xl font-semibold mb-5'}>
                Submit Your Application
            </div>
            <div className="flex flex-col gap-5">
                <div className={'flex gap-10 [&>*]:w-1/2 md-mx:gap-5 sm-mx:flex-wrap sm-mx:[&>*]:w-full'}>
                    <TextInput {...form.getInputProps("name")}
                               className={`${preview ? 'text-mine-shaft-300 font-semibold' : ''}`}
                               readOnly={preview}
                               variant={preview ? 'unstyled' : 'default'} label={'Full Name'} withAsterisk
                               placeholder={'Enter Name'}/>
                    <TextInput {...form.getInputProps("email")}
                               className={`${preview ? 'text-mine-shaft-300 font-semibold' : ''}`}
                               readOnly={preview}
                               variant={preview ? 'unstyled' : 'default'} label={'Email'} withAsterisk
                               placeholder={'Enter Email'}/>
                </div>
                <div className={'flex gap-10 [&>*]:w-1/2 md-mx:gap-5 sm-mx:flex-wrap sm-mx:[&>*]:w-full'}>
                    <NumberInput className={`${preview ? 'text-mine-shaft-300 font-semibold' : ''}`}
                                 {...form.getInputProps("phone")}
                                 readOnly={preview}
                                 variant={preview ? 'unstyled' : 'default'} min={0} max={9999999999}
                                 clampBehavior={"strict"} label={'Phone Number'} withAsterisk
                                 placeholder={'Enter Phone Number'} hideControls/>
                    <TextInput className={`${preview ? 'text-mine-shaft-300 font-semibold' : ''}`}
                               {...form.getInputProps("website")}
                               readOnly={preview}
                               variant={preview ? 'unstyled' : 'default'} label={'Personal Website'} withAsterisk
                               placeholder={'Enter URL'}/>
                </div>
                <FileInput
                    className={`${preview ? 'text-mine-shaft-300 font-semibold' : ''}`} readOnly={preview}
                    {...form.getInputProps("resume")}
                    accept={"application/pdf"}
                    variant={preview ? 'unstyled' : 'default'}
                    leftSection={<IconPaperclip stroke={1.5}/>}
                    label={'Resume/CV'}
                    placeholder={'Attach Your Resume/CV'}
                    leftSectionPointerEvents={'none'}
                    withAsterisk
                />
                <Textarea
                    className={`${preview ? 'text-mine-shaft-300 font-semibold' : ''}`} readOnly={preview}
                    {...form.getInputProps("coverLetter")}
                    variant={preview ? 'unstyled' : 'default'}
                    label={'Cover Letter'}
                    placeholder={'mention Some of the Project\'s you have worked on'}
                    minRows={4}
                    autosize
                    withAsterisk
                />
                {!preview &&
                    <Button onClick={handlePreview} color={'bright-sun.4'} variant={"light"}>
                        Preview
                    </Button>
                }
                {
                    preview &&
                    <div className={'flex gap-10 [&>*]:w-1/2'}>
                        <Button fullWidth onClick={handlePreview} color={'bright-sun.4'} variant={"light"}>
                            Edit
                        </Button>
                        <Button fullWidth onClick={handleSubmit} color={'bright-sun.4'} variant={"light"}>
                            Submit
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}
export default ApplicationForm
