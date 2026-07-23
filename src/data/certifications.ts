export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  skills: string[];
  thumbnail: string;
  certificate: string;
  verifyLink?: string;
  featured: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  image?: string;
  proofLink?: string;
}

export const certifications: Certification[] = [
  // ── Featured ──────────────────────────────────────────────────────────────
  {
    id: 'isro-spacetechnology',
    title: 'Space Technology',
    issuer: 'ISRO',
    issueDate: 'May 2026',
    skills: ['Space Technology', 'Satellite Communication', 'Remote Sensing', 'Orbital Mechanics'],
    thumbnail: '/certificates/isrospacetech.png',
    certificate: '/certificates/isrospacetech.png',
    featured: true,
  },
  {
    id: 'isro-av-image-analysis',
    title: 'Aerial Vehicle & Image Analysis',
    issuer: 'ISRO',
    issueDate: 'April 2026',
    skills: ['Image Processing', 'Aerial Imaging', 'Remote Sensing', 'Satellite Data Analysis'],
    thumbnail: '/certificates/isroavdimganalysis.png',
    certificate: '/certificates/isroavdimganalysis.png',
    featured: true,
  },
  {
    id: 'mongodb-rag',
    title: 'RAG with MongoDB',
    issuer: 'MongoDB',
    issueDate: 'July 2026',
    skills: ['MongoDB', 'RAG', 'Vector Search', 'LLMs', 'Atlas', 'Embeddings'],
    thumbnail: '/certificates/RAGwithMongoDB.png',
    certificate: '/certificates/RAGwithMongoDB.png',
    featured: true,
  },
  {
    id: 'mongodb-vector-search',
    title: 'Vector Search Fundamentals',
    issuer: 'MongoDB',
    issueDate: 'July 2026',
    skills: ['MongoDB', 'Atlas Vector Search', 'Vector Database', 'AI Search', 'Embeddings'],
    thumbnail: '/certificates/vectorsearchfundamentals.png',
    certificate: '/certificates/vectorsearchfundamentals.png',
    featured: true,
  },
  {
    id: 'tata-genai-data-analytics',
    title: 'GenAI Powered Data Analytics Job Simulation',
    issuer: 'Tata Group \u00d7 Forage',
    issueDate: 'July 2026',
    skills: [
      'Data Analytics',
      'Exploratory Data Analysis (EDA)',
      'Risk Profiling',
      'Predictive Analytics',
      'Data Visualization',
      'Business Reporting',
      'Data Storytelling',
      'AI Strategy',
      'Generative AI',
    ],
    thumbnail: '/certificates/tatacertification.png',
    certificate: '/certificates/tatacertification.png',
    featured: false,
  },
  {
    id: 'mongodb-crud',
    title: 'CRUD Operations with MongoDB',
    issuer: 'MongoDB',
    issueDate: 'July 2026',
    skills: ['MongoDB', 'CRUD', 'NoSQL', 'Aggregation Pipeline', 'Atlas'],
    thumbnail: '/certificates/crudmongodb.png',
    certificate: '/certificates/crudmongodb.png',
    featured: false,
  },
  {
    id: 'servicenow-playbook',
    title: 'Playbook Essentials',
    issuer: 'ServiceNow',
    issueDate: 'June 2026',
    skills: ['ServiceNow', 'Playbooks', 'Workflow Automation', 'ITSM', 'Process Optimization'],
    thumbnail: '/certificates/playbookessntials.png',
    certificate: '/certificates/playbookessntials.png',
    featured: false,
  },
  {
    id: 'servicenow-flows',
    title: 'Flow Designer',
    issuer: 'ServiceNow',
    issueDate: 'June 2026',
    skills: ['ServiceNow', 'Flow Designer', 'Workflow Automation', 'Business Rules'],
    thumbnail: '/certificates/flows.png',
    certificate: '/certificates/flows.png',
    featured: false,
  },
  {
    id: 'servicenow-welcome',
    title: 'Welcome to ServiceNow',
    issuer: 'ServiceNow',
    issueDate: 'June 2026',
    skills: ['ServiceNow', 'ITSM', 'Service Management', 'Cloud Platform'],
    thumbnail: '/certificates/welcometoservicenow.png',
    certificate: '/certificates/welcometoservicenow.png',
    featured: false,
  },
  {
    id: 'nielt-python',
    title: 'Python Programming',
    issuer: 'NIELIT',
    issueDate: 'March 2025',
    skills: ['Python', 'Programming', 'Problem Solving'],
    thumbnail: '/certificates/nieltpython.png',
    certificate: '/certificates/nieltpython.png',
    featured: false,
  },
  {
    id: 'nielt-embedded',
    title: 'Embedded Systems',
    issuer: 'NIELIT',
    issueDate: 'March 2025',
    skills: ['Embedded Systems', 'Microcontrollers', 'C Programming', 'Hardware Interfacing'],
    thumbnail: '/certificates/nieltsembedded.png',
    certificate: '/certificates/nieltsembedded.png',
    featured: false,
  },
  {
    id: 'nielt-vlsi',
    title: 'VLSI Design',
    issuer: 'NIELIT',
    issueDate: 'March 2025',
    skills: ['VLSI', 'Digital Design', 'Verilog', 'Chip Design'],
    thumbnail: '/certificates/nieltvlsi.png',
    certificate: '/certificates/nieltvlsi.png',
    featured: false,
  },
  {
    id: 'guvi-bigdata',
    title: 'Big Data',
    issuer: 'GUVI',
    issueDate: 'February 2025',
    skills: ['Big Data', 'Data Processing', 'Hadoop', 'Data Analytics'],
    thumbnail: '/certificates/guvibigdata.png',
    certificate: '/certificates/guvibigdata.png',
    featured: false,
  },
  {
    id: 'guvi-google-ai-studio',
    title: 'Google AI Studio',
    issuer: 'GUVI',
    issueDate: 'January 2025',
    skills: ['Google AI Studio', 'Generative AI', 'LLMs', 'Prompt Engineering'],
    thumbnail: '/certificates/guvigoogleAIstudio.png',
    certificate: '/certificates/guvigoogleAIstudio.png',
    featured: false,
  },
  {
    id: 'python-general',
    title: 'Python',
    issuer: 'GUVI',
    issueDate: 'December 2024',
    skills: ['Python', 'Programming Fundamentals', 'Scripting'],
    thumbnail: '/certificates/python.png',
    certificate: '/certificates/python.png',
    featured: false,
  },
  {
    id: 'iist-workshop',
    title: 'IIST Technical Workshop',
    issuer: 'IIST',
    issueDate: 'November 2024',
    skills: ['Technical Workshop', 'Engineering', 'Problem Solving'],
    thumbnail: '/certificates/iistworkshop.png',
    certificate: '/certificates/iistworkshop.png',
    featured: false,
  },
  {
    id: 'robotics-competition',
    title: 'Robotics Competition',
    issuer: 'College of Engineering',
    issueDate: 'October 2024',
    skills: ['Robotics', 'Competition', 'Team Collaboration', 'Engineering Design'],
    thumbnail: '/certificates/roboticscompetition.png',
    certificate: '/certificates/roboticscompetition.png',
    featured: false,
  },
  {
    id: 'robotics-workshop',
    title: 'Robotics Workshop',
    issuer: 'College of Engineering',
    issueDate: 'October 2024',
    skills: ['Robotics', 'Embedded Systems', 'Sensor Integration', 'Automation'],
    thumbnail: '/certificates/roboticsworkshop.png',
    certificate: '/certificates/roboticsworkshop.png',
    featured: false,
  },
  {
    id: 'hackxtreme',
    title: 'HackXtreme',
    issuer: 'College of Engineering',
    issueDate: 'September 2024',
    skills: ['Hackathon', 'Team Collaboration', 'Problem Solving', 'Innovation'],
    thumbnail: '/certificates/HackXtreme.png',
    certificate: '/certificates/HackXtreme.png',
    featured: false,
  },
  {
    id: 'project-war-gcee',
    title: 'Project Competition',
    issuer: 'College of Engineering',
    issueDate: 'August 2024',
    skills: ['Project Development', 'Presentation', 'Teamwork', 'Engineering'],
    thumbnail: '/certificates/projectwargcee.png',
    certificate: '/certificates/projectwargcee.png',
    featured: false,
  },
];

