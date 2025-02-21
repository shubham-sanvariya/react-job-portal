import {
    Button,
    Divider,
    FileInput,
    LoadingOverlay,
    Notification,
    NumberInput,
    rem,
    Textarea,
    TextInput
} from "@mantine/core";
import {IconCheck, IconPaperclip} from "@tabler/icons-react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const ApplyJobComp = () => {
    const navigate = useNavigate();
    const [preview, setPreview] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [sec, setSec] = useState(5);
    const handlePreview = () => {
        setPreview(!preview);
        window.scrollTo({top:0, behavior: 'smooth'})
    }
    const handleSubmit = () => {
        setSubmit(true);
        let x = 5;
        setInterval(() => {
            x--;
            setSec(x);
            if (x === 0) navigate('/find-jobs')
        },1000)
    }
    return (<>
        <div className={'w-2/3 mx-auto'}>
            <LoadingOverlay
                className="!fixed"
                visible={submit}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2}}
                loaderProps={{ color: 'bright-sun.4', type: 'bars'}}
            />
            <div className={'flex justify-between'}>
                <div className={'flex items-center gap-2'}>
                    <div className={'p-3 bg-mine-shaft-800 rounded-xl'}><img className={'h-14'}
                                                                             src={`/src/assets/Icons/Google.png`}
                                                                             alt="microsoft"/></div>
                    <div>
                        <div className={'font-semibold text-2xl'}>jobTitle</div>
                        <div
                            className={'text-lg text-mine-shaft-300'}>company &bull; applicants &bull; Applicants
                        </div>
                    </div>
                </div>
            </div>
            <Divider my={'xl'}/>
            <div className={'text-xl font-semibold mb-5'}>
                Submit Your Application
            </div>
            <div className="flex flex-col gap-5">
                <div className={'flex gap-10 [&>*]:w-1/2'}>
                    <TextInput className={`${preview ? 'text-mine-shaft-300 font-semibold' : ''}`} readOnly={preview}
                               variant={preview ? 'unstyled' : 'default'} label={'Full Name'} withAsterisk
                               placeholder={'Enter Name'}/>
                    <TextInput className={`${preview ? 'text-mine-shaft-300 font-semibold' : ''}`} readOnly={preview}
                               variant={preview ? 'unstyled' : 'default'} label={'Email'} withAsterisk
                               placeholder={'Enter Email'}/>
                </div>
                <div className={'flex gap-10 [&>*]:w-1/2'}>
                    <NumberInput className={`${preview ? 'text-mine-shaft-300 font-semibold' : ''}`} readOnly={preview}
                                 variant={preview ? 'unstyled' : 'default'} min={0} max={9999999999}
                                 clampBehavior={"strict"} label={'Phone Number'} withAsterisk
                                 placeholder={'Enter Phone Number'} hideControls/>
                    <TextInput className={`${preview ? 'text-mine-shaft-300 font-semibold' : ''}`} readOnly={preview}
                               variant={preview ? 'unstyled' : 'default'} label={'Personal Website'} withAsterisk
                               placeholder={'Enter URL'}/>
                </div>
                <FileInput
                    className={`${preview ? 'text-mine-shaft-300 font-semibold' : ''}`} readOnly={preview}
                    variant={preview ? 'unstyled' : 'default'}
                    leftSection={<IconPaperclip stroke={1.5}/>}
                    label={'Attach Your CV'}
                    placeholder={'Your CV'}
                    leftSectionPointerEvents={'none'}
                    withAsterisk
                />
                <Textarea
                    className={`${preview ? 'text-mine-shaft-300 font-semibold' : ''}`} readOnly={preview}
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
            <Notification className={`!border-bright-sun-400 z-[1001] !fixed top-0 left-[35%] transition duration-300 ease-in-out ${submit?"translate-y-0":"-translate-y-20"}`} withBorder icon={<IconCheck style={{ width: rem(20), height: rem(20) }}/>}
                          color={"teal"} title={'Application Submitted!'} mt={"md"} withCloseButton={false}>
                Redirecting to Find Jobs in {sec} seconds...
            </Notification>
        </>
    )
}
export default ApplyJobComp
