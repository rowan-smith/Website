import { useSiteData } from '../../context/SiteDataContext';

export default function ExperienceSection() {
  const { data } = useSiteData();
  if (!data) return null;

  return (
    <section id="experience" className="section section--alt">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="timeline">
          {data.resume.experience.map((job, i) => (
            <article key={i} className="timeline-item">
              <div className="timeline-header">
                <div>
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-sub">
                    <span className="job-company">{job.company}</span>
                    <span className="job-location">&nbsp;·&nbsp;{job.location}</span>
                  </div>
                </div>
                <span className="period-badge">{job.period}</span>
              </div>
              <ul className="job-bullets">
                {job.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
