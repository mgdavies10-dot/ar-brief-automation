import { contact, meta } from "./copy";

/** mailto: only — EA-WEB-001 prohibits form submission and data collection. */
export const mailto = `mailto:${meta.contactEmail}?subject=${encodeURIComponent(
  contact.mailtoSubject,
)}`;
