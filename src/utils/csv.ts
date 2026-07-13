import type { ContactMessage } from "../types/api";

function escapeCsvCell(value: string): string {
  const safe = /^[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

export function exportMessagesToCsv(messages: ContactMessage[]): void {
  const headers = [
    "Created",
    "Status",
    "Name",
    "Email",
    "Company",
    "Inquiry Type",
    "Context",
    "Message",
    "Internal Note"
  ];
  const rows = messages.map((message) => [
    message.createdAt,
    message.status,
    message.name,
    message.email,
    message.company,
    message.inquiryType,
    message.projectContext,
    message.message,
    message.internalNote
  ]);
  const csv = [headers, ...rows].map((row) => row.map((cell) => escapeCsvCell(cell || "")).join(",")).join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `portfolio-contacts-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
