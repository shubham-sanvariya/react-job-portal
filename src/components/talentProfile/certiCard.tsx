import {CertificationType} from "@/types/profileType.ts";
import {formatDate} from "@/services/utilService.tsx";

const CertiCard = (props:CertificationType) => {
    return (

        <div className={'flex justify-between sm-mx:flex-wrap sm-mx:gap-2'}>
            <div className={'flex items-center gap-2'}>
                <div className={'p-2 bg-mine-shaft-800 rounded-md shrink-0'}><img className={'h-7'} src={`/src/assets/Icons/${props.issuer}.png`} alt="microsoft"/></div>
                <div className={'flex flex-col'}>
                    <div className={'font-semibold xs-mx:text-sm'}>{props.title}</div>
                    <div className={'text-sm text-mine-shaft-300 xs-mx:text-sm'}>{props.issuer}</div>
                </div>
            </div>
            <div className={'flex flex-col items-end sm-mx:flex-row sm-mx:gap-2'}>
                <div className={'text-sm text-mine-shaft-300'}>Issued {formatDate(props.issueDate)}</div>
                <div className={'text-sm text-mine-shaft-300'}>ID: &nbsp; {props.certificateId}</div>
            </div>
        </div>
    )
}
export default CertiCard
