import SelectInput from "@/profile/selectInput.tsx";
import fields from "@/Data/Profile.tsx";
import {Button, Checkbox, Textarea} from "@mantine/core";
import {useState} from "react";
import {profile} from "@/Data/TalentData.tsx";
import {MonthPickerInput} from "@mantine/dates";

const ExpInput = (props: any) => {
    const [desc, setDesc] = useState(profile.about);
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [checked, setChecked] = useState(false);

    return (
        <div className={'flex flex-col gap-3'}>
            <div className={'text-lg font-semibold'}>{props.add? "Add " : 'Edit '}Experience</div>
            <div className={'flex gap-10 [&>*]:w-1/2'}>
                <SelectInput {...fields[0]} />
                <SelectInput {...fields[1]} />
            </div>
            <SelectInput {...fields[2]} />
            <Textarea
                withAsterisk
                label={'Summary'}
                placeholder={'Enter Summary...'}
                minRows={3}
                autosize
                value={desc}
                onChange={(event) => setDesc(event.currentTarget.value)}
            />
            <div className={'flex gap-10 [&>*]:w-1/2'}>
                <MonthPickerInput
                    withAsterisk
                    maxDate={endDate || undefined}
                    label={'Start Date'}
                    placeholder={'Pick Date'}
                    value={startDate}
                    onChange={setStartDate}
                />
                <MonthPickerInput
                    disabled={checked}
                    withAsterisk
                    minDate={startDate || undefined}
                    label={'End Date'}
                    placeholder={'Pick Date'}
                    value={endDate}
                    onChange={setEndDate}
                />
            </div>
                <Checkbox
                    label={'Currently working here'}
                    checked={checked}
                    onChange={(event) => setChecked(event.currentTarget.checked)}
                    autoContrast
                />
            <div className="flex gap-5">
                <Button onClick={() => props.setEdit(false)}
                        color={'bright-sun.4'} variant={"outline"}>Save</Button>
                <Button
                    onClick={() => props.setEdit(false)}
                    color={'red.8'} variant={"light"}>Cancel</Button>
            </div>
        </div>
    )
}
export default ExpInput
