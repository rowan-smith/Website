import { useSiteData } from '../../context/SiteDataContext';

export default function LeadershipSection() {
  const { data } = useSiteData();
  if (!data?.resume.leadership?.length) {
      return null;
  }

  return (
    <section id="leadership" className="section section--alt">
      <div className="container">
        <h2 className="section-title">Leadership / Volunteer Experience</h2>
        <div className="timeline">

          {data.resume.leadership.map((role, i) => (
            <article key={i} className="timeline-item">
              <div className="timeline-header">
                <div>
                  <h3 className="job-title">{role.title}</h3>
                  <div className="job-sub">
                    <span className="job-company">{role.organization}</span>
                  </div>
                </div>
                <span className="period-badge">{role.period}</span>
              </div>

              <ul className="job-bullets">
                {role.bullets.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>

            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
