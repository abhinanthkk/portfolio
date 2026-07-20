import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { certifications, achievements } from '@/data/certifications';
import CertificateCard from '@/components/sections/certifications/CertificateCard';
import AchievementCard from '@/components/sections/certifications/AchievementCard';
import SearchBar from '@/components/sections/certifications/SearchBar';
import FilterBar from '@/components/sections/certifications/FilterBar';
import StatsHeader from '@/components/sections/certifications/StatsHeader';

type SortOption = 'newest' | 'oldest' | 'issuer-az' | 'title-az';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest',   label: 'Newest First' },
  { value: 'oldest',   label: 'Oldest First' },
  { value: 'issuer-az', label: 'Issuer A–Z' },
  { value: 'title-az', label: 'Title A–Z' },
];

export default function Certifications() {
  const [search, setSearch]           = useState('');
  const [activeIssuer, setActiveIssuer] = useState('');
  const [sort, setSort]               = useState<SortOption>('newest');

  // Unique issuers derived from data
  const issuers = useMemo(
    () => Array.from(new Set(certifications.map((c) => c.issuer))).sort(),
    []
  );

  const orgCount  = issuers.length;

  // Filtered + sorted
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let result = certifications.filter((cert) => {
      const matchesSearch =
        !q ||
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        cert.skills.some((s) => s.toLowerCase().includes(q));
      const matchesIssuer = !activeIssuer || cert.issuer === activeIssuer;
      return matchesSearch && matchesIssuer;
    });

    return [...result].sort((a, b) => {
      switch (sort) {
        case 'oldest':    return a.issueDate.localeCompare(b.issueDate);
        case 'issuer-az': return a.issuer.localeCompare(b.issuer);
        case 'title-az':  return a.title.localeCompare(b.title);
        default:          return b.issueDate.localeCompare(a.issueDate);
      }
    });
  }, [search, activeIssuer, sort]);

  return (
    <SectionWrapper id="certifications">
      {/* ── Section Header ── */}
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-4"
        >
          Credentials
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-heading"
        >
          Certifications &{' '}
          <span className="gradient-text">Achievements</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="section-subheading mx-auto"
        >
          Credentials that validate my expertise and commitment to continuous learning
        </motion.p>
      </div>

      {/* ── Stats ── */}
      <StatsHeader
        certCount={certifications.length}
        achievementCount={achievements.length}
        orgCount={orgCount}
      />

      {/* ── Search + Filter + Sort ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 space-y-4"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 max-w-md">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white outline-none focus:border-primary/30 transition-all duration-200 appearance-none cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#09090B] text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <FilterBar issuers={issuers} active={activeIssuer} onChange={setActiveIssuer} />
      </motion.div>

      {/* ── Certifications Grid ── */}
      {certifications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-20 glass rounded-2xl"
        >
          <Award className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-medium">No certifications added yet</p>
          <p className="text-gray-600 text-sm mt-1">Check back soon!</p>
        </motion.div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-16"
        >
          <p className="text-gray-500">No certifications match your search.</p>
          <button
            onClick={() => { setSearch(''); setActiveIssuer(''); }}
            className="mt-3 text-sm text-primary hover:text-accent transition-colors"
          >
            Clear filters
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cert, index) => (
            <CertificateCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      )}

      {/* ── Achievements Section ── */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold tracking-widest text-accent uppercase mb-4"
          >
            Milestones
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-heading"
          >
            Notable{' '}
            <span className="gradient-text">Achievements</span>
          </motion.h2>
        </div>

        {achievements.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-16 glass rounded-2xl"
          >
            <p className="text-gray-500 text-lg font-medium">No achievements added yet</p>
            <p className="text-gray-600 text-sm mt-1">Stay tuned for updates!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <AchievementCard key={achievement.id} achievement={achievement} index={index} />
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
