import { useEffect, useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const onResume = pathname === '/resume';
  const { data } = useSiteData();
  if (!data) return null;
  const { resume } = data;

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">
          <img className="nav-logo-icon" src="/favicon.svg" alt="" aria-hidden="true" />
          <span className="nav-logo-name">{resume.name}</span>
        </Link>

        <button
          className="nav-mobile-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="site-nav-links"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
          <span />
        </button>

        <ul id="site-nav-links" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          {onResume ? (
            <>
              {RESUME_SECTIONS.map(({ label, hash }) => (
                <li key={hash}>
                  <a href={`#${hash}`} onClick={closeMenu}>{label}</a>
                </li>
              ))}
              <li className="nav-divider" aria-hidden="true" />
              <li>
                <Link to="/projects" className="nav-link-pill" onClick={closeMenu}>Projects ↗</Link>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/resume" onClick={closeMenu}>Resume</Link></li>
              <li><Link to="/projects" onClick={closeMenu}>Projects</Link></li>
              <li>
                <a href={resume.github} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                  GitHub
                </a>
              </li>
              <li>
                <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
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

