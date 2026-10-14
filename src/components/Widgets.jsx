"use client";

import { createElement, useEffect } from "react";

// TradingView's web-component widgets, as embedded on the live site.
const loaded = new Set();
function useModuleScript(src) {
  useEffect(() => {
    if (loaded.has(src)) return;
    loaded.add(src);
    const s = document.createElement("script");
    s.type = "module";
    s.src = src;
    s.async = true;
    document.head.appendChild(s);
  }, [src]);
}

export function TvMarketData({ sectors, height = 520 }) {
  useModuleScript("https://widgets.tradingview-widget.com/w/en/tv-market-data.js");
  return (
    <div style={{ height }} className="w-full min-w-0 max-w-full overflow-hidden">
      {createElement("tv-market-data", {
        "symbol-sectors": JSON.stringify(sectors),
        view: "overview",
        style: { display: "block", width: "100%", height: "100%" },
      })}
    </div>
  );
}

export function TvMarketOverview({ sectors, height = 560 }) {
  useModuleScript("https://widgets.tradingview-widget.com/w/en/tv-market-overview.js");
  return (
    <div style={{ height }} className="w-full min-w-0 max-w-full overflow-hidden">
      {createElement("tv-market-overview", {
        "symbol-sectors": JSON.stringify(sectors),
        exchange: "US",
        "time-frame": "12M",
        "item-size": "normal",
        mode: "custom",
        "assets-type": "stocks",
        "chart-size": "normal",
        style: { display: "block", width: "100%", height: "100%" },
      })}
    </div>
  );
}

// Investing.com widgets are plain iframes.
export function Frame({ src, title, height }) {
  return <iframe src={src} title={title} loading="lazy" className="block w-full rounded-2xl bg-white" style={{ height, border: 0 }} />;
}
