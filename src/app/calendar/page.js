import { CalendarClock, Gauge, TrendingUp } from "lucide-react";
import { Container, CourseRail, Notice, PageHero } from "@/components/ui";
import { Frame } from "@/components/Widgets";
import { investing } from "@/data/widgets";

export const metadata = {
  title: "Economic calendar",
  description: "The releases, central-bank decisions and data prints that move markets — with impact ratings, forecasts and previous readings.",
};

const tips = [
  { icon: Gauge, title: "Check the impact", body: "Three-bull events move markets most. Plan entries and stops around them." },
  { icon: CalendarClock, title: "Set your time zone", body: "Use the widget's time-zone control so release times match your clock." },
  { icon: TrendingUp, title: "Compare the numbers", body: "Price reacts to actual against forecast, not to the number alone." },
];

export default function CalendarPage() {
  return (
    <>
      <PageHero
        title="Economic calendar"
        intro="The releases, central-bank decisions and data prints that move markets — with impact ratings, forecasts and previous readings. Trade prepared, not surprised."
      />
      <Container className="grid gap-8 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="glass rounded-[28px] p-2 sm:p-3">
            <Frame src={investing.calendar} title="Investing.com economic calendar" height={760} />
          </div>
          <Notice className="mt-4">Real-time economic calendar by Investing.com. Use the widget&apos;s controls to switch time zone, date and filters. Figures are indicative and may be revised.</Notice>
        </div>
        <div className="grid content-start gap-5 lg:col-span-4">
          <section aria-labelledby="tips-title" className="glass rounded-[28px] p-6">
            <h2 id="tips-title" className="font-display text-lg font-bold text-green">Reading the calendar</h2>
            <ul className="mt-4 grid gap-4">
              {tips.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex gap-3">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green ring-1 ring-green/10">
                    <Icon className="size-4.5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">{title}</span>
                    <span className="block text-sm leading-relaxed text-muted">{body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <CourseRail title="Master high-impact events" note="Learn how to trade the data, not guess it." />
        </div>
      </Container>
    </>
  );
}
