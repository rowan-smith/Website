import { useSiteData } from '../../context/SiteDataContext';

export default function EducationSection() {
  const { data } = useSiteData();
  if (!data) return null;

  return (
    <section id="education" className="section">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="edu-list">
          {data.resume.education.map((edu, i) => (
            <article key={i} className="edu-card">
              <div className="edu-header">
                <div>
                  <h3 className="edu-degree">{edu.degree}</h3>
                  <div className="edu-sub">
                    <span className="edu-school">{edu.school}</span>
                    <span className="edu-location">&nbsp;·&nbsp;{edu.location}</span>
                  </div>
                </div>
                <span className="period-badge">{edu.period}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
