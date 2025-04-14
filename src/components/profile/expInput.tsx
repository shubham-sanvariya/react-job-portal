import SelectInput from "@/components/profile/selectInput.tsx";
import fields from "@/Data/Profile.tsx";
import {Button, Checkbox, Textarea} from "@mantine/core";
import {useEffect} from "react";
import {MonthPickerInput} from "@mantine/dates";
import {hasLength, useForm} from "@mantine/form";
import {useDispatch, useSelector} from "react-redux";
import {selectProfile, updateProfileAsyncThunk} from "@/slices/profileSlice.tsx";
import {AppDispatch} from "@/store.tsx";
import {ProfileType} from "@/types/profileType.ts";
import {errorNotification, successNotification} from "@/services/notificationUtils.tsx";
import axios from "axios";

const ExpInput = (props: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const profileState = useSelector(selectProfile);

    const form = useForm({
        mode: "controlled",
        validateInputOnChange: true,
        initialValues: {
            title: "",
            company: "",
            location: "",
            description: "",
            startDate: new Date(),
            endDate: new Date(),
            working: false
        },
        validate: {
            title: hasLength({min: 3}, 'Must be at least 3 Characters')
            , company: hasLength({min: 3}, 'Must be at least 3 Characters')
            , location: hasLength({min: 3}, 'Must be at least 3 Characters')
            , description: hasLength({min: 50}, 'Must be at least 3 Characters'),
        }
    })

    useEffect(() => {
        if (!props.add) {
            const expObj = {
                title: props.title,
                company: props.company,
                location: props.location,
                description: props.description,
                startDate: new Date(props.startDate),
                endDate: new Date(props.endDate),
                working: props.working
            }
            form.setValues(expObj);
        }
    }, []);

    const validateFormBeforeSave = () => {
        form.validate();
        if (!form.isValid()) return;
        const exp = [...(profileState?.experiences || [])];
        const startDate = form.getInputProps("startDate").value
        const endDate = form.getInputProps("endDate").value
        const values = {
            ...form.getValues(),
            startDate: new Date(startDate.setHours(12, 0, 0, 0)).toISOString(),
            endDate: new Date(endDate.setHours(12, 0, 0, 0)).toISOString(),
        };

        if (props.add) {
            exp.push(values);

        } else {
            exp[props.index] = values;
        }

        return exp;
    }

    const handleSave = () => {
        const exp = validateFormBeforeSave();

        props.setEdit(false);
        const updatedProfile = {...profileState, experiences: exp};
        try {
            dispatch(updateProfileAsyncThunk(updatedProfile as ProfileType));
            successNotification("Success", `Experience ${props.add ? "Added" : "Updated"} Successfully`);
        }catch (err: unknown) {
            let errMsg: string;
            if (axios.isAxiosError(err)) {
                errMsg = err.response?.data?.errorMessage
                console.log(errMsg);
            } else {
                errMsg = "An unexpected error occurred"
                console.log(errMsg, err);
            }
            errorNotification(props.add?"Failed to add Experience":"Failed to update Experience", errMsg);
        }
    }

    return (
        <div className={'flex flex-col gap-3'}>
            <div className={'text-lg font-semibold'}>{props.add ? "Add " : 'Edit '}Experience</div>
            <div className={'flex gap-10 [&>*]:w-1/2 [&>*]:xs-mx:w-full xs-mx:flex-wrap xs-mx:gap-5'}>
                <SelectInput form={form} name="title" {...fields[0]} />
                <SelectInput form={form} name="company" {...fields[1]} />
            </div>
            <SelectInput form={form} name="location" {...fields[2]} />
            <Textarea
                {...form.getInputProps("description")}
                withAsterisk
                label={'Summary'}
                placeholder={'Enter Summary...'}
                minRows={3}
                autosize
                value={form.getValues().description}
            />
            <div className={'flex gap-10 [&>*]:w-1/2'}>
                <MonthPickerInput
                    {...form.getInputProps("startDate")}
                    withAsterisk
                    maxDate={form.getValues().endDate || undefined}
                    label={'Start Date'}
                    placeholder={'Pick Date'}
                />
                <MonthPickerInput
                    {...form.getInputProps("endDate")}
                    disabled={form.getValues().working}
                    withAsterisk
                    minDate={form.getValues().startDate || undefined}
                    label={'End Date'}
                    placeholder={'Pick Date'}
                />
            </div>
            <Checkbox
                {...form.getInputProps("working")}
                label={'Currently working here'}
                checked={form.getValues().working}
                onChange={(event) => form.setFieldValue("working", event.currentTarget.checked)}
                autoContrast
            />
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
export default ExpInput
