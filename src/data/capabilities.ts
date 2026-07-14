import type { CapabilityGroup, EvidenceItem, SystemNode } from "../types/content";

export const systemNodes: SystemNode[] = [
  {
    id: "frontend",
    label: "Frontend",
    eyebrow: "Interface layer",
    description: "Responsive React, TypeScript, Tailwind, Bootstrap, and PHP-facing UI shaped around real workflows.",
    evidenceLabel: "View selected projects",
    evidenceHref: "/projects"
  },
  {
    id: "backend",
    label: "Backend / API",
    eyebrow: "Logic layer",
    description: "Node and Express APIs, PHP server logic, validation, and business rules that connect interface actions to system outcomes.",
    evidenceLabel: "HCM workflow case study",
    evidenceHref: "/projects/human-capital-management-system",
    projectSlug: "human-capital-management-system"
  },
  {
    id: "database",
    label: "Data",
    eyebrow: "Record layer",
    description: "Firebase and Firestore, MySQL, PostgreSQL, and SQL data modeling for operational and admin records.",
    evidenceLabel: "SkillTest data approach",
    evidenceHref: "/projects/skilltest-indonesia-platform",
    projectSlug: "skilltest-indonesia-platform"
  },
  {
    id: "admin",
    label: "Admin workflows",
    eyebrow: "Control layer",
    description: "Role-aware dashboards, admin actions, approval states, timekeeping, leave handling, and status transitions.",
    evidenceLabel: "HCM responsibilities",
    evidenceHref: "/projects/human-capital-management-system",
    projectSlug: "human-capital-management-system"
  },
  {
    id: "deployment",
    label: "Deployment",
    eyebrow: "Delivery layer",
    description: "Render, Hostinger, GoDaddy and DNS familiarity, GitHub workflows, environment configuration, SSL, and route handling.",
    evidenceLabel: "Open handover preview",
    evidenceHref: "/assets/technical-handover-skilltestindonesia-preview.pdf"
  },
  {
    id: "documentation",
    label: "Documentation",
    eyebrow: "Continuity layer",
    description: "Technical handovers, maintenance checklists, SOP-style notes, environment reminders, and client-ready reporting.",
    evidenceLabel: "Technical handover preview",
    evidenceHref: "/assets/technical-handover-skilltestindonesia-preview.pdf"
  },
  {
    id: "operations",
    label: "Operations",
    eyebrow: "Human layer",
    description: "Inbox triage, calendar preparation, task ownership, lead follow-up, client communication, and weekly reporting.",
    evidenceLabel: "Explore operations evidence",
    evidenceHref: "/operations"
  }
];

export const architectureNodes: SystemNode[] = [
  {
    id: "authentication",
    label: "Authentication",
    eyebrow: "Identity",
    description: "Login-gated experiences establish who may enter a system before role-specific actions are shown.",
    evidenceLabel: "HCM login experience",
    evidenceHref: "/projects/human-capital-management-system"
  },
  {
    id: "roles",
    label: "Roles & permissions",
    eyebrow: "Authorization",
    description: "Admin, employee, and client-facing experiences need clear boundaries around records and actions.",
    evidenceLabel: "See system responsibilities",
    evidenceHref: "/projects/human-capital-management-system"
  },
  {
    id: "admin-interfaces",
    label: "Admin interfaces",
    eyebrow: "Control surfaces",
    description: "Action-focused admin and super-admin interface thinking keeps status, ownership, and next steps visible.",
    evidenceLabel: "View live systems",
    evidenceHref: "/projects"
  },
  {
    id: "data-modeling",
    label: "Data modeling",
    eyebrow: "Records",
    description: "Relational SQL and document-based Firebase approaches are selected according to the system's workflow needs.",
    evidenceLabel: "Compare project data layers",
    evidenceHref: "/projects"
  },
  {
    id: "api-routes",
    label: "API routes",
    eyebrow: "Boundaries",
    description: "Validated server routes create a dependable boundary between public interfaces, protected actions, and stored records.",
    evidenceLabel: "Portfolio contact architecture",
    evidenceHref: "/contact"
  },
  {
    id: "business-rules",
    label: "Business rules",
    eyebrow: "Logic",
    description: "Rules such as time-in/time-out and leave handling turn clicks into consistent operational outcomes.",
    evidenceLabel: "HCM backend logic",
    evidenceHref: "/projects/human-capital-management-system"
  },
  {
    id: "status-workflows",
    label: "Status workflows",
    eyebrow: "Progress",
    description: "New, in-progress, contacted, waiting, and archived states make work visible and auditable.",
    evidenceLabel: "Operations tracking evidence",
    evidenceHref: "/operations"
  },
  {
    id: "deployment",
    label: "Deployment",
    eyebrow: "Release",
    description: "Build output, environment variables, domains, SSL, route fallback, and hosting ownership are part of delivery.",
    evidenceLabel: "Read deployment preview",
    evidenceHref: "/assets/technical-handover-skilltestindonesia-preview.pdf"
  },
  {
    id: "handover",
    label: "Technical handover",
    eyebrow: "Continuity",
    description: "A system is more valuable when another developer or client owner can understand how to operate and maintain it.",
    evidenceLabel: "Open public preview",
    evidenceHref: "/assets/technical-handover-skilltestindonesia-preview.pdf"
  }
];

