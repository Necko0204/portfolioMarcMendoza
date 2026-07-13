import { ArrowRight, BriefcaseBusiness, CalendarDays, CheckCircle2, GraduationCap, Languages, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeading } from "../components/common/SectionHeading";
import { Seo } from "../components/common/Seo";
import { capabilityGroups } from "../data/capabilities";
import { additionalFoundations, education, experiences, profile } from "../data/profile";

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Marc Mendoza | Full-Stack Systems Builder"
        description="Marc Mendoza's professional story across Information Technology, full-stack project delivery, executive VA work, appointment setting, community management, and client operations."
        path="/about"
      />
      <header className="page-hero about-hero">
        <div className="content-shell about-hero-layout">
          <div>
            <p className="eyebrow">About Marc</p>
            <h1>One career story: building systems around how work actually happens.</h1>
            <p>
              Information Technology created the technical foundation. Full-stack delivery made it practical. Operations experience added a deeper understanding of users, messages, deadlines, approvals, and client expectations.
            </p>
          </div>
          <div className="about-portrait-frame">
            <picture>
              <source srcSet="/assets/marc-mendoza-portrait-640.webp" type="image/webp" />
              <img src="/assets/marc-mendoza-portrait.png" alt="Marc Angelo Mendoza professional portrait" width="1365" height="1256" />
            </picture>
            <div><MapPin size={16} aria-hidden="true" /> {profile.location}</div>
          </div>
        </div>
      </header>

      <section className="section about-narrative-section">
        <div className="content-shell about-narrative-grid">
          <div><p className="eyebrow">The connection</p><h2>Operations experience makes the technical work more grounded.</h2></div>
          <div>
            <p>Real systems are used by people who are already managing priorities, interruptions, status changes, and incomplete information. Marc’s operations background helps him ask practical questions earlier: Who owns the next action? What does this status mean? What happens when something is late? What must be documented for the next person?</p>
            <p>That perspective carries into interface hierarchy, backend rules, data structure, client communication, and technical handover.</p>
          </div>
        </div>
      </section>

      <section className="section experience-section">
        <div className="content-shell">
          <SectionHeading eyebrow="Experience" title="Client-facing work with technical depth and operational discipline." />
          <div className="experience-timeline">
            {experiences.map((experience, index) => (
              <article key={`${experience.role}-${experience.company}`} className="experience-entry">
                <div className="experience-marker"><span>{String(index + 1).padStart(2, "0")}</span></div>
                <div className="experience-card">
                  <div className="experience-card-header">
                    <div><p className="eyebrow"><BriefcaseBusiness size={14} aria-hidden="true" /> {experience.company}</p><h3>{experience.role}</h3></div>
                    <div className="experience-meta"><span><CalendarDays size={15} aria-hidden="true" /> {experience.period}</span><span><MapPin size={15} aria-hidden="true" /> {experience.location}</span></div>
                  </div>
                  <p className="experience-summary">{experience.summary}</p>
                  <ul className="check-list">{experience.responsibilities.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" />{item}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-capabilities-section" id="capabilities">
        <div className="content-shell">
          <SectionHeading eyebrow="Capability evidence" title="A practical capability matrix connected to proof." />
          <div className="about-capability-grid">
            {capabilityGroups.map((group, index) => (
              <article key={group.id}>
                <span className="capability-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul>{group.items.map((item) => <li key={item.name}><Link to={item.href}><span>{item.name}</span><small>{item.proof}</small><ArrowRight size={14} aria-hidden="true" /></Link></li>)}</ul>
              </article>
            ))}
          </div>
          <div className="additional-foundations">
            <div><p className="eyebrow">Additional foundations</p><h3>Technical breadth that supports the main stack.</h3></div>
            <ul>{additionalFoundations.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section education-section">
        <div className="content-shell">
          <div className="education-header"><div><p className="eyebrow">Education</p><h2>Academic foundation</h2></div><div className="language-card"><Languages aria-hidden="true" /><span>Languages</span><strong>{profile.languages.join(" · ")}</strong></div></div>
          <div className="education-grid">
            {education.map((item, index) => (
              <article key={item.school}><GraduationCap aria-hidden="true" /><span>0{index + 1}</span><h3>{item.program}</h3><p>{item.school}</p><strong>{item.period}</strong></article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta-section">
        <div className="content-shell about-cta">
          <div><p className="eyebrow">Next step</p><h2>See the systems, then start a conversation.</h2></div>
          <div className="button-row"><Link className="button button-light" to="/projects">Explore projects</Link><Link className="button button-accent" to="/contact">Contact Marc <ArrowRight size={16} aria-hidden="true" /></Link></div>
        </div>
      </section>
    </>
  );
}
