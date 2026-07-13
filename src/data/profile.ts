import type { Education, Experience, Profile } from "../types/content";

const phone = import.meta.env.VITE_PHONE_NUMBER || "+63 9602161734";
const phoneDigits = phone.replace(/\D/g, "");

export const profile: Profile = {
  name: "Marc Angelo Mendoza",
  shortName: "Marc Mendoza",
  positioning: "Full-stack systems builder with operations intelligence.",
  title: "Full-stack systems builder",
  summary:
    "I turn complicated operations into reliable digital products by connecting clear interfaces, practical backend logic, structured data, deployment, and documentation.",
  location: import.meta.env.VITE_LOCATION || "Tanza, Cavite",
  email: import.meta.env.VITE_CONTACT_EMAIL || "mendoza.marcangelo28@gmail.com",
  phone,
  githubUrl: "https://github.com/Necko0204",
  portfolioRepositoryUrl: "https://github.com/Necko0204/portfolioMarcMendoza",
  whatsappUrl: `https://wa.me/${phoneDigits}`,
  availability: "Available for web development, backend/admin systems, IT, and operations support roles",
  languages: ["English", "Filipino"]
};

export const experiences: Experience[] = [
  {
    role: "Executive Virtual Assistant",
    company: "Tochigami, LLC",
    location: "Honolulu, Hawaii",
    period: "June 2025 - June 2026",
    summary:
      "Combined administrative reliability, customer support, coordination, and technical project contribution in a client-facing environment.",
    responsibilities: [
      "Supported daily operations, client communication, coordination, and workflow execution.",
      "Contributed to website and technical project work using PHP, ReactJS, and supporting tools.",
      "Applied documentation and follow-up discipline to technical and non-technical work."
    ],
    kind: "operations"
  },
  {
    role: "Appointment Setter (Part-Time, Contractual)",
    company: "Direct Client, Freelance",
    location: "Florida, USA",
    period: "January 2026 - March 2026",
    summary:
      "Managed structured outreach, qualification, follow-up, and appointment-setting workflows for a direct client.",
    responsibilities: [
      "Generated and qualified leads through cold outreach.",
      "Managed prospect follow-ups and workflow status in GoHighLevel and ClickUp."
    ],
    kind: "client"
  },
  {
    role: "Social Media & Community Manager (Freelance)",
    company: "Direct Client",
    location: "United Kingdom",
    period: "March 2026 - June 2026",
    summary:
      "Built organized engagement and community-management routines for early-stage social accounts.",
    responsibilities: [
      "Managed social media accounts, content interaction, and community responses.",
      "Supported visibility through platform-specific engagement and growth routines."
    ],
    kind: "community"
  }
];

export const education: Education[] = [
  {
    school: "National College of Science and Technology",
    program: "Bachelor of Science in Information Technology",
    period: "2021 - 2025"
  },
  {
    school: "Notre Dame of Trece Martires",
    program: "Senior High School",
    period: "2019 - 2021"
  },
  {
    school: "Chanceteam Christian Academy",
    program: "Junior High School & Elementary School",
    period: "2009 - 2016"
  }
];

export const additionalFoundations = [
  "PHP and SQL at an advanced academic and practical level",
  "Python and Java at an intermediate foundation level",
  "C# at a beginner foundation level",
  "Computer hardware and software installation, configuration, and troubleshooting",
  "Microsoft Word, Excel, PowerPoint, and Outlook"
];
