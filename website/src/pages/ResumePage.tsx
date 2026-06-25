import AboutSection from '../components/resume/AboutSection';
import ContactFooter from '../components/resume/ContactFooter';
import EducationSection from '../components/resume/EducationSection';
import ExperienceSection from '../components/resume/ExperienceSection';
import HeroSection from '../components/resume/HeroSection';
import LeadershipSection from '../components/resume/LeadershipSection';
import ProjectsSection from '../components/resume/ProjectsSection';
import SkillsSection from '../components/resume/SkillsSection';

export default function ResumePage() {
  return (
    <>
      <HeroSection />

      <main>
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <LeadershipSection />
        <ProjectsSection />
      </main>

      <ContactFooter />
    </>
  );
}
