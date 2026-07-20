import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Home, User, Code, FolderGit2, Briefcase, GraduationCap, Mail, FileText } from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  section: string;
  href: string;
  icon: React.ReactNode;
}

const commands: CommandItem[] = [
  { id: 'home', label: 'Go to Home', section: 'Navigation', href: '#home', icon: <Home className="w-4 h-4" /> },
  { id: 'about', label: 'Go to About', section: 'Navigation', href: '#about', icon: <User className="w-4 h-4" /> },
  { id: 'skills', label: 'Go to Skills', section: 'Navigation', href: '#skills', icon: <Code className="w-4 h-4" /> },
  { id: 'projects', label: 'Go to Projects', section: 'Navigation', href: '#projects', icon: <FolderGit2 className="w-4 h-4" /> },
  { id: 'experience', label: 'Go to Experience', section: 'Navigation', href: '#experience', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'education', label: 'Go to Education', section: 'Navigation', href: '#education', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'contact', label: 'Go to Contact', section: 'Navigation', href: '#contact', icon: <Mail className="w-4 h-4" /> },
  { id: 'resume', label: 'Download Resume', section: 'Actions', href: '/abhinanthCV.pdf', icon: <FileText className="w-4 h-4" /> },
];

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.section.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            const cmd = filteredCommands[selectedIndex];
            if (cmd.href.startsWith('#')) {
              document.querySelector(cmd.href)?.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.open(cmd.href, '_blank');
            }
            onClose();
          }
          break;
      }
    },
    [isOpen, selectedIndex, filteredCommands, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
    setQuery('');
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-[20%] max-w-lg mx-auto z-[80]"
          >
            <div className="glass overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm outline-none"
                  autoFocus
                />
                <kbd className="text-xs text-gray-600 bg-white/[0.04] px-1.5 py-0.5 rounded">ESC</kbd>
              </div>

              {/* Results */}
              <div className="max-h-64 overflow-y-auto p-2">
                {filteredCommands.length === 0 ? (
                  <p className="text-center text-gray-500 text-sm py-8">
                    No results found
                  </p>
                ) : (
                  filteredCommands.map((cmd, index) => (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        if (cmd.href.startsWith('#')) {
                          document.querySelector(cmd.href)?.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          window.open(cmd.href, '_blank');
                        }
                        onClose();
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        index === selectedIndex
                          ? 'bg-white/[0.08] text-white'
                          : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <span className="text-gray-500">{cmd.icon}</span>
                      <span className="flex-1 text-left">{cmd.label}</span>
                      <span className="text-xs text-gray-600">{cmd.section}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
