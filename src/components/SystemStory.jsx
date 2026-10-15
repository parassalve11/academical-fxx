"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Brain, Check, ChevronLeft, ChevronRight, FlaskConical, Layers, MousePointer2, NotebookPen, Scale, X } from "lucide-react";
import "./SystemStory.css";

/* "Stop guessing" story: a compact row of cards you can swipe, drag or step
   through. Each card has its own small looping animation (cards 2 and 5 are
   deliberately still, so the row has a rhythm). */

function Hesitation() {
  return (
    <div className="ss-hesitate" aria-hidden="true">
      <span className="ss-hesitate-q">?</span>
      <span className="ss-btn ss-btn-buy">BUY</span>
      <span className="ss-btn ss-btn-sell">SELL</span>
      <MousePointer2 className="ss-cursor" />
    </div>
  );
}

function Pills() {
  return (
    <ul className="ss-pills" aria-hidden="true">
      <li><Check /> Setups</li>
      <li><Check /> Patterns</li>
      <li data-missing><X /> Process</li>
    </ul>
  );
}

const loop = ["Losses", "Hesitate", "Skip trades", "Miss winners"];
function Loop() {
  return (
    <div className="ss-loop" aria-hidden="true">
      <svg viewBox="0 0 160 160">
        <circle cx="80" cy="80" r="58" fill="none" stroke="rgb(192 50 43 / 0.25)" strokeWidth="2" strokeDasharray="3 5" />
        <circle r="5" fill="#c0322b" className="ss-anim">
          <animateMotion dur="5s" repeatCount="indefinite" path="M 80 22 a 58 58 0 1 1 -0.01 0" />
        </circle>
      </svg>
      {loop.map((label, i) => (
        <span key={label} className="ss-loop-label" data-pos={i}>{label}</span>
      ))}
      <span className="ss-loop-center">repeat</span>
    </div>
  );
}

function Curves() {
  return (
    <svg className="ss-curves" viewBox="0 0 300 130" aria-hidden="true">
      <path className="ss-curve ss-curve-pro" pathLength="1" d="M10 110 C 60 100, 80 92, 110 84 S 170 64, 200 52 S 260 26, 290 18" />
      <path className="ss-curve ss-curve-am" pathLength="1" d="M10 70 L40 50 L60 88 L85 40 L105 95 L130 60 L150 104 L175 72 L200 112 L225 86 L250 118 L290 108" />
      <text x="290" y="10" textAnchor="end" className="ss-curve-label ss-label-pro">System</text>
      <text x="10" y="128" className="ss-curve-label ss-label-am">Gut feeling</text>
    </svg>
  );
}

function Compare() {
  return (
    <div className="ss-compare" aria-hidden="true">
      <p><X /> Tweak after every loss</p>
      <p data-good><Check /> Clear rules</p>
      <p><X /> No data on your edge</p>
      <p data-good><Check /> Proven edge</p>
    </div>
  );
}

function Rule() {
  return (
    <pre className="ss-rule" aria-hidden="true">
      <span><b className="ss-k1">IF</b>   price at zone</span>
      <span><b className="ss-k1">AND</b>  session active</span>
      <span><b className="ss-k2">THEN</b> enter · risk 1%</span>
      <span><b className="ss-k3">ELSE</b> wait</span>
    </pre>
  );
}

const layers = [
  [Layers, "Strategy"],
  [FlaskConical, "Backtesting"],
  [Scale, "Risk rules"],
  [NotebookPen, "Journal"],
  [Brain, "Psychology"],
];
function Stack() {
  return (
    <ol className="ss-stack" aria-hidden="true">
      {layers.map(([Icon, label], i) => (
        <li key={label} style={{ "--i": i }}><Icon />{label}</li>
      ))}
    </ol>
  );
}

const PULSE = "M0 50 H40 L52 14 L64 86 L76 26 L88 70 L100 50 H140 L148 38 L156 60 L164 50 H300";
function Pulse() {
  return (
    <svg className="ss-pulse" viewBox="0 0 300 100" aria-hidden="true">
      <path className="ss-pulse-bg" d={PULSE} />
      <path className="ss-pulse-line" pathLength="1" d={PULSE} />
      <text x="230" y="40" className="ss-pulse-label">calm</text>
    </svg>
  );
}

