import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';

const STATS = [
  { num: '3+', label: 'Years Experience' },
  { num: '4', label: 'Employers' },
  { num: '2', label: 'Personal Projects' },
  { num: '10+', label: 'Technologies' },
];

export default function IndexPage() {
  const { data } = useSiteData();
  if (!data) return null;
  const { resume } = data;

  return (
    <div className="index-page">
      {/* Hero */}
      <section className="index-hero">
        <div className="container index-hero-inner">
          <div className="index-avatar">RS</div>
          <h1 className="index-name">{resume.name}</h1>
          <p className="index-subtitle">{resume.title}</p>
          <p className="index-location">{resume.location}</p>
          <div className="index-ext-links">
            <a href={resume.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <span className="sep">·</span>
            <a href={resume.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span className="sep">·</span>
            <a href={`mailto:${resume.email}`}>{resume.email}</a>
          </div>
        </div>
      </section>

      {/* Feature cards */}
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
                <span>Python</span>
                <span>C#</span>
                <span>AI Experiments</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="index-stats-section">
        <div className="container">
          <div className="index-stats">
            {STATS.map(({ num, label }) => (
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
