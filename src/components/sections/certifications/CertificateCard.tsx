import { motion } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';
import type { Certification } from '@/data/certifications';

interface CertificateCardProps {
  cert: Certification;
  index: number;
}

function getIssuerInitials(issuer: string): string {
  return issuer
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const issuerColors: Record<string, string> = {
  MongoDB: 'from-green-500/20 to-emerald-500/20 text-green-400',
  Google: 'from-blue-500/20 to-cyan-500/20 text-blue-400',
  AWS: 'from-orange-500/20 to-amber-500/20 text-orange-400',
  Microsoft: 'from-blue-600/20 to-indigo-500/20 text-blue-300',
  Meta: 'from-blue-500/20 to-sky-500/20 text-sky-400',
  Coursera: 'from-blue-400/20 to-blue-600/20 text-blue-300',
  Udemy: 'from-purple-500/20 to-violet-500/20 text-purple-400',
};

function getIssuerColor(issuer: string): string {
  return issuerColors[issuer] ?? 'from-primary/20 to-accent/20 text-primary';
}

export default function CertificateCard({ cert, index }: CertificateCardProps) {
  const link = cert.verifyLink ?? cert.certificate;

  const handleOpen = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const colorClass = getIssuerColor(cert.issuer);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group relative cursor-pointer"
      onClick={handleOpen}
    >
      <div className="glass gradient-border p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 hover:bg-white/[0.05]">
        {/* Thumbnail / Placeholder */}
        <div className="mb-4">
          {cert.thumbnail ? (
            <img
              src={cert.thumbnail}
              alt={cert.title}
              className="w-full h-32 object-cover rounded-xl border border-white/[0.06]"
            />
          ) : (
            <div
              className={`w-full h-28 rounded-xl bg-gradient-to-br ${colorClass.split(' ').slice(0, 2).join(' ')} flex items-center justify-center border border-white/[0.06]`}
            >
              <span className={`text-3xl font-black ${colorClass.split(' ')[2]}`}>
                {getIssuerInitials(cert.issuer)}
              </span>
            </div>
          )}
        </div>

        {/* Issuer Badge */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r ${colorClass.split(' ').slice(0, 2).join(' ')} ${colorClass.split(' ')[2]} border border-white/[0.06]`}
          >
            {cert.issuer}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            {cert.issueDate}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white mb-3 group-hover:text-primary transition-colors leading-snug flex-1">
          {cert.title}
        </h3>

        {/* Skills Chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {cert.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          className="mt-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-gray-400 hover:text-white hover:border-primary/30 hover:bg-primary/10 transition-all duration-200 w-full justify-center"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Verify Certificate
        </button>
      </div>
    </motion.div>
  );
}
