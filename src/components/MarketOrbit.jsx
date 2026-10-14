"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

// Official TradingView symbol artwork, served locally so the hero has no
// third-party network dependency. No snapshot prices are presented as live data.
const symbols = [
  { name: "Apple", ticker: "AAPL", icon: "apple" },
  { name: "Euro / US dollar", ticker: "EUR/USD", icon: "eu", pair: "us" },
  { name: "NVIDIA", ticker: "NVDA", icon: "nvidia" },
  { name: "Microsoft", ticker: "MSFT", icon: "microsoft" },
  { name: "British pound / US dollar", ticker: "GBP/USD", icon: "gb", pair: "us" },
  { name: "Tesla", ticker: "TSLA", icon: "tesla" },
];

export default function MarketOrbit() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="market-orbit" data-paused={paused}>
      <svg className="market-orbit-canvas" viewBox="0 0 600 660" fill="none" aria-hidden="true">
        <defs>
          <clipPath id="market-stock-clip"><circle r="23" /></clipPath>
          <clipPath id="market-pair-back-clip"><circle cx="-5" cy="-1" r="18" /></clipPath>
          <clipPath id="market-pair-front-clip"><circle cx="10" cy="8" r="17" /></clipPath>
        </defs>
        <path className="market-orbit-track" d="M 350 62 A 260 260 0 0 0 350 582" />
        <path className="market-orbit-track-secondary" d="M 350 28 A 294 294 0 0 0 350 616" />
        {symbols.map((symbol, i) => (
          <g
            key={symbol.ticker}
            className="market-orbit-symbol"
            style={{
              animationDelay: `${-i * 5 - 2.5}s`,
              offsetDistance: `${((i + 0.5) / symbols.length) * 100}%`,
            }}
          >
            <circle r="30" fill="#faf9f7" stroke="#ffffff" strokeWidth="2" />
            {symbol.pair ? (
              <>
                <image href={`/images/markets/${symbol.icon}.svg`} x="-23" y="-19" width="36" height="36" clipPath="url(#market-pair-back-clip)" />
                <circle cx="10" cy="8" r="19" fill="#faf9f7" />
                <image href={`/images/markets/${symbol.pair}.svg`} x="-7" y="-9" width="34" height="34" clipPath="url(#market-pair-front-clip)" />
              </>
            ) : (
              <image href={`/images/markets/${symbol.icon}.svg`} x="-23" y="-23" width="46" height="46" clipPath="url(#market-stock-clip)" />
            )}
            <text y="47" textAnchor="middle" className="market-orbit-ticker">{symbol.ticker}</text>
          </g>
        ))}
      </svg>
      <ul className="sr-only" aria-label="Stocks and forex markets">
        {symbols.map((symbol) => <li key={symbol.ticker}>{symbol.name} ({symbol.ticker})</li>)}
      </ul>
      <div className="market-orbit-controls">
        <span>STOCKS &amp; FOREX</span>
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "Resume market icon animation" : "Pause market icon animation"}
          aria-pressed={paused}
          className="market-orbit-toggle"
        >
          {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
