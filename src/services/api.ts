import type {
  ApiErrorResponse,
  ContactListResponse,
  ContactMessage,
  ContactMutationResponse,
  ContactStatus,
  ContactSubmission,
  PublicContactResponse
} from "../types/api";

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  fieldErrors?: Record<string, string>;

  constructor(message: string, status: number, fieldErrors?: Record<string, string>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

async function requestJson<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers
    }
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? ((await response.json()) as T | ApiErrorResponse)
    : ({ error: "The service returned an unexpected response." } satisfies ApiErrorResponse);

  if (!response.ok) {
    const error = payload as ApiErrorResponse;
    throw new ApiError(error.error || "The request could not be completed.", response.status, error.fieldErrors);
  }

  return payload as T;
}

function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}

export function submitContact(payload: ContactSubmission): Promise<PublicContactResponse> {
  return requestJson<PublicContactResponse>("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function listAdminContacts(
  token: string,
  options: { cursor?: string; limit?: number } = {}
): Promise<ContactListResponse> {
  const params = new URLSearchParams();
  if (options.cursor) params.set("cursor", options.cursor);
  params.set("limit", String(options.limit || 30));
  return requestJson<ContactListResponse>(`/api/admin/contacts?${params.toString()}`, {
    headers: authHeaders(token)
  });
}

export function updateAdminContact(
  token: string,
  id: string,
  updates: { status?: ContactStatus; internalNote?: string }
): Promise<ContactMutationResponse> {
  return requestJson<ContactMutationResponse>(`/api/admin/contacts/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(updates)
  });
}

export function deleteAdminContact(token: string, id: string): Promise<ContactMutationResponse> {
  return requestJson<ContactMutationResponse>(`/api/admin/contacts/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: authHeaders(token)
  });
}

export function mergeUpdatedMessage(messages: ContactMessage[], updated: ContactMessage): ContactMessage[] {
  return messages.map((message) => (message.id === updated.id ? updated : message));
}
