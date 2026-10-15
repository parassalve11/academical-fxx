// A TradingView-styled candlestick chart: grid, right-hand price scale,
// volume histogram, moving average and a last-price tag. Candles are generated
// deterministically so server and client render identical markup.
// Decorative only — the prices are illustrative, not market data.

function rng(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildCandles(seed, count, start) {
  const r = rng(seed);
  const candles = [];
  let price = start;
  for (let i = 0; i < count; i++) {
    // Noise plus a slow wave with a gentle upward bias, so it reads as a trend.
    const open = price;
    const close = open * (1 + (r() - 0.45) * 0.006 + Math.sin(i / 6) * 0.0014);
    const high = Math.max(open, close) + r() * start * 0.002;
    const low = Math.min(open, close) - r() * start * 0.002;
    candles.push({ open, close, high, low, volume: 0.25 + r() * 0.75 });
    price = close;
  }
  return candles;
}

const THEMES = {
  dark: { bg: "#0f1514", grid: "rgb(255 255 255 / 0.05)", text: "#8c9a97", up: "#26a69a", down: "#ef5350", ma: "#c9b6f0" },
  light: { bg: "#ffffff", grid: "rgb(15 60 57 / 0.06)", text: "#8a9794", up: "#26a69a", down: "#ef5350", ma: "#7b5cd6" },
};

export default function TradingChart({
  seed = 11,
  count = 54,
  start = 1.0842,
  decimals = 4,
  theme = "dark",
  width = 640,
  height = 360,
  scale = true,
  className = "",
}) {
  const c = THEMES[theme];
  const candles = buildCandles(seed, count, start);
  const axisW = scale ? 58 : 0;
  const plotW = width - axisW;
  const priceH = height * 0.78;
  const volTop = height * 0.8;
  const volH = height * 0.18;

  const hi = Math.max(...candles.map((k) => k.high));
  const lo = Math.min(...candles.map((k) => k.low));
  const pad = (hi - lo) * 0.08;
  const y = (p) => 10 + ((hi + pad - p) / (hi - lo + pad * 2)) * (priceH - 10);
  const step = plotW / count;
  const bodyW = Math.max(2, step * 0.62);

  const ma = candles.map((_, i) => {
    const slice = candles.slice(Math.max(0, i - 8), i + 1);
    return slice.reduce((s, k) => s + k.close, 0) / slice.length;
  });
  const maPath = ma.map((p, i) => `${i ? "L" : "M"}${(i + 0.5) * step} ${y(p).toFixed(1)}`).join(" ");

  const last = candles[candles.length - 1];
  const lastUp = last.close >= last.open;
  const ticks = Array.from({ length: 5 }, (_, i) => lo + ((hi - lo) * (i + 0.5)) / 5);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} preserveAspectRatio="none" aria-hidden="true">
      <rect width={width} height={height} fill={c.bg} />
      {ticks.map((t) => (
        <line key={t} x1="0" x2={plotW} y1={y(t)} y2={y(t)} stroke={c.grid} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1={(plotW / 6) * (i + 0.5)} x2={(plotW / 6) * (i + 0.5)} y1="0" y2={height} stroke={c.grid} />
      ))}

      {candles.map((k, i) => {
        const up = k.close >= k.open;
        const x = (i + 0.5) * step;
        const color = up ? c.up : c.down;
        return (
          <g key={i}>
            <rect x={x - bodyW / 2} y={volTop + volH * (1 - k.volume)} width={bodyW} height={volH * k.volume} fill={color} opacity="0.28" />
            <line x1={x} x2={x} y1={y(k.high)} y2={y(k.low)} stroke={color} strokeWidth="1" />
            <rect
              x={x - bodyW / 2}
              y={y(Math.max(k.open, k.close))}
              width={bodyW}
              height={Math.max(1, Math.abs(y(k.open) - y(k.close)))}
              fill={color}
            />
          </g>
        );
      })}

      <path d={maPath} fill="none" stroke={c.ma} strokeWidth="1.4" opacity="0.85" />
      <line x1="0" x2={plotW} y1={y(last.close)} y2={y(last.close)} stroke={lastUp ? c.up : c.down} strokeDasharray="2 3" />

      {scale && (
        <g fontFamily="var(--font-sans)" fontSize="10" fill={c.text}>
          <line x1={plotW} x2={plotW} y1="0" y2={height} stroke={c.grid} />
          {ticks.map((t) => (
            <text key={t} x={plotW + 8} y={y(t) + 3.5}>{t.toFixed(decimals)}</text>
          ))}
          <rect x={plotW + 2} y={y(last.close) - 9} width={axisW - 4} height="18" rx="3" fill={lastUp ? c.up : c.down} />
          <text x={plotW + 8} y={y(last.close) + 3.5} fill="#ffffff" fontWeight="600">{last.close.toFixed(decimals)}</text>
        </g>
      )}
    </svg>
  );
}
