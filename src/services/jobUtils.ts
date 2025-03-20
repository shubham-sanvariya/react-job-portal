import {JobType} from "@/types/jobType.ts";

export const formatJobValue = (id: string, job : JobType | undefined) => {
    const key = id as keyof JobType;
    const value = job?.[key];

    if (Array.isArray(value)) {
        // If it's an array of strings (like `skillRequired`)
        if (typeof value[0] === "string") {
            return value.join(", ");
        }

        // If it's an array of objects (like `applicants`)
        if (key === "applicants") {
            return `Applicants: ${value.length}`;
        }

        return "N/A";
    }

    return value ?? "N/A";
};
