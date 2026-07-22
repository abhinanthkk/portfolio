import { motion } from 'framer-motion';
import { Trophy, Calendar, ExternalLink } from 'lucide-react';
import type { Achievement } from '@/data/certifications';
import { useMediaQuery } from '@/hooks';

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

export default function AchievementCard({ achievement, index }: AchievementCardProps) {
  const isDesktop = useMediaQuery('(min-width: 640px)');
  const link = achievement.proofLink ?? achievement.image;

  const handleOpen = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={`group relative ${link ? 'cursor-pointer' : ''}`}
      onClick={link ? handleOpen : undefined}
    >
      <div className="glass gradient-border p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/20 hover:bg-white/[0.05]">
        {/* Image — only rendered on desktop */}
        {isDesktop && achievement.image && (
          <img
            src={achievement.image}
            alt={achievement.title}
            className="w-full h-32 object-cover rounded-xl border border-white/[0.06] mb-4"
          />
        )}

        {/* Icon + Date row */}
        <div className="flex items-start justify-between mb-3">
          <div className="p-2.5 rounded-xl bg-accent/10 shrink-0">
            <Trophy className="w-5 h-5 text-accent" />
          </div>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            {achievement.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white mb-1 group-hover:text-accent transition-colors leading-snug">
          {achievement.title}
        </h3>

        {/* Organization badge */}
        <p className="text-sm text-accent font-medium mb-3">{achievement.organization}</p>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed flex-1">
          {achievement.description}
        </p>

        {/* View Achievement button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-gray-400 hover:text-white hover:border-accent/30 hover:bg-accent/10 transition-all duration-200 w-full justify-center"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Achievement
        </button>
      </div>
    </motion.div>
  );
}
