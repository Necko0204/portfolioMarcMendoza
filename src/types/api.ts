export type ContactStatus = "new" | "contacted" | "archived";

export interface ContactSubmission {
  name: string;
  email: string;
  company: string;
  inquiryType: string;
  projectContext: string;
  message: string;
  website: string;
}

export interface ContactMessage extends Omit<ContactSubmission, "website"> {
  id: string;
  status: ContactStatus;
  internalNote: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactListResponse {
  ok: true;
  messages: ContactMessage[];
  nextCursor: string | null;
  counts: {
    total: number;
    new: number;
    contacted: number;
    archived: number;
  };
}

export interface ContactMutationResponse {
  ok: true;
  message?: ContactMessage;
}

export interface PublicContactResponse {
  ok: true;
  message: string;
}

export interface ApiErrorResponse {
  error: string;
  fieldErrors?: Record<string, string>;
}
