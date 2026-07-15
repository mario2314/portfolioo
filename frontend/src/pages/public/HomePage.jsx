import Hero from '../../components/public/sections/Hero';
import About from '../../components/public/sections/About';
import Skills from '../../components/public/sections/Skills';
import Projects from '../../components/public/sections/Projects';
import Experience from '../../components/public/sections/Experience';
import Education from '../../components/public/sections/Education';
import Certifications from '../../components/public/sections/Certifications';
import Achievements from '../../components/public/sections/Achievements';
import Blog from '../../components/public/sections/Blog';
import Testimonials from '../../components/public/sections/Testimonials';
import GithubStats from '../../components/public/sections/GithubStats';
import Contact from '../../components/public/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Achievements />
      <Blog />
      <Testimonials />
      <GithubStats />
      <Contact />
    </>
  );
}
