import { useSiteData } from '../../context/SiteDataContext';

export default function AboutSection() {
  const { data } = useSiteData();
  if (!data) return null;

  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="about-text">{data.resume.about}</p>
      </div>
    </section>
  );
}
