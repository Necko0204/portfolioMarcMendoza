import type { Project } from "../types/content";

export const projects: Project[] = [
  {
    slug: "human-capital-management-system",
    name: "Human Capital Management System",
    shortName: "HCM System",
    type: "Live HR operations system",
    role: "Full-stack developer",
    summary:
      "A live human capital management system connecting employee-facing UI with timekeeping, leave, and HR workflow logic.",
    businessProblem:
      "HR operations need clear, consistent workflows for attendance, leave requests, employee records, and authenticated system actions.",
    responsibility:
      "Designed the system UI and implemented backend workflow logic, including time-in/time-out and leave handling across the system.",
    technologies: ["TypeScript", "Tailwind CSS", "Full-stack workflow logic", "Render"],
    capabilities: ["Authenticated HR screens", "Time-in/time-out", "Leave workflows", "Responsive system UI"],
    liveUrl: "https://assessmenthcmsystem.onrender.com/login",
    accent: "cyan",
    caseStudy: {
      overview:
        "A production-accessible HR system built around practical attendance, leave, and employee workflows.",
      businessContext:
        "Human capital workflows depend on accurate states, clear actions, and interfaces that reduce ambiguity for HR teams and employees.",
      problem:
        "Attendance and leave processes can become fragmented when records, approvals, and employee actions are handled without a consistent digital workflow.",
      responsibilities: [
        "Developed the user interface across the system.",
        "Implemented backend business logic for time-in and time-out.",
        "Implemented leave-related workflow logic and connected system actions.",
        "Shaped responsive screens around HR process clarity."
      ],
      users: ["HR administrators", "Employees using authenticated system screens"],
      workflows: ["Secure login", "Time-in/time-out", "Leave requests and handling", "HR record and status actions"],
      frontend:
        "TypeScript and Tailwind CSS support a responsive interface with clear workflow states and action-focused HR screens.",
      backend:
        "Server-side business rules coordinate timekeeping, leave handling, and the transitions required by HR operations.",
      data:
        "The public portfolio does not expose the private schema. The system is presented through its verified workflow responsibilities and live login route.",
      authentication:
        "The public entry point is a login-gated HR experience. Credentials and access procedures are intentionally excluded.",
      deployment: "The system is deployed on Render and linked directly to its working login route.",
      challenges: [
        "Keeping timekeeping rules understandable in the interface.",
        "Connecting leave states to the correct backend actions.",
        "Maintaining a consistent experience across employee and administrative workflows."
      ],
      decisions: [
        "Use TypeScript to make interface and workflow behavior easier to reason about.",
        "Keep primary HR actions visible and state-driven.",
        "Link portfolio visitors directly to the working login route."
      ],
      outcome:
        "A live HR system that demonstrates full-stack ownership across system UI, timekeeping logic, leave workflows, and deployment."
    }
  },
  {
    slug: "skilltest-indonesia-platform",
    name: "SkillTest Indonesia Platform",
    shortName: "SkillTest Indonesia",
    type: "Medium client platform",
    role: "Full-stack engineer / web developer",
    summary:
      "A client platform developed from scratch with React, TypeScript, Firebase, deployment, and portfolio-safe technical handover documentation.",
    businessProblem:
      "The Indonesian client needed a complete business platform that worked as a system, could be deployed reliably, and could be handed over responsibly.",
    responsibility:
      "Developed the site from scratch as the full-stack engineer and web developer, ensuring the complete system supported the client's business workflow.",
    technologies: ["React", "TypeScript", "Vite", "Firebase Firestore", "Firebase Storage", "Hostinger"],
    capabilities: ["Built from scratch", "Client workflow implementation", "Firebase data scope", "Deployment handover"],
    liveUrl: "https://skilltestindonesia.com/login",
    handoverUrl: "/assets/technical-handover-skilltestindonesia-preview.pdf",
    accent: "blue",
    caseStudy: {
      overview:
        "A medium-sized client platform delivered from initial build through deployment and technical continuity planning.",
      businessContext:
        "The project needed more than a polished page. It required a maintainable web application, data services, deployment discipline, and a clear handover path.",
      problem:
        "The client needed a system shaped around real business use, with a reliable frontend, Firebase-backed data scope, and documentation for continued operation.",
      responsibilities: [
        "Developed the platform from scratch.",
        "Owned full-stack web development across the client experience.",
        "Connected the application to Firebase Firestore and Storage scope.",
        "Prepared deployment and portfolio-safe handover documentation."
      ],
      users: ["The Indonesian client team", "Platform users entering through the login experience"],
      workflows: ["Authenticated entry", "Client business workflow", "Data and storage handling", "Deployment and maintenance handover"],
      frontend:
        "React, TypeScript, and Vite provide a structured, responsive application foundation suitable for continued client development.",
      backend:
        "Firebase services support the documented NoSQL data and storage scope while keeping infrastructure practical for the project.",
      data:
        "Firestore provides document-oriented records and Firebase Storage covers file-oriented needs described in the public handover preview.",
      authentication:
        "The live public entry is the platform login. Credentials, account details, and internal access procedures are intentionally private.",
      deployment:
        "GitHub source control and a Hostinger deployment flow are documented in the public handover preview without exposing client infrastructure.",
      challenges: [
        "Building a complete platform from a blank starting point.",
        "Keeping deployment, environment, and Firebase responsibilities clear.",
        "Producing useful handover proof without exposing sensitive client details."
      ],
      decisions: [
        "Use React and TypeScript for a maintainable interface foundation.",
        "Use Firebase services for the documented data and storage scope.",
        "Publish a redacted handover preview instead of the confidential internal document."
      ],
      outcome:
        "A live client platform with a public login route and verifiable documentation covering development, Firebase scope, deployment, security awareness, and handover."
    }
  },
  {
    slug: "hshr-school-erp",
    name: "HSHR School Organization",
    shortName: "HSHR School ERP",
    type: "School organization ERP system",
    role: "Lead programmer",
    summary:
      "A PHP, MySQL, and Bootstrap ERP-style system for a school organization, delivered with team leadership and a cohesive school web UI.",
    businessProblem:
      "A school organization needed one web system to organize its digital presence and support institution-wide workflows.",
    responsibility:
      "Led the programming team and created a seamless web interface for the school's broader ERP system.",
    technologies: ["PHP", "MySQL", "SQL", "Bootstrap", "Render"],
    capabilities: ["Lead programming", "School ERP structure", "PHP/MySQL workflows", "Public landing experience"],
    liveUrl: "https://hshr.onrender.com/landing_page/",
    accent: "mint",
    caseStudy: {
      overview:
        "An ERP-style web system created for a whole school organization using a pragmatic PHP and MySQL stack.",
      businessContext:
        "School organizations bring together public information, internal processes, and multiple stakeholder needs that require a coherent web experience.",
      problem:
        "The team needed to translate organization-wide requirements into a system structure and a school-facing interface that felt consistent.",
      responsibilities: [
        "Served as lead programmer for the team.",
        "Created the school system's web UI and interface patterns.",
        "Helped organize the ERP-style system around the school's workflows.",
        "Worked with PHP, MySQL, SQL, and Bootstrap across implementation."
      ],
      users: ["School organization stakeholders", "Public visitors using the school landing experience"],
      workflows: ["School information flow", "ERP-style organization workflows", "Public landing navigation", "Team implementation and review"],
      frontend:
        "Bootstrap supports a consistent responsive UI, while the page structure keeps the school identity and navigation readable.",
      backend:
        "PHP handles the system's server-side implementation and connects organization workflows to the database layer.",
      data:
        "MySQL and SQL support the system's relational data foundation. Private schemas and internal records are not published.",
      authentication:
        "Authentication details are not publicly documented. This case study only claims the verified public landing experience and stated ERP stack.",
      deployment: "The public landing route is deployed on Render.",
      challenges: [
        "Coordinating system decisions across a programming team.",
        "Keeping a broad school ERP experience visually coherent.",
        "Balancing public-facing information with a larger system context."
      ],
      decisions: [
        "Use PHP and MySQL as the practical server and relational-data foundation.",
        "Use Bootstrap to maintain consistent responsive patterns across the team.",
        "Keep this portfolio case study focused on verified responsibilities and the live public route."
      ],
      outcome:
        "A live school organization landing experience connected to a broader ERP project, demonstrating PHP/MySQL implementation, UI ownership, and programming leadership."
    }
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
