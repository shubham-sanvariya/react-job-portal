export interface ProfileType {
    id: number;
    jobTitle: string;
    company: string;
    location: string;
    about: string;
    skills: string[];
    experiences: ExperienceType[];
    certificates: Certification[];
}

export interface ExperienceType {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    working: boolean;
}

export interface Certification {
    title: string;
    issuer: string;
    issueDate: string;
    certificateId: string;
}
