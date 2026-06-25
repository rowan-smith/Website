import { useSiteData } from '../../context/SiteDataContext';

export default function ProjectsSection() {
  const { data } = useSiteData();
  if (!data) {
    return null;
  }

  const resumeProjects = data.funProjects.filter((project) => project.highlightOnResume);
  if (resumeProjects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">

          {resumeProjects.map((proj, i) => (
              <article key={i} className="project-card">
                <div className="project-header">
                  <div className="project-header-main">
                    <h3 className="project-name">{proj.name}</h3>
                  </div>

                  {(proj.githubLink || proj.websiteLink) && (
                    <div className="project-links">

                      {proj.githubLink && (
                        <a
                          href={proj.githubLink}
                          className="project-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${proj.name} on GitHub`}
                        >
                          GitHub
                        </a>
                      )}

                      {proj.githubLink && proj.websiteLink && <span className="sep">·</span>}

                      {proj.websiteLink && (
                        <a
                          href={proj.websiteLink}
                          className="project-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${proj.name} website`}
                        >
                          Website
                        </a>
                      )}
                    </div>
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
