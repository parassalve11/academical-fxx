import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, PageHero } from "@/components/ui";
import { JoinCta } from "@/components/Footer";
import { about } from "@/data/content";

export const metadata = {
  title: "About Academiya — Our story, mission & faculty",
  description: about.intro,
};

const facts = [
  { value: "3", label: "Markets covered", body: "Forex, stocks and crypto" },
  { value: "100%", label: "Practitioner-led", body: "Every course is taught by people who trade" },
  { value: "1", label: "Trusted hub", body: "Learn and apply in one place" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero size="lg" title="Trading education, built to be trusted." intro={about.intro}>
        <p className="mt-6 font-script text-4xl font-bold text-plum">Learn to Lead.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/courses" className="btn-primary px-6 py-3.5 text-[0.9375rem]">
            Explore courses <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link href="/contact" className="btn-glass px-6 py-3.5 text-[0.9375rem]">
            Talk to us
          </Link>
        </div>
      </PageHero>

      <Container className="py-16 sm:py-20">
        <ul className="grid overflow-hidden rounded-[28px] bg-green text-white sm:grid-cols-3">
          {facts.map((f, i) => (
            <li key={f.label} className={`p-7 ${i ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""}`}>
              <p className="tabular font-display text-5xl font-extrabold tracking-tight">{f.value}</p>
              <p className="mt-2 font-semibold">{f.label}</p>
              <p className="mt-1 text-sm text-white/70">{f.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid items-center gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[36px]">
              <Image src="/images/stock/community-table.jpg" alt="A group of learners working on laptops around a shared table" fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
            </div>
            <p className="glass absolute inset-x-4 bottom-4 rounded-3xl p-5 text-[0.9375rem] leading-relaxed text-ink sm:inset-x-6 sm:bottom-6">
              One hub for courses, live markets, news and the economic calendar — so every lesson connects to the real world.
            </p>
          </div>
          <div className="lg:col-span-7 lg:pl-6">
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-green">Our story</h2>
            <div className="mt-6 grid max-w-[64ch] gap-5 text-[1.0625rem] leading-[1.75] text-muted">
              {about.story[0]
                .split(/(?<=\.)\s+(?=Our instructors|We believe)/)
                .map((p) => (
                  <p key={p.slice(0, 30)}>{p.endsWith(".") ? p : `${p}.`}</p>
                ))}
            </div>
          </div>
        </div>
      </Container>

      <div className="pb-24">
        <JoinCta />
      </div>
    </>
  );
}
