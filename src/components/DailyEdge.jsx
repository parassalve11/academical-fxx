import { Brain, ChartCandlestick, Clapperboard, MessageCircleQuestionMark, Radio } from "lucide-react";
import { SectionHeading } from "./Brand";
import TradingChart from "./TradingChart";

// TODO(content): confirm each of these is part of the current membership.
const features = [
  {
    icon: Radio,
    title: "Live streams",
    body: "Watch our mentors trade live — every idea planned, managed and closed in real market conditions. Learn from what they do, not just what they say.",
    live: true,
  },
  {
    icon: ChartCandlestick,
    title: "Daily market analysis",
    body: "A clear breakdown of the key sessions and pairs every day: market structure, liquidity and the setups worth watching before they play out.",
  },
  {
    icon: Clapperboard,
    title: "Daily recap videos",
    body: "Review the day's biggest moves and how our mentors adapted in real time, so every session becomes a lesson you keep.",
  },
  {
    icon: MessageCircleQuestionMark,
    title: "Every question answered",
    body: "Ask in the VIP group and get a mentor's answer the same day — you never stay stuck on a concept or a chart.",
  },
  {
    icon: Brain,
    title: "Psychology masterclasses",
    body: "Train the mental side of trading — discipline, emotional control and consistency — through structured sessions and real case studies.",
  },
];

export default function DailyEdge() {
  return (
    <section aria-labelledby="daily-title" className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        id="daily-title"
        title="Everything you need to get better, every day"
        intro="Courses give you the foundation. These daily sessions keep you sharp, accountable and learning from the market as it moves."
      />

      <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, body, live }) => (
          <li
            key={title}
            className={`group relative flex flex-col overflow-hidden rounded-[28px] p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 ${
              live
                ? "bg-green text-white shadow-[0_30px_60px_-30px_rgb(15_60_57/0.6)] lg:row-span-2"
                : "glass hover:shadow-[0_24px_48px_-28px_rgb(15_60_57/0.35)]"
            }`}
          >
            <span className={`inline-flex size-12 items-center justify-center rounded-2xl ${live ? "bg-white/10 text-white ring-1 ring-white/15" : "bg-green-50 text-green ring-1 ring-green/10 transition-colors group-hover:bg-green group-hover:text-white"}`}>
              <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h3 className={`mt-6 flex items-center gap-2.5 font-display text-2xl font-bold tracking-tight ${live ? "text-white" : "text-green"}`}>
              {title}
              {live && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff0033] px-2.5 py-1 font-sans text-[0.6875rem] font-semibold tracking-wider">
                  <span className="size-1.5 animate-pulse rounded-full bg-white" aria-hidden="true" /> LIVE
                </span>
              )}
            </h3>
            <p className={`mt-3 leading-relaxed ${live ? "text-white/80" : "text-muted"}`}>{body}</p>
            {live && (
              <div className="relative -mx-7 -mb-7 mt-8 hidden flex-1 lg:block" aria-hidden="true">
                <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_30%)]">
                  <TradingChart className="size-full" width={420} height={300} seed={53} count={40} decimals={1} start={4150} />
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
