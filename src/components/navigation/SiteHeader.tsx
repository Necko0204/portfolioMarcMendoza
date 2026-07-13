import { ArrowUpRight, Github, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { profile } from "../../data/profile";
import { ThemeControl } from "./ThemeControl";

const navigation = [
  { label: "Work", to: "/projects" },
  { label: "Systems", to: "/#systems" },
  { label: "Operations", to: "/operations" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" }
];

function isActiveRoute(pathname: string, hash: string, to: string): boolean {
  const [routePath, routeHash = ""] = to.split("#");
  const path = routePath || "/";
  if (routeHash) return pathname === path && hash === `#${routeHash}`;
  if (path === "/projects") return pathname.startsWith("/projects");
  return pathname === path;
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary navigation">
        <Link to="/" className="brand-mark" aria-label="Marc Mendoza homepage">
          <span className="brand-symbol" aria-hidden="true">MM</span>
          <span>
            <strong>Marc Mendoza</strong>
            <small>Systems + operations</small>
          </span>
        </Link>

        <div className="desktop-nav">
          {navigation.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={isActiveRoute(location.pathname, location.hash, item.to) ? "nav-link active" : "nav-link"}
              aria-current={isActiveRoute(location.pathname, location.hash, item.to) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <ThemeControl />
          <a className="nav-github" href={profile.githubUrl} target="_blank" rel="noreferrer">
            <Github size={17} aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <NavLink className="button button-small button-primary nav-hire" to="/contact">
            Hire me <ArrowUpRight size={16} aria-hidden="true" />
          </NavLink>
          <button
            ref={toggleRef}
            className="mobile-menu-toggle icon-button"
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div id="mobile-navigation" className={isOpen ? "mobile-nav open" : "mobile-nav"} aria-hidden={!isOpen}>
        <div className="mobile-nav-inner">
          {navigation.map((item, index) => (
            <Link
              ref={index === 0 ? firstLinkRef : undefined}
              key={item.label}
              to={item.to}
              tabIndex={isOpen ? 0 : -1}
              className={isActiveRoute(location.pathname, location.hash, item.to) ? "mobile-nav-link active" : "mobile-nav-link"}
            >
              <span>0{index + 1}</span>
              {item.label}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          ))}
          <a className="mobile-nav-link" href={profile.githubUrl} target="_blank" rel="noreferrer" tabIndex={isOpen ? 0 : -1}>
            <span>06</span>
            GitHub
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <Link className="button button-primary mobile-nav-cta" to="/contact" tabIndex={isOpen ? 0 : -1}>
            Start a conversation
          </Link>
        </div>
      </div>
    </header>
  );
}
