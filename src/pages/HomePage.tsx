import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Code2,
  FileSpreadsheet,
  FileText,
  Github,
  MapPin,
  MessageCircle,
  Network,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/common/Reveal";
import { SectionHeading } from "../components/common/SectionHeading";
import { Seo } from "../components/common/Seo";
import { ProjectCard } from "../components/projects/ProjectCard";
import { ArchitectureExplorer } from "../components/systems/ArchitectureExplorer";
import { SystemConsole } from "../components/systems/SystemConsole";
import { capabilityGroups, evidenceItems } from "../data/capabilities";
import { operationArtifacts } from "../data/operations";
import { profile } from "../data/profile";
import { projects } from "../data/projects";

const homeDescription =
  "Marc Angelo Mendoza is a full-stack systems builder connecting React, TypeScript, Node, Firebase, PHP, SQL, deployment, documentation, and operations intelligence.";

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Full-stack systems builder",
    url: import.meta.env.VITE_CANONICAL_URL || undefined,
    email: `mailto:${profile.email}`,
    sameAs: [profile.githubUrl],
    address: { "@type": "PostalAddress", addressLocality: "Tanza", addressRegion: "Cavite", addressCountry: "PH" },
    knowsAbout: ["React", "TypeScript", "Node.js", "Express", "Firebase", "PHP", "MySQL", "PostgreSQL", "Operations management"]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Marc Angelo Mendoza Portfolio",
    url: import.meta.env.VITE_CANONICAL_URL || undefined,
    description: homeDescription
  }
];

const proofMetrics = [
  { value: "3", label: "Live systems", icon: Network },
  { value: "5", label: "Workbook sheets", icon: FileSpreadsheet },
  { value: "2", label: "Handover preview pages", icon: FileText }
];

