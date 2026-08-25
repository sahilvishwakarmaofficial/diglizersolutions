import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import type { InsightArticle } from "@/content/insights";

export function ArticleCard({ article }: { article: InsightArticle }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1">
      <p className="eyebrow text-muted-foreground">
        {article.subcategory} · {article.searchIntent}
      </p>
      <h3 className="mt-3 font-display text-lg font-bold leading-snug">
        <Link
          to="/insights/$category/$slug"
          params={{ category: article.category, slug: article.slug }}
          className="hover:text-primary"
        >
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
      <p className="mt-4 text-xs text-muted-foreground">
        {article.readingMinutes} min read · Updated{" "}
        {new Date(article.updatedAt).toLocaleDateString("en-IN", {
          month: "short",
          year: "numeric",
        })}
      </p>
      <Link
        to="/insights/$category/$slug"
        params={{ category: article.category, slug: article.slug }}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
      >
        Read guide <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
