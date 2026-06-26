import { ProfileHero } from '@/components/common/ProfileHero';
import AboutSection from '@/components/resume/AboutSection';
import ContactFooter from '@/components/resume/ContactFooter';
import EducationSection from '@/components/resume/EducationSection';
import ExperienceSection from '@/components/resume/ExperienceSection';
import LeadershipSection from '@/components/resume/LeadershipSection';
import ProjectsSection from '@/components/resume/ProjectsSection';
import SkillsSection from '@/components/resume/SkillsSection';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useRequiredSiteData } from '@/hooks/useRequiredSiteData';

export default function ResumePage() {
  const { resume, funProjects } = useRequiredSiteData();

  usePageTitle('Resume');

  return (
    <>
      <ProfileHero resume={resume} />

      <main id="main-content">
        <AboutSection about={resume.about} />
        <ExperienceSection experience={resume.experience} />
        <EducationSection education={resume.education} />
        <SkillsSection skills={resume.skills} />
        <LeadershipSection leadership={resume.leadership} />
        <ProjectsSection projects={funProjects} />
      </main>

      <ContactFooter resume={resume} />
    </>
  );
}
