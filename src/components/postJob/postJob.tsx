import SelectInput from "@/components/postJob/selectInput.tsx";
import {content, fields} from "@/Data/PostJob.tsx";
import {Button, NumberInput, TagsInput, Textarea} from "@mantine/core";
import TextEditor from "@/components/postJob/textEditor.tsx";
import {hasLength, isNotEmpty, useForm} from "@mantine/form";

const PostJob = () => {
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
            // postTime : "",
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
                    <Button color={'bright-sun.4'} variant={"light"}>
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
