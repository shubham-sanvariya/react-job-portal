import {useCallback, useEffect, useState} from "react";
import {getAllProfiles} from "@/services/profileService.tsx";
import {ProfileType} from "@/types/profileType.ts";

const UseProfiles = () => {
    const [profiles, setProfiles] = useState<ProfileType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getAllApplicantProfiles = useCallback(async () => {
        try {
            const data = await getAllProfiles();
            if (data) setProfiles(data);
        } catch {
            setError("Failed to load profiles");
        } finally {
            setLoading(false);
        }
    },[]);

    useEffect(() => {
        getAllApplicantProfiles().then();
    }, [getAllApplicantProfiles]);

    return { profiles, loading, error, refetch: getAllApplicantProfiles }
}
export default UseProfiles
