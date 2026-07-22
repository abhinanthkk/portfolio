import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ChevronDown, Sparkles, Folder, User } from 'lucide-react';
import { useTypingEffect } from '@/hooks';
import { resumeData } from '@/data/resume';
import { Dock, DockItem } from '@/components/ui/Dock';

/** Official WhatsApp brand icon as an inline SVG — matches lucide w-5 h-5 sizing */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.05 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

function GlowBlobs({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="glow-blob w-[600px] h-[600px] bg-primary/20 -top-40 -left-40"
        animate={{
          x: mouseX * 0.02,
          y: mouseY * 0.02,
        }}
        transition={{ type: 'spring', damping: 30 }}
      />
      <motion.div
        className="glow-blob w-[500px] h-[500px] bg-accent/20 bottom-0 right-0"
        animate={{
          x: mouseX * -0.03,
          y: mouseY * -0.03,
        }}
        transition={{ type: 'spring', damping: 30 }}
      />
      <motion.div
        className="glow-blob w-[300px] h-[300px] bg-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: mouseX * 0.01,
          y: mouseY * 0.01,
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
}

export default function Hero() {
  const typedText = useTypingEffect(resumeData.titles, 100, 50, 2000);
  const [mouseForBlob, setMouseForBlob] = useState({ x: 0, y: 0 });
  const [dockSize, setDockSize] = useState({ magnification: 60, baseItemSize: 44, panelHeight: 64 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDockSize({ magnification: 56, baseItemSize: 42, panelHeight: 56 });
      } else {
        setDockSize({ magnification: 60, baseItemSize: 44, panelHeight: 64 });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseForBlob({
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <ParticleField />
      <GlowBlobs mouseX={mouseForBlob.x} mouseY={mouseForBlob.y} />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Main Content — side-by-side on desktop, stacked on mobile/tablet */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── LEFT: Profile Image (35%) ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-shrink-0 flex items-center justify-center lg:w-[35%]"
          >
            {/* Floating + hover wrapper — sized to match the image so glow/border align */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
              className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80"
            >
              {/* Outer glow — sized via parent, not inset-0 on a zero-size box */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 blur-2xl animate-pulse-slow" />

              {/* Rotating gradient border */}
              <div className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-primary via-accent to-primary animate-spin-slow opacity-70" />

              {/* Profile image */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background ring-1 ring-white/10">
                <img
                  src="/profile.jpeg"
                  alt="Abhinanth K K"
                  className="w-full h-full object-cover object-[center_20%]"
                  loading="eager"
                  width={320}
                  height={320}
                />
              </div>

              {/* Inner glow overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Hero Content (65%) ── */}
          <div className="flex-1 lg:w-[65%] flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-sm text-gray-300">Open to opportunities</span>
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold mb-4 tracking-tight leading-tight text-balance"
            >
              Hi, I&apos;m{' '}
              <span className="gradient-text whitespace-nowrap">{resumeData.name}</span>
            </motion.h1>

            {/* Typing Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl sm:text-2xl md:text-3xl text-gray-400 font-medium mb-6 h-10"
            >
              <span>{typedText}</span>
              <span className="inline-block w-[2px] h-7 bg-primary ml-1 -mb-1 animate-blink" />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-gray-500 text-base sm:text-lg max-w-xl mb-8 leading-relaxed"
            >
              {resumeData.professionalSummary}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col items-center gap-6"
            >
              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/abhinanthCV.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>

                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass glass-hover text-white font-medium transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
                >
                  View Projects
                </a>
              </div>

              {/* Dock Navigation */}
              <Dock
                magnification={dockSize.magnification}
                distance={120}
                baseItemSize={dockSize.baseItemSize}
                panelHeight={dockSize.panelHeight}
              >
                <DockItem
                  label="GitHub"
                  onClick={() => window.open(resumeData.contact.github, '_blank', 'noopener,noreferrer')}
                >
                  <Github className="w-5 h-5" />
                </DockItem>

                <DockItem
                  label="LinkedIn"
                  onClick={() => window.open(resumeData.contact.linkedin, '_blank', 'noopener,noreferrer')}
                >
                  <Linkedin className="w-5 h-5" />
                </DockItem>

                <DockItem
                  label="Resume"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/abhinanthCV.pdf';
                    link.download = 'Abhinanth_K_K_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <Download className="w-5 h-5" />
                </DockItem>

                <DockItem
                  label="Email"
                  onClick={() => {
                    window.location.href = `mailto:${resumeData.contact.email}`;
                  }}
                >
                  <Mail className="w-5 h-5" />
                </DockItem>

                <DockItem
                  label="WhatsApp"
                  onClick={() => window.open(resumeData.contact.whatsapp, '_blank', 'noopener,noreferrer')}
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </DockItem>

                <DockItem
                  label="Projects"
                  onClick={() => {
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Folder className="w-5 h-5" />
                </DockItem>

                <DockItem
                  label="Contact"
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <User className="w-5 h-5" />
                </DockItem>
              </Dock>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
