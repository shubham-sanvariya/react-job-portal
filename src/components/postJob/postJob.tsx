import SelectInput from "@/components/postJob/selectInput.tsx";
import {fields} from "@/Data/PostJob.tsx";
import {Button, TagsInput} from "@mantine/core";
import TextEditor from "@/components/postJob/textEditor.tsx";

const PostJob = () => {
    return (
        <div className={'w-4/5 mx-auto'}>
            <div className={'text-2xl font-semibold mb-5'}>Post a Job</div>
            <div className={'flex flex-col gap-5'}>
                <div className={'flex gap-10 [&>*]:w-1/2'}>
                    <SelectInput {...fields[0]} />
                    <SelectInput {...fields[1]} />
                </div>
                <div className={'flex gap-10 [&>*]:w-1/2'}>
                    <SelectInput {...fields[2]} />
                    <SelectInput {...fields[3]} />
                </div>
                <div className={'flex gap-10 [&>*]:w-1/2'}>
                    <SelectInput {...fields[4]} />
                    <SelectInput {...fields[5]} />
                </div>
                <TagsInput withAsterisk label={"skills"} placeholder={'Enter Skills'} clearable acceptValueOnBlur
                           splitChars={[',', ' ', '|']}
                />
                <div className={'[&_button[data-active="true"]]:!text-bright-sun-400 [&_button[data-active="true"]]:bg-bright-sun-400/20'}>
                    <div className="text-sm font-medium">
                        Job Description
                    </div>
                    <TextEditor/>
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
