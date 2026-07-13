import {
  Archive,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Download,
  Inbox,
  LoaderCircle,
  LogOut,
  Mail,
  MessageSquare,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  UserCheck,
  X
} from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import type { User } from "firebase/auth";
import { ThemeControl } from "../components/navigation/ThemeControl";
import { profile } from "../data/profile";
import {
  ApiError,
  deleteAdminContact,
  listAdminContacts,
  mergeUpdatedMessage,
  updateAdminContact
} from "../services/api";
import { getAdminToken, observeAdminUser, signInAdmin, signOutAdmin } from "../services/firebaseAuth";
import type { ContactMessage, ContactStatus } from "../types/api";
import { exportMessagesToCsv } from "../utils/csv";

type AuthState = "loading" | "signed-out" | "signed-in" | "unauthorized" | "error";
type LoadState = "idle" | "loading" | "ready" | "error";

const emptyCounts = { total: 0, new: 0, contacted: 0, archived: 0 };
const statusOptions: Array<{ value: "all" | ContactStatus; label: string }> = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "archived", label: "Archived" }
];

function formatDate(value: string): string {
  if (!value) return "Timestamp pending";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Timestamp pending"
    : new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function friendlyAuthError(error: unknown): string {
  const message = error instanceof Error ? error.message : "";
  if (message.includes("auth/invalid-credential") || message.includes("auth/wrong-password")) return "The email or password is incorrect.";
  if (message.includes("auth/too-many-requests")) return "Too many attempts. Wait a moment and try again.";
  if (message.includes("not configured")) return message;
  return "Administrator sign-in could not be completed. Check the Firebase Authentication setup.";
}

export default function DashboardPage() {
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [user, setUser] = useState<User | null>(null);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [authMessage, setAuthMessage] = useState("");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [counts, setCounts] = useState(emptyCounts);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [dashboardMessage, setDashboardMessage] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ContactStatus>("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [actionId, setActionId] = useState<string | null>(null);

  useEffect(() => {
    const previousTitle = document.title;
    const existingRobots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const robots = existingRobots || document.createElement("meta");
    const previousRobots = robots.content;

    document.title = "Portfolio Admin | Marc Mendoza";
    if (!existingRobots) {
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = "noindex,nofollow";

    return () => {
      document.title = previousTitle;
      if (existingRobots) robots.content = previousRobots;
      else robots.remove();
    };
  }, []);

  useEffect(() => {
    try {
      return observeAdminUser((currentUser) => {
        setUser(currentUser);
        setAuthState(currentUser ? "signed-in" : "signed-out");
      });
    } catch (error) {
      setAuthState("error");
      setAuthMessage(friendlyAuthError(error));
      return undefined;
    }
  }, []);

  async function loadMessages(append = false): Promise<void> {
    if (!user) return;
    setLoadState("loading");
    setDashboardMessage("");
    try {
      const token = await getAdminToken(user);
      const response = await listAdminContacts(token, { cursor: append ? cursor || undefined : undefined, limit: 30 });
      setMessages((current) => {
        if (!append) return response.messages;
        const known = new Set(current.map((message) => message.id));
        return [...current, ...response.messages.filter((message) => !known.has(message.id))];
      });
      setCounts(response.counts);
      setCursor(response.nextCursor);
      setLoadState("ready");
    } catch (error) {
      if (error instanceof ApiError && error.status === 403) {
        setAuthState("unauthorized");
        setDashboardMessage("This Firebase account is signed in but is not on the administrator allowlist.");
      } else if (error instanceof ApiError && error.status === 401) {
        await signOutAdmin();
        setAuthState("signed-out");
        setDashboardMessage("Your session expired. Sign in again.");
      } else {
        setLoadState("error");
        setDashboardMessage(error instanceof Error ? error.message : "Messages could not be loaded.");
      }
    }
  }

  useEffect(() => {
    if (authState === "signed-in" && user) void loadMessages(false);
    // The authenticated user is the load trigger; cursor changes must not refetch automatically.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, user]);

  const filteredMessages = useMemo(() => {
    const term = search.trim().toLowerCase();
    return messages
      .filter((message) => statusFilter === "all" || message.status === statusFilter)
      .filter((message) => {
        if (!term) return true;
        return [message.name, message.email, message.company, message.inquiryType, message.message]
          .join(" ")
          .toLowerCase()
          .includes(term);
      })
      .sort((a, b) => {
        const difference = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return sortOrder === "newest" ? difference : -difference;
      });
  }, [messages, search, sortOrder, statusFilter]);

  const selectedMessage = messages.find((message) => message.id === selectedId) || null;

  useEffect(() => {
    setNoteDraft(selectedMessage?.internalNote || "");
  }, [selectedMessage]);

  async function handleLogin(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setAuthMessage("");
    setAuthState("loading");
    try {
      await signInAdmin(login.email.trim(), login.password);
      setLogin({ email: "", password: "" });
    } catch (error) {
      setAuthState("signed-out");
      setAuthMessage(friendlyAuthError(error));
    }
  }

  async function handleLogout(): Promise<void> {
    await signOutAdmin();
    setMessages([]);
    setSelectedId(null);
    setCounts(emptyCounts);
    setAuthState("signed-out");
  }

  async function updateMessage(message: ContactMessage, updates: { status?: ContactStatus; internalNote?: string }): Promise<void> {
    if (!user) return;
    setActionId(message.id);
    setDashboardMessage("");
    try {
      const token = await getAdminToken(user);
      const response = await updateAdminContact(token, message.id, updates);
      if (response.message) {
        setMessages((current) => mergeUpdatedMessage(current, response.message as ContactMessage));
        if (updates.status && updates.status !== message.status) {
          setCounts((current) => ({
            ...current,
            [message.status]: Math.max(0, current[message.status] - 1),
            [updates.status as ContactStatus]: current[updates.status as ContactStatus] + 1
          }));
        }
      }
      setDashboardMessage("Message updated.");
    } catch (error) {
      setDashboardMessage(error instanceof Error ? error.message : "The update could not be saved.");
    } finally {
      setActionId(null);
    }
  }

  async function handleDelete(message: ContactMessage): Promise<void> {
    if (!user || !window.confirm(`Delete the message from ${message.name}? This cannot be undone.`)) return;
    setActionId(message.id);
    try {
      const token = await getAdminToken(user);
      await deleteAdminContact(token, message.id);
      setMessages((current) => current.filter((item) => item.id !== message.id));
      setCounts((current) => ({ ...current, total: Math.max(0, current.total - 1), [message.status]: Math.max(0, current[message.status] - 1) }));
      setSelectedId(null);
      setDashboardMessage("Message deleted.");
    } catch (error) {
      setDashboardMessage(error instanceof Error ? error.message : "The message could not be deleted.");
    } finally {
      setActionId(null);
    }
  }

  if (authState === "loading") {
    return (
      <main className="dashboard-auth-shell">
        <div className="dashboard-auth-card" role="status"><LoaderCircle className="spin" aria-hidden="true" /><h1>Checking administrator access</h1><p>Confirming the Firebase Authentication session.</p></div>
      </main>
    );
  }

  if (authState === "signed-out" || authState === "error") {
    return (
      <main className="dashboard-auth-shell">
        <div className="dashboard-auth-topbar"><Link to="/"><ArrowLeft size={16} aria-hidden="true" /> Portfolio</Link><ThemeControl /></div>
        <div className="dashboard-login-layout">
          <section className="dashboard-login-intro">
            <div className="dashboard-secure-mark"><ShieldCheck aria-hidden="true" /></div>
            <p className="eyebrow">Protected administration</p>
            <h1>Portfolio contact management.</h1>
            <p>Firebase Authentication verifies identity. Express checks server-side administrator authorization before any contact record is returned or changed.</p>
            <div className="security-flow"><span>Firebase sign-in</span><ChevronRight aria-hidden="true" /><span>ID token</span><ChevronRight aria-hidden="true" /><span>Server allowlist</span></div>
          </section>
          <form className="dashboard-login-card" onSubmit={(event) => void handleLogin(event)}>
            <p className="eyebrow">Administrator login</p>
            <h2>Sign in with Firebase</h2>
            <p>Use the administrator email created in Firebase Authentication. No portfolio password is stored in this website.</p>
            {authMessage ? <div className="dashboard-alert dashboard-alert-error" role="alert"><ShieldAlert aria-hidden="true" />{authMessage}</div> : null}
            <label><span>Email</span><input name="email" type="email" value={login.email} onChange={(event) => setLogin((current) => ({ ...current, email: event.target.value }))} autoComplete="username" required /></label>
            <label><span>Password</span><input name="password" type="password" value={login.password} onChange={(event) => setLogin((current) => ({ ...current, password: event.target.value }))} autoComplete="current-password" required /></label>
            <button className="button button-primary" type="submit">Secure sign in <ShieldCheck size={16} aria-hidden="true" /></button>
            <small>Access is granted only when the signed-in UID is authorized on the server.</small>
          </form>
        </div>
      </main>
    );
  }

  if (authState === "unauthorized") {
    return (
      <main className="dashboard-auth-shell">
        <div className="dashboard-auth-card dashboard-unauthorized"><ShieldAlert aria-hidden="true" /><p className="eyebrow">Unauthorized account</p><h1>Sign-in succeeded, but dashboard access was denied.</h1><p>{dashboardMessage}</p><button className="button button-primary" type="button" onClick={() => void handleLogout()}>Sign out</button></div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-header-brand"><Link to="/"><ArrowLeft size={16} aria-hidden="true" /> Portfolio</Link><span /><div><strong>Contact operations</strong><small>Protected administration</small></div></div>
        <div className="dashboard-header-actions"><ThemeControl /><span className="dashboard-user">{user?.email}</span><button className="icon-button" type="button" onClick={() => void handleLogout()} aria-label="Sign out"><LogOut aria-hidden="true" /></button></div>
      </header>

      <div className="dashboard-content">
        <section className="dashboard-titlebar">
          <div><p className="eyebrow">Hire-me inbox</p><h1>Professional inquiries</h1><p>Review, contact, annotate, archive, and export the messages sent through the portfolio.</p></div>
          <div className="button-row"><button className="button button-secondary" type="button" onClick={() => void loadMessages(false)} disabled={loadState === "loading"}><RefreshCw className={loadState === "loading" ? "spin" : ""} size={16} aria-hidden="true" /> Refresh</button><button className="button button-primary" type="button" onClick={() => exportMessagesToCsv(filteredMessages)} disabled={!filteredMessages.length}><Download size={16} aria-hidden="true" /> Export visible CSV</button></div>
        </section>

        <section className="dashboard-metrics" aria-label="Message summary">
          <article><Inbox aria-hidden="true" /><div><strong>{counts.total}</strong><span>Total messages</span></div></article>
          <article><MessageSquare aria-hidden="true" /><div><strong>{counts.new}</strong><span>New</span></div></article>
          <article><UserCheck aria-hidden="true" /><div><strong>{counts.contacted}</strong><span>Contacted</span></div></article>
          <article><Archive aria-hidden="true" /><div><strong>{counts.archived}</strong><span>Archived</span></div></article>
        </section>

        <section className="dashboard-toolbar" aria-label="Message filters">
          <label className="dashboard-search"><span className="sr-only">Search messages</span><Search size={17} aria-hidden="true" /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email, company, or message" /></label>
          <div className="dashboard-status-filter" role="group" aria-label="Filter by status">{statusOptions.map((option) => <button key={option.value} type="button" className={statusFilter === option.value ? "active" : ""} onClick={() => setStatusFilter(option.value)}>{option.label}</button>)}</div>
          <label className="dashboard-sort"><span>Sort</span><select value={sortOrder} onChange={(event) => setSortOrder(event.target.value as "newest" | "oldest")}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></label>
        </section>

        {dashboardMessage ? <div className={loadState === "error" ? "dashboard-alert dashboard-alert-error" : "dashboard-alert"} role="status">{dashboardMessage}</div> : null}

        <section className="dashboard-workspace">
          <div className="message-list" aria-label="Contact messages">
            {loadState === "loading" && messages.length === 0 ? <div className="dashboard-empty" role="status"><LoaderCircle className="spin" aria-hidden="true" /><h2>Loading messages</h2></div> : null}
            {loadState !== "loading" && filteredMessages.length === 0 ? <div className="dashboard-empty"><Inbox aria-hidden="true" /><h2>No matching messages</h2><p>Adjust the search or status filter, or wait for a new portfolio inquiry.</p></div> : null}
            {filteredMessages.map((message) => (
              <button key={message.id} type="button" className={selectedId === message.id ? "message-row selected" : "message-row"} onClick={() => setSelectedId(message.id)}>
                <span className={`status-dot status-dot-${message.status}`} aria-label={message.status} />
                <span className="message-row-main"><strong>{message.name}</strong><small>{message.company || "No company"} · {message.inquiryType || "General inquiry"}</small><span>{message.message}</span></span>
                <span className="message-row-meta"><time>{formatDate(message.createdAt)}</time><ChevronRight size={17} aria-hidden="true" /></span>
              </button>
            ))}
            {cursor ? <button className="button button-secondary load-more" type="button" disabled={loadState === "loading"} onClick={() => void loadMessages(true)}>{loadState === "loading" ? "Loading..." : "Load more messages"}</button> : null}
          </div>

          <aside className={selectedMessage ? "message-detail open" : "message-detail"} aria-label="Selected message detail">
            {selectedMessage ? (
              <>
                <div className="message-detail-header"><div><span className={`status-badge status-${selectedMessage.status}`}>{selectedMessage.status}</span><h2>{selectedMessage.name}</h2><p>{selectedMessage.company || "No company provided"}</p></div><button className="icon-button detail-close" type="button" onClick={() => setSelectedId(null)} aria-label="Close message detail"><X aria-hidden="true" /></button></div>
                <div className="message-detail-meta"><a href={`mailto:${selectedMessage.email}`}><Mail size={15} aria-hidden="true" />{selectedMessage.email}</a><span>{formatDate(selectedMessage.createdAt)}</span><span>{selectedMessage.inquiryType || "General inquiry"}</span>{selectedMessage.projectContext ? <span>{selectedMessage.projectContext}</span> : null}</div>
                <div className="message-detail-body"><p>{selectedMessage.message}</p></div>
                <div className="message-status-actions"><p>Update status</p><div>{(["new", "contacted", "archived"] as ContactStatus[]).map((status) => <button key={status} type="button" className={selectedMessage.status === status ? "active" : ""} disabled={actionId === selectedMessage.id} onClick={() => void updateMessage(selectedMessage, { status })}>{status === "new" ? <MessageSquare size={15} aria-hidden="true" /> : status === "contacted" ? <UserCheck size={15} aria-hidden="true" /> : <Archive size={15} aria-hidden="true" />}{status}</button>)}</div></div>
                <label className="internal-note"><span>Internal note</span><textarea rows={5} value={noteDraft} onChange={(event) => setNoteDraft(event.target.value)} maxLength={1000} placeholder="Add private follow-up context. This is never shown publicly." /><small>{noteDraft.length}/1000</small></label>
                <div className="message-detail-actions"><button className="button button-primary" type="button" disabled={actionId === selectedMessage.id || noteDraft === selectedMessage.internalNote} onClick={() => void updateMessage(selectedMessage, { internalNote: noteDraft })}>{actionId === selectedMessage.id ? <LoaderCircle className="spin" size={16} aria-hidden="true" /> : <CheckCircle2 size={16} aria-hidden="true" />} Save note</button><button className="button button-danger" type="button" disabled={actionId === selectedMessage.id} onClick={() => void handleDelete(selectedMessage)}><Trash2 size={16} aria-hidden="true" /> Delete</button></div>
              </>
            ) : <div className="detail-placeholder"><MessageSquare aria-hidden="true" /><h2>Select a message</h2><p>Open an inquiry to review its details, update its status, add a note, or delete it.</p></div>}
          </aside>
        </section>
      </div>
      <footer className="dashboard-footer"><span>Signed in with Firebase Authentication</span><span>Protected by server-side UID authorization</span><a href={`mailto:${profile.email}`}>{profile.email}</a></footer>
    </main>
  );
}
