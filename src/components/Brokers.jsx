"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Stars } from "./ui";

export function BrokerLogo({ broker, size = "size-14" }) {
  return (
    <span className={`relative ${size} shrink-0 overflow-hidden rounded-2xl bg-white ring-1 ring-line`}>
      {broker.logo && <Image src={broker.logo} alt={`${broker.name} logo`} fill sizes="64px" className="object-contain p-1.5" />}
    </span>
  );
}

export function BrokerCard({ broker }) {
  return (
    <article className="glass group relative flex h-full flex-col rounded-[24px] p-5">
      <div className="flex items-start justify-between gap-3">
        <BrokerLogo broker={broker} />
        <span className="inline-flex items-center gap-1.5 text-sm">
          <Stars value={broker.rating} size="size-3.5" />
          <span className="tabular font-semibold text-ink">{broker.rating.toFixed(1)}</span>
        </span>
      </div>
      <h3 className="mt-4 font-display text-xl font-bold text-green">
        <Link href={`/brokers/${broker.slug}`} className="after:absolute after:inset-0">
          {broker.name}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-[0.9375rem] leading-relaxed text-muted">{broker.summary}</p>
      <div className="mt-auto pt-5">
        <ul className="flex flex-wrap items-center gap-1.5 border-t border-line pt-4" aria-label="Regulators">
          <ShieldCheck className="size-4 text-up" aria-hidden="true" />
          {broker.regulators.map((r) => (
            <li key={r} className="rounded-full bg-green-50 px-2 py-0.5 text-[0.6875rem] font-semibold text-green ring-1 ring-green/10">
              {r}
            </li>
          ))}
        </ul>
        <p className="mt-3 flex items-center justify-between text-sm">
          <span className="text-muted">
            Min. deposit <span className="tabular font-semibold text-ink">{broker.minDeposit}</span>
          </span>
          <span className="link-quiet inline-flex items-center gap-1">
            Details <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </span>
        </p>
      </div>
    </article>
  );
}

export function BrokerDirectory({ brokers, categories }) {
  const [tab, setTab] = useState("all");
  const shown = categories.filter((c) => tab === "all" || tab === c);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by broker type">
        {[["all", "All brokers"], ...categories.map((c) => [c, c])].map(([v, l]) => {
          const count = v === "all" ? brokers.length : brokers.filter((b) => b.category === v).length;
          return (
            <button
              key={v}
              type="button"
              aria-pressed={tab === v}
              onClick={() => setTab(v)}
              className="rounded-full border border-line bg-white/70 px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-green/30 aria-pressed:border-green aria-pressed:bg-green aria-pressed:text-white"
            >
              {l} <span className="tabular opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {shown.map((cat) => {
        const list = brokers.filter((b) => b.category === cat);
        if (!list.length && tab === "all") return null;
        return (
          <section key={cat} aria-labelledby={`cat-${cat}`} className="mt-10">
            <div className="flex items-end justify-between">
              <h2 id={`cat-${cat}`} className="font-display text-2xl font-bold tracking-tight text-green">
                {cat}
              </h2>
              <p className="text-sm text-muted">
                {list.length} {list.length === 1 ? "broker" : "brokers"}
              </p>
            </div>
            {list.length ? (
              <ul className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {list.map((b) => (
                  <li key={b.slug}>
                    <BrokerCard broker={b} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="glass mt-5 rounded-[24px] px-6 py-10 text-center text-muted">No {cat.toLowerCase()} are listed yet. Check back soon.</p>
            )}
          </section>
        );
      })}
    </div>
  );
}
