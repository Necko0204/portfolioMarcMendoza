import { z } from "zod";

const trimmedString = (minimum, maximum, label) =>
  z.string().trim().min(minimum, `${label} is required.`).max(maximum, `${label} is too long.`);

export const contactSubmissionSchema = z
  .object({
    name: trimmedString(2, 80, "Name"),
    email: z.string().trim().email("Enter a valid email address.").max(254, "Email is too long."),
    company: z.string().trim().max(100, "Company is too long.").default(""),
    inquiryType: z.enum(["job-opportunity", "web-project", "operations-support", "collaboration", "other"]),
    projectContext: z.string().trim().max(160, "Budget or role context is too long.").default(""),
    message: trimmedString(20, 2000, "Message"),
    website: z.string().trim().max(200).default("")
  })
  .strict();

export const contactUpdateSchema = z
  .object({
    status: z.enum(["new", "contacted", "archived"]).optional(),
    internalNote: z.string().trim().max(1000, "Internal note is too long.").optional()
  })
  .strict()
  .refine((value) => value.status !== undefined || value.internalNote !== undefined, {
    message: "Provide a status or internal note."
  });

export function formatValidationError(error) {
  const fieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}
