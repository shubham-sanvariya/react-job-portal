import {Button, TextInput} from "@mantine/core";
import SelectInput from "@/profile/selectInput.tsx";
import fields from "@/Data/Profile.tsx";
import {MonthPickerInput} from "@mantine/dates";
import {useState} from "react";


const CertiInput = ( props : any ) => {
    const [issuedDate, setIssuedDate] = useState<Date | null>(new Date());

    return (
        <div className={'flex flex-col gap-3'}>
            <div className={'text-lg font-semibold'}>Add Certificate</div>
            <div className={'flex gap-10 [&>*]:w-1/2'}>
                <TextInput
                    withAsterisk
                    label={'Title'}
                    placeholder={'Enter Title'}
                />
                <SelectInput {...fields[2]} />
            </div>
            <div className={'flex gap-10 [&>*]:w-1/2'}>
                <MonthPickerInput
                    withAsterisk
                    maxDate={new Date()}
                    label={'Issue Date'}
                    placeholder={'Pick Date'}
                    value={issuedDate}
                    onChange={setIssuedDate}
                />
                <TextInput
                    withAsterisk
                    label={'Certificate ID'}
                    placeholder={'Enter ID'}
                />
            </div>
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
export default CertiInput
