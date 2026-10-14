import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarClock, ChartLine, MessageSquare } from "lucide-react";
import { SectionHeading } from "./Brand";
import { analysis, news } from "@/data/site";

export function News() {
  const [lead, ...rest] = news;
  return (
    <section aria-labelledby="news-title" className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        id="news-title"
        title="Latest financial news"
        intro="Stay on top of the moves that matter, curated from across the markets."
        action={
          <Link href="/news" className="link-quiet inline-flex items-center gap-1.5">
            All news <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        }
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-12">
        <article className="group relative isolate flex min-h-[460px] flex-col justify-end overflow-hidden rounded-[32px] lg:col-span-7">
          <Image src={lead.image} alt="" fill sizes="(min-width: 1024px) 720px, 100vw" className="-z-10 object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-green/60 via-green/10 to-transparent" />
          <div className="glass m-3 rounded-[24px] p-6 sm:m-4 sm:p-7">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-green-50 ring-1 ring-green/10 px-2.5 py-0.5 text-xs font-semibold text-green">{lead.ticker}</span>
              <span className="text-muted">{lead.ago}</span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-green sm:text-[1.75rem]">
              <Link href={`/news/${lead.id}`} className="after:absolute after:inset-0">{lead.title}</Link>
            </h3>
            <p className="mt-2 line-clamp-2 leading-relaxed text-muted">{lead.excerpt}</p>
          </div>
        </article>

        <ul className="glass divide-y divide-line rounded-[32px] p-2 lg:col-span-5">
          {rest.map((item) => (
            <li key={item.id}>
              <Link href={`/news/${item.id}`} className="flex gap-4 rounded-[22px] p-3 transition-colors hover:bg-green-50">
                <span className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-white/5">
                  <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="min-w-0">
                  <span className="line-clamp-2 font-semibold leading-snug text-green">{item.title}</span>
                  <span className="mt-1.5 flex gap-3 text-xs">
                    <span className="font-semibold text-green">{item.ticker}</span>
                    <span className="text-faint">{item.ago}</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Community() {
  return (
    <section aria-labelledby="community-title" className="mx-auto max-w-[1240px] px-4 pb-24 sm:px-6 sm:pb-32">
      <div className="grid gap-5 lg:grid-cols-12">
        <div className="glass rounded-[32px] p-6 sm:p-9 lg:col-span-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="community-title" className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-tight tracking-[-0.025em] text-green">
                Analysis &amp; Opinion
              </h2>
              <p className="mt-2 max-w-md text-muted">Market views from the Academiya trading community. Read the latest takes and share your own.</p>
            </div>
            <Link href="/analysis" className="link-quiet inline-flex items-center gap-1.5 text-sm">
              Show more analysis <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-7 divide-y divide-line border-t border-line">
            {analysis.map((post) => (
              <li key={post.id}>
                <Link href={`/analysis/${post.id}`} className="group flex items-center justify-between gap-4 py-4">
                  <span>
                    <span className="block font-semibold text-green group-hover:underline">{post.title}</span>
                    <span className="mt-1 block text-sm text-faint">
                      By {post.author}, {post.date}
                    </span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted" aria-label={`${post.comments} comments`}>
                    <MessageSquare className="size-4" aria-hidden="true" /> {post.comments}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-5 lg:col-span-5">
          {[
            { href: "/markets", icon: ChartLine, title: "Live markets", body: "Track global indices, forex and commodities with up-to-the-minute quotes and charts.", cta: "View markets" },
            { href: "/calendar", icon: CalendarClock, title: "Economic calendar", body: "Plan around high-impact events: releases, central-bank decisions and data prints.", cta: "Open calendar" },
          ].map(({ href, icon: Icon, title, body, cta }) => (
            <Link key={href} href={href} className="glass group flex flex-col rounded-[28px] p-7 transition-colors hover:bg-white">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-green-50 text-green ring-1 ring-green/10">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="mt-5 font-display text-xl font-bold text-green">{title}</span>
              <span className="mt-2 leading-relaxed text-muted">{body}</span>
              <span className="link-quiet mt-5 inline-flex items-center gap-1.5 text-sm">
                {cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
