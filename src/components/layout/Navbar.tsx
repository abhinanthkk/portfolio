import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Command } from 'lucide-react';
import { cn } from '@/utils/cn';

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '#home',           label: 'Home' },
  { href: '#about',          label: 'About' },
  { href: '#skills',         label: 'Skills' },
  { href: '#projects',       label: 'Projects' },
  { href: '#experience',     label: 'Experience' },
  { href: '#education',      label: 'Education' },
  { href: '#certifications', label: 'Certificates' },
  { href: '#contact',        label: 'Contact' },
];

interface NavbarProps {
  onOpenPalette: () => void;
}

export default function Navbar({ onOpenPalette }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-white/[0.06] py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 group"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 ring-1 ring-primary/30 transition-all duration-300 group-hover:scale-110 group-hover:ring-primary/60 group-hover:border-white/40">
              <img
                src="/profile.jpeg"
                alt="Abhinanth K K"
                className="w-full h-full object-cover"
                loading="eager"
                width={32}
                height={32}
              />
            </div>
            <span className="text-base font-bold gradient-text transition-opacity duration-200 group-hover:opacity-90">
              Abhinanth K K
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                    active ? 'text-white' : 'text-gray-400 hover:text-white'
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-white/[0.06] rounded-lg"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </a>
              );
            })}

            {/* Command Palette Button */}
            <button
              onClick={onOpenPalette}
              className="ml-2 p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/[0.15] transition-all duration-200 flex items-center gap-2 text-xs"
            >
              <Command className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Ctrl+K</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white transition-colors"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-50 md:hidden"
          >
            <div className="glass p-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                      active
                        ? 'bg-white/[0.08] text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                    )}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
