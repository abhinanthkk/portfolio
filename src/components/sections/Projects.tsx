import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Search, X } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { projects } from '@/data/projects';

const allTechnologies = Array.from(
  new Set(projects.flatMap((p) => p.technologies))
).sort();

export default function Projects() {
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = projects.filter((project) => {
    const matchesTech = !activeTech || project.technologies.includes(activeTech);
    const matchesSearch =
      !searchQuery ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesTech && matchesSearch;
  });

  return (
    <SectionWrapper id="projects">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-4"
        >
          Portfolio
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-heading"
        >
          Featured{' '}
          <span className="gradient-text">Projects</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="section-subheading mx-auto"
        >
          A selection of projects that showcase my skills in full-stack development and AI
        </motion.p>
      </div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 space-y-4"
      >
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-gray-500 text-sm outline-none focus:border-primary/30 focus:bg-white/[0.05] transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-gray-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Technology Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveTech(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              !activeTech
                ? 'bg-primary text-white'
                : 'bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white'
            }`}
          >
            All
          </button>
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveTech(activeTech === tech ? null : tech)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeTech === tech
                  ? 'bg-primary text-white'
                  : 'bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Project Cards */}
      <AnimatePresence mode="wait">
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-500">No projects found matching your criteria.</p>
          </motion.div>
        ) : (
          <motion.div
            key={`${activeTech}-${searchQuery}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative"
              >
                <div className="glass p-6 h-full flex flex-col card-hover gradient-border">
                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                    {project.shortDescription}
                  </p>

                  {/* Key Features */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Key Features
                    </h4>
                    <ul className="space-y-1.5">
                      {project.keyFeatures.slice(0, 3).map((feature) => (
                        <li
                          key={feature}
                          className="text-xs text-gray-400 flex items-start gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {project.keyFeatures.length > 3 && (
                        <li className="text-xs text-gray-600 pl-3">
                          +{project.keyFeatures.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Impact */}
                  <div className="mb-4 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <p className="text-xs text-gray-500">
                      <span className="font-semibold text-gray-300">Impact: </span>
                      {project.impact}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-gray-400 hover:text-white hover:border-primary/20 transition-all duration-200"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Code
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary hover:bg-primary/20 transition-all duration-200"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                {hoveredProject === project.id && (
                  <motion.div
                    layoutId="project-glow"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 -z-10 blur-xl"
                    transition={{ type: 'spring', bounce: 0.2 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
