import {Button, TextInput} from "@mantine/core";
import SelectInput from "@/components/profile/selectInput.tsx";
import fields from "@/Data/Profile.tsx";
import {MonthPickerInput} from "@mantine/dates";
import {hasLength, isNotEmpty, useForm} from "@mantine/form";
import {useDispatch, useSelector} from "react-redux";
import {selectProfile, updateProfileAsyncThunk} from "@/slices/profileSlice.tsx";
import {AppDispatch} from "@/store.tsx";
import {ProfileType} from "@/types/profileType.ts";
import {successNotification} from "@/services/notificationServices.tsx";


const CertiInput = ( props : any ) => {
    const dispatch = useDispatch<AppDispatch>();
    const profileState = useSelector(selectProfile);

    const form = useForm({
        mode: "controlled",
        validateInputOnChange: true,
        initialValues: {
            title: '',
            issuer: '',
            certificateId: '',
            issueDate: new Date(),
        },
        validate: {
            title: hasLength({min: 3}, 'Must be at least 3 Characters')
            , issuer: hasLength({min: 3}, 'Must be at least 3 Characters')
            , certificateId: hasLength({min: 3}, 'Must be at least 3 Characters')
            , issueDate: isNotEmpty( 'issueDate is required.'),
        }
    })

    const handleSave = () => {
        form.validate();
        if (!form.isValid()) return;
        const certificates = [...(profileState?.certificates || [] )];
        const startDate = form.getInputProps("issueDate").value
        const values = {
            ...form.getValues(),
            issueDate: new Date(startDate.setHours(12, 0, 0, 0)).toISOString(),
        };
        certificates.push(values);
        const updatedProfile = {...profileState, certificates};
        dispatch(updateProfileAsyncThunk(updatedProfile as ProfileType));
        successNotification("Success", `Certificates Added  Successfully`);
        props.setAddCertificate(false);
    }

    return (
        <div className={'flex flex-col gap-3'}>
            <div className={'text-lg font-semibold'}>Add Certificate</div>
            <div className={'flex gap-10 [&>*]:w-1/2'}>
                <TextInput
                    {...form.getInputProps("title")}
                    withAsterisk
                    label={'Title'}
                    placeholder={'Enter Title'}
                />
                <SelectInput form={form} name={"issuer"} {...fields[1]} />
            </div>
            <div className={'flex gap-10 [&>*]:w-1/2'}>
                <MonthPickerInput
                    {...form.getInputProps("issueDate")}
                    withAsterisk
                    maxDate={new Date()}
                    label={'Issue Date'}
                    placeholder={'Pick Date'}
                />
                <TextInput
                    {...form.getInputProps("certificateId")}
                    withAsterisk
                    label={'Certificate ID'}
                    placeholder={'Enter ID'}
                />
            </div>
            <div className="flex gap-5">
                <Button onClick={handleSave}
                        color={'green.8'} variant={"light"}>Save</Button>
                <Button
                    onClick={() => props.setEdit(false)}
                    color={'red.8'} variant={"light"}>Cancel</Button>
            </div>
        </div>
    )
}
export default CertiInput
