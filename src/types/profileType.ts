export interface ProfileType {
    id: number;
    jobTitle: string;
    company: string;
    location: string;
    about: string;
    picture : string;
    skills: string[];
    experiences: ExperienceType[];
    certificates: CertificationType[];
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

export interface CertificationType {
    title: string;
    issuer: string;
    issueDate: string;
    certificateId: string;
}
