import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

/**
 * Read-only access to the editorial opportunity library (1,250 imported
 * workbook topics grouped into 63 keyword clusters). Queries are always
 * paginated or aggregated — the full library is never sent to the browser.
 */
function client() {
  const url = process.env["VITE_SUPABASE_URL"] ?? process.env["SUPABASE_URL"] ?? "";
  const key =
    process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ??
    process.env["SUPABASE_PUBLISHABLE_KEY"] ??
    process.env["VITE_SUPABASE_ANON_KEY"] ??
    "";
  return createClient(url, key, { auth: { persistSession: false } });
}

export interface ClusterRow {
  id: number;
  category: string;
  primary_keyword: string;
  slug: string;
  pillar_title: string;
  topic_count: number;
}

export interface LibrarySummary {
  totalTopics: number;
  totalClusters: number;
  byCategory: { category: string; topics: number; clusters: number }[];
}

export const getLibrarySummary = createServerFn({ method: "GET" }).handler(
  async (): Promise<LibrarySummary> => {
    const supabase = client();
    const [{ count: totalTopics }, { data: clusters }] = await Promise.all([
      supabase.from("insight_topics").select("workbook_id", { count: "exact", head: true }),
      supabase.from("insight_clusters").select("category,topic_count"),
    ]);

    const rows = (clusters ?? []) as { category: string; topic_count: number }[];
    const map = new Map<string, { topics: number; clusters: number }>();
    for (const row of rows) {
      const entry = map.get(row.category) ?? { topics: 0, clusters: 0 };
      entry.topics += row.topic_count;
      entry.clusters += 1;
      map.set(row.category, entry);
    }

    return {
      totalTopics: totalTopics ?? 0,
      totalClusters: rows.length,
      byCategory: [...map.entries()].map(([category, v]) => ({ category, ...v })),
    };
  },
);

export const getClusters = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) =>
    z
      .object({
        category: z.string().optional(),
        limit: z.number().int().min(1).max(30).default(12),
        offset: z.number().int().min(0).default(0),
      })
      .parse(data ?? {}),
  )
  .handler(async ({ data }): Promise<{ clusters: ClusterRow[]; total: number }> => {
    const supabase = client();
    let query = supabase
      .from("insight_clusters")
      .select("id,category,primary_keyword,slug,pillar_title,topic_count", { count: "exact" })
      .order("topic_count", { ascending: false })
      .range(data.offset, data.offset + data.limit - 1);

    if (data.category) query = query.eq("category", data.category);

    const { data: rows, count } = await query;
    return { clusters: (rows ?? []) as ClusterRow[], total: count ?? 0 };
  });

export const searchTopicLibrary = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) =>
    z.object({ q: z.string().min(2).max(80) }).parse(data),
  )
  .handler(async ({ data }) => {
    const supabase = client();
    const term = data.q.replace(/[%,]/g, " ");
    const { data: rows } = await supabase
      .from("insight_topics")
      .select("workbook_id,h1,category,primary_keyword,editorial_decision,content_status")
      .ilike("h1", `%${term}%`)
      .limit(20);
    return rows ?? [];
  });
