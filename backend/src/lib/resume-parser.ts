import mammoth from "mammoth";

export type ResumeContent =
  | { kind: "pdf"; base64: string }
  | { kind: "text"; text: string };

export class ResumeParseError extends Error {}

const MAX_BYTES = 8 * 1024 * 1024;

export async function parseResumeFile(file: File): Promise<ResumeContent> {
  if (file.size > MAX_BYTES) throw new ResumeParseError("File is too large (max 8 MB).");
  const name = file.name.toLowerCase();
  const buf = Buffer.from(await file.arrayBuffer());

  if (name.endsWith(".pdf") || file.type === "application/pdf") {
    return { kind: "pdf", base64: buf.toString("base64") };
  }
  if (name.endsWith(".docx")) {
    const { value } = await mammoth.extractRawText({ buffer: buf });
    if (!value.trim()) throw new ResumeParseError("Couldn't read any text from that Word file.");
    return { kind: "text", text: value };
  }
  if (name.endsWith(".txt") || name.endsWith(".md") || file.type.startsWith("text/")) {
    return { kind: "text", text: buf.toString("utf8") };
  }
  throw new ResumeParseError("Unsupported file type. Upload a PDF, DOCX, or TXT file.");
}
