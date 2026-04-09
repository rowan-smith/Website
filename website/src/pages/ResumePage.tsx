import HeroSection from '../components/resume/HeroSection';
import AboutSection from '../components/resume/AboutSection';
import ExperienceSection from '../components/resume/ExperienceSection';
import EducationSection from '../components/resume/EducationSection';
import SkillsSection from '../components/resume/SkillsSection';
import ProjectsSection from '../components/resume/ProjectsSection';
import ContactFooter from '../components/resume/ContactFooter';

export default function ResumePage() {
  return (
    <>
      <HeroSection />
      <main>
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
      </main>
      <ContactFooter />
    </>
  );
}
