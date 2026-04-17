export default function ProjectCard({ title, description, frontend, backend, live }) {
  return (
    <div className="project-card">
      <h3 className="project-card__title">{title}</h3>
      <p className="project-card__description">{description}</p>
      <div className="project-card__links">
        {frontend && (
          <a href={frontend} target="_blank" rel="noreferrer">
            Frontend
          </a>
        )}
        {backend && (
          <a href={backend} target="_blank" rel="noreferrer">
            Backend
          </a>
        )}
        {live && (
          <a href={live} target="_blank" rel="noreferrer">
            Live
          </a>
        )}
      </div>
    </div>
  );
}
