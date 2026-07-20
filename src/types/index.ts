export interface Skill {
  name: string;
  category: SkillCategory;
  icon?: string;
}

export type SkillCategory =
  | 'Programming Languages'
  | 'Frameworks & Libraries'
  | 'AI & Machine Learning'
  | 'Databases'
  | 'Tools & Technologies'
  | 'Cloud & DevOps'
  | 'Operating Systems'
  | 'Soft Skills';

export type ProjectStatus = 'Completed' | 'In Progress' | 'Active' | 'Archived';

export type ProjectCategory =
  | 'Full Stack'
  | 'Frontend'
  | 'Backend'
  | 'AI/ML'
  | 'DevOps'
  | 'Tool'
  | 'Web App';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  technologies: string[];
  keyFeatures: string[];
  challenges: string[];
  impact: string;
  category: ProjectCategory;
  status: ProjectStatus;
  year: number;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  grade: string;
  startYear?: string;
  endYear?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  whatsapp: string;
}

export interface ResumeData {
  name: string;
  titles: string[];
  professionalSummary: string;
  careerObjective: string;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];
  interests: string[];
  socialLinks: SocialLink[];
  contact: ContactInfo;
}
