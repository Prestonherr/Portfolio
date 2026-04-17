import projects from "../../data/projects";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects__grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
