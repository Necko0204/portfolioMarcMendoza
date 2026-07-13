import type { OperationArtifact } from "../types/content";

export const operationArtifacts: OperationArtifact[] = [
  {
    id: "inbox",
    title: "Inbox command center",
    category: "Inbox triage",
    description:
      "A structured daily email-management view covering priority, SLA, response time, status, next action, and filing guidance.",
    demonstrates: ["Priority triage", "SLA awareness", "Response tracking", "Next-action ownership"],
    image: "/assets/operations/inbox-command-center.webp",
    imageSmall: "/assets/operations/inbox-command-center-800.webp",
    width: 1736,
    height: 554,
    alt: "Inbox command center spreadsheet with received date, sender, category, priority, SLA, status, and next action columns"
  },
  {
    id: "calendar",
    title: "Calendar planner",
    category: "Calendar preparation",
    description:
      "Meeting coordination with stakeholders, preparation needs, confirmation states, follow-up ownership, and the skill demonstrated.",
    demonstrates: ["Agenda preparation", "Meeting confirmation", "Stakeholder coordination", "Follow-up planning"],
    image: "/assets/operations/calendar-planner.webp",
    imageSmall: "/assets/operations/calendar-planner-800.webp",
    width: 1488,
    height: 434,
    alt: "Calendar planner spreadsheet with date, time, meeting, stakeholder, preparation, status, and follow-up columns"
  },
  {
    id: "tasks",
    title: "Task control",
    category: "Task tracking",
    description:
      "A practical task register connecting workstream, owner, priority, deadline, calculated days left, blockers, and completion proof.",
    demonstrates: ["Deadline control", "Blocker visibility", "Priority management", "Proof of completion"],
    image: "/assets/operations/task-control.webp",
    imageSmall: "/assets/operations/task-control-800.webp",
    width: 1480,
    height: 526,
    alt: "Task control spreadsheet with workstream, owner, priority, due date, days left, status, blockers, and proof columns"
  },
  {
    id: "follow-up",
    title: "Lead follow-up",
    category: "Client follow-up",
    description:
      "A compact CRM-style follow-up system for source, last contact, next follow-up, ownership, status, outcome, and next message.",
    demonstrates: ["Appointment setting", "CRM hygiene", "Next-message planning", "Outcome tracking"],
    image: "/assets/operations/follow-ups.webp",
    imageSmall: "/assets/operations/follow-ups-800.webp",
    width: 1320,
    height: 406,
    alt: "Follow-up spreadsheet with contacts, sources, last contact, next follow-up, status, outcome, and next message"
  },
  {
    id: "sop",
    title: "SOP and handover readiness",
    category: "Process documentation",
    description:
      "A recurring-process checklist connecting frequency, priority, owner, status, evidence, and handover notes.",
    demonstrates: ["SOP discipline", "Security awareness", "Recurring reviews", "Handover readiness"],
    image: "/assets/operations/sop-checklist.webp",
    imageSmall: "/assets/operations/sop-checklist-800.webp",
    width: 1288,
    height: 434,
    alt: "SOP checklist spreadsheet with process area, checklist item, frequency, priority, owner, status, evidence, and notes"
  },
  {
    id: "dashboard",
    title: "Weekly operations dashboard",
    category: "Weekly reporting",
    description:
      "A formula-driven summary that turns tracker records into a weekly view of inbox, task, SLA, response, and meeting activity.",
    demonstrates: ["Formula-based reporting", "Operational review", "Exception visibility", "Simple charts"],
    image: "/assets/operations/dashboard.webp",
    imageSmall: "/assets/operations/dashboard-800.webp",
    width: 1056,
    height: 766,
    alt: "Weekly operations dashboard spreadsheet showing report dates, inbox and task metrics, summary tables, and charts"
  }
];

export const operationWorkflows = [
  {
    title: "Inbox triage",
    description: "Sort messages by urgency, assign an SLA, record the next action, and keep response ownership visible."
  },
  {
    title: "Calendar preparation",
    description: "Confirm the meeting, collect context, prepare materials, and make the follow-up owner explicit."
  },
  {
    title: "Task and lead control",
    description: "Track due dates, blockers, stages, next messages, and proof instead of relying on memory."
  },
  {
    title: "Reporting and handover",
    description: "Summarize the week, document recurring routines, and leave a clear operational trail for the next owner."
  }
];
