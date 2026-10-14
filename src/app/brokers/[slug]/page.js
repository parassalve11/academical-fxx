import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, Check, ExternalLink, ShieldCheck, X } from "lucide-react";
import { BrokerLogo } from "@/components/Brokers";
import { Breadcrumbs, Container, CourseRail, Notice, Stars, PageSkeleton } from "@/components/ui";
import { brokers, getBroker } from "@/data/content";

export function generateStaticParams() {
  return brokers.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const b = getBroker((await params).slug);
  return b ? { title: `${b.name} review`, description: b.summary.slice(0, 160) } : {};
}

// The live data runs sentences together without spaces after full stops.
const sentences = (text) => text.replace(/([a-z)\]])\.([A-Z])/g, "$1. $2").split(/(?<=\.)\s+(?=[A-Z][^.]{0,40}:)/);

function VisitButton({ broker, className = "" }) {
  if (!broker.url) return null;
  return (
    <a href={broker.url} target="_blank" rel="sponsored noopener noreferrer" className={`btn-primary px-5 py-3 text-sm ${className}`}>
      Visit site <ExternalLink className="size-4" aria-hidden="true" />
      <span className="sr-only">(opens {broker.name} in a new tab)</span>
    </a>
  );
}

async function BrokerPageContent({ params }) {
  const b = getBroker((await params).slug);
  if (!b) notFound();
  const facts = [
    ["Account types", b.accountTypes],
    ["Minimum deposit", b.minDeposit],
    ["Spreads from", b.spreadsFrom],
    ["Max leverage", b.maxLeverage],
  ];

  return (
    <>
      <section className="wash relative isolate overflow-hidden border-b border-line">
        <div className="grid-lines absolute inset-0 -z-10" aria-hidden="true" />
        <Container className="pb-12 pt-32 sm:pt-36">
          <Breadcrumbs items={[{ label: "Brokers", href: "/brokers" }, { label: b.category }, { label: b.name }]} />
          <div className="flex flex-wrap items-center gap-5">
            <BrokerLogo broker={b} size="size-20" />
            <div className="flex-1">
              <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-none tracking-[-0.04em] text-green">{b.name}</h1>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                <Stars value={b.rating} />
                <span className="tabular font-semibold text-ink">{b.rating.toFixed(1)}</span> / 5
                <span className="ml-2 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green ring-1 ring-green/10">{b.category}</span>
              </p>
            </div>
            <VisitButton broker={b} />
          </div>
        </Container>
      </section>

      <Container className="grid gap-10 py-12 lg:grid-cols-12">
        <div className="grid content-start gap-10 lg:col-span-8">
          <section aria-labelledby="facts-title">
            <h2 id="facts-title" className="font-display text-2xl font-bold text-green">Key facts</h2>
            <dl className="glass mt-5 grid overflow-hidden rounded-[24px] sm:grid-cols-2">
              {facts.map(([k, v], i) => (
                <div key={k} className={`p-5 ${i > 0 ? "border-t border-line" : ""} ${i === 1 ? "sm:border-t-0" : ""} ${i % 2 ? "sm:border-l sm:border-line" : ""}`}>
                  <dt className="text-sm text-muted">{k}</dt>
                  <dd className="mt-1 font-semibold text-ink">{v}</dd>
                </div>
              ))}
              <div className="border-t border-line p-5 sm:col-span-2">
                <dt className="text-sm text-muted">Regulators</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {b.regulators.map((r) => (
                    <span key={r} className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green ring-1 ring-green/10">
                      <ShieldCheck className="size-3.5" aria-hidden="true" /> {r}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="about-title">
            <h2 id="about-title" className="font-display text-2xl font-bold text-green">About {b.name}</h2>
            <div className="mt-4 grid max-w-[68ch] gap-4 leading-[1.7] text-muted">
              {sentences(b.about).map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="pc-title">
            <h2 id="pc-title" className="font-display text-2xl font-bold text-green">Pros &amp; cons</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="glass rounded-[24px] p-5">
                <h3 className="font-semibold text-up">Pros</h3>
                <ul className="mt-3 grid gap-2.5">
                  {b.pros.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[0.9375rem] leading-snug text-ink">
                      <Check className="mt-0.5 size-4 shrink-0 text-up" aria-hidden="true" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass rounded-[24px] p-5">
                <h3 className="font-semibold text-down">Cons</h3>
                <ul className="mt-3 grid gap-2.5">
                  {b.cons.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[0.9375rem] leading-snug text-ink">
                      <X className="mt-0.5 size-4 shrink-0 text-down" aria-hidden="true" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <Notice>
            This overview is informational only and not financial advice or an endorsement of {b.name}. Verify the broker&apos;s current regulatory status and terms on their official website before trading.
          </Notice>
          <Link href="/brokers" className="link-quiet inline-flex items-center gap-1.5 text-sm">
            <ArrowLeft className="size-4" aria-hidden="true" /> Compare brokers
          </Link>
        </div>

        <div className="lg:col-span-4">
          <div className="grid gap-5 lg:sticky lg:top-24">
            <section aria-labelledby="glance-title" className="glass-thick rounded-[28px] p-6">
              <h2 id="glance-title" className="font-display text-lg font-bold text-green">At a glance</h2>
              <dl className="mt-3 divide-y divide-line text-sm">
                {[
                  ["Category", b.category],
                  ["Rating", `${b.rating.toFixed(1)} / 5`],
                  ["Min. deposit", b.minDeposit],
                  ["Regulated by", b.regulators.join(", ")],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-right font-semibold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <VisitButton broker={b} className="mt-4 w-full" />
            </section>
            <CourseRail title="Build the skills first" />
          </div>
        </div>
      </Container>
    </>
  );
}

// URL params are read inside Suspense so navigation can show the shell instantly.
export default function BrokerPage({ params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <BrokerPageContent params={params} />
    </Suspense>
  );
}
