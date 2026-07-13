import { ArrowUpRight, CheckCircle2, Github, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { Seo } from "../components/common/Seo";
import { profile } from "../data/profile";
import { ApiError, submitContact } from "../services/api";
import type { ContactSubmission } from "../types/api";

type FieldErrors = Partial<Record<keyof ContactSubmission, string>>;

const initialForm: ContactSubmission = {
  name: "",
  email: "",
  company: "",
  inquiryType: "",
  projectContext: "",
  message: "",
  website: ""
};

function validateForm(form: ContactSubmission): FieldErrors {
  const errors: FieldErrors = {};
  if (form.name.trim().length < 2) errors.name = "Please enter at least 2 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Enter a valid email address.";
  if (form.company.trim().length > 100) errors.company = "Keep the company name under 100 characters.";
  if (!form.inquiryType) errors.inquiryType = "Choose the type of conversation.";
  if (form.projectContext.trim().length > 160) errors.projectContext = "Keep this context under 160 characters.";
  if (form.message.trim().length < 20) errors.message = "Please share at least 20 characters so Marc has enough context.";
  if (form.message.trim().length > 2000) errors.message = "Keep the message under 2,000 characters.";
  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactSubmission>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const mailto = useMemo(() => `mailto:${profile.email}?subject=${encodeURIComponent("Portfolio inquiry")}`, []);

  function updateField(field: keyof ContactSubmission, value: string): void {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setStatus("error");
      setStatusMessage("Review the highlighted fields and try again.");
      const firstInvalid = Object.keys(validationErrors)[0];
      window.requestAnimationFrame(() => document.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus());
      return;
    }

    void sendValidatedMessage();
  }

  function sendValidatedMessage(): void {
    setStatus("submitting");
    setStatusMessage("");
    submitContact(form).then(
      (response) => {
        setStatus("success");
        setStatusMessage(response.message);
        setForm(initialForm);
        setErrors({});
      },
      (error: unknown) => {
        setStatus("error");
        if (error instanceof ApiError && error.fieldErrors) setErrors(error.fieldErrors as FieldErrors);
        setStatusMessage(error instanceof Error ? error.message : "The message could not be sent. Please use email instead.");
      }
    );
  }

  function fieldError(field: keyof ContactSubmission) {
    return errors[field] ? <span className="field-error" id={`${field}-error`}>{errors[field]}</span> : null;
  }

  return (
    <>
      <Seo
        title="Contact Marc Mendoza | Web Development and Systems Work"
        description="Contact Marc Angelo Mendoza about full-stack web development, admin systems, backend workflow logic, IT support, and operations coordination."
        path="/contact"
      />
      <header className="page-hero contact-page-hero">
        <div className="content-shell contact-page-hero-layout">
          <div>
            <p className="eyebrow">Contact Marc</p>
            <h1>Start with the problem, role, or workflow that needs attention.</h1>
            <p>Best fit: web development, admin systems, backend workflow logic, deployment, technical documentation, IT support, and operations coordination.</p>
          </div>
          <div className="contact-direct-grid">
            <a href={`mailto:${profile.email}`}><Mail aria-hidden="true" /><span>Email</span><strong>{profile.email}</strong><ArrowUpRight aria-hidden="true" /></a>
            <a href={profile.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /><span>WhatsApp</span><strong>{profile.phone}</strong><ArrowUpRight aria-hidden="true" /></a>
            <a href={profile.githubUrl} target="_blank" rel="noreferrer"><Github aria-hidden="true" /><span>GitHub</span><strong>Necko0204</strong><ArrowUpRight aria-hidden="true" /></a>
            <div><MapPin aria-hidden="true" /><span>Location</span><strong>{profile.location}</strong></div>
          </div>
        </div>
      </header>

      <section className="section contact-form-section">
        <div className="content-shell contact-form-layout">
          <aside>
            <p className="eyebrow">A useful first message</p>
            <h2>Enough context to make the next reply productive.</h2>
            <ul className="contact-checklist">
              <li><CheckCircle2 aria-hidden="true" /><span><strong>What needs to be built or improved</strong>Role, project, system, or operational problem.</span></li>
              <li><CheckCircle2 aria-hidden="true" /><span><strong>What matters most</strong>Deadline, user workflow, existing stack, or handover need.</span></li>
              <li><CheckCircle2 aria-hidden="true" /><span><strong>What happens next</strong>Marc can reply by email or continue the conversation on WhatsApp.</span></li>
            </ul>
            <a className="text-link" href={mailto}>Prefer email? Open your mail app <ArrowUpRight size={15} aria-hidden="true" /></a>
          </aside>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-heading"><p className="eyebrow">Professional inquiry</p><h2>Tell Marc what you are working on.</h2></div>
            <div className="form-grid form-grid-two">
              <label><span>Name *</span><input name="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />{fieldError("name")}</label>
              <label><span>Email *</span><input name="email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />{fieldError("email")}</label>
            </div>
            <div className="form-grid form-grid-two">
              <label><span>Company or organization</span><input name="company" value={form.company} onChange={(event) => updateField("company", event.target.value)} autoComplete="organization" aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? "company-error" : undefined} />{fieldError("company")}</label>
              <label><span>Inquiry type *</span><select name="inquiryType" value={form.inquiryType} onChange={(event) => updateField("inquiryType", event.target.value)} aria-invalid={Boolean(errors.inquiryType)} aria-describedby={errors.inquiryType ? "inquiryType-error" : undefined}><option value="">Choose one</option><option value="job-opportunity">Job opportunity</option><option value="web-project">Web or systems project</option><option value="operations-support">Operations or VA support</option><option value="collaboration">Collaboration</option><option value="other">Other professional inquiry</option></select>{fieldError("inquiryType")}</label>
            </div>
            <label><span>Budget or role context <small>Optional</small></span><input name="projectContext" value={form.projectContext} onChange={(event) => updateField("projectContext", event.target.value)} placeholder="Example: full-time role, contract project, or budget range" aria-invalid={Boolean(errors.projectContext)} aria-describedby={errors.projectContext ? "projectContext-error" : undefined} />{fieldError("projectContext")}</label>
            <label><span>Message *</span><textarea name="message" rows={7} value={form.message} onChange={(event) => updateField("message", event.target.value)} placeholder="Describe the role, system, workflow, or outcome you need." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : "message-hint"} /><small id="message-hint" className="field-hint">20 to 2,000 characters. Please do not include passwords or private credentials.</small>{fieldError("message")}</label>
            <label className="honeypot" aria-hidden="true"><span>Website</span><input name="website" value={form.website} onChange={(event) => updateField("website", event.target.value)} tabIndex={-1} autoComplete="off" /></label>
            <button className="button button-primary contact-submit" type="submit" disabled={status === "submitting"}>
              <Send size={17} aria-hidden="true" /> {status === "submitting" ? "Sending securely..." : "Send message"}
            </button>
            <div className={`form-status form-status-${status}`} role="status" aria-live="polite">
              {statusMessage}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
