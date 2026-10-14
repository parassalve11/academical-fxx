import Image from "next/image";
import Link from "next/link";
import { Award, Headphones, MessageSquare, Video } from "lucide-react";
import { SectionHeading } from "./Brand";
import { curriculum, mentors } from "@/data/site";

const features = [
  { icon: Video, title: "Live face-to-face classes", body: "Join mentors on Zoom and learn directly from people who trade." },
  { icon: MessageSquare, title: "Ask as you learn", body: "Bring your charts and questions into the session in real time." },
  { icon: Headphones, title: "VIP group support", body: "Round-the-clock help in an exclusive members' group." },
  { icon: Award, title: "Certificate of completion", body: "Video lessons and resources, from beginner to advanced." },
];

export function LearningPath() {
  return (
    <section aria-labelledby="path-title" className="relative border-y border-line bg-green-50/60">
      <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 sm:py-28">
        <SectionHeading
          id="path-title"
          title="From your first candle to trading with discipline"
          intro="Every programme follows the same seven-stage path, so each skill builds on the one before it."
        />

        {/* Each stage steps up, like a trend making higher highs. */}
        <ol className="mt-16 grid gap-3 lg:grid-cols-7 lg:items-end lg:gap-0">
          {curriculum.map((step, i) => (
            <li
              key={step.title}
              className="relative lg:pr-4"
              style={{ "--lift": `${i * 1.6}rem` }}
            >
              <div className="bg-white/70 ring-1 ring-line flex gap-4 rounded-2xl p-5 lg:mb-[var(--lift)] lg:block lg:rounded-none lg:border-0 lg:ring-0 lg:border-t-2 lg:border-green/30 lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-5">
                <span className="tabular inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-green text-sm font-semibold text-white lg:absolute lg:-top-4 lg:left-0 lg:ring-4 lg:ring-[#f3f6f4]">
                  {i + 1}
                </span>
                <div className="lg:mt-3">
                  <p className="font-display text-lg font-semibold leading-tight text-green">{step.title}</p>
                  <p className="mt-1.5 text-sm leading-snug text-muted">{step.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function LiveClasses() {
  return (
    <section aria-labelledby="live-title" className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 sm:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[36px] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/images/stock/live-class.jpg"
              alt="A student taking notes during a live video class"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green/45 via-transparent to-transparent" />
          </div>

          <div className="glass absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium text-green sm:left-6 sm:top-6">
            <span className="size-2 rounded-full bg-down shadow-[0_0_10px] shadow-down" aria-hidden="true" />
            Live classes on Zoom
          </div>

          <div className="glass absolute inset-x-4 bottom-4 rounded-3xl p-5 sm:inset-x-6 sm:bottom-6 lg:-right-10 lg:left-auto lg:w-[320px]">
            <p className="text-sm text-muted">Your mentors</p>
            <ul className="mt-3 grid gap-3">
              {mentors.map((m) => (
                <li key={m.name} className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-green font-display text-sm font-bold text-white" aria-hidden="true">
                    {m.name.split(" ").map((p) => p[0]).join("")}
                  </span>
                  <span>
                    <span className="block font-semibold text-green">{m.name}</span>
                    <span className="block text-sm text-muted">{m.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
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
