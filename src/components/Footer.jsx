import Image from "next/image";
import Link from "next/link";
import { Logo, SocialIcon } from "./Brand";
import { footerColumns, socials } from "@/data/site";

export function JoinCta() {
  return (
    <section aria-labelledby="join-title" className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div className="relative isolate overflow-hidden rounded-[40px] px-6 py-20 text-center sm:px-12 sm:py-28">
        <Image src="/images/stock/community-table.jpg" alt="" fill sizes="(min-width: 1240px) 1240px, 100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(15_60_57/0.9),rgb(15_60_57/0.82))]" />
        <p className="font-script text-3xl font-bold text-lilac sm:text-4xl">Learn to Lead.</p>
        <h2 id="join-title" className="mx-auto mt-3 max-w-3xl font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-white text-balance">
          Join a community that learns to lead.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-white/80">
          Free to join. Start with a free lesson, follow the markets and share your analysis with other traders.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/signup" className="btn-light px-7 py-3.5">Create free account</Link>
          <Link href="/courses" className="glass-green inline-flex items-center rounded-full px-7 py-3.5 font-semibold text-white hover:bg-white/15">Explore courses</Link>
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  const year = 2026;
  return (
    <footer className="bg-green text-white">
      <div className="mx-auto max-w-[1240px] px-4 pb-10 pt-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 font-script text-3xl font-bold text-lilac">Learn to Lead.</p>
            <p className="mt-3 max-w-xs leading-relaxed text-white/70">
              Trading-education courses, live markets, financial news, the economic calendar and broker reviews in one trusted hub.
            </p>
            <ul className="mt-6 flex gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Academiya on ${s.label}`}
                    className="inline-flex size-10 items-center justify-center rounded-full bg-white/[0.08] text-white ring-1 ring-white/15 transition-colors hover:bg-white/[0.16]"
                  >
                    <SocialIcon name={s.icon} className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold tracking-wide text-white/55">{col.title}</h3>
                <ul className="mt-4 grid gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} className="text-[0.9375rem] text-white/85 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/60">
          <p>© {year} Academiya. All rights reserved.</p>
          <p className="mt-3 max-w-3xl text-xs leading-relaxed">
            Risk warning: Trading and investing carry risk of loss. Educational content on Academiya is for learning purposes only and is not financial advice. Market data may be delayed.
          </p>
        </div>
      </div>
    </footer>
  );
}
