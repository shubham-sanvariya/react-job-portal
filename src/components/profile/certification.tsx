import {useSelector} from "react-redux";
import {selectProfile} from "@/slices/profileSlice.tsx";
import { ActionIcon } from "@mantine/core";
import {IconPencil, IconPlus, IconX} from "@tabler/icons-react";
import {useState} from "react";
import CertiInput from "@/components/profile/certiInput.tsx";
import CertiCard from "@/components/profile/certiCard.tsx";
import {CertificationType} from "@/types/profileType.ts";
import {useMediaQuery} from "@mantine/hooks";

const Certification = () => {
    const [edit, setEdit] = useState(false);
    const [addCertificate, setAddCertificate] = useState(false);
    const profileState = useSelector(selectProfile);
    const matches = useMediaQuery('(min-width: 475px)');

    const handleClick = () => {
        setEdit(!edit);
    }

    return (
        <div className={'px-3'}>
            <div className={'flex justify-between text-2xl font-semibold mb-5'}>Certifications
                <div className={'flex gap-2'}>
                    <ActionIcon size={matches ? "md" : "lg"} color={'bright-sun.4'} variant={'subtle'}
                                onClick={() => setAddCertificate(true)}
                    >
                        <IconPlus
                            className="h-4/5 w-4/5"
                        />
                    </ActionIcon>
                    <ActionIcon size={matches ? "md" : "lg"} color={edit ? "red.8":'bright-sun.4'} variant={'subtle'}
                                onClick={handleClick}
                    >
                        {edit ? <IconX className={'h-4/5 w-4/5'}/> :
                            <IconPencil className={'h-4/5 w-4/5'}/>}
                    </ActionIcon>
                </div>
            </div>
            <div className={'flex flex-col gap-8'}>
                {
                    profileState?.certificates?.map((certi: CertificationType, index: number) => (
                        <CertiCard key={index} index={index} edit={edit} {...certi}/>
                    ))
                }
                {
                    addCertificate && <CertiInput setAddCertificate={setAddCertificate}/>
                }
            </div>
        </div>
    )
}
export default Certification
