import {IconTrash} from "@tabler/icons-react";
import {ActionIcon} from "@mantine/core";
import {formatDate} from "@/services/utilService.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@/store.tsx";
import {selectProfile, updateProfileAsyncThunk} from "@/slices/profileSlice.tsx";
import {CertificationType, ProfileType} from "@/types/profileType.ts";
import {successNotification} from "@/services/notificationServices.tsx";

const CertiCard = (props: any) => {

    const dispatch = useDispatch<AppDispatch>();
    const profileState = useSelector(selectProfile);

    const handleDelete = () => {
        const certis : CertificationType[] | [] = [...(profileState?.certificates || [] )];

        certis.splice(props.index, 1);
        const updatedProfile = {...profileState, certificates : certis};
        dispatch(updateProfileAsyncThunk(updatedProfile as ProfileType));
        successNotification("Success", `Certificate Deleted Successfully`);
    }

    return (

        <div className={'flex justify-between'}>
            <div className={'flex items-center gap-2'}>
                <div className={'p-2 bg-mine-shaft-800 rounded-md'}><img className={'h-7'}
                                                                         src={`/src/assets/Icons/${props.issuer}.png`}
                                                                         alt="microsoft"/></div>
                <div className={'flex flex-col'}>
                    <div className={'font-semibold'}>{props.title}</div>
                    <div className={'text-sm text-mine-shaft-300'}>{props.company}</div>
                </div>
            </div>
            <div className={'flex items-center gap-2'}>

                <div className={'flex flex-col items-end'}>
                    <div className={'text-sm text-mine-shaft-300'}>{formatDate(props.issueDate)}</div>
                    <div className={'text-sm text-mine-shaft-300'}>ID: {props.certificateId}</div>
                </div>

                {props.edit && <ActionIcon onClick={handleDelete} color={'red.8'} variant={'subtle'}>
                    <IconTrash
                        className="h-4/5 w-4/5"
                        stroke={1.5}
                    />
                </ActionIcon>}

            </div>
        </div>
    )
}
export default CertiCard
