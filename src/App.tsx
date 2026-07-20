import { useState, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollToTop from '@/components/ui/ScrollToTop';
import LoadingScreen from '@/components/ui/LoadingScreen';
import CommandPalette from '@/components/ui/CommandPalette';
import { useCommandPalette } from '@/hooks';
import HomePage from '@/pages/HomePage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen: isPaletteOpen, open: openPalette, close: closePalette } = useCommandPalette();

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="relative min-h-screen">
      <CustomCursor />
      <ScrollProgress />
      <Navbar onOpenPalette={openPalette} />
      <CommandPalette isOpen={isPaletteOpen} onClose={closePalette} />
      <HomePage />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
