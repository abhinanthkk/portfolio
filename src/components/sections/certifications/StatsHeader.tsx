import { motion } from 'framer-motion';
import { Award, Trophy, Building2 } from 'lucide-react';

interface StatsHeaderProps {
  certCount: number;
  achievementCount: number;
  orgCount: number;
}

const stats = (certCount: number, achievementCount: number, orgCount: number) => [
  {
    icon: Award,
    label: 'Certifications',
    value: String(certCount),
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Trophy,
    label: 'Achievements',
    value: String(achievementCount),
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    icon: Building2,
    label: 'Organizations',
    value: String(orgCount),
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
];

export default function StatsHeader({ certCount, achievementCount, orgCount }: StatsHeaderProps) {
  const items = stats(certCount, achievementCount, orgCount);

  return (
    <div className="grid grid-cols-3 gap-4 mb-12">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="glass gradient-border p-5 flex items-center gap-4"
        >
          <div className={`p-2.5 rounded-xl ${item.bg} shrink-0`}>
            <item.icon className={`w-5 h-5 ${item.color}`} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500 mb-0.5 truncate">{item.label}</p>
            <p className={`text-xl font-bold ${item.color} truncate`}>{item.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
