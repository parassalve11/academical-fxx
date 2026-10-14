// A teaching chart: a range, then a breakout. Generated deterministically so
// server and client render identical markup.

function rng(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildCandles() {
  const r = rng(7);
  const candles = [];
  let price = 42;
  const RANGE_LOW = 34;
  const RANGE_HIGH = 52;
  for (let i = 0; i < 30; i++) {
    const open = price;
    let close;
    if (i < 17) {
      // Consolidation: bounce between support and resistance.
      const target = i % 6 < 3 ? RANGE_HIGH - 3 : RANGE_LOW + 3;
      close = open + (target - open) * (0.35 + r() * 0.4) + (r() - 0.5) * 4;
      close = Math.min(RANGE_HIGH - 1, Math.max(RANGE_LOW + 1, close));
    } else {
      // Breakout and trend.
      close = open + 1.5 + r() * 4.2 - (i % 4 === 0 ? 4 : 0);
    }
    const high = Math.max(open, close) + r() * 3;
    const low = Math.min(open, close) - r() * 3;
    candles.push({ open, close, high, low });
    price = close;
  }
  return { candles, RANGE_LOW, RANGE_HIGH };
}

const W = 400;
const H = 200;
const MIN = 26;
const MAX = 96;
const y = (p) => H - ((p - MIN) / (MAX - MIN)) * H;

export default function BreakoutChart() {
  const { candles, RANGE_LOW, RANGE_HIGH } = buildCandles();
  const step = W / candles.length;
  const breakoutX = 17 * step;

  return (
    <svg viewBox={`0 0 ${W} ${H + 12}`} className="h-auto w-full" role="img" aria-label="Practice chart: price moves sideways between support and resistance, then breaks out above resistance and trends higher.">
      <defs>
        <linearGradient id="trend" x1="0" x2="1">
          <stop offset="0" stopColor="#0f3c39" stopOpacity="0" />
          <stop offset="1" stopColor="#0f3c39" />
        </linearGradient>
      </defs>

      {/* Range */}
      <rect x="0" y={y(RANGE_HIGH)} width={breakoutX} height={y(RANGE_LOW) - y(RANGE_HIGH)} fill="rgb(15 60 57 / 0.04)" />
      <line x1="0" x2={W} y1={y(RANGE_HIGH)} y2={y(RANGE_HIGH)} stroke="rgb(15 60 57 / 0.4)" strokeDasharray="3 5" />
      <line x1="0" x2={W} y1={y(RANGE_LOW)} y2={y(RANGE_LOW)} stroke="rgb(15 60 57 / 0.25)" strokeDasharray="3 5" />
      <text x="4" y={y(RANGE_HIGH) - 6} className="fill-muted text-[10px] font-medium">Resistance</text>
      <text x="4" y={y(RANGE_LOW) + 14} className="fill-faint text-[10px] font-medium">Support</text>

      {/* Candles */}
      {candles.map((c, i) => {
        const up = c.close >= c.open;
        const cx = i * step + step / 2;
        const top = y(Math.max(c.open, c.close));
        const bottom = y(Math.min(c.open, c.close));
        const color = up ? "var(--color-up)" : "var(--color-down)";
        return (
          <g key={i} className="candle" style={{ animationDelay: `${0.5 + i * 0.045}s` }}>
            <line x1={cx} x2={cx} y1={y(c.high)} y2={y(c.low)} stroke={color} strokeWidth="1.2" opacity="0.8" />
            <rect x={cx - step * 0.3} y={top} width={step * 0.6} height={Math.max(1.5, bottom - top)} rx="1" fill={color} />
          </g>
        );
      })}

      {/* Trend line drawn after the candles land */}
      <path
        pathLength="1"
        className="draw"
        d={`M ${breakoutX - step} ${y(RANGE_HIGH - 2)} L ${W - step / 2} ${y(candles.at(-1).close + 4)}`}
        stroke="url(#trend)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <g className="fade-late">
        <circle cx={breakoutX + step / 2} cy={y(RANGE_HIGH)} r="4" fill="#0f3c39" />
        <circle cx={breakoutX + step / 2} cy={y(RANGE_HIGH)} r="9" fill="none" stroke="#0f3c39" strokeOpacity="0.3" />
        <text x={breakoutX + step / 2 + 12} y={y(RANGE_HIGH) + 16} className="fill-green text-[11px] font-semibold">Breakout</text>
      </g>
    </svg>
  );
}
