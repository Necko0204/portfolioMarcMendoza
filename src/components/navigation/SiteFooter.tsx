import { ArrowUp, ArrowUpRight, Github, Mail, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "../../data/profile";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-primary">
          <div>
            <p className="eyebrow">Build the useful thing</p>
            <h2>Systems that respect both the workflow and the people using it.</h2>
          </div>
          <Link className="button button-light" to="/contact">
            Discuss a role or project <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="footer-grid">
          <div className="footer-profile">
            <div className="brand-mark brand-mark-inverse">
              <span className="brand-symbol" aria-hidden="true">MM</span>
              <span><strong>{profile.shortName}</strong><small>{profile.positioning}</small></span>
            </div>
            <p>{profile.summary}</p>
          </div>
          <div>
            <h3>Navigate</h3>
            <Link to="/projects">Projects</Link>
            <Link to="/operations">Operations</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <h3>Contact</h3>
            <a href={`mailto:${profile.email}`}><Mail size={15} aria-hidden="true" /> Email</a>
            <a href={profile.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={15} aria-hidden="true" /> WhatsApp</a>
            <a href={profile.githubUrl} target="_blank" rel="noreferrer"><Github size={15} aria-hidden="true" /> GitHub</a>
            <span><MapPin size={15} aria-hidden="true" /> {profile.location}</span>
          </div>
        </div>
        <div className="footer-meta">
          <span>© {new Date().getFullYear()} Marc Angelo Mendoza</span>
          <span>React + TypeScript + Express</span>
          <a href="#top">Back to top <ArrowUp size={14} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