export const capabilityGroups: CapabilityGroup[] = [
  {
    id: "product-interface",
    title: "Product interface engineering",
    description: "Interfaces designed around task clarity, responsive behavior, and readable system states.",
    items: [
      { name: "React and TypeScript", proof: "SkillTest Indonesia", href: "/projects/skilltest-indonesia-platform" },
      { name: "Tailwind CSS", proof: "Human Capital Management System", href: "/projects/human-capital-management-system" },
      { name: "PHP and Bootstrap UI", proof: "HSHR School ERP", href: "/projects/hshr-school-erp" }
    ]
  },
  {
    id: "backend-api",
    title: "Backend and API development",
    description: "Server logic, validated routes, workflow actions, and practical system behavior.",
    items: [
      { name: "Node.js and Express", proof: "Secure portfolio contact API", href: "/contact" },
      { name: "PHP server logic", proof: "HSHR School ERP", href: "/projects/hshr-school-erp" },
      { name: "Timekeeping and leave rules", proof: "HCM System", href: "/projects/human-capital-management-system" }
    ]
  },
  {
    id: "data-firebase",
    title: "Data and Firebase",
    description: "Document and relational data approaches selected according to the workflow and hosting context.",
    items: [
      { name: "Firebase and Firestore", proof: "SkillTest + portfolio messaging", href: "/projects/skilltest-indonesia-platform" },
      { name: "MySQL and SQL", proof: "HSHR School ERP", href: "/projects/hshr-school-erp" },
      { name: "PostgreSQL knowledge", proof: "Technical capability profile", href: "/about#capabilities" }
    ]
  },
  {
    id: "admin-workflows",
    title: "Admin workflow systems",
    description: "Role-aware surfaces for approvals, statuses, records, and recurring operational actions.",
    items: [
      { name: "Admin and role-aware interfaces", proof: "HCM System", href: "/projects/human-capital-management-system" },
      { name: "Status and ownership tracking", proof: "Operations workbook", href: "/operations" },
      { name: "School ERP organization", proof: "HSHR", href: "/projects/hshr-school-erp" }
    ]
  },
  {
    id: "deployment",
    title: "Deployment and maintenance",
    description: "Delivery work that includes hosting, routes, environments, source control, and continuity.",
    items: [
      { name: "Render and Hostinger", proof: "Three live systems", href: "/projects" },
      { name: "GoDaddy and DNS familiarity", proof: "Professional capability profile", href: "/about#capabilities" },
      { name: "Environment and release checks", proof: "Handover preview", href: "/assets/technical-handover-skilltestindonesia-preview.pdf" }
    ]
  },
  {
    id: "documentation",
    title: "Documentation and handover",
    description: "Clear technical and operational documentation for developers, clients, and future maintainers.",
    items: [
      { name: "Technical handover", proof: "SkillTest preview", href: "/assets/technical-handover-skilltestindonesia-preview.pdf" },
      { name: "SOP and readiness checks", proof: "Operations showcase", href: "/operations" },
      { name: "Client-ready reporting", proof: "Operations workbook", href: "/operations" }
    ]
  },
  {
    id: "operations-support",
    title: "Operations and client support",
    description: "Real-world experience with guest requests, messages, deadlines, follow-ups, meetings, handovers, and client-facing coordination.",
    items: [
      { name: "Inbox and calendar operations", proof: "Operations evidence", href: "/operations" },
      { name: "Guest support and issue resolution", proof: "CoBnB Malaysia experience", href: "/about" },
      { name: "Client communication and CRM hygiene", proof: "Experience + workbook", href: "/about" }
    ]
  }
];

export const evidenceItems: EvidenceItem[] = [
  {
    title: "Three live systems",
    type: "Deployed work",
    description: "Public routes for HR, an Indonesian client platform, and a school organization ERP experience.",
    action: "Open project index",
    href: "/projects"
  },
  {
    title: "Technical handover preview",
    type: "2-page redacted PDF",
    description: "Deployment, Firebase, security, maintenance, and continuity thinking without confidential details.",
    action: "Open PDF preview",
    href: "/assets/technical-handover-skilltestindonesia-preview.pdf"
  },
  {
    title: "Operations workbook",
    type: "5 connected Excel sheets",
    description: "Inbox, calendar, task, follow-up, and reporting templates with formula-driven evidence.",
    action: "Explore operations",
    href: "/operations"
  },
  {
    title: "Public GitHub profile",
    type: "Source evidence",
    description: "A direct route for reviewing repositories and ongoing technical work.",
    action: "Open GitHub",
    href: "https://github.com/Necko0204",
    external: true
  }
];
