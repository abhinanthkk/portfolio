import { cn } from '@/utils/cn';

interface FilterBarProps {
  issuers: string[];
  active: string;
  onChange: (v: string) => void;
}

export default function FilterBar({ issuers, active, onChange }: FilterBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      <button
        onClick={() => onChange('')}
        className={cn(
          'px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0',
          active === ''
            ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20'
            : 'glass text-gray-400 hover:text-white border border-white/[0.08]'
        )}
      >
        All
      </button>
      {issuers.map((issuer) => (
        <button
          key={issuer}
          onClick={() => onChange(issuer)}
          className={cn(
            'px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0',
            active === issuer
              ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20'
              : 'glass text-gray-400 hover:text-white border border-white/[0.08]'
          )}
        >
          {issuer}
        </button>
      ))}
    </div>
  );
}
