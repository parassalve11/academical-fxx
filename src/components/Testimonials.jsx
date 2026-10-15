import { Quote, Star } from "lucide-react";
import { SectionHeading } from "./Brand";
import { proofStats, testimonials } from "@/data/site";

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 sm:py-32">
      {/* Proof band: a headline tile followed by three figures. */}
      <div className="overflow-hidden rounded-[32px] bg-[linear-gradient(110deg,#0f3c39,#16524d_55%,#2c5f56)] p-2 text-white">
        <div className="grid gap-2 lg:grid-cols-4">
          <div className="rounded-[26px] bg-white/[0.07] p-7 ring-1 ring-white/10">
            <p className="flex items-center gap-2 font-display text-5xl font-extrabold tracking-tight">
              5.0 <Star className="size-8 fill-gold text-gold" aria-hidden="true" />
            </p>
            <p className="mt-3 font-semibold">Average course rating</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Structured trading education with live mentors, built for every experience level.
            </p>
          </div>
          {proofStats.map((s) => (
            <div key={s.value} className="p-7">
              <p className="tabular font-display text-5xl font-extrabold tracking-tight">{s.value}</p>
              <p className="mt-3 max-w-[15rem] leading-relaxed text-white/75">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <SectionHeading
          id="testimonials-title"
          title="What our traders say"
          intro="Learners on how live classes, mentoring and a clear curriculum changed the way they trade."
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name} className="glass flex flex-col rounded-[28px] p-7">
              <div className="flex items-center justify-between">
                <Quote className="size-8 text-green/25" aria-hidden="true" />
                <span className="flex gap-0.5" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="size-4 fill-gold text-gold" aria-hidden="true" />
                  ))}
                </span>
              </div>
              <blockquote className="mt-5 flex-1 text-[1.0625rem] leading-relaxed text-ink text-pretty">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-green font-display text-sm font-bold text-white" aria-hidden="true">
                  {t.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold text-green">{t.name}</span>
                  <span className="block text-sm text-muted">{t.role}</span>
                </span>
              </div>
              <p className="mt-4 self-start rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green ring-1 ring-green/10">{t.course}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
