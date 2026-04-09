import { useSiteData } from '../../context/SiteDataContext';

export default function SkillsSection() {
  const { data } = useSiteData();
  if (!data) return null;

  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {Object.entries(data.resume.skills).map(([category, items]) => (
            <div key={category} className="skill-category">
              <h3 className="skill-cat-title">{category}</h3>
              <div className="tag-list">
                {items.map((skill) => (
                  <span key={skill} className="tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
