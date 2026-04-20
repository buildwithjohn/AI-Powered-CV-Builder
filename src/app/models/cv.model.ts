export interface PersonalDetails {
  name: string;
  role: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  summary: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface CvData {
  personal: PersonalDetails;
  experience: Experience[];
  skills: string[];
  jobDescription: string;
  aiResult: string;
}
