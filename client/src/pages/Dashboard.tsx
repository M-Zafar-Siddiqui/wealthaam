/**
 * WealthAAM Dashboard
 * Design Standard:
 * - Fonts: Helvetica (titles/headings), Arial (subtitles, body, tables)
 * - AAM Metric Prefix Grammar: a=teal(#22D3EE), q=gold(#F59E0B), e=coral(#F87171), x=lavender(#A78BFA)
 * - Dark theme: bg #07111d, card #0d1f2d, border #1a3044
 * - Layout: Fixed sidebar + scrollable main content
 */

import { useState, useRef, useCallback } from "react";
import { Link } from "wouter";

// ─── AAM Metric Prefix Colors ───────────────────────────────────────────────
const AAM_COLORS = {
  a: "#22D3EE", // teal  — Asset Behavior
  q: "#F59E0B", // gold  — Quantity Outcome
  e: "#F87171", // coral — Economic Result
  x: "#A78BFA", // lavender — Cross-cutting
};

// ─── Metric Prefix Component ─────────────────────────────────────────────────
function MetricPrefix({ prefix, name }: { prefix: "a" | "q" | "e" | "x"; name: string }) {
  return (
    <span style={{ fontFamily: "Arial, sans-serif", fontSize: "inherit" }}>
      <em style={{ color: AAM_COLORS[prefix], fontStyle: "italic", fontWeight: 700 }}>{prefix}</em>
      <strong style={{ color: "#e2e8f0", fontWeight: 700 }}>{name}</strong>
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const ACTIVE_PATHWAYS = [
  {
    id: "PW-FND-01", name: "Foundation Path",
    tagline: "Core stable accumulation · Large caps · 4h–6h timeframes",
    status: "live", capital: 7750, currentValue: 8442, pnl: 692, pnlPct: 8.93,
    nextSignal: "3h 12m", tradesToday: 4,
    progress: { lbl: "Q1 2026 target", pct: 73, current: "$8,442", target: "$11,500" },
    strategies: ["AS-EMC-4h-SOLUSDT","AS-EMC-4h-XRPUSDT","AS-EMC-4h-LINKUSDT","AS-EMC-4h-SUIUSDT",
      "AS-EMC-1h-SOLUSDT","AS-EMC-1h-XRPUSDT","AS-EMC-1h-LINKUSDT","AS-EMC-6h-ETHUSDT",
      "AS-EMC-6h-BTCUSDT","AS-EMC-2h-DOGEUSDT"],
    color: "#4A90D9",
  },
  {
    id: "PW-BAL-02", name: "Balanced Sandbox",
    tagline: "Diversified mid-cap basket · 12 micro-allocations",
    status: "live", capital: 2400, currentValue: 2548, pnl: 148, pnlPct: 6.17,
    nextSignal: "47m", tradesToday: 2,
    progress: { lbl: "Annual target", pct: 41, current: "$2,548", target: "$3,500" },
    strategies: ["AS-EMC-4h-SOLUSDT","AS-EMC-4h-XRPUSDT","AS-EMC-4h-LINKUSDT","AS-EMC-4h-ENAUSDT",
      "AS-EMC-4h-TAOUSDT","AS-EMC-4h-VIRTUALUSDT","AS-EMC-4h-NEARUSDT","AS-EMC-4h-HBARUSDT",
      "AS-EMC-1h-SOLUSDT","AS-EMC-1h-XRPUSDT","AS-EMC-1h-LINKUSDT","AS-EMC-2h-DOGEUSDT"],
    color: "#7C5CBF",
  },
  {
    id: "PW-DCA-03", name: "Stable DCA Path",
    tagline: "Slow accumulation · BTC + ETH only · 12h cycle",
    status: "paused", capital: 0, currentValue: 0, pnl: 0, pnlPct: 0,
    nextSignal: "—", tradesToday: 0,
    progress: { lbl: "Awaiting funding", pct: 0, current: "$0", target: "$5,000 min" },
    strategies: ["AS-EMC-12h-BTCUSDT","AS-EMC-12h-ETHUSDT","AS-EMC-24h-BTCUSDT","AS-EMC-24h-ETHUSDT"],
    color: "#9B59B6",
  },
];

const HOLDINGS = [
  { asset: "ETH", qty: 1.214, valueUsd: 3614, change7d: 4.2, alloc: 35.6 },
  { asset: "BTC", qty: 0.0184, valueUsd: 1278, change7d: 2.1, alloc: 12.6 },
  { asset: "SOL", qty: 8.42, valueUsd: 1180, change7d: -1.4, alloc: 11.6 },
  { asset: "XRP", qty: 1842, valueUsd: 962, change7d: 6.8, alloc: 9.5 },
  { asset: "LINK", qty: 49.3, valueUsd: 745, change7d: 3.9, alloc: 7.3 },
  { asset: "SUI", qty: 312, valueUsd: 521, change7d: 11.2, alloc: 5.1 },
  { asset: "ENA", qty: 1240, valueUsd: 384, change7d: -3.1, alloc: 3.8 },
  { asset: "TAO", qty: 0.84, valueUsd: 312, change7d: 8.4, alloc: 3.1 },
  { asset: "VIRTUAL", qty: 198, valueUsd: 287, change7d: -5.6, alloc: 2.8 },
  { asset: "NEAR", qty: 38.1, valueUsd: 218, change7d: 1.2, alloc: 2.1 },
  { asset: "DOGE", qty: 1024, valueUsd: 119, change7d: -2.3, alloc: 1.2 },
  { asset: "HBAR", qty: 1432, valueUsd: 100, change7d: 0.8, alloc: 1.0 },
];

const TRADES = [
  { t: "04:08:22", side: "buy", asset: "ETH", strategy: "AS-EMC-6h-ETHUSDT", pathway: "Foundation", qty: 0.0142, price: 2977.40, value: 42.28, status: "filled" },
  { t: "03:45:11", side: "buy", asset: "XRP", strategy: "AS-EMC-4h-XRPUSDT", pathway: "Foundation", qty: 18.42, price: 0.5224, value: 9.62, status: "filled" },
  { t: "02:12:08", side: "sell", asset: "SOL", strategy: "AS-EMC-1h-SOLUSDT", pathway: "Balanced", qty: 0.42, price: 140.18, value: 58.88, status: "filled" },
  { t: "01:34:55", side: "buy", asset: "LINK", strategy: "AS-EMC-4h-LINKUSDT", pathway: "Foundation", qty: 0.812, price: 15.10, value: 12.26, status: "filled" },
  { t: "00:58:01", side: "buy", asset: "SUI", strategy: "AS-EMC-4h-SUIUSDT", pathway: "Foundation", qty: 9.81, price: 1.672, value: 16.40, status: "filled" },
  { t: "23:47:14", side: "sell", asset: "ENA", strategy: "AS-EMC-4h-ENAUSDT", pathway: "Balanced", qty: 28.4, price: 0.310, value: 8.80, status: "filled" },
  { t: "22:18:42", side: "buy", asset: "TAO", strategy: "AS-EMC-4h-TAOUSDT", pathway: "Balanced", qty: 0.018, price: 371.40, value: 6.69, status: "filled" },
  { t: "21:02:30", side: "buy", asset: "BTC", strategy: "AS-EMC-6h-BTCUSDT", pathway: "Foundation", qty: 0.00018, price: 69460.00, value: 12.50, status: "filled" },
  { t: "04:15:00", side: "buy", asset: "HBAR", strategy: "AS-EMC-4h-HBARUSDT", pathway: "Balanced", qty: 92.3, price: 0.0698, value: 6.44, status: "pending" },
  { t: "04:12:00", side: "buy", asset: "VIRTUAL", strategy: "AS-EMC-4h-VIRTUALUSDT", pathway: "Balanced", qty: 4.42, price: 1.451, value: 6.41, status: "pending" },
];

const REPORTS = [
  { icon: "doc", name: "Monthly Statement", sub: "March 2026 · all pathways", meta: "PDF · 142 KB" },
  { icon: "tax", name: "Tax Report 2025", sub: "FY2025 · realised gains/losses", meta: "CSV + PDF" },
  { icon: "clock", name: "Trade History", sub: "Full ledger · 247 trades YTD", meta: "CSV · 38 KB" },
  { icon: "chart", name: "Performance Summary", sub: "P&L · accumulation by pathway", meta: "PDF · 89 KB" },
];

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: "⊞" },
  { id: "pathways", label: "My Pathways", icon: "◈" },
  { id: "holdings", label: "Holdings", icon: "◎" },
  { id: "trades", label: "Trade Tape", icon: "≡" },
  { id: "reports", label: "Reports", icon: "⊟" },
  { id: "settings", label: "Settings", icon: "⚙" },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  return (
    <aside style={{
      width: 220, minWidth: 220, background: "#07111d",
      borderRight: "1px solid #1a3044", display: "flex", flexDirection: "column",
      height: "100vh", position: "sticky", top: 0, fontFamily: "Arial, sans-serif",
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #1a3044" }}>
        <Link href="/">
          <div style={{ cursor: "pointer" }}>
            <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", letterSpacing: "-0.5px" }}>
              Wealth<span style={{ background: "linear-gradient(90deg,#4A90D9,#D946A8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AAM</span>
            </div>
            <div style={{ fontSize: 10, color: "#4A90D9", marginTop: 2, letterSpacing: "0.08em", textTransform: "uppercase" }}>Dashboard</div>
          </div>
        </Link>
      </div>

      {/* User */}
      <div style={{ padding: "14px 20px", borderBottom: "1px solid #1a3044", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#4A90D9,#D946A8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>ZS</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", fontFamily: "Helvetica, Arial, sans-serif" }}>Zafar S.</div>
          <div style={{ fontSize: 10, color: "#F59E0B", fontWeight: 600, letterSpacing: "0.06em" }}>POWERHOUSE</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
        {NAV_ITEMS.map(item => (
          <button key={item.id} onClick={() => setActive(item.id)} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            padding: "10px 20px", background: active === item.id ? "rgba(74,144,217,0.12)" : "transparent",
            border: "none", borderLeft: active === item.id ? "2px solid #4A90D9" : "2px solid transparent",
            color: active === item.id ? "#4A90D9" : "#8899aa", cursor: "pointer",
            fontSize: 13, fontFamily: "Arial, sans-serif", textAlign: "left",
            transition: "all 0.2s",
          }}>
            <span style={{ fontSize: 14, width: 18, textAlign: "center" }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom links */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid #1a3044" }}>
        <Link href="/hub">
          <div style={{ fontSize: 11, color: "#4A90D9", cursor: "pointer", marginBottom: 6, fontFamily: "Arial, sans-serif" }}>← Back to Hub</div>
        </Link>
        <div style={{ fontSize: 10, color: "#4a5568", fontFamily: "Arial, sans-serif" }}>WealthAAM v2.0 · POWERHOUSE</div>
      </div>
    </aside>
  );
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────
function TopBar() {
  return (
    <div style={{
      height: 56, background: "#07111d", borderBottom: "1px solid #1a3044",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px", position: "sticky", top: 0, zIndex: 10,
      fontFamily: "Arial, sans-serif",
    }}>
      <div>
        <span style={{ fontSize: 11, color: "#4a5568", letterSpacing: "0.08em", textTransform: "uppercase" }}>Portfolio Overview</span>
        <span style={{ fontSize: 11, color: "#1a3044", margin: "0 8px" }}>·</span>
        <span style={{ fontSize: 11, color: "#4a5568" }}>Last updated: 04:08 UTC</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
        <span style={{ fontSize: 12, color: "#22c55e" }}>2 Pathways Live</span>
        <div style={{ width: 1, height: 16, background: "#1a3044" }} />
        <span style={{ fontSize: 12, color: "#8899aa" }}>6 trades today</span>
      </div>
    </div>
  );
}

// ─── Metric Card ─────────────────────────────────────────────────────────────
function MetricCard({ label, value, sub, prefix, accent }: {
  label: string; value: string; sub?: string; prefix?: "a" | "q" | "e" | "x"; accent?: string;
}) {
  const color = prefix ? AAM_COLORS[prefix] : (accent || "#4A90D9");
  return (
    <div style={{
      background: "#0d1f2d", border: "1px solid #1a3044", borderRadius: 10,
      padding: "16px 18px", flex: 1, minWidth: 140,
      borderTop: `2px solid ${color}`,
      fontFamily: "Arial, sans-serif",
    }}>
      <div style={{ fontSize: 10, color: "#4a5568", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
        {prefix ? <MetricPrefix prefix={prefix} name={label} /> : <span style={{ color: "#8899aa" }}>{label}</span>}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "#e2e8f0", fontFamily: "Helvetica, Arial, sans-serif", lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "#4a5568", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ─── eCOST Decay Chart ───────────────────────────────────────────────────────
// Full 12-month dataset with individual trade events
type EcostPoint = {
  month: string; week?: string; eCost: number; price: number; qty: number;
  trades?: number; tradeType?: "buy" | "rebalance" | "compound";
};

// 3-month window: weekly granularity with individual trade events
const ECOST_3M: EcostPoint[] = [
  { month: "Oct W1", eCost: 1.03, price: 3.78, qty: 3.74, trades: 3, tradeType: "buy" },
  { month: "Oct W2", eCost: 0.99, price: 3.85, qty: 3.91, trades: 2, tradeType: "buy" },
  { month: "Oct W3", eCost: 0.96, price: 3.72, qty: 4.02, trades: 4, tradeType: "compound" },
  { month: "Oct W4", eCost: 0.93, price: 3.91, qty: 4.15, trades: 2, tradeType: "buy" },
  { month: "Nov W1", eCost: 0.91, price: 4.05, qty: 4.22, trades: 3, tradeType: "buy" },
  { month: "Nov W2", eCost: 0.89, price: 4.12, qty: 4.31, trades: 2, tradeType: "rebalance" },
  { month: "Nov W3", eCost: 0.87, price: 4.08, qty: 4.40, trades: 3, tradeType: "buy" },
  { month: "Nov W4", eCost: 0.84, price: 4.19, qty: 4.52, trades: 4, tradeType: "compound" },
  { month: "Dec W1", eCost: 0.82, price: 4.22, qty: 4.63, trades: 2, tradeType: "buy" },
  { month: "Dec W2", eCost: 0.80, price: 4.25, qty: 4.74, trades: 3, tradeType: "buy" },
  { month: "Dec W3", eCost: 0.78, price: 4.27, qty: 4.88, trades: 2, tradeType: "rebalance" },
  { month: "Dec W4", eCost: 0.76, price: 4.28, qty: 5.01, trades: 4, tradeType: "compound" },
];

// 6-month window: bi-weekly with trade events
const ECOST_6M: EcostPoint[] = [
  { month: "Jul", eCost: 1.52, price: 3.45, qty: 2.48, trades: 6, tradeType: "buy" },
  { month: "Jul+", eCost: 1.44, price: 3.52, qty: 2.64, trades: 5, tradeType: "compound" },
  { month: "Aug", eCost: 1.34, price: 3.62, qty: 2.87, trades: 7, tradeType: "buy" },
  { month: "Aug+", eCost: 1.27, price: 3.55, qty: 3.02, trades: 4, tradeType: "rebalance" },
  { month: "Sep", eCost: 1.18, price: 3.31, qty: 3.22, trades: 6, tradeType: "buy" },
  { month: "Sep+", eCost: 1.12, price: 3.48, qty: 3.44, trades: 5, tradeType: "compound" },
  { month: "Oct", eCost: 1.03, price: 3.78, qty: 3.74, trades: 8, tradeType: "buy" },
  { month: "Oct+", eCost: 0.96, price: 3.88, qty: 4.02, trades: 5, tradeType: "buy" },
  { month: "Nov", eCost: 0.89, price: 4.12, qty: 4.31, trades: 7, tradeType: "compound" },
  { month: "Nov+", eCost: 0.84, price: 4.18, qty: 4.55, trades: 4, tradeType: "rebalance" },
  { month: "Dec", eCost: 0.79, price: 4.26, qty: 4.82, trades: 6, tradeType: "buy" },
  { month: "Dec+", eCost: 0.76, price: 4.28, qty: 5.01, trades: 5, tradeType: "compound" },
];

// 1-year window: monthly
const ECOST_1Y: EcostPoint[] = [
  { month: "Jan", eCost: 2.84, price: 2.84, qty: 1.00, trades: 4, tradeType: "buy" },
  { month: "Feb", eCost: 2.61, price: 2.95, qty: 1.18, trades: 5, tradeType: "buy" },
  { month: "Mar", eCost: 2.38, price: 2.71, qty: 1.37, trades: 6, tradeType: "compound" },
  { month: "Apr", eCost: 2.12, price: 3.10, qty: 1.62, trades: 7, tradeType: "buy" },
  { month: "May", eCost: 1.94, price: 3.24, qty: 1.84, trades: 5, tradeType: "rebalance" },
  { month: "Jun", eCost: 1.71, price: 2.88, qty: 2.14, trades: 8, tradeType: "buy" },
  { month: "Jul", eCost: 1.52, price: 3.45, qty: 2.48, trades: 6, tradeType: "compound" },
  { month: "Aug", eCost: 1.34, price: 3.62, qty: 2.87, trades: 7, tradeType: "buy" },
  { month: "Sep", eCost: 1.18, price: 3.31, qty: 3.22, trades: 6, tradeType: "buy" },
  { month: "Oct", eCost: 1.03, price: 3.78, qty: 3.74, trades: 8, tradeType: "compound" },
  { month: "Nov", eCost: 0.89, price: 4.12, qty: 4.31, trades: 7, tradeType: "rebalance" },
  { month: "Dec", eCost: 0.76, price: 4.28, qty: 5.01, trades: 9, tradeType: "compound" },
];

const ECOST_WINDOWS = { "3M": ECOST_3M, "6M": ECOST_6M, "1Y": ECOST_1Y } as const;
type EcostWindow = keyof typeof ECOST_WINDOWS;

const TRADE_COLORS: Record<string, string> = {
  buy: "#4A90D9",
  rebalance: "#F59E0B",
  compound: "#22c55e",
};

// Tooltip data derived from a dataset slice
function getTooltipData(d: EcostPoint, initial: EcostPoint) {
  const reductionPct = (((initial.eCost - d.eCost) / initial.eCost) * 100).toFixed(1);
  const gapPct = (((d.price - d.eCost) / d.price) * 100).toFixed(1);
  const qtyGain = ((d.qty / initial.qty - 1) * 100).toFixed(0);
  return { ...d, reductionPct, gapPct, qtyGain };
}

function ECostChart() {
  const [window, setWindow] = useState<EcostWindow>("1Y");
  const [hovered, setHovered] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const DATA = ECOST_WINDOWS[window];
  const W = 560; const H = 210; const PAD = { t: 20, r: 16, b: 32, l: 44 };
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;
  const n = DATA.length;
  const maxPrice = Math.max(...DATA.map(d => d.price));
  const yMax = Math.max(maxPrice, DATA[0].eCost) * 1.12;
  const xStep = innerW / (n - 1);
  const yScale = (v: number) => innerH - (v / yMax) * innerH;

  // Smooth eCOST curve path
  const eCostPath = DATA.map((d, i) => `${i === 0 ? "M" : "L"}${PAD.l + i * xStep},${PAD.t + yScale(d.eCost)}`).join(" ");
  const pricePath = DATA.map((d, i) => `${i === 0 ? "M" : "L"}${PAD.l + i * xStep},${PAD.t + yScale(d.price)}`).join(" ");
  const eCostArea = eCostPath + ` L${PAD.l + (n-1)*xStep},${PAD.t + innerH} L${PAD.l},${PAD.t + innerH} Z`;

  // Stepped qty path (staircase — reflects incremental trade accumulation)
  const qtyMax = Math.max(...DATA.map(d => d.qty)) * 1.1;
  const qtyScale = (v: number) => innerH - (v / qtyMax) * innerH;
  const qtyStepPath = DATA.map((d, i) => {
    const cx = PAD.l + i * xStep;
    const cy = PAD.t + qtyScale(d.qty);
    if (i === 0) return `M${cx},${cy}`;
    const prevCx = PAD.l + (i - 1) * xStep;
    return `L${cx},${PAD.t + qtyScale(DATA[i-1].qty)} L${cx},${cy}`;
  }).join(" ");

  const handleMouseEnter = useCallback((i: number, svgX: number, svgY: number) => {
    setHovered(i);
    if (containerRef.current) {
      const svgEl = containerRef.current.querySelector("svg");
      if (svgEl) {
        const svgRect = svgEl.getBoundingClientRect();
        const scaleX = svgRect.width / W;
        setTooltipPos({ x: svgX * scaleX, y: svgY * (svgRect.height / H) });
      }
    }
  }, [W, H]);

  const tooltipData = hovered !== null ? getTooltipData(DATA[hovered], DATA[0]) : null;

  // Summary stats from current window
  const first = DATA[0]; const last = DATA[DATA.length - 1];
  const reductionPct = (((first.eCost - last.eCost) / first.eCost) * 100).toFixed(1);
  const gapBelowMarket = (((last.price - last.eCost) / last.price) * 100).toFixed(1);
  const totalTrades = DATA.reduce((s, d) => s + (d.trades ?? 0), 0);

  return (
    <div
      ref={containerRef}
      style={{ background: "#0d1f2d", border: "1px solid #1a3044", borderRadius: 10, padding: "16px 18px", marginBottom: 20, fontFamily: "Arial, sans-serif", position: "relative" }}
    >
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: 14, color: "#e2e8f0" }}>
            <MetricPrefix prefix="e" name="COST" /> Decay Chart
          </div>
          <div style={{ fontSize: 11, color: "#4a5568", marginTop: 2 }}>Effective cost per unit declining as AAM accumulates more assets · Initial Investment ÷ Current Quantity</div>
        </div>
        {/* Timeframe selector */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {(["3M", "6M", "1Y"] as EcostWindow[]).map(w => (
            <button
              key={w}
              onClick={() => { setWindow(w); setHovered(null); }}
              style={{
                padding: "3px 10px",
                fontSize: 10,
                fontWeight: 600,
                fontFamily: "Helvetica, Arial, sans-serif",
                borderRadius: 5,
                border: window === w ? "1px solid #F87171" : "1px solid #1a3044",
                background: window === w ? "rgba(248,113,113,0.12)" : "transparent",
                color: window === w ? "#F87171" : "#4a5568",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >{w}</button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 14, fontSize: 10, color: "#4a5568", alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
        <span><span style={{ display: "inline-block", width: 18, height: 2, background: "#F87171", verticalAlign: "middle", marginRight: 4 }} />eCOST</span>
        <span><span style={{ display: "inline-block", width: 18, height: 2, background: "#4A90D9", borderTop: "2px dashed #4A90D9", verticalAlign: "middle", marginRight: 4 }} />Market Price</span>
        <span><span style={{ display: "inline-block", width: 18, height: 2, background: "#22c55e", borderTop: "2px dotted #22c55e", verticalAlign: "middle", marginRight: 4 }} />Qty (stepped)</span>
        <span style={{ marginLeft: 4 }}>Trade events:</span>
        {Object.entries(TRADE_COLORS).map(([type, color]) => (
          <span key={type}>
            <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: color, verticalAlign: "middle", marginRight: 3 }} />
            {type}
          </span>
        ))}
      </div>

      {/* SVG Chart */}
      <div style={{ overflowX: "auto", position: "relative" }}>
        <svg
          width={W}
          height={H}
          style={{ display: "block", maxWidth: "100%", cursor: "crosshair" }}
          onMouseLeave={() => setHovered(null)}
        >
          <defs>
            <linearGradient id="ecostGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F87171" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#F87171" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Y-axis gridlines + labels */}
          {[0, 1, 2, 3, 4].map(v => (
            v <= yMax ? (
              <g key={v}>
                <line x1={PAD.l} y1={PAD.t + yScale(v)} x2={PAD.l + innerW} y2={PAD.t + yScale(v)}
                  stroke="#1a3044" strokeWidth={v === 0 ? 1.5 : 1} strokeDasharray={v === 0 ? "0" : "3 4"} />
                <text x={PAD.l - 6} y={PAD.t + yScale(v) + 4} textAnchor="end" fill="#4a5568" fontSize={9} fontFamily="Arial">${v}</text>
              </g>
            ) : null
          ))}

          {/* eCOST area fill */}
          <path d={eCostArea} fill="url(#ecostGrad)" />

          {/* Stepped qty line */}
          <path d={qtyStepPath} fill="none" stroke="#22c55e" strokeWidth={1.2} strokeDasharray="2 3" opacity={0.55} />

          {/* Price line (dashed) */}
          <path d={pricePath} fill="none" stroke="#4A90D9" strokeWidth={1.5} strokeDasharray="4 3" opacity={0.7} />

          {/* eCOST smooth line */}
          <path d={eCostPath} fill="none" stroke="#F87171" strokeWidth={2} />

          {/* Vertical crosshair on hover */}
          {hovered !== null && (
            <line
              x1={PAD.l + hovered * xStep} y1={PAD.t}
              x2={PAD.l + hovered * xStep} y2={PAD.t + innerH}
              stroke="rgba(255,255,255,0.10)" strokeWidth={1} strokeDasharray="3 3"
            />
          )}

          {/* Gap indicator between eCOST and price on hover */}
          {hovered !== null && (() => {
            const cx = PAD.l + hovered * xStep;
            const d = DATA[hovered];
            return (
              <line
                x1={cx} y1={PAD.t + yScale(d.eCost)}
                x2={cx} y2={PAD.t + yScale(d.price)}
                stroke="rgba(167,139,250,0.35)" strokeWidth={2} strokeDasharray="2 2"
              />
            );
          })()}

          {/* Data points + trade event markers */}
          {DATA.map((d, i) => {
            const cx = PAD.l + i * xStep;
            const cy = PAD.t + yScale(d.eCost);
            const py = PAD.t + yScale(d.price);
            const qy = PAD.t + qtyScale(d.qty);
            const isHov = hovered === i;
            const tColor = TRADE_COLORS[d.tradeType ?? "buy"];
            return (
              <g
                key={i}
                onMouseEnter={() => handleMouseEnter(i, cx, Math.min(cy, py) - 10)}
                style={{ cursor: "pointer" }}
              >
                {/* Hit area */}
                <rect x={cx - xStep / 2} y={PAD.t} width={xStep} height={innerH} fill="transparent" />

                {/* Trade event marker — small diamond on eCOST line, colored by trade type */}
                <polygon
                  points={`${cx},${cy - 5} ${cx + 4},${cy} ${cx},${cy + 5} ${cx - 4},${cy}`}
                  fill={isHov ? tColor : "transparent"}
                  stroke={tColor}
                  strokeWidth={isHov ? 0 : 1}
                  opacity={isHov ? 1 : 0.7}
                />

                {/* eCOST dot (on top of diamond) */}
                <circle cx={cx} cy={cy} r={isHov ? 5.5 : 3}
                  fill={isHov ? "#FF6B6B" : "#F87171"}
                  stroke={isHov ? "#fff" : "#07111d"} strokeWidth={1.5}
                />

                {/* Price dot */}
                <circle cx={cx} cy={py} r={isHov ? 4.5 : 2.5}
                  fill={isHov ? "#60a5fa" : "#4A90D9"}
                  stroke={isHov ? "#fff" : "#07111d"} strokeWidth={1} opacity={0.9}
                />

                {/* Qty step dot */}
                <circle cx={cx} cy={qy} r={isHov ? 3.5 : 2}
                  fill="#22c55e" stroke="#07111d" strokeWidth={1} opacity={0.7}
                />

                {/* Trade count badge on hover */}
                {isHov && d.trades !== undefined && (
                  <g>
                    <rect x={cx + 6} y={cy - 12} width={28} height={13} rx={3}
                      fill={tColor} opacity={0.9} />
                    <text x={cx + 20} y={cy - 3} textAnchor="middle" fill="#07111d" fontSize={8} fontFamily="Arial" fontWeight="700">{d.trades}T</text>
                  </g>
                )}

                {/* X-axis label */}
                <text x={cx} y={H - 5} textAnchor="middle"
                  fill={isHov ? "#e2e8f0" : "#4a5568"}
                  fontSize={8} fontFamily="Arial"
                  fontWeight={isHov ? "700" : "400"}>{d.month}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* HTML Tooltip */}
      {tooltipData !== null && hovered !== null && (
        <div
          style={{
            position: "absolute",
            left: Math.min(tooltipPos.x + 14, (containerRef.current?.offsetWidth ?? 400) - 210),
            top: Math.max(tooltipPos.y - 10, 55),
            width: 200,
            background: "#07111d",
            border: "1px solid #2a4060",
            borderRadius: 8,
            padding: "10px 12px",
            pointerEvents: "none",
            zIndex: 50,
            boxShadow: "0 8px 24px rgba(0,0,0,0.6), 0 0 0 1px rgba(248,113,113,0.12)",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7, paddingBottom: 6, borderBottom: "1px solid #1a3044" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#e2e8f0", fontFamily: "Helvetica, Arial, sans-serif" }}>{tooltipData.month} 2024</span>
            <span style={{
              fontSize: 9, fontWeight: 600, padding: "2px 6px", borderRadius: 10,
              background: "rgba(34,197,94,0.15)", color: "#22c55e",
            }}>−{tooltipData.reductionPct}% eCOST</span>
          </div>

          {/* Trade type + count */}
          {tooltipData.tradeType && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7, paddingBottom: 6, borderBottom: "1px solid #1a3044" }}>
              <span style={{
                display: "inline-block", padding: "2px 8px", borderRadius: 10, fontSize: 9, fontWeight: 700,
                background: TRADE_COLORS[tooltipData.tradeType] + "22",
                color: TRADE_COLORS[tooltipData.tradeType],
                textTransform: "uppercase", letterSpacing: "0.06em",
              }}>{tooltipData.tradeType}</span>
              {tooltipData.trades !== undefined && (
                <span style={{ fontSize: 9, color: "#4a5568" }}>{tooltipData.trades} trades executed</span>
              )}
            </div>
          )}

          {/* Metric rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#F87171" }} />
                <span style={{ fontSize: 10, color: "#8899aa" }}>eCOST</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#F87171", fontFamily: "Helvetica, Arial, sans-serif" }}>${tooltipData.eCost.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#4A90D9" }} />
                <span style={{ fontSize: 10, color: "#8899aa" }}>Market Price</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#4A90D9", fontFamily: "Helvetica, Arial, sans-serif" }}>${tooltipData.price.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#A78BFA" }} />
                <span style={{ fontSize: 10, color: "#8899aa" }}>Price Gap</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#A78BFA", fontFamily: "Helvetica, Arial, sans-serif" }}>{tooltipData.gapPct}% below</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
                <span style={{ fontSize: 10, color: "#8899aa" }}>Qty Accumulated</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", fontFamily: "Helvetica, Arial, sans-serif" }}>{tooltipData.qty.toFixed(2)}×</span>
            </div>
            <div style={{ marginTop: 4, paddingTop: 5, borderTop: "1px solid #1a3044", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 9, color: "#4a5568" }}>Qty gain since start</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: "#e2e8f0" }}>+{tooltipData.qtyGain}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Summary row */}
      <div style={{ display: "flex", gap: 20, marginTop: 10, paddingTop: 10, borderTop: "1px solid #1a3044", flexWrap: "wrap" }}>
        <div><div style={{ fontSize: 9, color: "#4a5568", marginBottom: 2 }}>Initial eCOST</div><div style={{ fontSize: 13, fontWeight: 700, color: "#F87171", fontFamily: "Helvetica, Arial, sans-serif" }}>${first.eCost.toFixed(2)}</div></div>
        <div><div style={{ fontSize: 9, color: "#4a5568", marginBottom: 2 }}>Current eCOST</div><div style={{ fontSize: 13, fontWeight: 700, color: "#22c55e", fontFamily: "Helvetica, Arial, sans-serif" }}>${last.eCost.toFixed(2)}</div></div>
        <div><div style={{ fontSize: 9, color: "#4a5568", marginBottom: 2 }}>Reduction</div><div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", fontFamily: "Helvetica, Arial, sans-serif" }}>−{reductionPct}%</div></div>
        <div><div style={{ fontSize: 9, color: "#4a5568", marginBottom: 2 }}>Qty Accumulated</div><div style={{ fontSize: 13, fontWeight: 700, color: "#4A90D9", fontFamily: "Helvetica, Arial, sans-serif" }}>{last.qty.toFixed(2)}×</div></div>
        <div><div style={{ fontSize: 9, color: "#4a5568", marginBottom: 2 }}>vs Market Price</div><div style={{ fontSize: 13, fontWeight: 700, color: "#A78BFA", fontFamily: "Helvetica, Arial, sans-serif" }}>−{gapBelowMarket}% below</div></div>
        <div><div style={{ fontSize: 9, color: "#4a5568", marginBottom: 2 }}>Total Trades</div><div style={{ fontSize: 13, fontWeight: 700, color: "#F59E0B", fontFamily: "Helvetica, Arial, sans-serif" }}>{totalTrades}</div></div>
      </div>
    </div>
  );
}

// ─── Overview Section ─────────────────────────────────────────────────────────
function OverviewSection() {
  const totalValue = HOLDINGS.reduce((s, h) => s + h.valueUsd, 0);
  const totalCapital = ACTIVE_PATHWAYS.reduce((s, p) => s + p.capital, 0);
  const totalPnl = ACTIVE_PATHWAYS.reduce((s, p) => s + p.pnl, 0);
  const pnlPct = ((totalPnl / totalCapital) * 100).toFixed(2);

  return (
    <div>
      {/* Summary Metrics Row */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <MetricCard label="Portfolio Value" value={`$${totalValue.toLocaleString()}`} sub="across all pathways" accent="#4A90D9" />
        <MetricCard label="VOLATILITY" value="0.34" sub="30-day rolling" prefix="a" />
        <MetricCard label="TARGET" value="$18,500" sub="Annual accumulation goal" prefix="q" />
        <MetricCard label="COST basis" value={`$${totalCapital.toLocaleString()}`} sub="deployed capital" prefix="e" />
        <MetricCard label="COMPOSITE" value={`+${pnlPct}%`} sub="total return" prefix="x" />
      </div>

      {/* eCOST Decay Chart */}
      <ECostChart />

      {/* Pathway Cards */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: 14, color: "#e2e8f0", marginBottom: 12, letterSpacing: "-0.3px" }}>
          Active Pathways
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {ACTIVE_PATHWAYS.map(pw => (
            <div key={pw.id} style={{
              background: "#0d1f2d", border: "1px solid #1a3044", borderRadius: 10,
              padding: "16px 18px", flex: "1 1 280px", minWidth: 260,
              borderLeft: `3px solid ${pw.color}`,
              fontFamily: "Arial, sans-serif",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: 14, color: "#e2e8f0" }}>{pw.name}</div>
                  <div style={{ fontSize: 11, color: "#4a5568", marginTop: 2 }}>{pw.tagline}</div>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", padding: "3px 8px", borderRadius: 4,
                  background: pw.status === "live" ? "rgba(34,197,94,0.15)" : "rgba(234,179,8,0.15)",
                  color: pw.status === "live" ? "#22c55e" : "#eab308",
                  textTransform: "uppercase",
                }}>{pw.status}</span>
              </div>

              {pw.status === "live" ? (
                <>
                  <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 10, color: "#4a5568", marginBottom: 2 }}>Value</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0", fontFamily: "Helvetica, Arial, sans-serif" }}>${pw.currentValue.toLocaleString()}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: "#4a5568", marginBottom: 2 }}>P&L</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#22c55e", fontFamily: "Helvetica, Arial, sans-serif" }}>+${pw.pnl} <span style={{ fontSize: 11 }}>(+{pw.pnlPct}%)</span></div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: "#4a5568", marginBottom: 2 }}>Next Signal</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#F59E0B" }}>{pw.nextSignal}</div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 10, color: "#4a5568" }}>{pw.progress.lbl}</span>
                      <span style={{ fontSize: 10, color: "#8899aa" }}>{pw.progress.current} / {pw.progress.target}</span>
                    </div>
                    <div style={{ height: 4, background: "#1a3044", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pw.progress.pct}%`, background: `linear-gradient(90deg, ${pw.color}, ${pw.color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} />
                    </div>
                    <div style={{ textAlign: "right", fontSize: 10, color: pw.color, marginTop: 2 }}>{pw.progress.pct}%</div>
                  </div>
                  <div style={{ marginTop: 10, fontSize: 10, color: "#4a5568" }}>
                    {pw.strategies.length} strategies · {pw.tradesToday} trades today
                  </div>
                </>
              ) : (
                <div style={{ padding: "12px 0", textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: "#4a5568", marginBottom: 8 }}>Pathway paused — awaiting funding</div>
                  <button style={{
                    fontSize: 11, padding: "6px 14px", borderRadius: 6, border: "1px solid #4A90D9",
                    background: "transparent", color: "#4A90D9", cursor: "pointer", fontFamily: "Arial, sans-serif",
                  }}>Fund Pathway</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AAM Metrics Row */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: 14, color: "#e2e8f0", marginBottom: 12 }}>
          AAM Performance Metrics
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { prefix: "a" as const, name: "CONSISTENCY", value: "8.4", sub: "Turtle Effect Index" },
            { prefix: "a" as const, name: "RATE%", value: "702.3K%", sub: "Avg Annual Asset Return" },
            { prefix: "q" as const, name: "MULTIPLE", value: "3.2×", sub: "Asset quantity multiplier" },
            { prefix: "q" as const, name: "RISK", value: "0.18", sub: "qRISK score (lower=better)" },
            { prefix: "e" as const, name: "COST", value: "$0.42", sub: "Avg cost per unit" },
            { prefix: "e" as const, name: "GAP%", value: "-12.4%", sub: "vs ATH cost basis" },
            { prefix: "x" as const, name: "COMPOSITE", value: "87.2", sub: "Overall AAM score" },
            { prefix: "x" as const, name: "REGIME", value: "BULL", sub: "Current market regime" },
          ].map((m, i) => (
            <div key={i} style={{
              background: "#0d1f2d", border: "1px solid #1a3044", borderRadius: 8,
              padding: "12px 14px", flex: "1 1 130px", minWidth: 120,
              borderBottom: `2px solid ${AAM_COLORS[m.prefix]}`,
              fontFamily: "Arial, sans-serif",
            }}>
              <div style={{ fontSize: 9, marginBottom: 4 }}>
                <MetricPrefix prefix={m.prefix} name={m.name} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#e2e8f0", fontFamily: "Helvetica, Arial, sans-serif" }}>{m.value}</div>
              <div style={{ fontSize: 10, color: "#4a5568", marginTop: 2 }}>{m.sub}</div>
            </div>
          ))}
        </div>
       </div>

      {/* Fastest to 50% eCOST Leaderboard */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: 14, color: "#e2e8f0" }}>
              🏆 Fastest to 50% eCOST Reduction
            </div>
            <div style={{ fontSize: 10, color: "#4a5568", marginTop: 2 }}>Top 5 strategies (HIGH TIMEFRAME: 6h/8h/12h) that achieved 50% eCOST reduction fastest</div>
          </div>
          <span style={{ fontSize: 9, padding: "3px 8px", borderRadius: 8, background: "rgba(74,144,217,0.12)", color: "#4A90D9", border: "1px solid rgba(74,144,217,0.25)", fontWeight: 700 }}>HIGH TIMEFRAME</span>
        </div>
        <div style={{ background: "#0d1f2d", border: "1px solid #1a3044", borderRadius: 10, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Arial, sans-serif", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1a3044" }}>
                {["Rank", "Strategy", "Asset", "TF", "Months to 50%", "aRATE%", "qMULTIPLE", "Win Rate", "Action"].map(h => (
                  <th key={h} style={{ padding: "9px 12px", textAlign: h === "Rank" || h === "Strategy" || h === "Asset" || h === "Action" ? "left" : "right", color: "#4a5568", fontWeight: 600, fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { rank: 1, id: "720012", name: "SOL-6h-EMC",  asset: "SOL",  tf: "6h",  months: 4,  aRate: 31.0, qMult: 4.20, winRate: 63.4, medal: "🥇" },
                { rank: 2, id: "720003", name: "ETH-12h-EMC", asset: "ETH",  tf: "12h", months: 6,  aRate: 22.4, qMult: 3.12, winRate: 67.8, medal: "🥈" },
                { rank: 3, id: "720007", name: "BTC-8h-EMC",  asset: "BTC",  tf: "8h",  months: 7,  aRate: 18.1, qMult: 2.58, winRate: 71.2, medal: "🥉" },
                { rank: 4, id: "720021", name: "ADA-6h-EMC",  asset: "ADA",  tf: "6h",  months: 9,  aRate: 28.0, qMult: 3.85, winRate: 61.0, medal: "4" },
                { rank: 5, id: "720018", name: "LINK-12h-EMC",asset: "LINK", tf: "12h", months: 11, aRate: 25.0, qMult: 3.40, winRate: 65.5, medal: "5" },
              ].map((row, i) => (
                <tr key={row.id} style={{ borderBottom: "1px solid #0d1f2d", background: i === 0 ? "rgba(45,212,191,0.04)" : "transparent" }}>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ fontSize: i < 3 ? 16 : 11, fontWeight: 700, color: i === 0 ? "#2dd4bf" : i === 1 ? "#a78bfa" : i === 2 ? "#F59E0B" : "#4a5568" }}>
                      {row.medal}
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <div style={{ fontWeight: 600, color: "#e2e8f0", fontSize: 11 }}>{row.name}</div>
                    <div style={{ fontSize: 9, color: "#4a5568" }}>#{row.id}</div>
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, background: "rgba(74,144,217,0.12)", color: "#4A90D9" }}>{row.asset}</span>
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "right" }}>
                    <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 6, background: "rgba(34,197,94,0.1)", color: "#22c55e", fontWeight: 700 }}>{row.tf}</span>
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "right" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
                      <div style={{ width: 60, height: 6, borderRadius: 3, background: "#1a3044", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${Math.max(10, 100 - row.months * 7)}%`, background: i === 0 ? "#2dd4bf" : i === 1 ? "#a78bfa" : i === 2 ? "#F59E0B" : "#4a5568", borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: i === 0 ? "#2dd4bf" : "#e2e8f0" }}>{row.months}mo</span>
                    </div>
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: "#22c55e", fontWeight: 600 }}>{row.aRate.toFixed(1)}%</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: "#a78bfa", fontWeight: 600 }}>{row.qMult.toFixed(2)}×</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: "#4a5568" }}>{row.winRate.toFixed(1)}%</td>
                  <td style={{ padding: "10px 12px" }}>
                    <a href={`/strategy/${row.id}`} style={{ textDecoration: "none" }}>
                      <button style={{ fontSize: 9, padding: "4px 10px", borderRadius: 5, border: "1px solid #1a3044", background: "transparent", color: "#4A90D9", cursor: "pointer", fontFamily: "Arial, sans-serif" }}>View →</button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
// ─── Holdings Section ─────────────────────────────────────────────────────────
function HoldingsSection() {
  const total = HOLDINGS.reduce((s, h) => s + h.valueUsd, 0);
  return (
    <div>
      <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: 14, color: "#e2e8f0", marginBottom: 12 }}>
        Asset Holdings
      </div>
      <div style={{ background: "#0d1f2d", border: "1px solid #1a3044", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Arial, sans-serif", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #1a3044" }}>
              {["Asset", "Quantity", "Value (USD)", "7d Change", "Allocation", "Bar"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: h === "Bar" ? "left" : "right", color: "#4a5568", fontWeight: 600, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  {h === "Asset" ? <span style={{ textAlign: "left", display: "block" }}>{h}</span> : h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HOLDINGS.map((h, i) => (
              <tr key={h.asset} style={{ borderBottom: "1px solid #0d1f2d", background: i % 2 === 0 ? "transparent" : "rgba(26,48,68,0.3)", transition: "background 0.15s" }}>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#1a3044,#0d1f2d)", border: "1px solid #1a3044", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#4A90D9" }}>{h.asset.slice(0, 3)}</div>
                    <span style={{ fontWeight: 600, color: "#e2e8f0" }}>{h.asset}</span>
                  </div>
                </td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: "#8899aa" }}>{h.qty.toLocaleString()}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 600, color: "#e2e8f0" }}>${h.valueUsd.toLocaleString()}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 600, color: h.change7d >= 0 ? "#22c55e" : "#f87171" }}>
                  {h.change7d >= 0 ? "+" : ""}{h.change7d}%
                </td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: "#8899aa" }}>{h.alloc}%</td>
                <td style={{ padding: "10px 14px", minWidth: 80 }}>
                  <div style={{ height: 4, background: "#1a3044", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(h.valueUsd / total) * 100 * 2.5}%`, maxWidth: "100%", background: "linear-gradient(90deg,#4A90D9,#7C5CBF)", borderRadius: 2 }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: "1px solid #1a3044" }}>
              <td colSpan={2} style={{ padding: "10px 14px", fontWeight: 700, color: "#e2e8f0", fontFamily: "Helvetica, Arial, sans-serif", fontSize: 12 }}>Total Portfolio</td>
              <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 700, color: "#4A90D9", fontFamily: "Helvetica, Arial, sans-serif" }}>${total.toLocaleString()}</td>
              <td colSpan={3} />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ─── Trade Tape Section ───────────────────────────────────────────────────────
function TradesSection() {
  return (
    <div>
      <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: 14, color: "#e2e8f0", marginBottom: 12 }}>
        Trade Tape
      </div>
      <div style={{ background: "#0d1f2d", border: "1px solid #1a3044", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Arial, sans-serif", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #1a3044" }}>
              {["Time", "Side", "Asset", "Strategy", "Pathway", "Qty", "Price", "Value", "Status"].map(h => (
                <th key={h} style={{ padding: "10px 12px", textAlign: h === "Time" || h === "Side" || h === "Asset" || h === "Strategy" || h === "Pathway" || h === "Status" ? "left" : "right", color: "#4a5568", fontWeight: 600, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TRADES.map((t, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(26,48,68,0.5)", background: i % 2 === 0 ? "transparent" : "rgba(26,48,68,0.2)" }}>
                <td style={{ padding: "8px 12px", color: "#4a5568", fontFamily: "monospace", fontSize: 11 }}>{t.t}</td>
                <td style={{ padding: "8px 12px" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 3, background: t.side === "buy" ? "rgba(34,197,94,0.15)" : "rgba(248,113,113,0.15)", color: t.side === "buy" ? "#22c55e" : "#f87171", textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.side}</span>
                </td>
                <td style={{ padding: "8px 12px", fontWeight: 600, color: "#e2e8f0" }}>{t.asset}</td>
                <td style={{ padding: "8px 12px", color: "#4a5568", fontSize: 11, fontFamily: "monospace" }}>{t.strategy}</td>
                <td style={{ padding: "8px 12px", color: "#8899aa" }}>{t.pathway}</td>
                <td style={{ padding: "8px 12px", textAlign: "right", color: "#8899aa" }}>{t.qty}</td>
                <td style={{ padding: "8px 12px", textAlign: "right", color: "#8899aa" }}>${t.price.toLocaleString()}</td>
                <td style={{ padding: "8px 12px", textAlign: "right", fontWeight: 600, color: "#e2e8f0" }}>${t.value}</td>
                <td style={{ padding: "8px 12px" }}>
                  <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 3, background: t.status === "filled" ? "rgba(74,144,217,0.15)" : "rgba(245,158,11,0.15)", color: t.status === "filled" ? "#4A90D9" : "#F59E0B", textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Reports Section ──────────────────────────────────────────────────────────
function ReportsSection() {
  const icons: Record<string, string> = { doc: "📄", tax: "📊", clock: "🕐", chart: "📈" };
  return (
    <div>
      <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: 14, color: "#e2e8f0", marginBottom: 12 }}>Reports & Statements</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {REPORTS.map((r, i) => (
          <div key={i} style={{ background: "#0d1f2d", border: "1px solid #1a3044", borderRadius: 10, padding: "16px", fontFamily: "Arial, sans-serif" }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>{icons[r.icon]}</div>
            <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: 13, color: "#e2e8f0", marginBottom: 4 }}>{r.name}</div>
            <div style={{ fontSize: 11, color: "#4a5568", marginBottom: 12 }}>{r.sub}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 10, color: "#4a5568" }}>{r.meta}</span>
              <button style={{ fontSize: 11, padding: "5px 12px", borderRadius: 6, border: "1px solid #4A90D9", background: "transparent", color: "#4A90D9", cursor: "pointer", fontFamily: "Arial, sans-serif" }}>Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── AACCUMA Upsell ───────────────────────────────────────────────────────────
function AaccumaUpsell() {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(74,144,217,0.08), rgba(217,70,168,0.08))",
      border: "1px solid rgba(74,144,217,0.25)", borderRadius: 12, padding: "20px 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20,
      flexWrap: "wrap", marginTop: 20, fontFamily: "Arial, sans-serif",
    }}>
      <div style={{ flex: 1, minWidth: 280 }}>
        <div style={{ fontSize: 10, color: "#4A90D9", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Companion Product · Advanced Analytics</div>
        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: 16, color: "#e2e8f0", marginBottom: 8 }}>
          Unlock <em style={{ fontStyle: "italic", color: "#4A90D9" }}>deep AAM analytics</em> with AACCUMA
        </div>
        <div style={{ fontSize: 12, color: "#8899aa", lineHeight: 1.6, marginBottom: 12, maxWidth: 500 }}>
          WealthAAM gives you execution and tracking. AACCUMA adds the analytics layer — the Diagnostic Triangle (QAM × ARS × CEI), <MetricPrefix prefix="e" name="COST" /> decay charts, AAR vs AAA divergence, and per-strategy backtest replays.
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["QAM · ARS · CEI Triangle", "eCOST decay charts", "AI Voice reports", "Snowball compounding sim", "Strategy backtests", "R&D feed from QuantFai"].map(f => (
            <span key={f} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: "rgba(74,144,217,0.1)", color: "#4A90D9", border: "1px solid rgba(74,144,217,0.2)" }}>{f}</span>
          ))}
        </div>
      </div>
      <a href="https://aaccuma.com" target="_blank" rel="noopener noreferrer" style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "10px 20px", borderRadius: 8, background: "linear-gradient(135deg,#4A90D9,#D946A8)",
        color: "#fff", fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: 13,
        textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0,
        boxShadow: "0 4px 16px rgba(74,144,217,0.3)",
      }}>
        Open in AACCUMA →
      </a>
    </div>
  );
}

// ─── Tier Strip ───────────────────────────────────────────────────────────────
function TierStrip() {
  return (
    <div style={{
      background: "#0d1f2d", border: "1px solid #1a3044", borderRadius: 8,
      padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 12, marginTop: 12, fontFamily: "Arial, sans-serif",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#F59E0B", letterSpacing: "0.1em", padding: "3px 8px", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 4 }}>★ POWERHOUSE</span>
        <span style={{ fontSize: 11, color: "#8899aa" }}>Subscribed since <strong style={{ color: "#e2e8f0" }}>Jan 2025</strong> · all standard pathways + AACCUMA bundle · upgrade to <strong style={{ color: "#D946A8" }}>PINNACLE</strong> for low-TF pathways</span>
      </div>
      <button style={{ fontSize: 11, padding: "6px 14px", borderRadius: 6, border: "1px solid #1a3044", background: "transparent", color: "#8899aa", cursor: "pointer", fontFamily: "Arial, sans-serif" }}>
        Manage Subscription
      </button>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  const renderContent = () => {
    switch (activeSection) {
      case "overview": return <OverviewSection />;
      case "pathways": return <OverviewSection />;
      case "holdings": return <HoldingsSection />;
      case "trades": return <TradesSection />;
      case "reports": return <ReportsSection />;
      case "settings":
        return (
          <div style={{ fontFamily: "Arial, sans-serif", color: "#8899aa", padding: "40px 0", textAlign: "center" }}>
            <div style={{ fontSize: 14, marginBottom: 8 }}>Settings</div>
            <div style={{ fontSize: 12 }}>Account settings and preferences coming soon.</div>
          </div>
        );
      default: return <OverviewSection />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#07111d", color: "#e2e8f0" }}>
      <Sidebar active={activeSection} setActive={setActiveSection} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopBar />
        <main style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          {renderContent()}
          <AaccumaUpsell />
          <TierStrip />
          <div style={{ height: 24 }} />
        </main>
      </div>
    </div>
  );
}
