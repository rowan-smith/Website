import { useSiteData } from '../../context/SiteDataContext';
import ProfileAvatar from '../common/ProfileAvatar';
import ProfileContactLinks from '../common/ProfileContactLinks';

export default function HeroSection() {
  const { data } = useSiteData();
  if (!data) return null;
  const { resume } = data;

  return (
    <header className="hero">
      <div className="container hero-inner">
        <ProfileAvatar name={resume.name} />
        <h1 className="hero-name">{resume.name}</h1>
        <p className="hero-title">{resume.title}</p>
        <ProfileContactLinks
          location={resume.location}
          github={resume.github}
          linkedin={resume.linkedin}
        />
      </div>
    </header>
  );
}