export function HomePage() {
  const operationsPreview = operationArtifacts[0];

  return (
    <>
      <Seo
        title="Marc Angelo Mendoza | Full-Stack Systems Builder"
        description={homeDescription}
        path="/"
        jsonLd={homeJsonLd}
      />

      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-grid-texture" aria-hidden="true" />
        <div className="hero-shell">
          <div className="hero-copy">
            <div className="availability-pill"><span aria-hidden="true" /> {profile.availability}</div>
            <p className="hero-kicker">{profile.name} · {profile.location}</p>
            <h1 id="hero-title">I turn complicated operations into <em>reliable digital products.</em></h1>
            <p className="hero-summary">
              Full-stack systems builder working across React, TypeScript, Node and Express, Firebase, PHP and SQL, admin workflows, deployment, technical handover, and operations support.
            </p>
            <div className="button-row hero-actions">
              <Link className="button button-accent" to="/projects">
                Explore selected work <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className="button button-ghost-light" to="/contact">
                Start a conversation <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero-contact-row">
              <span><MapPin size={16} aria-hidden="true" /> {profile.location}</span>
              <a href={profile.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={16} aria-hidden="true" /> WhatsApp</a>
              <a href={profile.githubUrl} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" /> GitHub</a>
            </div>
          </div>

          <div className="hero-portrait" aria-label="Professional portrait of Marc Angelo Mendoza">
            <picture>
              <source media="(max-width: 720px)" srcSet="/assets/marc-mendoza-portrait-640.webp" type="image/webp" />
              <source srcSet="/assets/marc-mendoza-portrait-960.webp 960w, /assets/marc-mendoza-portrait.webp 1365w" type="image/webp" />
              <img
                src="/assets/marc-mendoza-portrait.png"
                alt="Marc Angelo Mendoza wearing formal Filipino attire"
                width="1365"
                height="1256"
                fetchPriority="high"
              />
            </picture>
            <div className="portrait-caption">
              <span><BadgeCheck size={17} aria-hidden="true" /> Portfolio evidence online</span>
              <strong>Interface imagination.<br />Systems discipline.</strong>
            </div>
          </div>

          <div className="hero-console-wrap">
            <SystemConsole />
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Verified portfolio evidence">
        <div className="content-shell proof-strip-grid">
          <div className="proof-strip-intro">
            <Sparkles size={20} aria-hidden="true" />
            <p><strong>Evidence, not arbitrary ratings.</strong><br />Every major claim leads to something inspectable.</p>
          </div>
          {proofMetrics.map(({ value, label, icon: Icon }) => (
            <div className="proof-metric" key={label}>
              <Icon size={19} aria-hidden="true" />
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-work" id="work">
        <div className="content-shell">
          <Reveal>
            <SectionHeading eyebrow="Selected work" title="Three systems. Three different operational contexts.">
              <p>Each project is framed around the business problem, Marc’s responsibility, the system logic, and proof that can be opened.</p>
            </SectionHeading>
          </Reveal>
          <div className="selected-projects-grid">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.07}>
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </div>
          <div className="section-end-link">
            <Link className="text-link" to="/projects">Compare every case study <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="section architecture-section" id="systems">
        <div className="content-shell architecture-layout">
          <Reveal className="architecture-copy">
            <p className="eyebrow">Systems thinking</p>
            <h2>From authenticated entry to technical handover.</h2>
            <p>
              Strong systems connect identity, records, rules, status changes, deployment, and continuity. Select a layer to see how Marc approaches that connection and where the evidence lives.
            </p>
            <div className="architecture-principle">
              <Code2 size={22} aria-hidden="true" />
              <div><strong>Design follows the workflow.</strong><span>The interface should make the next correct action easier to understand.</span></div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ArchitectureExplorer />
          </Reveal>
        </div>
      </section>

      <section className="section operations-preview-section">
        <div className="content-shell operations-preview-layout">
          <Reveal className="operations-preview-copy">
            <p className="eyebrow">Operations intelligence</p>
            <h2>The systems perspective comes from working inside the workflow.</h2>
            <p>
              Executive VA and client-support experience means Marc designs around real inboxes, meetings, follow-ups, approvals, deadlines, and handovers, not abstract user stories alone.
            </p>
            <ul className="signal-list">
              <li>Inbox triage with priority and SLA thinking</li>
              <li>Calendar preparation with ownership and follow-up</li>
              <li>Task, lead, SOP, and weekly reporting systems</li>
            </ul>
            <div className="button-row">
              <Link className="button button-primary" to="/operations">Inspect operations evidence <ArrowRight size={16} aria-hidden="true" /></Link>
              <a className="text-link" href="/assets/marc-mendoza-executive-va-portfolio.xlsx" download>Download Excel workbook</a>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="operations-browser-frame">
            <div className="browser-frame-bar">
              <span /><span /><span />
              <p>Evidence viewer · {operationsPreview.title}</p>
            </div>
            <img
              src={operationsPreview.imageSmall}
              srcSet={`${operationsPreview.imageSmall} 800w, ${operationsPreview.image} ${operationsPreview.width}w`}
              sizes="(max-width: 900px) 100vw, 52vw"
              alt={operationsPreview.alt}
              width={operationsPreview.width}
              height={operationsPreview.height}
              loading="lazy"
            />
            <div className="browser-frame-caption">
              <span>Sample data · Reusable template</span>
              <strong>{operationsPreview.demonstrates.join(" · ")}</strong>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section capability-section" id="capabilities">
        <div className="content-shell">
          <Reveal>
            <SectionHeading eyebrow="Capability matrix" title="Skills mapped to real evidence, not percentages.">
              <p>Every capability points to a project, a case-study section, a document, or an operations artifact.</p>
            </SectionHeading>
          </Reveal>
          <div className="capability-matrix">
            {capabilityGroups.map((group, index) => (
              <Reveal key={group.id} delay={(index % 3) * 0.04}>
                <article className="capability-row">
                  <span className="capability-index">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                  </div>
                  <div className="capability-proof-list">
                    {group.items.map((item) => (
                      <Link key={item.name} to={item.href}><span>{item.name}</span><small>{item.proof}</small><ArrowUpRight size={14} aria-hidden="true" /></Link>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section story-section">
        <div className="content-shell story-layout">
          <Reveal>
            <p className="eyebrow">Professional story</p>
            <h2>Technical education, full-stack delivery, and operations work belong in the same story.</h2>
          </Reveal>
          <Reveal delay={0.08} className="story-copy">
            <p>
              Information Technology built the technical foundation. Full-stack project work turned that foundation into live systems. Executive VA, appointment-setting, and community-management work added the practical understanding of messages, deadlines, approvals, and client expectations.
            </p>
            <p>
              Together, that experience supports one professional identity: a systems builder who can understand both the code path and the operational reality around it.
            </p>
            <Link className="text-link" to="/about">Read Marc’s background <ArrowRight size={16} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section evidence-section">
        <div className="content-shell">
          <Reveal>
            <SectionHeading eyebrow="Open the proof" title="Evidence a recruiter or client can inspect immediately." />
          </Reveal>
          <div className="evidence-grid">
            {evidenceItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className="evidence-card">
                  <div className="evidence-card-number">0{index + 1}</div>
                  <p className="eyebrow">{item.type}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noreferrer">{item.action} <ArrowUpRight size={15} aria-hidden="true" /></a>
                  ) : (
                    <Link to={item.href}>{item.action} <ArrowUpRight size={15} aria-hidden="true" /></Link>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-cta-section">
        <div className="content-shell contact-cta">
          <div>
            <p className="eyebrow">Available for the right work</p>
            <h2>Need a builder who can understand both the system and the operation behind it?</h2>
          </div>
          <div>
            <p>Web development, admin systems, backend workflow logic, IT support, deployment, documentation, and operations coordination.</p>
            <Link className="button button-accent" to="/contact">Start a professional conversation <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
