import {Button} from "@mantine/core";
import {useState} from "react";
import ExpInput from "@/profile/expInput.tsx";

const ExpCard = (props : any) => {
    const [edit, setEdit] = useState(false);
    return !edit ? (
        <div className={'flex flex-col gap-2'}>
            <div className={'flex justify-between'}>
                <div className={'flex items-center gap-2'}>
                    <div className={'p-2 bg-mine-shaft-800 rounded-md'}><img className={'h-7'} src={`/src/assets/Icons/${props.company}.png`} alt="microsoft"/></div>
                    <div className={'flex flex-col'}>
                        <div className={'font-semibold'}>{props.title}</div>
                        <div className={'text-sm text-mine-shaft-300'}>{props.company} &bull; {props.location}</div>
                    </div>
                </div>
                <div className={'text-sm text-mine-shaft-300'}>
                    {props.startDate} - {props.endDate}
                </div>
            </div>
            <div className={'text-sm text-mine-shaft-300 text-justify'}>
                {props.description}
            </div>
            {props.edit && <div className="flex gap-5">
                <Button onClick={() => setEdit(true)}
                    color={'bright-sun.4'} variant={"outline"}>Edit</Button>
                <Button
                    color={'red.8'} variant={"light"}>Delete</Button>
            </div>}
        </div>
    ) : <ExpInput setEdit={setEdit}/>
}
export default ExpCard
