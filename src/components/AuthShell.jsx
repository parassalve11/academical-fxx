const defaultPoints = [
  { title: "Structured, expert-led courses", body: "Forex, crypto and equities — from fundamentals to advanced strategy." },
  { title: "Live markets & economic calendar", body: "Real prices, news and high-impact events, updated continuously." },
  { title: "A serious community", body: "Learn alongside committed traders and grow together." },
];

export default function AuthShell({ children, points = defaultPoints }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <section className="relative isolate hidden overflow-hidden bg-green px-12 pb-14 pt-36 text-white lg:flex lg:flex-col xl:px-16">
        {/* The logo's orbit, drawn large. */}
        <svg className="absolute -left-40 top-24 -z-10 h-[780px] w-[1100px] opacity-25" viewBox="0 0 1100 780" fill="none" aria-hidden="true">
          <ellipse cx="560" cy="390" rx="520" ry="300" transform="rotate(-14 560 390)" stroke="#c9b6f0" strokeWidth="2" />
          <ellipse cx="560" cy="390" rx="420" ry="230" transform="rotate(-14 560 390)" stroke="white" strokeOpacity="0.5" />
        </svg>
        <div className="absolute -right-24 top-1/3 -z-10 size-96 rounded-full bg-lilac/25 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-10 -z-10 size-80 rounded-full bg-up/25 blur-3xl" aria-hidden="true" />

        <div className="my-auto">
          <p className="font-display text-[clamp(2.75rem,4vw,3.75rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">Master the markets,</p>
          <p className="mt-1 font-script text-[clamp(3rem,4.6vw,4.25rem)] font-bold leading-none text-lilac">Learn to Lead.</p>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">Trading-education courses, live markets, financial news and expert mentorship — built for serious learners.</p>
        </div>

        <ul className="glass-green mt-12 grid gap-5 rounded-[28px] p-6">
          {points.map((p) => (
            <li key={p.title} className="flex gap-3">
              <span className="mt-2 size-2 shrink-0 rounded-full bg-lilac" aria-hidden="true" />
              <span>
                <span className="block font-semibold">{p.title}</span>
                <span className="block text-sm text-white/70">{p.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="wash flex items-center justify-center px-4 pb-16 pt-32 sm:px-6">
        <div className="glass w-full max-w-[460px] rounded-[32px] p-6 sm:p-9">{children}</div>
      </section>
    </div>
  );
}