const cards = [
  { visual: Hesitation, kicker: "The problem", title: "Discretionary trading is the problem.", body: "Deciding in the moment means hesitating in the moment." },
  { visual: Pills, kicker: "Why you're stuck", title: "Setups, but no structure.", body: "You know the patterns. What's missing is a process." },
  { visual: Loop, kicker: "The loop", title: "The same loop, every week.", body: "If execution depends on how you feel, it keeps repeating." },
  { visual: Curves, kicker: "Human bias", title: "Amateurs hope. Pros repeat.", body: "“This looks good” loses to “my system takes this every time.”" },
  { visual: Compare, kicker: "Now vs. next", title: "From guessing to knowing.", body: "Swap constant tweaking for rules backed by your own data." },
  { visual: Rule, kicker: "The fix", title: "Systematic execution.", body: "Clear if/then rules for every scenario — no hesitation." },
  { visual: Stack, kicker: "The system", title: "One complete operating system.", body: "Strategy, testing, risk, journal and psychology, working together." },
  { visual: Pulse, kicker: "The result", title: "Calm. Systematic. In control.", body: "Open your charts and know exactly what to do.", cta: true },
];

const GAP = 16;

export default function SystemStory() {
  const track = useRef(null);
  const [active, setActive] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  // Where a smooth scroll is heading, so quick repeated clicks keep stepping.
  const pending = useRef(null);

  function goTo(index) {
    const el = track.current;
    const target = Math.max(0, Math.min(cards.length - 1, index));
    const card = el?.children[target];
    if (!card) return;
    pending.current = target;
    el.scrollTo({ left: card.offsetLeft - el.firstElementChild.offsetLeft, behavior: "smooth" });
  }
  const from = () => pending.current ?? active;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const step = () => el.firstElementChild.getBoundingClientRect().width + GAP;
    const onScroll = () => {
      setActive(Math.min(cards.length - 1, Math.round(el.scrollLeft / step())));
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };
    const onScrollEnd = () => { pending.current = null; };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("scrollend", onScrollEnd);

    // Drag to scroll with a mouse; touch keeps native swiping.
    let startX = 0;
    let startLeft = 0;
    let dragging = false;
    const down = (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.dataset.dragging = "";
    };
    const move = (e) => {
      if (dragging) el.scrollLeft = startLeft - (e.clientX - startX);
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      delete el.dataset.dragging;
      const card = el.children[Math.round(el.scrollLeft / step())];
      if (card) el.scrollTo({ left: card.offsetLeft - el.firstElementChild.offsetLeft, behavior: "smooth" });
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("scrollend", onScrollEnd);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <section aria-labelledby="story-title" className="py-20 sm:py-24">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-end justify-between gap-5 px-4 sm:px-6">
        <div>
          <p className="text-sm font-medium text-green">Why most traders stay stuck</p>
          <h2 id="story-title" className="mt-2 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-green">
            Stop guessing. Start trading a system.
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => goTo(from() - 1)} disabled={active === 0} aria-label="Previous card" className="ss-nav">
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => goTo(from() + 1)} disabled={atEnd} aria-label="Next card" className="ss-nav">
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={track}
        className="ss-track mt-8"
        role="region"
        aria-roledescription="carousel"
        aria-label="Why discretionary trading keeps you stuck"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); goTo(from() + 1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); goTo(from() - 1); }
        }}
      >
        {cards.map(({ visual: Visual, kicker, title, body, cta }, i) => (
          <article key={kicker} className="ss-card" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${cards.length}: ${kicker}`}>
            <div className="ss-visual"><Visual /></div>
            <p className="ss-kicker"><span className="tabular">{String(i + 1).padStart(2, "0")}</span> {kicker}</p>
            <h3 className="font-display ss-title">{title}</h3>
            <p className="ss-body">{body}</p>
            {cta && (
              <Link href="/courses" className="ss-cta" draggable={false}>Build your system <ArrowRight className="size-4" aria-hidden="true" /></Link>
            )}
          </article>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-1.5">
        {cards.map(({ kicker }, i) => (
          <button
            key={kicker}
            type="button"
            aria-label={`Show card ${i + 1}: ${kicker}`}
            aria-current={i === active || undefined}
            onClick={() => goTo(i)}
            className="ss-dot"
          />
        ))}
      </div>
    </section>
  );
}
