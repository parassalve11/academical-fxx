"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import TradingChart from "./TradingChart";

// Official TradingView symbol artwork, served locally so the hero has no
// third-party network dependency. The chart is illustrative, not live data.
const symbols = [
  { name: "Apple", ticker: "AAPL", icon: "apple" },
  { name: "Euro / US dollar", ticker: "EURUSD", icon: "eu", pair: "us" },
  { name: "NVIDIA", ticker: "NVDA", icon: "nvidia" },
  { name: "S&P 500", ticker: "SPX", icon: "indices/s-and-p-500" },
  { name: "Microsoft", ticker: "MSFT", icon: "microsoft" },
  { name: "British pound / US dollar", ticker: "GBPUSD", icon: "gb", pair: "us" },
  { name: "Tesla", ticker: "TSLA", icon: "tesla" },
  { name: "Dow Jones", ticker: "DJI", icon: "indices/dow-30" },
];

function SymbolIcon({ symbol }) {
  if (symbol.pair) {
    return (
      <span className="hero-chip-pair" aria-hidden="true">
        <img src={`/images/markets/${symbol.icon}.svg`} alt="" />
        <img src={`/images/markets/${symbol.pair}.svg`} alt="" />
      </span>
    );
  }
  return <img className="hero-chip-icon" src={`/images/markets/${symbol.icon}.svg`} alt="" aria-hidden="true" />;
}

function Chip({ symbol, hidden }) {
  return (
    <li className="hero-chip" aria-hidden={hidden || undefined}>
      <SymbolIcon symbol={symbol} />
      <span>
        <span className="hero-chip-ticker">{symbol.ticker}</span>
        <span className="hero-chip-name">{symbol.name}</span>
      </span>
    </li>
  );
}

export default function HeroMarkets() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="hero-markets" data-paused={paused}>
      {/* Chart panel sits behind the mentor, like a terminal over his shoulder. */}
      <div className="hero-chart" aria-hidden="true">
        <div className="hero-chart-bar">
          <span className="hero-chip-pair">
            <img src="/images/markets/eu.svg" alt="" />
            <img src="/images/markets/us.svg" alt="" />
          </span>
          <span className="hero-chart-symbol">EURUSD</span>
          <span className="hero-chart-meta">· 1H · ACADEMIYA</span>
          <span className="hero-chart-tf">
            {["5m", "1H", "4H", "1D"].map((tf) => (
              <span key={tf} data-active={tf === "1H" || undefined}>{tf}</span>
            ))}
          </span>
        </div>
        <TradingChart className="hero-chart-plot" width={560} height={300} seed={23} count={46} />
      </div>

      <div className="hero-roller">
        <ul className="hero-roller-track" aria-label="Stocks and forex markets covered">
          {symbols.map((s) => <Chip key={s.ticker} symbol={s} />)}
          {symbols.map((s) => <Chip key={`${s.ticker}-dup`} symbol={s} hidden />)}
        </ul>
      </div>

      <div className="hero-roller-controls">
        <span>STOCKS &amp; FOREX</span>
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "Resume market symbols animation" : "Pause market symbols animation"}
          aria-pressed={paused}
          className="hero-roller-toggle"
        >
          {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
