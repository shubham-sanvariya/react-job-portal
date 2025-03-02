import {ActionIcon} from "@mantine/core";
import {IconBriefcase, IconCheck, IconMapPin, IconPencil, IconX} from "@tabler/icons-react";
import SelectInput from "@/components/profile/selectInput.tsx";
import fields from "@/Data/Profile.tsx";
import {useDispatch, useSelector} from "react-redux";
import {selectProfile, updateProfileAsyncThunk} from "@/slices/profileSlice.tsx";
import {useState} from "react";
import {hasLength, useForm} from "@mantine/form";
import {selectUser} from "@/slices/userSlice.tsx";
import {ProfileType} from "@/types/profileType.ts";
import {successNotification} from "@/services/notificationServices.tsx";
import {AppDispatch} from "@/store.tsx";

const Info = () => {
    const dispatch = useDispatch<AppDispatch>();
    const profileState = useSelector(selectProfile);
    const userState = useSelector(selectUser);
    const [edit, setEdit] = useState<boolean>(false);

    const handleEdit = () => {
        if (!edit) {
            setEdit(true)
            form.setValues({
                jobTitle: profileState?.jobTitle,
                company: profileState?.company,
                location: profileState?.location
            })
        } else setEdit(false);
    }

    const handleSave = () => {
        const updatedProfile = {...profileState, ...form.getValues()};
        dispatch(updateProfileAsyncThunk(updatedProfile as ProfileType));
        successNotification("Success", "Profile Updated Successfully.")
    }

    const form = useForm({
        mode: "controlled",
        initialValues: {jobTitle: "", company: "", location: ""},
        validate: {
            jobTitle: hasLength({min: 3}, 'Must be at least 3 Characters')
            , company: hasLength({min: 3}, 'Must be at least 3 Characters')
            , location: hasLength({min: 3}, 'Must be at least 3 Characters'),
        }
    })

    return (
        <>
            <div className={'flex justify-between text-3xl font-semibold '}>{userState.name}
                <div>

                    <ActionIcon size={"lg"} color={'green.8'} variant={'subtle'}
                                onClick={handleSave}
                    >
                        {edit && <IconCheck className={'h-4/5 w-4/5'}/>}
                    </ActionIcon>
                    <ActionIcon size={"lg"} color={edit ? 'red.8':'bright-sun.4'} variant={'subtle'}
                                onClick={handleEdit}
                    >
                        {edit ? <IconX className={'h-4/5 w-4/5'}/> :
                            <IconPencil className={'h-4/5 w-4/5'}/>}
                    </ActionIcon>
                </div>
            </div>
            {edit ? <>
                    <div className={'flex gap-10 [&>*]:w-1/2'}>
                        <SelectInput form={form} name={"jobTitle"} {...fields[0]} />
                        <SelectInput form={form} name={"company"} {...fields[1]} />
                    </div>
                    <SelectInput form={form} name={"location"} {...fields[2]} />
                </>
                :
                <>
                    <div className={'text-xl flex gap-1 items-center'}><IconBriefcase
                        className={'h-5 w-5'}/> {profileState?.jobTitle} &bull; {profileState?.company}
                    </div>
                    <div className={'flex gap-1 text-xs text-mine-shaft-400 items-center'}>
                        <IconMapPin className={'h-5 w-5'} stroke={1.5}/> {profileState?.location}
                    </div>
                </>
            }
        </>
    )
}
export default Info
