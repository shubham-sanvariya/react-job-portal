export interface ProfileType {
    id: number;
    jobTitle: string;
    company: string;
    location: string;
    about: string;
    skills: string[];
    experiences: Experience[];
    certificates: Certification[];
}

export interface Experience {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Certification {
    title: string;
    issuer: string;
    issueDate: string;
    certificateId: string;
}
