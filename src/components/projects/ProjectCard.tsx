import { ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "../../types/content";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`project-card project-card-${project.accent}`}>
      <div className="project-card-topline">
        <span>0{index + 1}</span>
        <span>{project.type}</span>
      </div>
      <div className="project-card-title">
        <div>
          <p className="eyebrow">{project.role}</p>
          <h3>{project.name}</h3>
        </div>
        <ExternalLink aria-hidden="true" />
      </div>
      <p className="project-card-summary">{project.summary}</p>
      <div className="project-card-problem">
        <span>Business problem</span>
        <p>{project.businessProblem}</p>
      </div>
      <details className="project-disclosure">
        <summary>Inspect system responsibilities</summary>
        <p>{project.responsibility}</p>
        <ul>
          {project.capabilities.map((capability) => (
            <li key={capability}><Check size={15} aria-hidden="true" /> {capability}</li>
          ))}
        </ul>
      </details>
      <div className="tech-list" aria-label={`${project.name} technologies`}>
        {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
      </div>
      <div className="project-card-actions">
        <Link className="button button-primary" to={`/projects/${project.slug}`}>
          Case study <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">
          Open live system <ExternalLink size={15} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
