import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, ExternalLink, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Seo } from "../components/common/Seo";
import { getProjectBySlug, projects } from "../data/projects";

function CaseSection({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <section className="case-study-section">
      <div className="case-section-label"><span>{label}</span></div>
      <div><h2>{title}</h2>{children}</div>
    </section>
  );
}

export default function ProjectCaseStudyPage() {
  const { slug = "" } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <section className="simple-error-page">
        <p className="eyebrow">Case study not found</p>
        <h1>This project route does not exist.</h1>
        <Link className="button button-primary" to="/projects">Return to projects</Link>
      </section>
    );
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    url: `${import.meta.env.VITE_CANONICAL_URL || ""}/projects/${project.slug}`,
    author: { "@type": "Person", name: "Marc Angelo Mendoza" },
    keywords: project.technologies.join(", ")
  };

  return (
    <>
      <Seo
        title={`${project.name} Case Study | Marc Mendoza`}
        description={project.summary}
        path={`/projects/${project.slug}`}
        type="article"
        jsonLd={structuredData}
      />
      <header className={`case-hero case-hero-${project.accent}`}>
        <div className="content-shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/projects"><ArrowLeft size={15} aria-hidden="true" /> Projects</Link>
            <span aria-hidden="true">/</span>
            <span>{project.shortName}</span>
          </nav>
          <div className="case-hero-layout">
            <div>
              <p className="eyebrow">{project.type}</p>
              <h1>{project.name}</h1>
              <p className="case-hero-summary">{project.caseStudy.overview}</p>
              <div className="case-meta-grid">
                <div><span>Role</span><strong>{project.role}</strong></div>
                <div><span>Deployment</span><strong>{project.caseStudy.deployment}</strong></div>
              </div>
              <div className="button-row">
                <a className="button button-accent" href={project.liveUrl} target="_blank" rel="noreferrer">Open live project <ExternalLink size={16} aria-hidden="true" /></a>
                {project.handoverUrl ? <a className="button button-ghost-light" href={project.handoverUrl}>Handover preview <FileText size={16} aria-hidden="true" /></a> : null}
              </div>
            </div>
            <div className="architecture-illustration" aria-label={`Architecture illustration for ${project.name}`}>
              <div className="architecture-illustration-label">Architecture illustration · verified project scope</div>
              <div className="architecture-flow">
                <div><span>01</span><strong>Interface</strong><small>{project.technologies[0]}</small></div>
                <ArrowRight aria-hidden="true" />
                <div><span>02</span><strong>Workflow logic</strong><small>{project.capabilities[0]}</small></div>
                <ArrowRight aria-hidden="true" />
                <div><span>03</span><strong>Data / delivery</strong><small>{project.technologies.slice(-2).join(" + ")}</small></div>
              </div>
              <p>This diagram describes the documented project layers; it is not a manufactured application screenshot.</p>
            </div>
          </div>
        </div>
      </header>

      <article className="case-study-body content-shell">
        <CaseSection label="01" title="Business context">
          <p>{project.caseStudy.businessContext}</p>
          <div className="case-callout"><span>Problem</span><p>{project.caseStudy.problem}</p></div>
        </CaseSection>

        <CaseSection label="02" title="Responsibility and users">
          <div className="case-columns">
            <div><h3>Marc’s responsibilities</h3><ul className="check-list">{project.caseStudy.responsibilities.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" />{item}</li>)}</ul></div>
            <div><h3>Users or roles involved</h3><ul className="plain-list">{project.caseStudy.users.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
        </CaseSection>

        <CaseSection label="03" title="Important workflows">
          <div className="workflow-ribbon">{project.caseStudy.workflows.map((workflow, index) => <div key={workflow}><span>{String(index + 1).padStart(2, "0")}</span><strong>{workflow}</strong></div>)}</div>
        </CaseSection>

        <CaseSection label="04" title="Frontend, backend, and data approach">
          <div className="technical-triad">
            <article><span>Frontend</span><p>{project.caseStudy.frontend}</p></article>
            <article><span>Backend / server logic</span><p>{project.caseStudy.backend}</p></article>
            <article><span>Data approach</span><p>{project.caseStudy.data}</p></article>
          </div>
        </CaseSection>

        <CaseSection label="05" title="Authentication and deployment">
          <div className="case-columns">
            <div><h3>Authentication / authorization</h3><p>{project.caseStudy.authentication}</p></div>
            <div><h3>Deployment environment</h3><p>{project.caseStudy.deployment}</p></div>
          </div>
        </CaseSection>

        <CaseSection label="06" title="Challenges, decisions, and trade-offs">
          <div className="case-columns">
            <div><h3>Technical challenges</h3><ul className="plain-list">{project.caseStudy.challenges.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h3>Decisions and trade-offs</h3><ul className="plain-list">{project.caseStudy.decisions.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
        </CaseSection>

        <CaseSection label="07" title="Outcome and evidence">
          <p className="case-outcome">{project.caseStudy.outcome}</p>
          <div className="tech-list tech-list-large">{project.technologies.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="button-row">
            <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noreferrer">Open verified live route <ArrowUpRight size={16} aria-hidden="true" /></a>
            {project.handoverUrl ? <a className="button button-secondary" href={project.handoverUrl}>Open handover preview</a> : null}
          </div>
        </CaseSection>
      </article>

      <nav className="next-project" aria-label="Next project">
        <div className="content-shell next-project-inner">
          <div><p className="eyebrow">Next case study</p><h2>{nextProject.name}</h2><p>{nextProject.summary}</p></div>
          <Link className="button button-light" to={`/projects/${nextProject.slug}`}>Continue <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
      </nav>
    </>
  );
}
