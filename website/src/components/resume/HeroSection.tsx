import { useSiteData } from '../../context/SiteDataContext';

export default function HeroSection() {
  const { data } = useSiteData();
  if (!data) return null;
  const { resume } = data;

  const initials = resume.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <header className="hero">
      <div className="container hero-inner">
        <div className="hero-avatar">{initials}</div>
        <h1 className="hero-name">{resume.name}</h1>
        <p className="hero-title">{resume.title}</p>
        <div className="hero-meta">
          <span>{resume.location}</span>
          <span className="sep">·</span>
          <a href={`mailto:${resume.email}`}>{resume.email}</a>
          <span className="sep">·</span>
          <a href={resume.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <span className="sep">·</span>
          <a href={resume.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
}
