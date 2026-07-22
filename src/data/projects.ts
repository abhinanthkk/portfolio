import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'codetrace-ai',
    title: 'CodeTrace AI',
    shortDescription:
      'An intelligent Python debugging and execution visualization platform that runs code in an isolated sandbox and traces every line to show exactly why it failed.',
    detailedDescription:
      'CodeTrace AI is a full-stack web application that debugs Python code by executing it in a Docker sandbox with sys.settrace() instrumentation. It captures real variable state at each step, performs deterministic failure analysis (IndexError, ZeroDivisionError, KeyError, NameError, TypeError) without relying on LLMs, and optionally generates AI-powered explanations using OpenAI or Gemini APIs. The interactive visual timeline lets developers click any execution step to inspect variables and highlight the corresponding source line in Monaco Editor, providing a complete debugging IDE experience.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Monaco Editor', 'Python', 'FastAPI', 'Docker', 'OpenAI API', 'Gemini API'],
    keyFeatures: [
      'Real runtime tracing via Python sys.settrace() capturing every line, function call, and variable change',
      'Safe sandbox execution in Docker containers with strict resource limits and timeout',
      'Deterministic failure analysis for 5 error types with confidence scores — no LLM required',
      'Optional AI explanation layer using OpenAI or Gemini to translate debugging evidence into plain English',
      'Interactive visual timeline with Monaco Editor — click any step to inspect state and source code',
      'Dark-themed debugging IDE with code editor, variable inspector, output console, and error display',
    ],
    challenges: [
      'Implementing sys.settrace() instrumentation that captures complete execution context without performance degradation',
      'Building a secure Docker sandbox that prevents malicious code execution while supporting legitimate debugging',
      'Designing the interactive timeline visualization for complex execution traces with deep call stacks',
    ],
    impact:
      'Helps developers debug Python code faster by providing real execution traces with variable state inspection, eliminating guesswork from debugging sessions.',
    category: 'Full Stack',
    status: 'Active',
    year: 2026,
    githubUrl: 'https://github.com/abhinanthkk/codetrace-ai',
    liveUrl: undefined,
    featured: true,
  },
  {
    id: 'ai-notes-assistant',
    title: 'AI Notes Assistant',
    shortDescription:
      'A semantic search and question-answering app for PDF documents using sentence embeddings and FAISS vector search.',
    detailedDescription:
      'AI Notes Assistant lets users upload PDF files and ask questions about their contents. Documents are automatically processed through text extraction via pdfplumber, smart chunking with configurable overlap, and embedding generation using sentence-transformers (all-MiniLM-L6-v2). When a user asks a question, it is converted to an embedding and searched against a FAISS index to retrieve the most relevant text chunks with PDF name, page number, and similarity scores. The index is persisted to disk for reload across sessions, making it a practical tool for managing a personal knowledge base of technical documents.',
    technologies: ['Python', 'Streamlit', 'sentence-transformers', 'FAISS', 'pdfplumber', 'NumPy'],
    keyFeatures: [
      'Upload and process multiple PDFs simultaneously with automatic text extraction',
      'Smart text chunking with configurable word count and overlap for context preservation',
      'Semantic search using 384-dimensional embeddings from all-MiniLM-L6-v2 transformer model',
      'Fast vector similarity search via FAISS CPU index with top-k result ranking',
      'Persistent index storage with automatic reload on app startup',
      'Result display showing PDF name, page number, similarity score, and relevant text snippet',
    ],
    challenges: [
      'Tuning chunk size and overlap parameters for optimal retrieval accuracy across diverse document types',
      'Handling PDFs with complex layouts, tables, and non-standard formatting during text extraction',
      'Optimizing FAISS index performance for real-time query response on CPU-only environments',
    ],
    impact:
      'Enables efficient knowledge retrieval from PDF documents, allowing users to query their document collection using natural language instead of manual searching.',
    category: 'AI/ML',
    status: 'Completed',
    year: 2026,
    githubUrl: 'https://github.com/abhinanthkk/ai-notes-assistant',
    liveUrl: undefined,
    featured: true,
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    shortDescription:
      'A modern, responsive developer portfolio showcasing my projects, technical skills, certifications, and experience with an interactive UI and integrated contact system.',
    detailedDescription:
      'Designed and developed a production-ready personal portfolio to showcase my software development and AI projects. The website features a modern responsive interface, smooth animations, project showcase, certifications, skills, experience, and an integrated contact form powered by secure server-side email functionality. The portfolio is optimized for performance, accessibility, and recruiter-friendly navigation.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Vercel Functions', 'Nodemailer', 'GitHub', 'Vercel'],
    keyFeatures: [
      'Modern responsive UI with dark theme and mobile-first design',
      'Interactive animations powered by Framer Motion',
      'Dynamic project showcase with search and filter capabilities',
      'Skills & certifications section with organized categories',
      'Contact form with email notifications and automatic email replies',
      'GitHub and LinkedIn integration throughout the site',
      'SEO optimized with structured data and Open Graph tags',
      'Production deployment on Vercel with CI/CD pipeline',
    ],
    challenges: [
      'Building a responsive dark-themed UI with smooth animations that works consistently across all devices and browsers',
      'Implementing a serverless contact form with Gmail SMTP integration that sends both owner notifications and visitor auto-replies',
      'Optimizing performance, SEO, and accessibility while maintaining rich interactivity and visual polish',
    ],
    impact:
      'Provides a professional online presence that showcases technical skills and projects to potential employers, with a fully functional contact system for recruiter outreach.',
    category: 'Full Stack',
    status: 'Completed',
    year: 2026,
    githubUrl: 'https://github.com/abhinanthkk/portfolio',
    liveUrl: 'https://portfolio-abhiee.vercel.app/',
    featured: true,
  },
  {
    id: 'cico',
    title: 'CICO',
    shortDescription:
      'A student check-in/check-out management system for educational institutions with role-based access control and real-time activity tracking.',
    detailedDescription:
      'CICO is a Flask-based web application that enables watchmen and administrators to track student entry and exit in educational institutions. The system features user authentication with Flask-Login, role-based access control distinguishing between watchmen and admin privileges, an admin approval workflow for new user registrations, and real-time logging of student check-in/check-out timestamps. The admin dashboard provides an overview of daily activity within a 24-hour window, with separate counts for checked-in and checked-out students.',
    technologies: ['Python', 'Flask', 'Flask-SQLAlchemy', 'Flask-Login', 'SQLite', 'HTML', 'CSS', 'JavaScript', 'Jinja2'],
    keyFeatures: [
      'User registration and authentication with Flask-Login',
      'Role-based access control (watchmen vs admin)',
      'Student check-in and check-out logging with timestamps',
      'Admin dashboard with 24-hour activity overview',
      'Admin approval workflow for new user registrations',
      'SQLite database for persistent storage',
    ],
    challenges: [
      'Designing the database schema to track check-in/out relationships',
      'Implementing role-based permissions without external dependencies',
      'Building a clean admin interface for monitoring daily activity',
    ],
    impact:
      'Streamlines student attendance tracking for educational institutions, reducing manual paperwork and providing real-time visibility into student movement.',
    category: 'Full Stack',
    status: 'In Progress',
    year: 2026,
    githubUrl: 'https://github.com/abhinanthkk/cico',
    liveUrl: undefined,
    featured: false,
  },
  {
    id: 'trace',
    title: 'Trace',
    shortDescription:
      'A code tracing and analysis tool that helps developers understand execution flow, debug complex logic, and visualize program behavior step by step.',
    detailedDescription:
      'Trace is an intelligent code tracing tool designed to demystify complex code execution by providing step-by-step visualization of program flow. It parses source code and traces execution paths, highlighting variable mutations, conditional branches, and function calls as they occur. Developers can use Trace to step through code logic interactively, set trace points on specific functions or lines, and export trace logs for collaborative debugging sessions. The tool supports multiple programming languages and integrates with popular IDEs.',
    technologies: ['Python', 'JavaScript', 'Code Analysis', 'AST Parsing', 'CLI'],
    keyFeatures: [
      'Step-by-step code execution visualization',
      'Variable mutation tracking across execution paths',
      'Conditional branch analysis with coverage indicators',
      'Interactive trace point configuration',
      'Multi-language support for code analysis',
      'Trace log export for collaborative debugging',
    ],
    challenges: [
      'Building a generic AST parser that works across multiple languages',
      'Implementing non-trivial execution path reconstruction without running code',
      'Visualizing complex call graphs in a intuitive, user-friendly interface',
    ],
    impact:
      'Helps developers understand unfamiliar codebases faster by providing visual execution traces, reducing debugging time and improving code comprehension.',
    category: 'Tool',
    status: 'Active',
    year: 2025,
    githubUrl: 'https://github.com/abhinanthkk/trace',
    liveUrl: undefined,
    featured: false,
  },
  {
    id: 'docky',
    title: 'Docky',
    shortDescription:
      'A Docker container management tool that simplifies the creation, deployment, and monitoring of containerized applications through an intuitive interface.',
    detailedDescription:
      'Docky is a container management application designed to streamline Docker workflows for developers and DevOps engineers. It provides a clean interface for managing Docker containers, images, volumes, and networks without needing to memorize complex CLI commands. Docky supports one-click container deployment from Docker Hub or custom registries, real-time container log streaming, resource usage monitoring, and Docker Compose file management. The tool aims to reduce the cognitive overhead of container orchestration for individual developers and small teams.',
    technologies: ['Docker', 'Python', 'REST APIs', 'Docker SDK', 'CLI'],
    keyFeatures: [
      'Container lifecycle management (start, stop, restart, remove)',
      'Real-time container log streaming and inspection',
      'Image management with pull, push, and tag operations',
      'Resource usage monitoring (CPU, memory, network)',
      'Docker Compose file management and deployment',
      'Volume and network management interfaces',
    ],
    challenges: [
      'Abstracting the Docker SDK into a clean, user-friendly interface',
      'Handling real-time log streaming efficiently for multiple containers',
      'Managing container state synchronization with the Docker daemon',
    ],
    impact:
      'Simplifies Docker container management for developers, reducing the learning curve for containerization and improving productivity in local development workflows.',
    category: 'DevOps',
    status: 'Active',
    year: 2025,
    githubUrl: 'https://github.com/abhinanthkk/docky',
    liveUrl: undefined,
    featured: false,
  },
  {
    id: 'prok',
    title: 'ProK – Professional Networking Platform',
    shortDescription:
      'A LinkedIn-inspired professional networking platform featuring user profiles, posts, connections, and an interactive feed for professional collaboration.',
    detailedDescription:
      'ProK is a full-featured professional networking platform designed to connect professionals and foster meaningful collaboration. Built with Python and Flask, the platform includes comprehensive user profiles with skills and experience sections, a post creation and sharing system, connection management with request and accept workflows, and an interactive feed that surfaces relevant content from a user\'s network. The platform demonstrates full-stack development capabilities in building social networking applications with PostgreSQL for data persistence, REST APIs for the frontend-backend communication, and responsive HTML/CSS for the user interface.',
    technologies: ['Python', 'Flask', 'PostgreSQL', 'JavaScript', 'HTML', 'CSS', 'REST APIs', 'Jinja2'],
    keyFeatures: [
      'User registration and profile management with skills and experience',
      'Post creation, editing, and sharing within professional network',
      'Connection requests, accept/reject workflows, and network building',
      'Interactive activity feed with engagement features',
      'Professional profile pages with rich information display',
      'Secure authentication and authorization system',
    ],
    challenges: [
      'Designing a scalable database schema for professional relationships and social graph',
      'Implementing feed ranking and content relevance algorithms',
      'Building a secure authentication system with session management',
    ],
    impact:
      'Provides a platform for professionals to connect, share knowledge, and collaborate, demonstrating enterprise-grade full-stack development and social networking architecture.',
    category: 'Full Stack',
    status: 'In Progress',
    year: 2025,
    githubUrl: 'https://github.com/abhinanthkk/prok',
    liveUrl: undefined,
    featured: false,
  },
  {
    id: 'justdoit',
    title: 'JustDoIt',
    shortDescription:
      'A dynamic and aesthetic to-do list web application with theme switching, task filtering, and smooth animations for an enjoyable productivity experience.',
    detailedDescription:
      'JustDoIt is a feature-rich to-do list application built with vanilla HTML, CSS, and JavaScript. It supports adding, completing, and deleting tasks with smooth animations on every interaction. The app features three theme modes (standard, light, and darker) that persist across sessions, a live clock display with typewriter title animation, and a filter system that lets users view all, completed, or incomplete tasks. The responsive design ensures a consistent experience across mobile and desktop devices, making task management both functional and visually pleasing.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Font Awesome', 'Google Fonts'],
    keyFeatures: [
      'Add, complete, and delete tasks with smooth animations',
      'Filter tasks by status: All, Completed, Incomplete',
      'Three persistent theme modes: Standard, Light, Darker',
      'Live date/time display with typewriter title effect',
      'Responsive mobile-friendly layout',
      'Theme selection persists across browser sessions',
    ],
    challenges: [
      'Implementing smooth CSS animations for task operations',
      'Building a clean theme switching system that persists via localStorage',
      'Creating an intuitive UI that works well on both mobile and desktop',
    ],
    impact:
      'Demonstrates clean frontend architecture and UI/UX design principles, providing a polished productivity tool that works entirely in the browser without external dependencies.',
    category: 'Frontend',
    status: 'Completed',
    year: 2024,
    githubUrl: 'https://github.com/abhinanthkk/justdoit',
    liveUrl: 'https://abhinanthkk.github.io/justdoit',
    featured: false,
  },
];
