import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import type { InsightArticle } from "@/content/insights";
import { getInsightImage } from "@/content/insights/media";

export function ArticleCard({ article }: { article: InsightArticle }) {
  const image = getInsightImage(article.slug);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-transform hover:-translate-y-1">
      {image && (
        <Link
          to="/insights/$category/$slug"
          params={{ category: article.category, slug: article.slug }}
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            loading="lazy"
            className="aspect-[16/9] w-full object-cover"
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col p-6">
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
      </div>
    </article>
  );
}
