"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, MessageSquare } from "lucide-react";
import { Initials } from "./ui";

export default function AnalysisFeed({ posts }) {
  const categories = ["All", ...new Set(posts.map((p) => p.category))];
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("recent");

  let list = posts.filter((p) => category === "All" || p.category === category);
  if (sort === "popular") list = [...list].sort((a, b) => b.comments - a.comments);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className="rounded-full border border-line bg-white/70 px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-green/30 aria-pressed:border-green aria-pressed:bg-green aria-pressed:text-white"
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex rounded-full border border-line bg-white/70 p-1 text-sm" role="group" aria-label="Sort">
          {[
            ["recent", "Recent"],
            ["popular", "Popular"],
          ].map(([v, l]) => (
            <button key={v} type="button" aria-pressed={sort === v} onClick={() => setSort(v)} className="rounded-full px-3.5 py-1.5 font-medium text-muted aria-pressed:bg-green-50 aria-pressed:text-green">
              {l}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-6 grid gap-4">
        {list.map((p) => (
          <li key={p.id}>
            <article className="glass group relative rounded-[24px] p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="rounded-full bg-green-50 px-2.5 py-1 text-green ring-1 ring-green/10">{p.category}</span>
                {p.symbol && <span className="rounded-full bg-white px-2.5 py-1 text-ink ring-1 ring-line">{p.symbol}</span>}
              </div>
              <h2 className="mt-3 font-display text-xl font-bold text-green group-hover:underline">
                <Link href={`/analysis/${p.id}`} className="after:absolute after:inset-0">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-2 line-clamp-2 break-words leading-relaxed text-muted">{p.body.join(" ")}</p>
              <div className="mt-5 flex items-center justify-between gap-4 text-sm text-muted">
                <span className="inline-flex items-center gap-2.5">
                  <Initials name={p.author} className="size-8 text-xs" />
                  <span>
                    <span className="font-semibold text-ink">{p.author}</span>, {p.date}
                  </span>
                </span>
                <span className="inline-flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5" aria-label="0 likes">
                    <Heart className="size-4" aria-hidden="true" /> 0
                  </span>
                  <span className="inline-flex items-center gap-1.5" aria-label={`${p.comments} comments`}>
                    <MessageSquare className="size-4" aria-hidden="true" /> {p.comments}
                  </span>
                </span>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
