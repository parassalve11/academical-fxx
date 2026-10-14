import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Breadcrumbs, Container, CourseRail, PageSkeleton } from "@/components/ui";
import { getNews, news } from "@/data/content";

export function generateStaticParams() {
  return news.map((n) => ({ id: n.id }));
}

export async function generateMetadata({ params }) {
  const item = getNews((await params).id);
  return item ? { title: item.title, description: item.excerpt } : {};
}

async function NewsArticleContent({ params }) {
  const item = getNews((await params).id);
  if (!item) notFound();
  const more = news.filter((n) => n.id !== item.id).slice(0, 4);

  return (
    <>
      <section className="wash relative isolate overflow-hidden border-b border-line">
        <div className="grid-lines absolute inset-0 -z-10" aria-hidden="true" />
        <Container className="pb-12 pt-32 sm:pt-36">
          <div className="max-w-3xl">
            <Breadcrumbs items={[{ label: "News", href: "/news" }, { label: item.ticker }]} />
            <h1 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-green text-balance">{item.title}</h1>
            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              {item.author && <span className="font-semibold text-ink">{item.author}</span>}
              <span>{item.source}</span>
              {item.published && <time>{item.published}</time>}
              <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green ring-1 ring-green/10">Licensed</span>
            </p>
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-12 lg:grid-cols-12">
        <article className="lg:col-span-8">
          {item.image && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] ring-1 ring-line">
              <Image src={item.image} alt="" fill preload sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" />
            </div>
          )}
          <div className="mt-10 grid max-w-[68ch] gap-5 text-[1.0625rem] leading-[1.75] text-ink/85">
            {(item.paragraphs || [item.excerpt]).map((p, i) => (
              <p key={i} className={i === 0 ? "font-display text-xl font-semibold leading-snug text-green" : ""}>
                {p}
              </p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-6 text-sm">
            <span className="text-muted">Originally published by {item.source}.</span>
            {item.original && (
              <a href={item.original} target="_blank" rel="noopener noreferrer" className="link-quiet inline-flex items-center gap-1.5">
                View original article <ExternalLink className="size-3.5" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
          <Link href="/news" className="btn-glass mt-8 px-5 py-2.5 text-sm">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to all news
          </Link>
        </article>

        <div className="grid content-start gap-5 lg:col-span-4">
          <section aria-labelledby="more-title" className="glass overflow-hidden rounded-[28px]">
            <h2 id="more-title" className="border-b border-line px-5 py-4 font-display text-lg font-bold text-green">
              More from the markets
            </h2>
            <ul className="divide-y divide-line">
              {more.map((n) => (
                <li key={n.id}>
                  <Link href={`/news/${n.id}`} className="flex gap-3 px-5 py-3.5 hover:bg-white">
                    <span className="relative size-14 shrink-0 overflow-hidden rounded-xl ring-1 ring-line">
                      <Image src={n.image} alt="" fill sizes="56px" className="object-cover" />
                    </span>
                    <span className="min-w-0">
                      <span className="line-clamp-2 text-sm font-semibold leading-snug text-ink">{n.title}</span>
                      <span className="mt-1 block text-xs text-faint">
                        {n.ticker}, {n.ago}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <CourseRail title="Turn headlines into edge" />
        </div>
      </Container>
    </>
  );
}

// URL params are read inside Suspense so navigation can show the shell instantly.
export default function NewsArticle({ params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <NewsArticleContent params={params} />
    </Suspense>
  );
}
