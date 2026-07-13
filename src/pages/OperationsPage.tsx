import { ArrowRight, ArrowUpRight, Download, Expand, FileSpreadsheet, ShieldCheck } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { Lightbox } from "../components/common/Lightbox";
import { Seo } from "../components/common/Seo";
import { operationArtifacts, operationWorkflows } from "../data/operations";

export default function OperationsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeArtifact = operationArtifacts[activeIndex];

  function selectTab(index: number): void {
    const normalized = (index + operationArtifacts.length) % operationArtifacts.length;
    setActiveIndex(normalized);
    tabRefs.current[normalized]?.focus();
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number): void {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectTab(index + 1);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectTab(index - 1);
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      selectTab(event.key === "Home" ? 0 : operationArtifacts.length - 1);
    }
  }

  return (
    <>
      <Seo
        title="Operations Evidence | Marc Angelo Mendoza"
        description="A curated operations showcase covering inbox triage, calendar preparation, task tracking, lead follow-up, SOP documentation, and weekly reporting."
        path="/operations"
      />
      <header className="page-hero operations-hero">
        <div className="content-shell operations-hero-layout">
          <div>
            <p className="eyebrow">Operations evidence</p>
            <h1>Operational judgment made visible.</h1>
            <p>
              A curated evidence browser showing how Marc structures inboxes, meetings, tasks, leads, recurring processes, reporting, and handover work.
            </p>
            <div className="button-row">
              <a className="button button-accent" href="/assets/marc-mendoza-executive-va-portfolio.xlsx" download>
                Download Excel workbook <Download size={16} aria-hidden="true" />
              </a>
              <Link className="button button-ghost-light" to="/about">See experience context <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="operations-hero-proof">
            <FileSpreadsheet size={28} aria-hidden="true" />
            <strong>5 connected sheets</strong>
            <span>Inbox · Calendar · Tasks · Follow-ups · Dashboard</span>
            <p>Demonstration template with sample records, not client data.</p>
          </div>
        </div>
      </header>

      <section className="section operations-gallery-section">
        <div className="content-shell">
          <div className="operations-tabs" role="tablist" aria-label="Operations evidence categories">
            {operationArtifacts.map((artifact, index) => (
              <button
                ref={(element) => { tabRefs.current[index] = element; }}
                key={artifact.id}
                id={`operations-tab-${artifact.id}`}
                role="tab"
                type="button"
                tabIndex={index === activeIndex ? 0 : -1}
                aria-selected={index === activeIndex}
                aria-controls="operations-panel"
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                <span>0{index + 1}</span>{artifact.category}
              </button>
            ))}
          </div>

          <article
            id="operations-panel"
            className="operations-evidence-panel"
            role="tabpanel"
            aria-labelledby={`operations-tab-${activeArtifact.id}`}
          >
            <div className="operations-evidence-copy">
              <p className="eyebrow">{activeArtifact.category}</p>
              <h2>{activeArtifact.title}</h2>
              <p>{activeArtifact.description}</p>
              <div className="operations-signal-grid">
                {activeArtifact.demonstrates.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
              </div>
              <button className="text-link" type="button" onClick={() => setLightboxOpen(true)}>
                Open full-size evidence <Expand size={16} aria-hidden="true" />
              </button>
            </div>
            <button className="operations-image-button" type="button" onClick={() => setLightboxOpen(true)} aria-label={`Open full-size ${activeArtifact.title}`}>
              <img
                key={activeArtifact.id}
                src={activeArtifact.imageSmall}
                srcSet={`${activeArtifact.imageSmall} 800w, ${activeArtifact.image} ${activeArtifact.width}w`}
                sizes="(max-width: 900px) 100vw, 60vw"
                alt={activeArtifact.alt}
                width={activeArtifact.width}
                height={activeArtifact.height}
                loading="lazy"
              />
              <span><Expand size={15} aria-hidden="true" /> Inspect</span>
            </button>
          </article>
        </div>
      </section>

      <section className="section workflow-method-section">
        <div className="content-shell workflow-method-layout">
          <div>
            <p className="eyebrow">Working method</p>
            <h2>From incoming request to documented handover.</h2>
            <p>These templates show a repeatable operating pattern: capture, clarify, assign, follow up, report, and leave the next owner with context.</p>
          </div>
          <div className="workflow-method-grid">
            {operationWorkflows.map((workflow, index) => (
              <article key={workflow.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{workflow.title}</h3>
                <p>{workflow.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section operations-integrity-section">
        <div className="content-shell operations-integrity">
          <ShieldCheck size={30} aria-hidden="true" />
          <div><p className="eyebrow">Evidence integrity</p><h2>Portfolio-safe by design.</h2></div>
          <p>The workbook uses representative sample records so the formulas, formatting, and workflow design can be inspected without publishing private client messages, calendars, leads, or account details.</p>
          <a className="button button-primary" href="/assets/marc-mendoza-executive-va-portfolio.xlsx" download>Download workbook <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </section>

      {lightboxOpen ? <Lightbox artifact={activeArtifact} onClose={() => setLightboxOpen(false)} /> : null}
    </>
  );
}
