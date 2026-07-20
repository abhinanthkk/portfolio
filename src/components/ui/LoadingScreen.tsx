import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [dots, setDots] = useState('');

  // Existing loading logic — unchanged
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Animated ellipsis
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? '' : d + '.'));
    }, 380);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="loader-container"
        >
          {/* Subtle background glow blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="loader-blob loader-blob-1" />
            <div className="loader-blob loader-blob-2" />
            {/* Faint grid */}
            <div className="loader-grid" />
          </div>

          {/* Main content */}
          <div className="relative flex flex-col items-center gap-7 px-4">

            {/* Profile image with glowing border */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="loader-image-wrapper"
            >
              {/* Outer glow */}
              <div className="loader-outer-glow" />

              {/* Rotating gradient border */}
              <div className="loader-ring" />

              {/* Profile image */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="loader-image-frame"
              >
                <img
                  src="/profile.jpeg"
                  alt="Abhinanth K K"
                  className="loader-image"
                  loading="eager"
                />
              </motion.div>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="loader-name gradient-text"
            >
              Abhinanth K K
            </motion.h1>

            {/* Loading text with animated ellipsis */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 text-sm font-mono tracking-wider"
            >
              Loading portfolio
              <span className="loader-dots">{dots}</span>
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="loader-bar-track"
            >
              <div className="loader-bar-fill" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
