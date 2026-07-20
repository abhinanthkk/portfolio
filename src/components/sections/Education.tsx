import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Award, Calendar } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { resumeData } from '@/data/resume';

export default function Education() {
  return (
    <SectionWrapper id="education">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-4"
        >
          Education
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-heading"
        >
          Academic{' '}
          <span className="gradient-text">Background</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="section-subheading mx-auto"
        >
          My educational journey and academic achievements
        </motion.p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-primary/50 to-transparent" />

        <div className="space-y-8">
          {resumeData.education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative flex items-start gap-6 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent border-4 border-background z-10">
                <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-30" />
              </div>

              {/* Content */}
              <div
                className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
                }`}
              >
                <div className="glass p-6 gradient-border">
                  {/* Degree */}
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <GraduationCap className="w-4 h-4 text-accent shrink-0" />
                    <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                  </div>
                  <p className="text-accent font-medium text-sm mb-1">{edu.field}</p>
                  <p className="text-gray-400 text-sm mb-3">{edu.institution}</p>

                  {/* Meta */}
                  <div
                    className={`flex flex-wrap gap-3 text-xs text-gray-500 mb-4 ${
                      index % 2 === 0 ? 'md:justify-end' : ''
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {edu.location}
                    </span>
                    {edu.grade && (
                      <span className="flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {edu.grade}
                      </span>
                    )}
                  </div>

                  {/* Grade Visual */}
                  {edu.grade && (
                    <div className={`${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20">
                        <Award className="w-4 h-4 text-accent" />
                        <span className="text-sm text-accent font-semibold">
                          {edu.grade}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
