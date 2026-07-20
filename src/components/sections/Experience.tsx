import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ArrowRight } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { resumeData } from '@/data/resume';

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-4"
        >
          Work Experience
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-heading"
        >
          Professional{' '}
          <span className="gradient-text">Journey</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="section-subheading mx-auto"
        >
          My internship experiences and contributions to real-world products
        </motion.p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/50 to-transparent" />

        <div className="space-y-8">
          {resumeData.experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative flex items-start gap-6 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-4 border-background z-10">
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
              </div>

              {/* Content */}
              <div
                className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
                }`}
              >
                <div className="glass p-6 gradient-border">
                  {/* Company & Role */}
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Briefcase className="w-4 h-4 text-primary shrink-0" />
                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                  </div>
                  <p className="text-primary font-medium text-sm mb-3">{exp.company}</p>

                  {/* Meta Info */}
                  <div
                    className={`flex flex-wrap gap-3 text-xs text-gray-500 mb-4 ${
                      index % 2 === 0 ? 'md:justify-end' : ''
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>

                  {/* Responsibilities */}
                  <ul
                    className={`space-y-2 ${
                      index % 2 === 0 ? 'md:text-right' : ''
                    }`}
                  >
                    {exp.responsibilities.map((resp) => (
                      <li
                        key={resp}
                        className={`text-sm text-gray-400 flex items-start gap-2 ${
                          index % 2 === 0
                            ? 'md:flex-row-reverse'
                            : ''
                        }`}
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                        {resp}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div
                    className={`flex flex-wrap gap-1.5 mt-4 ${
                      index % 2 === 0 ? 'md:justify-end' : ''
                    }`}
                  >
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
