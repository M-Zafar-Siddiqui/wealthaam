// StrategyDetail.tsx
// Design: Dark cosmic theme — #07111d bg, coral/teal/green accents, Helvetica/Arial
// Layout: Full-width eCOST chart (left) + compact AAM metrics box (right)
// Trade history table below charts

import { useState, useRef, useCallback, useMemo } from "react";
import { Link, useParams } from "wouter";

// ─── Types ────────────────────────────────────────────────────────────────────
type TradeType = "buy" | "rebalance" | "compound";
interface Trade {
  id: number;
  date: string;
  type: TradeType;
  price: number;
  qty: number;
  cumQty: number;
  ecost: number;
  pnl: number;
}

// ─── Strategy Definitions ─────────────────────────────────────────────────────
const STRATEGIES: Record<string, {
  id: string; asset: string; symbol: string; timeframe: string; riskLevel: string;
  initialCapital: number; initialQty: number; currentPrice: number;
  aarPct: number; saai: number; qMultiple: number; winRate: number;
  profitFactor: number; maxDD: number; totalTrades: number;
  trades: Trade[];
}> = {
  "720003": {
    id: "720003", asset: "Ethereum", symbol: "ETH", timeframe: "12h", riskLevel: "Low",
    initialCapital: 10000, initialQty: 4.348, currentPrice: 2300,
    aarPct: 22.4, saai: 1.84, qMultiple: 3.12, winRate: 67.8,
    profitFactor: 8.4, maxDD: 12.3, totalTrades: 48,
    trades: generateTrades("ETH", 4.348, 2300, 48),
  },
  "720007": {
    id: "720007", asset: "Bitcoin", symbol: "BTC", timeframe: "8h", riskLevel: "Low",
    initialCapital: 10000, initialQty: 0.1239, currentPrice: 80700,
    aarPct: 18.1, saai: 1.62, qMultiple: 2.58, winRate: 71.2,
    profitFactor: 9.1, maxDD: 9.8, totalTrades: 36,
    trades: generateTrades("BTC", 0.1239, 80700, 36),
  },
  "720012": {
    id: "720012", asset: "Solana", symbol: "SOL", timeframe: "6h", riskLevel: "Low",
    initialCapital: 10000, initialQty: 107.2, currentPrice: 93.29,
    aarPct: 31.0, saai: 2.14, qMultiple: 4.20, winRate: 63.4,
    profitFactor: 7.2, maxDD: 18.1, totalTrades: 62,
    trades: generateTrades("SOL", 107.2, 93.29, 62),
  },
};

function generateTrades(symbol: string, initQty: number, currentPrice: number, count: number): Trade[] {
  const trades: Trade[] = [];
  const startDate = new Date("2024-01-15");
  let cumQty = initQty;
  let ecost = currentPrice * 1.45; // start above market
  const types: TradeType[] = ["buy", "buy", "buy", "rebalance", "buy", "compound"];

  for (let i = 0; i < count; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + Math.floor((i / count) * 365));
    const type = types[i % types.length];
    const priceNoise = 0.85 + Math.random() * 0.3;
    const price = currentPrice * priceNoise * (1 - i * 0.003);
    const qtyAdded = initQty * (0.02 + Math.random() * 0.04);
    cumQty += qtyAdded;
    ecost = Math.max(currentPrice * 0.52, ecost * (1 - 0.018 - Math.random() * 0.01));
    const pnl = (price - ecost) * qtyAdded;
    trades.push({
      id: i + 1,
      date: d.toISOString().split("T")[0],
      type,
      price: Math.round(price * 100) / 100,
      qty: Math.round(qtyAdded * 10000) / 10000,
      cumQty: Math.round(cumQty * 10000) / 10000,
      ecost: Math.round(ecost * 100) / 100,
      pnl: Math.round(pnl * 100) / 100,
    });
  }
  return trades;
}

// ─── Metric Prefix Helper ─────────────────────────────────────────────────────
function MP({ prefix, name, color = "#F87171" }: { prefix: string; name: string; color?: string }) {
  return (
    <span>
      <span style={{ color, fontStyle: "italic", fontWeight: 900 }}>{prefix}</span>
      <span>{name}</span>
    </span>
  );
}

