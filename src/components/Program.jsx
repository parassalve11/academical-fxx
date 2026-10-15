import Link from "next/link";
import { ArrowRight, Award, BookOpen, ChartNoAxesCombined, ChevronRight, FlaskConical, Headphones, MessageSquare, Radio, Video } from "lucide-react";
import { SectionHeading } from "./Brand";
import { CourseScreen, Laptop, LiveClassScreen, Phone } from "./Devices";
import { mentors } from "@/data/site";

const features = [
  { icon: Video, title: "Live face-to-face classes", body: "Join mentors on Zoom and learn directly from people who trade." },
  { icon: MessageSquare, title: "Ask as you learn", body: "Bring your charts and questions into the session in real time." },
  { icon: Headphones, title: "VIP group support", body: "Round-the-clock help in an exclusive members' group." },
  { icon: Award, title: "Certificate of completion", body: "Video lessons and resources, from beginner to advanced." },
];

// The seven-stage syllabus, grouped into the four phases a learner moves through.
const phases = [
  {
    icon: BookOpen,
    title: "Learn",
    lead: "Understand how markets really work",
    points: [
      "How markets, brokers and orders work.",
      "Read candlesticks and the patterns that repeat.",
      "Build a base before you risk any money.",
    ],
  },
  {
    icon: FlaskConical,
    title: "Practise",
    lead: "Turn analysis into a repeatable setup",
    points: [
      "Pro strategies with defined entries and exits.",
      "Combine technicals with fundamentals.",
      "Back-test until the rules feel automatic.",
    ],
  },
  {
    icon: Radio,
    title: "Trade live",
    lead: "Apply it as the market moves",
    points: [
      "Follow real-time updates in live sessions.",
      "Mark up charts with your mentor on Zoom.",
      "Get every question answered in the moment.",
    ],
  },
  {
    icon: ChartNoAxesCombined,
    title: "Lead",
    lead: "Protect your capital, master your mind",
    points: [
      "Position sizing that keeps you in the game.",
      "Discipline when a trade goes against you.",
      "Grow into a consistent, independent trader.",
    ],
  },
];

export function LearningPath() {
  return (
    <section aria-labelledby="path-title" className="relative border-y border-line bg-green-50/60">
      <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 sm:py-28">
        <SectionHeading
          id="path-title"
          title="From your first candle to trading with discipline"
          intro="Every programme follows the same path, so each skill builds on the one before it."
        />

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map(({ icon: Icon, title, lead, points }, i) => (
            <li
              key={title}
              className="group flex flex-col rounded-[24px] border border-green/25 bg-white/80 p-7 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-green hover:shadow-[0_24px_48px_-28px_rgb(15_60_57/0.45)]"
            >
              <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-green-50 text-green ring-1 ring-green/15 transition-colors group-hover:bg-green group-hover:text-white">
                <Icon className="size-7" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-[1.75rem] font-bold leading-none tracking-tight text-green">
                <span className="tabular">{i + 1})</span> {title}
              </h3>
              <p className="mt-3 font-semibold sm:min-h-[2.75em] leading-snug text-ink">{lead}</p>
              <ul className="mt-5 grid gap-3">
                {points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-muted">
                    <ChevronRight className="mt-[0.2rem] size-4 shrink-0 text-green" strokeWidth={2.5} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <Link
          href="/courses"
          className="mt-8 flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-green px-6 py-4 text-center font-semibold text-white transition-colors hover:bg-green-700"
        >
          Start your learning path <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function LiveClasses() {
  return (
    <section aria-labelledby="live-title" className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 sm:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <div className="relative overflow-hidden rounded-[36px] bg-[radial-gradient(120%_90%_at_20%_0%,#dfeae6,#eef4f1_55%,#f3eefc)] px-6 pb-14 pt-20 ring-1 ring-line sm:px-10 sm:pt-24">
            <Laptop className="mr-[14%]">
              <LiveClassScreen />
            </Laptop>
            <Phone className="absolute bottom-6 right-4 w-[25%] min-w-[88px] sm:bottom-8 sm:right-8">
              <CourseScreen />
            </Phone>
          </div>

          <div className="glass absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium text-green sm:left-6 sm:top-6">
            <span className="size-2 rounded-full bg-down shadow-[0_0_10px] shadow-down" aria-hidden="true" />
            Live classes on Zoom
          </div>

          <ul className="mt-4 flex flex-wrap gap-3" aria-label="Your mentors">
            {mentors.map((m) => (
              <li key={m.name} className="glass flex items-center gap-3 rounded-full py-2 pl-2 pr-5">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-green font-display text-xs font-bold text-white" aria-hidden="true">
                  {m.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold text-green">{m.name}</span>
                  <span className="block text-xs text-muted">{m.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:pl-8">
          <SectionHeading
            id="live-title"
            title="Learn face to face, not just from videos"
            intro="Recorded lessons get you started. Live sessions with your mentors are where questions get answered and habits get corrected."
          />
          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, body }) => (
              <li key={title}>
                <Icon className="size-6 text-green" aria-hidden="true" />
                <p className="mt-3 font-semibold text-green">{title}</p>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{body}</p>
              </li>
            ))}
          </ul>
          <Link href="/courses" className="btn-primary mt-10 px-6 py-3.5 text-[0.9375rem]">
            See course schedules
          </Link>
        </div>
      </div>
    </section>
  );
}
