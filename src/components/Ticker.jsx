import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { ticker, highlights } from "@/data/site";

export function Change({ value, className = "" }) {
  const up = value >= 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span className={`tabular inline-flex items-center gap-0.5 font-semibold ${up ? "text-up" : "text-down"} ${className}`}>
      <Icon className="size-3.5" aria-hidden="true" />
      <span className="sr-only">{up ? "up" : "down"}</span>
      {up ? "+" : ""}
      {value.toFixed(2)}%
    </span>
  );
}

function TapeItem({ item, hidden }) {
  return (
    <Link
      href="/markets"
      tabIndex={hidden ? -1 : undefined}
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-baseline gap-3 px-6 py-4 text-sm"
    >
      <span className="font-medium text-muted">{item.name}</span>
      <span className="tabular font-semibold text-green">{item.value}</span>
      <Change value={item.change} className="text-[0.8125rem]" />
    </Link>
  );
}

export default function Ticker() {
  return (
    <section aria-label="Market indices" className="relative z-10 mx-auto -mt-8 max-w-[1240px] px-4 sm:-mt-9 sm:px-6">
      <div className="glass tape-wrap overflow-hidden rounded-full [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <div className="tape flex w-max">
          {ticker.map((item) => (
            <TapeItem key={item.name} item={item} />
          ))}
          {ticker.map((item) => (
            <TapeItem key={`${item.name}-dup`} item={item} hidden />
          ))}
        </div>
      </div>
      <p className="mt-2 text-right text-xs text-faint">Index values may be delayed.</p>
    </section>
  );
}

export function Highlights() {
  return (
    <section aria-label="What every course includes" className="mx-auto mt-16 max-w-[1240px] px-4 sm:px-6">
      <ul className="grid overflow-hidden rounded-[28px] bg-green sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((h, i) => (
          <li
            key={h.title}
            className={`px-7 py-7 ${i > 0 ? "border-t border-white/10 sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l sm:border-white/10" : ""} ${i >= 2 ? "sm:border-t sm:border-white/10 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:border-white/10" : ""}`}
          >
            <p className="font-display text-xl font-bold tracking-tight text-white">{h.title}</p>
            <p className="mt-1.5 text-[0.9375rem] leading-snug text-white/70">{h.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
