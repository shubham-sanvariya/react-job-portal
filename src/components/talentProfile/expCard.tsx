import {formatDate} from "@/services/utilService.tsx";

const ExpCard = (props : any) => {
    return (
        <div className={'flex flex-col gap-2'}>
            <div className={'flex justify-between flex-wrap gap-2'}>
                <div className={'flex items-center gap-2'}>
                    <div className={'p-2 bg-mine-shaft-800 rounded-md'}><img className={'h-7'} src={`/dist/assets/Icons/${props.company}.png`} alt="microsoft"/></div>
                    <div className={'flex flex-col'}>
                        <div className={'font-semibold'}>{props.title}</div>
                        <div className={'text-sm text-mine-shaft-300'}>{props.company} &bull; {props.location}</div>
                    </div>
                </div>
                <div className={'text-sm text-mine-shaft-300'}>
                    {formatDate( props.startDate)} - {formatDate( props.endDate)}
                </div>
            </div>
            <div className={'text-sm xs-mx:text-xs text-mine-shaft-300 text-justify'}>
                {props.description}
            </div>
        </div>
    )
}
export default ExpCard
