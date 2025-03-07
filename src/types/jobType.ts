
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
    // jobStatus: string;
}


export interface ApplicantType {
    applicantId: number;
    timeStamp: string; // LocalDateTime is usually serialized as an ISO string
    applicationStatus: string;
}
