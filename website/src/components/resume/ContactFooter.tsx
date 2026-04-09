import { useSiteData } from '../../context/SiteDataContext';

export default function ContactFooter() {
  const { data } = useSiteData();
  if (!data) return null;
  const { resume } = data;

  return (
    <footer id="contact" className="contact">
      <div className="container contact-inner">
        <h2 className="contact-heading">Get In Touch</h2>
        <p className="contact-sub">
          I'm open to new opportunities. Feel free to reach out!
        </p>
        <a href={`mailto:${resume.email}`} className="contact-btn">
          {resume.email}
        </a>
        <div className="contact-socials">
          <a href={resume.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <span>·</span>
          <a href={resume.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
        <p className="contact-copy">© {new Date().getFullYear()} {resume.name}</p>
      </div>
    </footer>
  );
}
