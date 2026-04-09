import { Link, useLocation } from 'react-router-dom';
import { useSiteData } from '../../context/SiteDataContext';

const RESUME_SECTIONS = [
  { label: 'About', hash: 'about' },
  { label: 'Experience', hash: 'experience' },
  { label: 'Education', hash: 'education' },
  { label: 'Skills', hash: 'skills' },
  { label: 'Projects', hash: 'projects' },
  { label: 'Contact', hash: 'contact' },
];

export default function SiteNav() {
  const { pathname } = useLocation();
  const onResume = pathname === '/resume';
  const { data } = useSiteData();
  if (!data) return null;
  const { resume } = data;

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">
          <span className="nav-logo-initials">RS</span>
          <span className="nav-logo-name">{resume.name}</span>
        </Link>

        <ul className="nav-links">
          {onResume ? (
            <>
              {RESUME_SECTIONS.map(({ label, hash }) => (
                <li key={hash}>
                  <a href={`#${hash}`}>{label}</a>
                </li>
              ))}
              <li className="nav-divider" aria-hidden="true" />
              <li>
                <Link to="/projects" className="nav-link-pill">Projects ↗</Link>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/resume">Resume</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li>
                <a href={resume.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href={resume.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