// ── Sort: featured first, newest first, alpha if same date ────────────────────
certifications.sort((a, b) => {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  const dateCompare = b.issueDate.localeCompare(a.issueDate);
  if (dateCompare !== 0) return dateCompare;
  return a.title.localeCompare(b.title);
});

export const achievements: Achievement[] = [
  {
    id: 'oracle-cloud',
    title: 'Oracle Cloud Infrastructure',
    organization: 'Oracle',
    date: 'June 2026',
    description: 'Completed Oracle Cloud Infrastructure foundational training.',
    image: '/achievements/oraclecloud.png',
  },
  {
    id: 'technical-quiz',
    title: 'Technical Quiz Competition',
    organization: 'College of Engineering',
    date: 'October 2024',
    description: 'Secured position in inter-college technical quiz competition.',
    image: '/achievements/technicalquiz.png',
  },
  {
    id: 'project-presentation',
    title: 'Project Presentation',
    organization: 'College of Engineering',
    date: 'September 2024',
    description: 'Presented a technical project at college-level symposium.',
    image: '/achievements/projectpresentation.png',
  },
  {
    id: 'paper-presentation',
    title: 'Paper Presentation',
    organization: 'College of Engineering',
    date: 'August 2024',
    description: 'Presented a research paper at a national-level conference.',
    image: '/achievements/paperpresentation.jpg',
  },
  {
    id: 'mongodb-achievement-badge',
    title: 'MongoDB CRUD Achievement',
    organization: 'MongoDB',
    date: 'July 2026',
    description: 'Achievement badge for completing MongoDB CRUD operations.',
    image: '/achievements/crudmongodb.png',
  },
];
