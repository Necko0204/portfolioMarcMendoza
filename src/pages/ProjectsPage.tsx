import { ArrowRight, ExternalLink, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/common/Reveal";
import { SectionHeading } from "../components/common/SectionHeading";
import { Seo } from "../components/common/Seo";
import { ProjectCard } from "../components/projects/ProjectCard";
import { projects } from "../data/projects";

export default function ProjectsPage() {
  return (
    <>
      <Seo
        title="Projects | Marc Angelo Mendoza"
        description="Detailed case studies for Marc Mendoza's Human Capital Management System, SkillTest Indonesia platform, and HSHR school ERP work."
        path="/projects"
      />
      <header className="page-hero page-hero-projects">
        <div className="content-shell page-hero-grid">
          <div>
            <p className="eyebrow">Project index</p>
            <h1>Live systems, presented as business problem solving.</h1>
          </div>
          <div className="page-hero-aside">
            <Layers3 size={24} aria-hidden="true" />
            <p>Three public projects across HR operations, a medium client platform, and a school organization ERP context.</p>
          </div>
        </div>
      </header>

      <section className="section project-index-section">
        <div className="content-shell">
          <SectionHeading eyebrow="Case studies" title="Inspect the responsibility, workflow, and technical decisions behind each system.">
            <p>No invented metrics or screenshots. Each page separates verified project information from private implementation details.</p>
          </SectionHeading>
          <div className="project-index-grid">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="project-comparison-section">
        <div className="content-shell project-comparison">
          <div className="comparison-header">
            <p className="eyebrow">At a glance</p>
            <h2>Different stacks, one operating principle.</h2>
            <p>Choose technology around the workflow, the client context, the data, and the team that will maintain it.</p>
          </div>
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <caption className="sr-only">Comparison of Marc Mendoza's selected projects</caption>
              <thead><tr><th>System</th><th>Role</th><th>Core stack</th><th>Verified focus</th><th>Live</th></tr></thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.slug}>
                    <th scope="row"><Link to={`/projects/${project.slug}`}>{project.shortName}</Link></th>
                    <td>{project.role}</td>
                    <td>{project.technologies.slice(0, 3).join(" · ")}</td>
                    <td>{project.capabilities.slice(0, 2).join(" · ")}</td>
                    <td><a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}><ExternalLink size={17} aria-hidden="true" /></a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link className="text-link" to="/contact">Discuss a similar system <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
