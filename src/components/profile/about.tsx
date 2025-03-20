import {useState} from 'react'
import {ActionIcon, Textarea} from "@mantine/core";
import {IconCheck, IconPencil, IconX} from "@tabler/icons-react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@/store.tsx";
import {selectProfile, updateProfileAsyncThunk} from "@/slices/profileSlice.tsx";
import {ProfileType} from "@/types/profileType.ts";
import {successNotification} from "@/services/notificationServices.tsx";

const About = () => {
    const dispatch = useDispatch<AppDispatch>();
    const profileState = useSelector(selectProfile);
    const [edit, setEdit] = useState<boolean>(false);
    const [about, setAbout] = useState(profileState?.about || "");

    const handleEdit = () => {
        if (!edit) {
            setAbout(profileState?.about ?? "");
            setEdit(true)
        } else {
            setEdit(false);
        }
    }

    const handleSave = () => {
        setEdit(false);
        const updatedProfile = {...profileState, about};
        dispatch(updateProfileAsyncThunk(updatedProfile as ProfileType));
        successNotification("Success", "About Updated Successfully.")
    }

    return (
        <div>
            <div className={'flex justify-between text-2xl font-semibold mb-3'}>About
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
            {edit ? <Textarea
                    placeholder={'Enter About YourSelf...'}
                    minRows={3}
                    autosize
                    value={about}
                    onChange={(event) => setAbout(event.currentTarget.value)}
                />
                :
                <div className={'text-sm text-mine-shaft-300 text-justify'}>
                    {profileState?.about}
                </div>
            }
        </div>
    )
}
export default About
