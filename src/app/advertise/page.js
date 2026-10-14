import Link from "next/link";
import { BarChart3, Globe2, ShieldCheck } from "lucide-react";
import { AdvertiseForm } from "@/components/forms";
import { Container, Notice, PageHero, SectionTitle } from "@/components/ui";

export const metadata = {
  title: "Advertise",
  description: "Put your brand in front of an engaged audience of traders and market learners — across courses, live markets, financial news and the economic calendar.",
};

const placements = [
  { key: "homeLeaderboard", name: "Home leaderboard", w: 970, h: 250, where: "Home", body: "Billboard banner at the top of the home page, above the fold." },
  { key: "homeInfeed", name: "Home in-feed", w: 728, h: 90, where: "Home", body: "Native banner set within the home page content flow." },
  { key: "newsSidebar", name: "News sidebar", w: 300, h: 250, where: "News", body: "Medium-rectangle unit in the financial-news sidebar." },
  { key: "marketsRail", name: "Markets rail", w: 300, h: 250, where: "Markets", body: "Sidebar unit alongside live market data and quotes." },
  { key: "articleFooter", name: "Article footer", w: 728, h: 90, where: "Article", body: "Leaderboard banner at the end of every news article." },
];

const reasons = [
  { icon: BarChart3, title: "Engaged trading-education audience", body: "Learners and active traders who come to study forex, stocks and crypto — a focused, high-intent audience, not passing traffic." },
  { icon: Globe2, title: "Forex, stocks and crypto coverage", body: "One hub spanning live markets, financial news and the economic calendar — reach traders across every asset class we cover." },
  { icon: ShieldCheck, title: "Brand-safe, conflict-free placements", body: "Clearly labelled sponsor slots beside credible, independent content. No misleading creatives, no clutter." },
];

const steps = [
  { title: "Pick your placements", body: "Choose from home, news, markets and article slots — from a premium home leaderboard to a medium rectangle in the news sidebar." },
  { title: "Set your budget and cap", body: "Flexible CPM rate cards priced by placement and demand. Set a monthly budget and cap, and we pace delivery to fit." },
  { title: "We handle the rest", body: "We take care of placement, serving and reporting — you get transparent impression and click reporting for every campaign." },
];

export default function AdvertisePage() {
  return (
    <>
      <PageHero
        size="lg"
        title="Reach traders where they learn."
        intro="Put your brand in front of an engaged audience of traders and market learners — across courses, live markets, financial news and the economic calendar."
        aside={
          <dl className="glass-thick grid gap-0 divide-y divide-line rounded-[28px] p-2">
            {[
              ["Audience", "Traders and market learners"],
              ["Coverage", "Forex, stocks, crypto"],
              ["Placements", "Brand-safe and conflict-free"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4 px-4 py-4">
                <dt className="text-sm text-muted">{k}</dt>
                <dd className="text-right font-semibold text-green">{v}</dd>
              </div>
            ))}
            <p className="px-4 py-4 text-sm leading-relaxed text-muted">Flexible CPM rate cards, a monthly budget you control, and transparent impression and click reporting.</p>
          </dl>
        }
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="#enquire" className="btn-primary px-6 py-3.5 text-[0.9375rem]">
            Start a conversation
          </Link>
          <Link href="#placements" className="btn-glass px-6 py-3.5 text-[0.9375rem]">
            See placements
          </Link>
        </div>
      </PageHero>

      <Container className="py-16 sm:py-20">
        <SectionTitle title="An audience that's here to trade" intro="We don't chase vanity numbers. Our value is a focused, high-intent audience and placements you can trust your brand beside." />
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {reasons.map(({ icon: Icon, title, body }) => (
            <li key={title} className="glass rounded-[24px] p-6">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-green-50 text-green ring-1 ring-green/10">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-4 font-display text-lg font-bold text-green">{title}</p>
              <p className="mt-2 leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </Container>

      <section id="placements" aria-labelledby="inv-title" className="scroll-mt-24 border-y border-line bg-green-50/50">
        <Container className="py-16 sm:py-20">
          <SectionTitle id="inv-title" title="Where your ad appears" intro="Clearly labelled sponsor slots across the highest-traffic surfaces of the hub. Every placement is responsive and served through our own ad server." />
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {placements.map((p) => (
              <li key={p.key} className={`glass flex flex-col rounded-[24px] p-5 ${p.w > 900 ? "md:col-span-2 lg:col-span-2" : ""}`}>
                {/* Drawn to scale, so the format's shape is visible at a glance. */}
                <div className="flex min-h-[150px] items-center justify-center rounded-2xl bg-white/80 p-4 ring-1 ring-line">
                  <div
                    className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-green/35 bg-green-50 text-xs font-semibold text-green/70"
                    style={{ aspectRatio: `${p.w} / ${p.h}`, maxWidth: p.w > 400 ? "100%" : `${Math.round((p.w / 728) * 100) + 30}%` }}
                  >
                    <span className="tabular">
                      {p.w}×{p.h}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <p className="font-display text-lg font-bold text-green">{p.name}</p>
                  <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-muted ring-1 ring-line">{p.where}</span>
                </div>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <SectionTitle title="Simple, flexible and transparent" intro="No opaque long-term lock-ins. Tell us your goals and we'll put together a proposal." />
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="glass rounded-[24px] p-6">
              <span className="tabular inline-flex size-9 items-center justify-center rounded-full bg-green font-semibold text-white">{i + 1}</span>
              <p className="mt-4 font-display text-lg font-bold text-green">{s.title}</p>
              <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <Notice className="mt-6">Pricing is a custom CPM rate card set by placement and budget — we don&apos;t publish fixed prices. Share your goals below and we&apos;ll send a tailored proposal.</Notice>

        <section id="enquire" aria-labelledby="enq-title" className="glass-thick mt-16 scroll-mt-24 grid overflow-hidden rounded-[36px] lg:grid-cols-12">
          <div className="p-7 sm:p-10 lg:col-span-4">
            <h2 id="enq-title" className="font-display text-[clamp(1.9rem,3.5vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em] text-green">
              Enquire about advertising
            </h2>
            <p className="mt-4 leading-relaxed text-muted">Tell us about your brand and campaign, and we&apos;ll come back with placement availability and a custom rate card.</p>
          </div>
          <div className="border-t border-line p-7 sm:p-10 lg:col-span-8 lg:border-l lg:border-t-0">
            <AdvertiseForm placements={placements} />
          </div>
        </section>
      </Container>
    </>
  );
}
