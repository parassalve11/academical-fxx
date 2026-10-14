import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container, CourseRail, PageHero } from "@/components/ui";
import { news, newsUpdated, newsWire } from "@/data/content";

export const metadata = {
  title: "Financial news",
  description: "The moves that matter — curated from across forex, stocks and crypto, and readable in full right here.",
};

function Ticker({ children }) {
  return <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green ring-1 ring-green/10">{children}</span>;
}

export default function NewsPage() {
  const [lead, ...rest] = news;
  return (
    <>
      <PageHero title="Financial news" intro="The moves that matter — curated from across forex, stocks and crypto, and readable in full right here.">
        {newsUpdated && <p className="mt-4 text-sm text-faint">Updated {newsUpdated}</p>}
      </PageHero>

      <Container className="grid gap-10 py-14 sm:py-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <article className="glass group relative overflow-hidden rounded-[32px] sm:grid sm:grid-cols-2">
            <div className="relative aspect-[16/10] sm:aspect-auto sm:min-h-[340px]">
              <Image src={lead.image} alt="" fill preload sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col gap-3 p-6 sm:p-8">
              <p className="text-sm font-semibold text-green">Top story</p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                <Ticker>{lead.ticker}</Ticker>
                <span>{lead.ago}</span>
              </div>
              <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-green sm:text-[1.75rem]">
                <Link href={`/news/${lead.id}`} className="after:absolute after:inset-0">
                  {lead.title}
                </Link>
              </h2>
              <p className="line-clamp-4 leading-relaxed text-muted">{lead.excerpt}</p>
              <span className="link-quiet mt-auto inline-flex items-center gap-1.5 pt-2 text-sm">
                Read the full story <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </div>
          </article>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {rest.map((n) => (
              <li key={n.id}>
                <article className="glass group relative flex h-full gap-4 rounded-[24px] p-4">
                  <span className="relative size-20 shrink-0 overflow-hidden rounded-2xl ring-1 ring-line">
                    <Image src={n.image} alt="" fill sizes="80px" className="object-cover" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <Ticker>{n.ticker}</Ticker>
                      <span>{n.ago}</span>
                    </div>
                    <h3 className="mt-2 line-clamp-3 font-semibold leading-snug text-ink group-hover:text-green">
                      <Link href={`/news/${n.id}`} className="after:absolute after:inset-0">
                        {n.title}
                      </Link>
                    </h3>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid content-start gap-5 lg:col-span-4">
          <section aria-labelledby="wire-title" className="glass overflow-hidden rounded-[28px]">
            <div className="border-b border-line px-5 py-4">
              <h2 id="wire-title" className="font-display text-lg font-bold text-green">More headlines</h2>
              <p className="text-sm text-muted">From Investing.com and Reuters</p>
            </div>
            <ul className="divide-y divide-line">
              {newsWire.map((w) => (
                <li key={w.title}>
                  <a href={w.href || "#"} target="_blank" rel="noopener noreferrer" className="group flex gap-3 px-5 py-3.5 hover:bg-white">
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold leading-snug text-ink group-hover:text-green">{w.title}</span>
                      <span className="mt-1 block text-xs text-faint">
                        {w.source}, {w.ago}
                      </span>
                    </span>
                    <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-faint" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <CourseRail title="Turn headlines into edge" note="Learn what moves price before it moves." />
        </div>
      </Container>
    </>
  );
}
