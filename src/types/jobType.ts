export interface JobType {
    id: number;
    jobTitle: string;
    company: string;
    applicants: ApplicantType[];
    about: string;
    experience: string;
    jobType: string;
    location: string;
    packageOffered: number;
    postTime: string;
    description: string;
    skillRequired: string[];
    postedBy : number;
}

export const JobInitialValues : JobType = {
    about: "",
    applicants: [],
    company: "",
    description: "",
    experience: "",
    id: 0,
    jobTitle: "",
    jobType: "",
    location: "",
    packageOffered: 0,
    postTime: "",
    skillRequired: [],
    postedBy: 0
}

export interface ApplicantType {
    applicantId: number;
    timeStamp: string; // LocalDateTime is usually serialized as an ISO string
    applicationStatus: string;
}
export interface ApplicationType {
    id : number;
    applicantId: number;
    interviewTime?: string; // LocalDateTime is usually serialized as an ISO string
    applicationStatus: string;
}
