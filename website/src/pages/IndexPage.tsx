import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import ProfileAvatar from '../components/common/ProfileAvatar';
import ProfileContactLinks from '../components/common/ProfileContactLinks';

export default function IndexPage() {
  const { data } = useSiteData();
  if (!data) {
    return null;
  }

  const { resume, funProjects } = data;

  const projectChips = useMemo(() => {
    const chips = new Set<string>();

    funProjects.forEach((project) => {
      project.tech.forEach((tech) => chips.add(tech));
      project.keywords.slice(0, 1).forEach((keyword) => chips.add(keyword));
    });

    return Array.from(chips).slice(0, 3);
  }, [funProjects]);

  const stats = useMemo(
    () => [
      { num: '3+', label: 'Years Experience' },
      { num: String(resume.experience.length), label: 'Employers' },
      { num: String(funProjects.length), label: 'Personal Projects' },
      { num: '10+', label: 'Technologies' },
    ],
    [resume.experience.length, funProjects.length],
  );

  return (
    <div className="index-page">
      <section className="index-hero">
        <div className="container index-hero-inner">
          <ProfileAvatar name={resume.name} />
          <h1 className="index-name">{resume.name}</h1>
          <p className="index-subtitle">{resume.title}</p>
          <ProfileContactLinks location={resume.location} github={resume.github} linkedin={resume.linkedin} />
        </div>
      </section>

      <section className="index-cards-section">
        <div className="container">
          <div className="index-cards">
            <Link to="/resume" className="index-card resume-card">
              <div className="index-card-header">
                <span className="index-card-emoji">📄</span>
                <span className="index-card-arrow">→</span>
              </div>

              <h2 className="index-card-title">Resume</h2>
              <p className="index-card-desc">
                3+ years of professional experience, education, and technical skills
                building internal financial systems and modern web applications.
              </p>

              <div className="index-card-chips">
                <span>Experience</span>
                <span>Education</span>
                <span>Skills</span>
              </div>
            </Link>

            <Link to="/projects" className="index-card projects-card">
              <div className="index-card-header">
                <span className="index-card-emoji">🚀</span>
                <span className="index-card-arrow">→</span>
              </div>

              <h2 className="index-card-title">Projects</h2>
              <p className="index-card-desc">
                Personal experiments, weekend hacks, and side projects — things I
                build because they're fun or scratching my own itch.
              </p>

              <div className="index-card-chips">
                {projectChips.map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="index-stats-section">
        <div className="container">
          <div className="index-stats">
            {stats.map(({ num, label }) => (
              <div key={label} className="index-stat">
                <span className="stat-num">{num}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
