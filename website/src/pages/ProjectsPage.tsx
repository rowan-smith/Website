import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import type { SiteProject } from '../types/siteData';

const STATUS_MAP: Record<SiteProject['status'], { label: string; cls: string }> = {
  active: { label: 'Active', cls: 'status--active' },
  completed: { label: 'Completed', cls: 'status--done' },
  wip: { label: 'In Progress', cls: 'status--wip' },
};

export default function ProjectsPage() {
  const { data } = useSiteData();
  const [statusFilter, setStatusFilter] = useState<SiteProject['status'] | 'all'>('all');
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  if (!data) return null;
  const projects = data.funProjects;

  const allStatuses = useMemo(
    () => Array.from(new Set(projects.map((p) => p.status))),
    [projects],
  );

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => {
      p.tech.forEach((t) => tags.add(t));
      p.keywords.forEach((k) => tags.add(k));
    });
    return Array.from(tags);
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const statusOk = statusFilter === 'all' || p.status === statusFilter;
      const tagOk =
        tagFilter === null ||
        p.tech.includes(tagFilter) ||
        p.keywords.includes(tagFilter);
      return statusOk && tagOk;
    });
  }, [projects, statusFilter, tagFilter]);

  const toggleTag = (tag: string) =>
    setTagFilter((prev) => (prev === tag ? null : tag));

  return (
    <div className="projects-page">
      <div className="projects-page-hero">
        <div className="container">
          <h1 className="projects-page-title">Projects</h1>
          <p className="projects-page-sub">
            Side projects, experiments, and things I build for fun.
          </p>
        </div>
      </div>

      <div className="container projects-page-body">
        {/* Filters */}
        <div className="filter-bar">
          <div className="filter-group">
            <span className="filter-label">Status</span>
            <div className="filter-btns">
              <button
                className={`filter-btn ${statusFilter === 'all' ? 'filter-btn--active' : ''}`}
                onClick={() => setStatusFilter('all')}
              >
                All
              </button>
              {allStatuses.map((s) => (
                <button
                  key={s}
                  className={`filter-btn ${statusFilter === s ? 'filter-btn--active' : ''}`}
                  onClick={() => setStatusFilter(s)}
                >
                  {STATUS_MAP[s].label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Tags</span>
            <div className="filter-btns">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`filter-btn ${tagFilter === tag ? 'filter-btn--active' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="fun-projects-grid">
            {filtered.map((proj) => {
              const { label, cls } = STATUS_MAP[proj.status];
              return (
                <article key={proj.name} className="fun-card">
                  <div className="fun-card-top">
                    <span className="fun-card-emoji">{proj.emoji}</span>
                    <span className={`status-badge ${cls}`}>{label}</span>
                  </div>
                  <h3 className="fun-card-name">{proj.name}</h3>
                  <p className="fun-card-desc">{proj.description}</p>
                  <div className="tag-list fun-card-tags">
                    {proj.tech.map((t) => (
                      <button
                        key={t}
                        className={`tag tag--btn ${tagFilter === t ? 'tag--btn-active' : ''}`}
                        onClick={() => toggleTag(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  {proj.keywords.length > 0 && (
                    <div className="tag-list fun-card-keywords">
                      {proj.keywords.map((k) => (
                        <button
                          key={k}
                          className={`tag tag--keyword tag--btn ${tagFilter === k ? 'tag--btn-active' : ''}`}
                          onClick={() => toggleTag(k)}
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                  )}
                  {proj.link && (
                    <a
                      href={proj.link}
                      className="fun-card-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on GitHub →
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <p className="filter-empty">No projects match the current filters.</p>
        )}

        <div className="projects-page-cta">
          <p>Want to see my professional experience?</p>
          <Link to="/resume" className="contact-btn">View Resume →</Link>
        </div>
      </div>
    </div>
  );
}
