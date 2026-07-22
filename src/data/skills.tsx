import type { ComponentType, SVGProps } from 'react';

import {
  Code2, Layout, Server, Database, Brain,
  Wrench, Monitor, Package,
} from 'lucide-react';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  column: 'left' | 'right';
  skills: string[];
}

const categoryIconMap: Record<string, IconComponent> = {
  Code2, Layout, Server, Database, Brain, Wrench, Monitor, Package,
};

export function getCategoryIcon(iconName: string): IconComponent {
  return categoryIconMap[iconName] ?? Code2;
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: 'Code2',
    column: 'left',
    skills: ['Python', 'C'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'Layout',
    column: 'left',
    skills: ['HTML5', 'CSS3'],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: 'Server',
    column: 'left',
    skills: ['Flask', 'FastAPI'],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: 'Database',
    column: 'left',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite'],
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    icon: 'Brain',
    column: 'left',
    skills: ['OpenAI API', 'Gemini API', 'RAG', 'Vector Databases', 'Prompt Engineering'],
  },
  {
    id: 'dev-tools',
    title: 'Development Tools',
    icon: 'Wrench',
    column: 'right',
    skills: ['Git', 'GitHub', 'VS Code', 'Cursor'],
  },
  {
    id: 'os',
    title: 'Operating Systems',
    icon: 'Monitor',
    column: 'right',
    skills: ['Linux', 'Ubuntu', 'Windows'],
  },
  {
    id: 'other',
    title: 'Other Technologies',
    icon: 'Package',
    column: 'right',
    skills: ['Streamlit', 'REST APIs', 'JSON', 'CLI Development'],
  },
];
