import { motion } from 'framer-motion';
import { User, Target, Heart, MapPin } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { resumeData } from '@/data/resume';

const highlights = [
  {
    icon: <User className="w-5 h-5" />,
    label: 'Background',
    value: 'BE in Electronics & Communication Engineering',
  },
  {
    icon: <Target className="w-5 h-5" />,
    label: 'Focus',
    value: 'Full Stack Development & AI-Powered Solutions',
  },
  {
    icon: <Heart className="w-5 h-5" />,
    label: 'Passion',
    value: 'Building scalable applications that solve real-world problems',
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: 'Location',
    value: 'Tamil Nadu, India',
  },
];

export default function About() {
  return (
    <SectionWrapper id="about">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-4"
        >
          About Me
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-heading"
        >
          Professional{' '}
          <span className="gradient-text">Summary</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="section-subheading mx-auto"
        >
          Get to know me and what drives my passion for software development
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Summary & Objective */}
        <div className="glass p-8 gradient-border">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <User className="w-5 h-5 text-primary" />
            Professional Summary
          </h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            {resumeData.professionalSummary}
          </p>
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <Target className="w-5 h-5 text-accent" />
            Career Objective
          </h3>
          <p className="text-gray-400 leading-relaxed">
            {resumeData.careerObjective}
          </p>
        </div>

        {/* Highlights */}
        <div className="glass p-8 gradient-border">
          <h3 className="text-xl font-semibold text-white mb-6">Quick Facts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary">{item.icon}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="glass p-8 gradient-border">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <Heart className="w-5 h-5 text-primary" />
            Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {resumeData.interests.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-gray-300 hover:text-white hover:border-primary/20 hover:bg-primary/5 transition-all duration-200"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
