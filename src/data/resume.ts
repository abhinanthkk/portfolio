import { ResumeData } from '@/types';

export const resumeData: ResumeData = {
  name: 'Abhinanth K K',

  titles: [
    'Software Developer',
    'Python Developer',
    'AI Developer',
    'Full Stack Developer',
  ],

  professionalSummary:
    'Aspiring Software Developer with hands-on experience in Python, C, Flask, and SQL. Passionate about building scalable web applications and AI-powered solutions to solve real-world problems. Proven ability to contribute to production-grade products through internships at AI-focused companies, working with modern technologies including Large Language Models, Retrieval-Augmented Generation, and Graph Databases.',

  careerObjective:
    'To leverage my expertise in full-stack development and artificial intelligence to build innovative, scalable solutions that make a meaningful impact. Seeking challenging opportunities at a technology-driven organization where I can contribute to cutting-edge products while continuing to grow as an engineer.',

  skills: [
    // Programming Languages
    { name: 'Python', category: 'Programming Languages' },
    { name: 'C', category: 'Programming Languages' },
    { name: 'JavaScript', category: 'Programming Languages' },
    // Frameworks & Libraries
    { name: 'React', category: 'Frameworks & Libraries' },
    { name: 'Flask', category: 'Frameworks & Libraries' },
    { name: 'FastAPI', category: 'Frameworks & Libraries' },
    { name: 'HTML5', category: 'Frameworks & Libraries' },
    { name: 'CSS3', category: 'Frameworks & Libraries' },
    { name: 'REST APIs', category: 'Frameworks & Libraries' },
    // AI & Machine Learning
    { name: 'Large Language Models (LLMs)', category: 'AI & Machine Learning' },
    { name: 'Retrieval-Augmented Generation (RAG)', category: 'AI & Machine Learning' },
    // Databases
    { name: 'PostgreSQL', category: 'Databases' },
    { name: 'SQL', category: 'Databases' },
    { name: 'MongoDB', category: 'Databases' },
    { name: 'Graph Databases', category: 'Databases' },
    { name: 'Vector Databases', category: 'Databases' },
    // Tools & Technologies
    { name: 'Git', category: 'Tools & Technologies' },
    { name: 'GitHub', category: 'Tools & Technologies' },
    { name: 'Docker', category: 'Tools & Technologies' },
    // Operating Systems
    { name: 'Linux (Ubuntu)', category: 'Operating Systems' },
    // Soft Skills
    { name: 'Problem Solving', category: 'Soft Skills' },
    { name: 'Code Review', category: 'Soft Skills' },
    { name: 'API Integration', category: 'Soft Skills' },
    { name: 'Security Awareness', category: 'Soft Skills' },
  ],

  projects: [],

  experiences: [
    {
      id: 'nuvai-fsd-intern',
      company: 'Nuvai AI Solutions Pvt Ltd',
      role: 'Full Stack Development Intern',
      location: 'Bengaluru, India',
      startDate: 'July 2025',
      endDate: 'July 2025',
      responsibilities: [
        'Contributed to the development of an AI-powered product using Python, React, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), Graph Databases, and Vector Databases',
        'Developed full-stack features spanning frontend interfaces and backend services',
        'Integrated third-party and internal APIs to enhance product functionality',
        'Collaborated with the engineering team to deliver product improvements and feature enhancements',
      ],
      technologies: ['Python', 'React', 'LLMs', 'RAG', 'Graph DB', 'Vector DB'],
    },
    {
      id: 'nuvai-software-intern',
      company: 'Nuvai AI Solutions Pvt Ltd',
      role: 'Software Intern',
      location: 'Bengaluru, India',
      startDate: 'June 2026',
      endDate: 'July 2026',
      responsibilities: [
        'Developed backend features and enhancements for core product systems',
        'Built CLI tools to streamline development workflows and improve team productivity',
        'Resolved complex technical issues in large-scale Rust codebases',
        'Collaborated on comprehensive testing strategies, API integration, and security enhancements',
        'Participated in code reviews, ensuring code quality and adherence to best practices',
      ],
      technologies: ['Rust', 'Python', 'CLI Tools', 'APIs', 'Security'],
    },
  ],

  education: [
    {
      id: 'gce-erode',
      institution: 'Government College of Engineering, Erode',
      degree: 'Bachelor of Engineering',
      field: 'Electronics and Communication Engineering',
      location: 'Erode, Tamil Nadu',
      grade: 'CGPA: 7.66',
    },
    {
      id: 'kongu-hsc',
      institution: 'Namakkal Kongu Matric Higher Secondary School',
      degree: 'Higher Secondary Certificate (HSC)',
      field: 'Science',
      location: 'Namakkal, Tamil Nadu',
      grade: '82%',
    },
  ],

  certifications: [
    // TODO: Add certifications if available
  ],

  achievements: [
    // TODO: Add specific achievements
  ],

  interests: [
    'Artificial Intelligence',
    'Open Source Software',
    'Web Development',
    'Systems Programming',
    'Developer Tools',
    'Competitive Programming',
    'Technology Blogging',
    'Continuous Learning',
  ],

  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/abhinanthkk',
      icon: 'github',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/abhinanthkk',
      icon: 'linkedin',
    },
    {
      name: 'Email',
      url: 'mailto:kkabhinanth29@gmail.com',
      icon: 'email',
    },
  ],

  contact: {
    email: 'kkabhinanth29@gmail.com',
    phone: '+91 9361216661',
    location: 'Namakkal, Tamil Nadu, India',
    linkedin: 'https://www.linkedin.com/in/abhinanthkk',
    github: 'https://github.com/abhinanthkk',
    // WhatsApp deep link — digits only, no spaces or dashes
    whatsapp: 'https://wa.me/919361216661',
  },
};
