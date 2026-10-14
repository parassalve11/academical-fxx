import Link from "next/link";
import { Activity, ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import { Change } from "./Ticker";
import { marketsBoard, topMovers } from "@/data/site";

export default function Markets() {
  return (
    <section aria-labelledby="markets-title" className="relative isolate overflow-hidden border-y border-line bg-white/40">
      <div className="ambient" aria-hidden="true">
        <span className="right-[2%] top-[10%] size-[460px] bg-green/25" />
        <span className="right-[30%] bottom-[0%] size-[360px] bg-lilac/50" />
      </div>

      <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-sm font-medium text-green">Who we are</p>
          <h2 id="markets-title" className="mt-3 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-green text-balance">
            Learn where the markets actually move
          </h2>
          <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-muted text-pretty">
            Academiya pairs honest, structured trading education with live market data — so you&apos;re always learning against the real thing. No hype, just the markets, the news and the tools that sharpen your decisions.
          </p>
          <Link href="/markets" className="btn-glass mt-8 px-6 py-3.5 text-[0.9375rem]">
            Open live markets <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="glass-thick overflow-hidden rounded-[32px] lg:col-span-7">
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <h3 className="inline-flex items-center gap-2 font-display text-lg font-semibold text-green">
              <Activity className="size-5 text-green" aria-hidden="true" /> Markets now
            </h3>
            <Link href="/markets" className="link-quiet text-sm">All markets</Link>
          </div>

          <ul className="grid sm:grid-cols-2">
            {marketsBoard.map((m, i) => (
              <li
                key={m.symbol}
                className={`flex items-center justify-between gap-4 px-6 py-4 ${i >= 1 ? "border-t border-line" : ""} ${i === 1 ? "sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l sm:border-line" : ""}`}
              >
                <div>
                  <p className="font-semibold text-green">{m.name}</p>
                  <p className="text-xs text-faint">{m.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="tabular font-semibold text-green">{m.value}</p>
                  <Change value={m.change} className="text-sm" />
                </div>
              </li>
            ))}
          </ul>

          <div className="grid border-t border-line bg-green-50/70 sm:grid-cols-2">
            <div className="px-6 py-5">
              <p className="inline-flex items-center gap-1.5 text-sm text-up">
                <TrendingUp className="size-4" aria-hidden="true" /> Top gainer
              </p>
              <p className="mt-1.5 font-semibold text-green">{topMovers.gainer.name}</p>
              <p className="tabular text-sm text-up">
                {topMovers.gainer.points} <span className="text-up/70">(+{topMovers.gainer.change.toFixed(2)}%)</span>
              </p>
            </div>
            <div className="border-t border-line px-6 py-5 sm:border-l sm:border-t-0">
              <p className="inline-flex items-center gap-1.5 text-sm text-down">
                <TrendingDown className="size-4" aria-hidden="true" /> Top loser
              </p>
              <p className="mt-1.5 font-semibold text-green">{topMovers.loser.name}</p>
              <p className="tabular text-sm text-down">
                {topMovers.loser.points} <span className="text-down/70">({topMovers.loser.change.toFixed(2)}%)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
