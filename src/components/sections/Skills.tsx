import { motion } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { skillCategories, getCategoryIcon } from '@/data/skills';
import type { SkillCategory } from '@/data/skills';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.2 },
  }),
};

function SkillCard({ category }: { category: SkillCategory }) {
  const Icon = getCategoryIcon(category.icon);

  return (
    <motion.div variants={cardVariants} className="group relative">
      <div className="glass gradient-border p-5 sm:p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 hover:bg-white/[0.05]">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors duration-300">
            {category.title}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, i) => (
            <motion.span
              key={skill}
              custom={i}
              variants={pillVariants}
              initial="hidden"
              animate="visible"
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-gray-300 transition-all duration-300 cursor-default hover:border-primary/30 hover:bg-primary/10 hover:text-primary hover:scale-105"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const leftCategories = skillCategories.filter((c) => c.column === 'left');
  const rightCategories = skillCategories.filter((c) => c.column === 'right');

  return (
    <SectionWrapper id="skills">
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-4"
        >
          Skills & Technologies
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-heading"
        >
          My <span className="gradient-text">Expertise</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="section-subheading mx-auto"
        >
          Technologies and tools I work with
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-4"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold text-white text-center lg:text-left">
            Technical Skills
          </h3>
          {leftCategories.map((cat) => (
            <SkillCard key={cat.id} category={cat} />
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold text-white text-center lg:text-left">
            Tools & Technologies
          </h3>
          {rightCategories.map((cat) => (
            <SkillCard key={cat.id} category={cat} />
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
