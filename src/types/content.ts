export interface Profile {
  name: string;
  shortName: string;
  positioning: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  githubUrl: string;
  portfolioRepositoryUrl: string;
  whatsappUrl: string;
  availability: string;
  languages: string[];
}

export interface ProjectCaseStudy {
  overview: string;
  businessContext: string;
  problem: string;
  responsibilities: string[];
  users: string[];
  workflows: string[];
  frontend: string;
  backend: string;
  data: string;
  authentication: string;
  deployment: string;
  challenges: string[];
  decisions: string[];
  outcome: string;
}

export interface Project {
  slug: string;
  name: string;
  shortName: string;
  type: string;
  role: string;
  summary: string;
  businessProblem: string;
  responsibility: string;
  technologies: string[];
  capabilities: string[];
  liveUrl: string;
  handoverUrl?: string;
  repositoryUrl?: string;
  accent: "cyan" | "blue" | "mint";
  caseStudy: ProjectCaseStudy;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  responsibilities: string[];
  kind: "operations" | "client" | "community";
}

export interface Education {
  school: string;
  program: string;
  period: string;
}

export interface SystemNode {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  evidenceLabel: string;
  evidenceHref: string;
  projectSlug?: string;
}

export interface CapabilityItem {
  name: string;
  proof: string;
  href: string;
}

export interface CapabilityGroup {
  id: string;
  title: string;
  description: string;
  items: CapabilityItem[];
}

export interface EvidenceItem {
  title: string;
  type: string;
  description: string;
  action: string;
  href: string;
  external?: boolean;
}

export interface OperationArtifact {
  id: string;
  title: string;
  category: string;
  description: string;
  demonstrates: string[];
  image: string;
  imageSmall: string;
  width: number;
  height: number;
  alt: string;
}
