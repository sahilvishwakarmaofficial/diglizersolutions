import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Server-side handlers for public visitor uploads and career applications.
 * Browser code never writes to these tables/buckets directly.
 */

const opt = (max: number) =>
  z.string().trim().max(max).nullish().transform((v) => (v ? v : null));

const careerSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(255),
  phone: opt(40),
  role: z.string().trim().min(1).max(200),
  portfolio_url: opt(500),
  location: opt(200),
  work_type: opt(100),
  linkedin_url: opt(500),
  experience: opt(200),
  message: opt(4000),
});

export const submitCareerApplication = createServerFn({ method: "POST" })
  .validator((input: unknown) => careerSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("career_applications").insert(data);
    if (error) {
      console.error("[careers] insert failed", error.message);
      return { ok: false as const };
    }
    return { ok: true as const };
  });

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const ALLOWED = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".zip", ".txt"];

export const uploadEnquiryAttachment = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    if (!(input instanceof FormData)) throw new Error("Invalid upload");
    const file = input.get("file");
    if (!(file instanceof File)) throw new Error("Invalid upload");
    return file;
  })
  .handler(async ({ data: file }) => {
    const m = /\.[a-z0-9]+$/i.exec(file.name);
    const ext = (m?.[0] ?? "").toLowerCase();
    if (!ALLOWED.includes(ext) || file.size === 0 || file.size > MAX_UPLOAD_BYTES) {
      return { ok: false as const };
    }
    const path = `${Date.now()}-${crypto.randomUUID()}${ext}`;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.storage
      .from("enquiry-uploads")
      .upload(path, file, file.type ? { upsert: false, contentType: file.type } : { upsert: false });
    if (error) {
      console.error("[uploads] failed", error.message);
      return { ok: false as const };
    }
    return { ok: true as const, path };
  });
