import { useSiteData } from '../../context/SiteDataContext';

export default function ProjectsSection() {
  const { data } = useSiteData();
  if (!data) return null;
  const resumeProjects = data.funProjects.filter((project) => project.highlightOnResume);
  if (resumeProjects.length === 0) return null;

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {resumeProjects.map((proj, i) => (
            <article key={i} className="project-card">
              <div className="project-header">
                <h3 className="project-name">{proj.name}</h3>
                {proj.link && (
                  <a
                    href={proj.link}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${proj.name} on GitHub`}
                  >
                    ↗
                  </a>
                )}
              </div>
              <p className="project-desc">{proj.description}</p>
              <div className="tag-list project-tags">
                {proj.tech.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
