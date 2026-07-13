import { ArrowLeft, FolderSearch } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "../components/common/Seo";

export default function NotFoundPage() {
  return (
    <section className="not-found-page">
      <Seo title="Page Not Found | Marc Mendoza" description="The requested portfolio page could not be found." path={window.location.pathname} />
      <div className="not-found-grid" aria-hidden="true" />
      <div className="not-found-content">
        <FolderSearch size={44} aria-hidden="true" />
        <p className="eyebrow">404 · Route not found</p>
        <h1>This path is outside the system map.</h1>
        <p>The page may have moved, or the address may be incomplete. The main portfolio routes are still available.</p>
        <div className="button-row"><Link className="button button-accent" to="/"><ArrowLeft size={16} aria-hidden="true" /> Return home</Link><Link className="button button-ghost-light" to="/projects">Open projects</Link></div>
      </div>
    </section>
  );
}