// ─── eCOST Chart ─────────────────────────────────────────────────────────────
function ECostDetailChart({ trades, currentPrice, timeframe, setTimeframe }: {
  trades: Trade[];
  currentPrice: number;
  timeframe: string;
  setTimeframe: (tf: string) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const W = 680; const H = 280;
  const PAD = { t: 24, r: 24, b: 40, l: 60 };
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;

  // Window filter
  const [window, setWindow] = useState<"3M" | "6M" | "1Y">("1Y");
  const cutoff = useMemo(() => {
    const d = new Date(trades[trades.length - 1]?.date ?? new Date());
    if (window === "3M") d.setMonth(d.getMonth() - 3);
    else if (window === "6M") d.setMonth(d.getMonth() - 6);
    else d.setFullYear(d.getFullYear() - 1);
    return d;
  }, [window, trades]);

  const filtered = useMemo(() => trades.filter(t => new Date(t.date) >= cutoff), [trades, cutoff]);

  const allPrices = [...filtered.map(t => t.ecost), ...filtered.map(t => t.price), currentPrice];
  const maxP = Math.max(...allPrices) * 1.06;
  const minP = Math.min(...allPrices) * 0.94;
  const yScale = (v: number) => innerH - ((v - minP) / (maxP - minP)) * innerH;
  const xScale = (i: number) => (i / Math.max(filtered.length - 1, 1)) * innerW;

  // Stepped qty line (normalized to price range for display)
  const maxQty = Math.max(...filtered.map(t => t.cumQty));
  const minQty = Math.min(...filtered.map(t => t.cumQty));
  const qtyToY = (q: number) => innerH - ((q - minQty) / Math.max(maxQty - minQty, 0.001)) * innerH * 0.6 - innerH * 0.1;

  const ecostPath = filtered.map((t, i) => `${i === 0 ? "M" : "L"}${PAD.l + xScale(i)},${PAD.t + yScale(t.ecost)}`).join(" ");
  const pricePath = filtered.map((t, i) => `${i === 0 ? "M" : "L"}${PAD.l + xScale(i)},${PAD.t + yScale(t.price)}`).join(" ");

  // Stepped qty path
  const steppedQtyPath = filtered.map((t, i) => {
    if (i === 0) return `M${PAD.l + xScale(i)},${PAD.t + qtyToY(t.cumQty)}`;
    const prevX = PAD.l + xScale(i - 1);
    const currX = PAD.l + xScale(i);
    const currY = PAD.t + qtyToY(t.cumQty);
    return `H${currX} V${currY}`;
  }).join(" ");

  // eCOST fill area
  const ecostFill = [
    ...filtered.map((t, i) => `${i === 0 ? "M" : "L"}${PAD.l + xScale(i)},${PAD.t + yScale(t.ecost)}`),
    `L${PAD.l + innerW},${PAD.t + innerH}`,
    `L${PAD.l},${PAD.t + innerH}`,
    "Z"
  ].join(" ");

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || filtered.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) * (W / rect.width) - PAD.l;
    const idx = Math.round((relX / innerW) * (filtered.length - 1));
    setHovered(Math.max(0, Math.min(filtered.length - 1, idx)));
  }, [filtered.length, innerW]);

  const tradeTypeColor: Record<TradeType, string> = { buy: "#60a5fa", rebalance: "#F59E0B", compound: "#22c55e" };

  // Y ticks
  const yTicks = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => minP + (i / 4) * (maxP - minP));
  }, [minP, maxP]);

  const formatPrice = (v: number) => v >= 1000 ? `$${(v/1000).toFixed(1)}K` : `$${v.toFixed(0)}`;

  // X-axis labels (every ~5 trades)
  const xLabelStep = Math.max(1, Math.floor(filtered.length / 6));
  const xLabels = filtered.filter((_, i) => i % xLabelStep === 0 || i === filtered.length - 1);

  return (
    <div>
      {/* Chart controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ display: "flex", gap: 4 }}>
          {(["3M", "6M", "1Y"] as const).map(w => (
            <button
              key={w}
              onClick={() => setWindow(w)}
              style={{
                padding: "3px 10px", fontSize: 10, fontWeight: 700, fontFamily: "Helvetica, Arial, sans-serif",
                borderRadius: 5, border: window === w ? "1px solid #F87171" : "1px solid #1a3044",
                background: window === w ? "rgba(248,113,113,0.12)" : "transparent",
                color: window === w ? "#F87171" : "#4a5568", cursor: "pointer",
              }}
            >{w}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 10, color: "#4a5568" }}>
          <span><span style={{ display: "inline-block", width: 12, height: 2, background: "#F87171", verticalAlign: "middle", marginRight: 4 }} />eCOST</span>
          <span><span style={{ display: "inline-block", width: 12, height: 2, background: "#60a5fa", borderTop: "2px dashed #60a5fa", verticalAlign: "middle", marginRight: 4 }} />Market Price</span>
          <span><span style={{ display: "inline-block", width: 12, height: 2, background: "#22c55e", verticalAlign: "middle", marginRight: 4 }} />Qty (stepped)</span>
          <span>◆ <span style={{ color: "#60a5fa" }}>Buy</span> ◆ <span style={{ color: "#F59E0B" }}>Rebalance</span> ◆ <span style={{ color: "#22c55e" }}>Compound</span></span>
        </div>
      </div>

      <svg
        ref={svgRef}
        width={W} height={H}
        viewBox={`0 0 ${W} ${H}`}
        style={{ display: "block", maxWidth: "100%", cursor: "crosshair" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHovered(null)}
      >
        <defs>
          <linearGradient id="ecostFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F87171" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#F87171" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {yTicks.map((v, i) => (
          <g key={i}>
            <line x1={PAD.l} y1={PAD.t + yScale(v)} x2={PAD.l + innerW} y2={PAD.t + yScale(v)}
              stroke="#1a3044" strokeWidth={1} strokeDasharray="3 4" />
            <text x={PAD.l - 6} y={PAD.t + yScale(v) + 4} textAnchor="end" fill="#4a5568" fontSize={9} fontFamily="Arial">{formatPrice(v)}</text>
          </g>
        ))}

        {/* Current market price line */}
        <line
          x1={PAD.l} y1={PAD.t + yScale(currentPrice)}
          x2={PAD.l + innerW} y2={PAD.t + yScale(currentPrice)}
          stroke="#60a5fa" strokeWidth={1} strokeDasharray="6 3" opacity={0.6}
        />
        <text x={PAD.l + innerW - 2} y={PAD.t + yScale(currentPrice) - 4} textAnchor="end" fill="#60a5fa" fontSize={9} fontFamily="Arial">Market ${currentPrice.toLocaleString()}</text>

        {/* X-axis labels */}
        {xLabels.map((t, i) => {
          const origIdx = filtered.indexOf(t);
          return (
            <text key={i} x={PAD.l + xScale(origIdx)} y={H - 6} textAnchor="middle" fill="#4a5568" fontSize={8} fontFamily="Arial">
              {t.date.slice(5)}
            </text>
          );
        })}

        {/* eCOST fill */}
        <path d={ecostFill} fill="url(#ecostFill)" />

        {/* Stepped Qty line */}
        <path d={steppedQtyPath} fill="none" stroke="#22c55e" strokeWidth={1.5} opacity={0.6} />

        {/* Market price path */}
        <path d={pricePath} fill="none" stroke="#60a5fa" strokeWidth={1.5} strokeDasharray="5 3" opacity={0.7} />

        {/* eCOST path */}
        <path d={ecostPath} fill="none" stroke="#F87171" strokeWidth={2.5} />

        {/* Trade markers (diamonds) */}
        {filtered.map((t, i) => {
          const cx = PAD.l + xScale(i);
          const cy = PAD.t + yScale(t.ecost);
          const col = tradeTypeColor[t.type];
          const isHov = hovered === i;
          const s = isHov ? 6 : 4;
          return (
            <polygon
              key={t.id}
              points={`${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`}
              fill={col}
              stroke={isHov ? "#fff" : "#07111d"}
              strokeWidth={isHov ? 1.5 : 0.8}
              opacity={isHov ? 1 : 0.85}
            />
          );
        })}

        {/* Hover crosshair + tooltip */}
        {hovered !== null && filtered[hovered] && (() => {
          const t = filtered[hovered];
          const cx = PAD.l + xScale(hovered);
          const tooltipX = Math.min(cx + 12, W - 160);
          const tooltipY = 28;
          const ecostReduction = ((1 - t.ecost / filtered[0].ecost) * 100).toFixed(1);
          return (
            <g>
              <line x1={cx} y1={PAD.t} x2={cx} y2={PAD.t + innerH}
                stroke="rgba(255,255,255,0.1)" strokeWidth={1} strokeDasharray="3 3" />
              {/* Gap indicator */}
              <line
                x1={cx} y1={PAD.t + yScale(t.ecost)}
                x2={cx} y2={PAD.t + yScale(t.price)}
                stroke="#a78bfa" strokeWidth={1} strokeDasharray="2 2" opacity={0.5}
              />
              {/* Tooltip */}
              <rect x={tooltipX} y={tooltipY} width={148} height={110} rx={6}
                fill="#07111d" stroke="#2a4060" strokeWidth={1} />
              <text x={tooltipX + 8} y={tooltipY + 14} fill="#e2e8f0" fontSize={9} fontFamily="Arial" fontWeight="700">{t.date} · Trade #{t.id}</text>
              <rect x={tooltipX + 8} y={tooltipY + 19} width={50} height={12} rx={4}
                fill={`${tradeTypeColor[t.type]}22`} />
              <text x={tooltipX + 12} y={tooltipY + 29} fill={tradeTypeColor[t.type]} fontSize={8} fontFamily="Arial" fontWeight="700">{t.type.toUpperCase()}</text>
              <text x={tooltipX + 8} y={tooltipY + 46} fill="#F87171" fontSize={9} fontFamily="Arial">eCOST: {formatPrice(t.ecost)}</text>
              <text x={tooltipX + 8} y={tooltipY + 59} fill="#60a5fa" fontSize={9} fontFamily="Arial">Price: {formatPrice(t.price)}</text>
              <text x={tooltipX + 8} y={tooltipY + 72} fill="#22c55e" fontSize={9} fontFamily="Arial">Qty: {t.cumQty.toFixed(4)}</text>
              <text x={tooltipX + 8} y={tooltipY + 85} fill="#a78bfa" fontSize={9} fontFamily="Arial">Gap: {((t.price / t.ecost - 1) * 100).toFixed(1)}%</text>
              <text x={tooltipX + 8} y={tooltipY + 98} fill="#4a5568" fontSize={8} fontFamily="Arial">eCOST −{ecostReduction}% from start</text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}

// ─── AAM Metrics Box ──────────────────────────────────────────────────────────
function AAMMetricsBox({ strategy }: { strategy: typeof STRATEGIES[string] }) {
  const ecostReduction = ((1 - strategy.trades[strategy.trades.length - 1]?.ecost / strategy.trades[0]?.ecost) * 100) || 0;
  const currentQty = strategy.trades[strategy.trades.length - 1]?.cumQty ?? strategy.initialQty;
  const qtyAccumulated = currentQty - strategy.initialQty;
  const currentValue = currentQty * strategy.currentPrice;
  const initialValue = strategy.initialCapital;
  const unrealizedPnl = currentValue - initialValue;

  const metrics = [
    { label: <MP prefix="a" name="RATE%" />, value: `${strategy.aarPct.toFixed(1)}%`, color: "#2dd4bf", desc: "Annual Asset Accumulation Rate" },
    { label: <MP prefix="q" name="MULTIPLE" />, value: `${strategy.qMultiple.toFixed(2)}×`, color: "#a78bfa", desc: "Quantity Multiple vs initial" },
    { label: "SAAI", value: strategy.saai.toFixed(2), color: "#22c55e", desc: "Smoothed Accumulation Advantage Index" },
    { label: "Win Rate", value: `${strategy.winRate.toFixed(1)}%`, color: "#60a5fa", desc: "Percentage of profitable trades" },
    { label: "Profit Factor", value: strategy.profitFactor.toFixed(1), color: "#F59E0B", desc: "Gross profit / Gross loss" },
    { label: "Max DD", value: `${strategy.maxDD.toFixed(1)}%`, color: "#F87171", desc: "Maximum equity drawdown" },
    { label: "eCOST −%", value: `${ecostReduction.toFixed(1)}%`, color: "#2dd4bf", desc: "eCOST reduction from initial" },
    { label: "Qty Accumulated", value: `+${qtyAccumulated.toFixed(4)}`, color: "#22c55e", desc: `${strategy.symbol} accumulated above initial` },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {/* Value summary */}
      <div style={{ background: "#0a1929", border: "1px solid #1a3044", borderRadius: 8, padding: "12px 14px" }}>
        <div style={{ fontSize: 10, color: "#4a5568", marginBottom: 4 }}>Current Portfolio Value</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#e2e8f0", fontFamily: "Helvetica, Arial, sans-serif" }}>
          ${currentValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </div>
        <div style={{ fontSize: 11, color: unrealizedPnl >= 0 ? "#22c55e" : "#F87171", marginTop: 3 }}>
          {unrealizedPnl >= 0 ? "+" : ""}${unrealizedPnl.toLocaleString(undefined, { maximumFractionDigits: 0 })} unrealized
        </div>
      </div>

      {/* Qty display */}
      <div style={{ background: "#0a1929", border: "1px solid #1a3044", borderRadius: 8, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#4a5568", marginBottom: 2 }}>Asset Quantity</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#22c55e", fontFamily: "Helvetica, Arial, sans-serif" }}>
          {currentQty.toFixed(4)} <span style={{ fontSize: 12, color: "#4a5568" }}>{strategy.symbol}</span>
        </div>
        <div style={{ fontSize: 10, color: "#4a5568" }}>Initial: {strategy.initialQty.toFixed(4)} {strategy.symbol}</div>
      </div>

      {/* Metrics grid */}
      {metrics.map((m, i) => (
        <div key={i} style={{
          background: "#0a1929", border: "1px solid #1a3044", borderRadius: 8, padding: "9px 14px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: 10, color: "#4a5568", marginBottom: 1 }}>{m.label}</div>
            <div style={{ fontSize: 9, color: "#2a4060" }}>{m.desc}</div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: m.color, fontFamily: "Helvetica, Arial, sans-serif" }}>{m.value}</div>
        </div>
      ))}

      {/* Risk badge */}
      <div style={{ background: "#0a1929", border: "1px solid #1a3044", borderRadius: 8, padding: "9px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, color: "#4a5568" }}>Risk Level</span>
        <span style={{
          fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 10,
          background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)",
        }}>{strategy.riskLevel} Risk</span>
      </div>

      {/* Snowball link */}
      <Link href="/snowball" style={{ textDecoration: "none" }}>
        <button style={{
          width: "100%", padding: "10px", fontSize: 11, fontWeight: 700, fontFamily: "Helvetica, Arial, sans-serif",
          borderRadius: 8, border: "1px solid rgba(45,212,191,0.3)", background: "rgba(45,212,191,0.08)",
          color: "#2dd4bf", cursor: "pointer",
        }}>
          ❄ Project with Snowball Calculator →
        </button>
      </Link>
    </div>
  );
}

// ─── Trade History Table ──────────────────────────────────────────────────────
function TradeHistoryTable({ trades, symbol }: { trades: Trade[]; symbol: string }) {
  const [page, setPage] = useState(0);
  const perPage = 10;
  const totalPages = Math.ceil(trades.length / perPage);
  const visible = [...trades].reverse().slice(page * perPage, (page + 1) * perPage);
  const totalPnl = trades.reduce((s, t) => s + t.pnl, 0);

  const typeColor: Record<TradeType, string> = { buy: "#60a5fa", rebalance: "#F59E0B", compound: "#22c55e" };
  const thStyle: React.CSSProperties = { fontSize: 9, color: "#4a5568", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "8px 10px", textAlign: "left", borderBottom: "1px solid #1a3044" };
  const tdStyle: React.CSSProperties = { fontSize: 11, color: "#e2e8f0", padding: "8px 10px", borderBottom: "1px solid #0d1f2d" };

  return (
    <div style={{ background: "#0d1f2d", border: "1px solid #1a3044", borderRadius: 10, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #1a3044", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0" }}>Trade History</div>
        <div style={{ fontSize: 12, color: totalPnl >= 0 ? "#22c55e" : "#F87171", fontWeight: 700 }}>
          Total P/L: {totalPnl >= 0 ? "+" : ""}${totalPnl.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Type</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Price</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Qty Added</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Cum. Qty ({symbol})</th>
              <th style={{ ...thStyle, textAlign: "right" }}>eCOST</th>
              <th style={{ ...thStyle, textAlign: "right" }}>P/L</th>
            </tr>
          </thead>
          <tbody>
            {visible.map(t => (
              <tr key={t.id} style={{ background: "transparent" }}>
                <td style={{ ...tdStyle, color: "#4a5568" }}>{t.id}</td>
                <td style={tdStyle}>{t.date}</td>
                <td style={tdStyle}>
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 8,
                    background: `${typeColor[t.type]}18`, color: typeColor[t.type],
                    border: `1px solid ${typeColor[t.type]}33`,
                  }}>{t.type.toUpperCase()}</span>
                </td>
                <td style={{ ...tdStyle, textAlign: "right" }}>${t.price.toLocaleString()}</td>
                <td style={{ ...tdStyle, textAlign: "right", color: "#22c55e" }}>+{t.qty.toFixed(4)}</td>
                <td style={{ ...tdStyle, textAlign: "right" }}>
                  <div style={{ fontWeight: 700 }}>{t.cumQty.toFixed(4)}</div>
                </td>
                <td style={{ ...tdStyle, textAlign: "right", color: "#F87171" }}>${t.ecost.toLocaleString()}</td>
                <td style={{ ...tdStyle, textAlign: "right", color: t.pnl >= 0 ? "#22c55e" : "#F87171" }}>
                  {t.pnl >= 0 ? "+" : ""}${t.pnl.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div style={{ padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #1a3044" }}>
        <span style={{ fontSize: 10, color: "#4a5568" }}>Showing {page * perPage + 1}–{Math.min((page + 1) * perPage, trades.length)} of {trades.length} trades</span>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
            style={{ padding: "4px 10px", fontSize: 10, borderRadius: 5, border: "1px solid #1a3044", background: "transparent", color: page === 0 ? "#2a4060" : "#4a5568", cursor: page === 0 ? "not-allowed" : "pointer" }}>
            ← Prev
          </button>
          <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
            style={{ padding: "4px 10px", fontSize: 10, borderRadius: 5, border: "1px solid #1a3044", background: "transparent", color: page >= totalPages - 1 ? "#2a4060" : "#4a5568", cursor: page >= totalPages - 1 ? "not-allowed" : "pointer" }}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function StrategyDetail() {
  const params = useParams<{ id: string }>();
  const id = params.id ?? "720003";
  const strategy = STRATEGIES[id] ?? STRATEGIES["720003"];
  const [timeframe, setTimeframe] = useState(strategy.timeframe);
  const [activeTab, setActiveTab] = useState<"ecost" | "accumulation">("ecost");

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "7px 16px", fontSize: 11, fontWeight: 700, fontFamily: "Helvetica, Arial, sans-serif",
    borderRadius: "6px 6px 0 0", border: "none", cursor: "pointer",
    background: active ? "#0d1f2d" : "transparent",
    color: active ? "#e2e8f0" : "#4a5568",
    borderBottom: active ? "2px solid #F87171" : "2px solid transparent",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#07111d", color: "#e2e8f0", fontFamily: "Helvetica, Arial, sans-serif" }}>
      {/* Top nav */}
      <div style={{ background: "#0a1929", borderBottom: "1px solid #1a3044", padding: "12px 24px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/dashboard" style={{ textDecoration: "none", color: "#4a5568", fontSize: 11 }}>← Dashboard</Link>
        <span style={{ color: "#1a3044" }}>|</span>
        <span style={{ fontSize: 11, color: "#4a5568" }}>Strategy Analytics</span>
        <span style={{ color: "#1a3044" }}>|</span>
        <span style={{ fontSize: 11, color: "#e2e8f0", fontWeight: 700 }}>{strategy.asset} · {strategy.timeframe} · #{strategy.id}</span>
        <div style={{ marginLeft: "auto" }}>
          <span style={{
            fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 10,
            background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)",
          }}>HIGH TIMEFRAME</span>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>
        {/* Strategy header */}
        <div style={{ marginBottom: 20, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#e2e8f0", fontFamily: "Helvetica, Arial, sans-serif" }}>
              {strategy.asset} / USDT &nbsp;
              <span style={{ fontSize: 13, color: "#4a5568", fontWeight: 400 }}>{strategy.timeframe} · EMC Strategy</span>
            </h1>
            <div style={{ marginTop: 6, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 10, color: "#4a5568" }}>Strategy ID: <strong style={{ color: "#e2e8f0" }}>#{strategy.id}</strong></span>
              <span style={{ fontSize: 10, color: "#4a5568" }}>Trades: <strong style={{ color: "#e2e8f0" }}>{strategy.totalTrades}</strong></span>
              <span style={{ fontSize: 10, color: "#4a5568" }}>Initial Capital: <strong style={{ color: "#e2e8f0" }}>${strategy.initialCapital.toLocaleString()}</strong></span>
              <span style={{ fontSize: 10, color: "#4a5568" }}>Current Price: <strong style={{ color: "#60a5fa" }}>${strategy.currentPrice.toLocaleString()}</strong></span>
            </div>
          </div>
          <Link href="/snowball" style={{ textDecoration: "none" }}>
            <button style={{
              padding: "8px 16px", fontSize: 11, fontWeight: 700, fontFamily: "Helvetica, Arial, sans-serif",
              borderRadius: 8, border: "1px solid rgba(45,212,191,0.3)", background: "rgba(45,212,191,0.08)",
              color: "#2dd4bf", cursor: "pointer",
            }}>❄ Snowball Projection</button>
          </Link>
        </div>

        {/* Main layout: chart + metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16, alignItems: "start", marginBottom: 20 }}>
          {/* Chart panel */}
          <div style={{ background: "#0d1f2d", border: "1px solid #1a3044", borderRadius: 10, padding: "16px 18px" }}>
            {/* Tabs */}
            <div style={{ display: "flex", gap: 2, marginBottom: 14, borderBottom: "1px solid #1a3044" }}>
              <button style={tabStyle(activeTab === "ecost")} onClick={() => setActiveTab("ecost")}>
                AAM eCOST & Accumulation
              </button>
              <button style={tabStyle(activeTab === "accumulation")} onClick={() => setActiveTab("accumulation")}>
                Qty Growth
              </button>
            </div>
            <ECostDetailChart
              trades={strategy.trades}
              currentPrice={strategy.currentPrice}
              timeframe={timeframe}
              setTimeframe={setTimeframe}
            />
          </div>

          {/* Metrics box */}
          <AAMMetricsBox strategy={strategy} />
        </div>

        {/* Trade History */}
        <TradeHistoryTable trades={strategy.trades} symbol={strategy.symbol} />

        {/* Disclaimer */}
        <div style={{ marginTop: 20, padding: "12px 16px", background: "#0a1929", border: "1px solid #1a3044", borderRadius: 8 }}>
          <p style={{ margin: 0, fontSize: 10, color: "#2a4060", lineHeight: 1.6 }}>
            <strong style={{ color: "#4a5568" }}>Disclaimer:</strong> The AAAQ (Annual Asset Accumulation Quantity) and all AAM metrics displayed are indicative only, based on historical backtest data. They are subject to future market conditions and strategy performance. Past performance does not guarantee future results. This data is for informational and educational purposes only and does not constitute financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}
