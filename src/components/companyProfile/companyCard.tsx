import {IconExternalLink} from "@tabler/icons-react";
import {ActionIcon} from "@mantine/core";

const CompanyCard = (props : any) => {
    return (
        <div>
            <div className={'flex justify-between items-center bg-mine-shaft-900 rounded-lg p-2'}>
                <div className={'flex items-center gap-2'}>
                    <div className={'p-2 bg-mine-shaft-800 rounded-md'}><img className={'h-7'} src={`/dist/assets/Icons/${props.name}.png`} alt="microsoft"/></div>
                    <div>
                        <div className={'font-semibold'}>{props.name}</div>
                        <div className={'text-xs text-mine-shaft-300'}>{props.employees} Employees</div>
                    </div>
                </div>
                <ActionIcon color={'bright-sun.4'} variant="subtle" >
                    <IconExternalLink />
                </ActionIcon>
            </div>
        </div>
    )
}
export default CompanyCard
