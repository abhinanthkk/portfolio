import {
  Hero,
  About,
  Skills,
  Projects,
  Experience,
  Education,
  Certifications,
  Resume,
  Contact,
} from '@/components/sections';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Resume />
      <Contact />
    </main>
  );
}
