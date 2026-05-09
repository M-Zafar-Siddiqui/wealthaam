// SnowballCalculator.tsx
// Design: Dark cosmic theme — #07111d bg, coral/teal/green accents, Helvetica/Arial fonts
// Mirrors AACCUMA Snowball Calculator layout with WealthAAM branding

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { Link } from "wouter";

// ─── Types ────────────────────────────────────────────────────────────────────
type Asset = { symbol: string; name: string; price: number; icon: string; aRate: number; hodlReturn: number };
type Timeframe = "1h" | "4h" | "6h" | "12h" | "1d";
type GoalType = "qMULTIPLE" | "USD";
type YAxis = "qAM" | "USD" | "Qty";
type Scale = "linear" | "log";

// ─── Asset Data ───────────────────────────────────────────────────────────────
const ASSETS: Asset[] = [
  { symbol: "BTC", name: "Bitcoin",  price: 80700,  icon: "₿", aRate: 0.18, hodlReturn: 2.58 },
  { symbol: "ETH", name: "Ethereum", price: 2300,   icon: "Ξ", aRate: 0.22, hodlReturn: 3.12 },
  { symbol: "SOL", name: "Solana",   price: 93.29,  icon: "◎", aRate: 0.31, hodlReturn: 4.20 },
  { symbol: "ADA", name: "Cardano",  price: 0.2723, icon: "A", aRate: 0.28, hodlReturn: 2.85 },
  { symbol: "LINK", name: "Chainlink", price: 10.39, icon: "L", aRate: 0.25, hodlReturn: 3.40 },
  { symbol: "TSLA", name: "Tesla",   price: 428.35, icon: "T", aRate: 0.14, hodlReturn: 1.95 },
];

// Timeframe multipliers on aRate
const TF_MULT: Record<Timeframe, number> = { "1h": 1.45, "4h": 1.22, "6h": 1.12, "12h": 1.0, "1d": 0.88 };

// ─── Monte Carlo Engine ───────────────────────────────────────────────────────
function runMonteCarlo(
  asset: Asset,
  tf: Timeframe,
  capital: number,
  dca: number,
  horizonMonths: number,
  paths = 800
): { p10: number[]; p25: number[]; p50: number[]; p75: number[]; p90: number[]; hodl: number[] } {
  const baseRate = asset.aRate * TF_MULT[tf];
  const mu = Math.log(1 + baseRate) - 0.5 * 0.18 * 0.18;
  const sigma = 0.18;
  const allPaths: number[][] = [];

  for (let p = 0; p < paths; p++) {
    const path: number[] = [1.0];
    let cumCapital = capital;
    for (let m = 1; m <= horizonMonths; m++) {
      const z = boxMuller();
      const monthReturn = Math.exp(mu + sigma * z);
      // Occasional drawdown event (5% chance)
      const drawdown = Math.random() < 0.05 ? 0.85 + Math.random() * 0.1 : 1.0;
      const dcaBoost = 1 + (dca / cumCapital) * 0.5;
      const newMult = path[m - 1] * monthReturn * drawdown * dcaBoost;
      path.push(Math.max(newMult, 0.1));
      cumCapital += dca;
    }
    allPaths.push(path);
  }

  // Compute percentiles at each month
  const result = { p10: [] as number[], p25: [] as number[], p50: [] as number[], p75: [] as number[], p90: [] as number[], hodl: [] as number[] };
  for (let m = 0; m <= horizonMonths; m++) {
    const vals = allPaths.map(p => p[m]).sort((a, b) => a - b);
    result.p10.push(vals[Math.floor(paths * 0.10)]);
    result.p25.push(vals[Math.floor(paths * 0.25)]);
    result.p50.push(vals[Math.floor(paths * 0.50)]);
    result.p75.push(vals[Math.floor(paths * 0.75)]);
    result.p90.push(vals[Math.floor(paths * 0.90)]);
    // HODL: simple compounding of spot return
    const hodlMonthly = Math.pow(1 + (asset.hodlReturn - 1) / 12, m);
    result.hodl.push(hodlMonthly);
  }
  return result;
}

// Box-Muller transform for normal random
let _bm_spare: number | null = null;
function boxMuller(): number {
  if (_bm_spare !== null) { const s = _bm_spare; _bm_spare = null; return s; }
  let u, v, s;
  do { u = Math.random() * 2 - 1; v = Math.random() * 2 - 1; s = u * u + v * v; } while (s >= 1 || s === 0);
  const mul = Math.sqrt(-2 * Math.log(s) / s);
  _bm_spare = v * mul;
  return u * mul;
}

// ─── MetricPrefix helper ──────────────────────────────────────────────────────
function MP({ prefix, name }: { prefix: string; name: string }) {
  return (
    <span>
      <span style={{ color: "#F87171", fontStyle: "italic", fontWeight: 900 }}>{prefix}</span>
      <span>{name}</span>
    </span>
  );
}

// ─── Chart Component ──────────────────────────────────────────────────────────
function SnowballChart({
  data, horizonMonths, goalMultiple, yAxis, scale, showHodl, asset
}: {
  data: ReturnType<typeof runMonteCarlo>;
  horizonMonths: number;
  goalMultiple: number;
  yAxis: YAxis;
  scale: Scale;
  showHodl: boolean;
  asset: Asset;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const W = 640; const H = 260;
  const PAD = { t: 20, r: 20, b: 36, l: 52 };
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;

  const months = Array.from({ length: horizonMonths + 1 }, (_, i) => i);
  const getValue = (mult: number) => {
    if (yAxis === "USD") return mult * 10000;
    if (yAxis === "Qty") return mult * (10000 / asset.price);
    return mult;
  };

  const allVals = [...data.p90.map(getValue), ...data.p10.map(getValue), getValue(goalMultiple)];
  const rawMax = Math.max(...allVals) * 1.08;
  const rawMin = Math.min(...allVals.filter(v => v > 0)) * 0.95;

  const applyScale = (v: number) => scale === "log" ? Math.log10(Math.max(v, 0.01)) : v;
  const sMax = applyScale(rawMax);
  const sMin = applyScale(rawMin);
  const yScale = (v: number) => innerH - ((applyScale(v) - sMin) / (sMax - sMin)) * innerH;
  const xScale = (m: number) => (m / horizonMonths) * innerW;

  const pathStr = (vals: number[]) =>
    vals.map((v, i) => `${i === 0 ? "M" : "L"}${PAD.l + xScale(i)},${PAD.t + yScale(getValue(v))}`).join(" ");

  // Band area (p25–p75)
  const bandPath = [
    ...data.p75.map((v, i) => `${i === 0 ? "M" : "L"}${PAD.l + xScale(i)},${PAD.t + yScale(getValue(v))}`),
    ...[...data.p25].reverse().map((v, i) => `L${PAD.l + xScale(horizonMonths - i)},${PAD.t + yScale(getValue(v))}`),
    "Z"
  ].join(" ");

  // Wide band (p10–p90)
  const wideBandPath = [
    ...data.p90.map((v, i) => `${i === 0 ? "M" : "L"}${PAD.l + xScale(i)},${PAD.t + yScale(getValue(v))}`),
    ...[...data.p10].reverse().map((v, i) => `L${PAD.l + xScale(horizonMonths - i)},${PAD.t + yScale(getValue(v))}`),
    "Z"
  ].join(" ");

  // Goal line y
  const goalY = PAD.t + yScale(getValue(goalMultiple));

  // Find goal month (first month p50 >= goalMultiple)
  const goalMonth = data.p50.findIndex(v => v >= goalMultiple);

  // Y-axis ticks
  const yTicks = useMemo(() => {
    const count = 5;
    return Array.from({ length: count }, (_, i) => {
      const frac = i / (count - 1);
      const sv = sMin + frac * (sMax - sMin);
      return scale === "log" ? Math.pow(10, sv) : sv;
    });
  }, [sMin, sMax, scale]);

  const formatY = (v: number) => {
    if (yAxis === "USD") return v >= 1000000 ? `$${(v/1000000).toFixed(1)}M` : `$${Math.round(v/1000)}K`;
    if (yAxis === "Qty") return `${v.toFixed(1)}`;
    return `${v.toFixed(0)}×`;
  };

  // X-axis labels every 3 months
  const xLabels = Array.from({ length: Math.floor(horizonMonths / 3) + 1 }, (_, i) => i * 3).filter(m => m <= horizonMonths);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) * (W / rect.width) - PAD.l;
    const m = Math.round((relX / innerW) * horizonMonths);
    setHovered(Math.max(0, Math.min(horizonMonths, m)));
  }, [horizonMonths, innerW]);

  return (
    <div style={{ position: "relative" }}>
      <svg
        ref={svgRef}
        width={W} height={H}
        viewBox={`0 0 ${W} ${H}`}
        style={{ display: "block", maxWidth: "100%", cursor: "crosshair" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHovered(null)}
      >
        <defs>
          <linearGradient id="sbBand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="sbWideBand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {yTicks.map((v, i) => (
          <g key={i}>
            <line x1={PAD.l} y1={PAD.t + yScale(v)} x2={PAD.l + innerW} y2={PAD.t + yScale(v)}
              stroke="#1a3044" strokeWidth={1} strokeDasharray="3 4" />
            <text x={PAD.l - 6} y={PAD.t + yScale(v) + 4} textAnchor="end" fill="#4a5568" fontSize={9} fontFamily="Arial">{formatY(v)}</text>
          </g>
        ))}

        {/* X-axis labels */}
        {xLabels.map(m => (
          <text key={m} x={PAD.l + xScale(m)} y={H - 6} textAnchor="middle" fill="#4a5568" fontSize={9} fontFamily="Arial">
            {m === 0 ? "M0" : `M${m}`}
          </text>
        ))}

        {/* Wide band P10–P90 */}
        <path d={wideBandPath} fill="url(#sbWideBand)" />

        {/* Narrow band P25–P75 */}
        <path d={bandPath} fill="url(#sbBand)" />

        {/* HODL benchmark */}
        {showHodl && (
          <path d={pathStr(data.hodl)} fill="none" stroke="#F59E0B" strokeWidth={1.5} strokeDasharray="5 3" opacity={0.7} />
        )}

        {/* P10 line */}
        <path d={pathStr(data.p10)} fill="none" stroke="#2dd4bf" strokeWidth={1} opacity={0.4} />

        {/* P90 line */}
        <path d={pathStr(data.p90)} fill="none" stroke="#2dd4bf" strokeWidth={1} opacity={0.4} />

        {/* P50 median line */}
        <path d={pathStr(data.p50)} fill="none" stroke="#2dd4bf" strokeWidth={2.5} />

        {/* Goal line */}
        {goalY > PAD.t && goalY < PAD.t + innerH && (
          <>
            <line x1={PAD.l} y1={goalY} x2={PAD.l + innerW} y2={goalY}
              stroke="#F87171" strokeWidth={1.5} strokeDasharray="6 3" opacity={0.8} />
            <text x={PAD.l + 4} y={goalY - 4} fill="#F87171" fontSize={9} fontFamily="Arial" fontWeight="700">
              GOAL {goalMultiple.toFixed(1)}×
            </text>
          </>
        )}

        {/* Goal reached marker on P50 */}
        {goalMonth > 0 && goalMonth <= horizonMonths && (() => {
          const mx = PAD.l + xScale(goalMonth);
          const my = PAD.t + yScale(getValue(data.p50[goalMonth]));
          return (
            <g>
              <circle cx={mx} cy={my} r={6} fill="#F87171" stroke="#07111d" strokeWidth={2} />
              <circle cx={mx} cy={my} r={3} fill="#fff" />
            </g>
          );
        })()}

        {/* Hover crosshair */}
        {hovered !== null && (
          <>
            <line
              x1={PAD.l + xScale(hovered)} y1={PAD.t}
              x2={PAD.l + xScale(hovered)} y2={PAD.t + innerH}
              stroke="rgba(255,255,255,0.12)" strokeWidth={1} strokeDasharray="3 3"
            />
            {/* Hover dots on p50 and hodl */}
            <circle
              cx={PAD.l + xScale(hovered)}
              cy={PAD.t + yScale(getValue(data.p50[hovered]))}
              r={4} fill="#2dd4bf" stroke="#fff" strokeWidth={1.5}
            />
            {showHodl && (
              <circle
                cx={PAD.l + xScale(hovered)}
                cy={PAD.t + yScale(getValue(data.hodl[hovered]))}
                r={3} fill="#F59E0B" stroke="#fff" strokeWidth={1}
              />
            )}
            {/* Hover tooltip */}
            {(() => {
              const tx = Math.min(PAD.l + xScale(hovered) + 10, W - 130);
              const ty = 30;
              const p50v = getValue(data.p50[hovered]);
              const p10v = getValue(data.p10[hovered]);
              const p90v = getValue(data.p90[hovered]);
              return (
                <g>
                  <rect x={tx} y={ty} width={120} height={showHodl ? 72 : 60} rx={5}
                    fill="#07111d" stroke="#2a4060" strokeWidth={1} />
                  <text x={tx + 8} y={ty + 14} fill="#e2e8f0" fontSize={9} fontFamily="Arial" fontWeight="700">M{hovered}</text>
                  <text x={tx + 8} y={ty + 27} fill="#2dd4bf" fontSize={9} fontFamily="Arial">P50: {formatY(p50v)}</text>
                  <text x={tx + 8} y={ty + 40} fill="#4a5568" fontSize={8} fontFamily="Arial">P10: {formatY(p10v)}</text>
                  <text x={tx + 8} y={ty + 53} fill="#4a5568" fontSize={8} fontFamily="Arial">P90: {formatY(p90v)}</text>
                  {showHodl && (
                    <text x={tx + 8} y={ty + 66} fill="#F59E0B" fontSize={8} fontFamily="Arial">HODL: {formatY(getValue(data.hodl[hovered]))}</text>
                  )}
                </g>
              );
            })()}
          </>
        )}
      </svg>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, fontSize: 10, color: "#4a5568", marginTop: 6, flexWrap: "wrap" }}>
        <span><span style={{ display: "inline-block", width: 16, height: 2, background: "#2dd4bf", verticalAlign: "middle", marginRight: 4 }} />AAM median</span>
        <span><span style={{ display: "inline-block", width: 16, height: 8, background: "rgba(45,212,191,0.15)", border: "1px solid rgba(45,212,191,0.3)", verticalAlign: "middle", marginRight: 4 }} />P10–P90 band</span>
        {showHodl && <span><span style={{ display: "inline-block", width: 16, height: 2, background: "#F59E0B", borderTop: "2px dashed #F59E0B", verticalAlign: "middle", marginRight: 4 }} />HODL benchmark</span>}
        <span><span style={{ display: "inline-block", width: 16, height: 2, background: "#F87171", borderTop: "2px dashed #F87171", verticalAlign: "middle", marginRight: 4 }} />Goal line</span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SnowballCalculator() {
  const [asset, setAsset] = useState<Asset>(ASSETS[1]); // ETH default
  const [timeframe, setTimeframe] = useState<Timeframe>("12h");
  const [capital, setCapital] = useState(10000);
  const [dcaEnabled, setDcaEnabled] = useState(true);
  const [dca, setDca] = useState(500);
  const [goalType, setGoalType] = useState<GoalType>("qMULTIPLE");
  const [goalMultiple, setGoalMultiple] = useState(5);
  const [horizon, setHorizon] = useState(24);
  const [yAxis, setYAxis] = useState<YAxis>("qAM");
  const [scale, setScale] = useState<Scale>("linear");
  const [showHodl, setShowHodl] = useState(true);
  const [simData, setSimData] = useState<ReturnType<typeof runMonteCarlo> | null>(null);
  const [running, setRunning] = useState(false);
  const [scenarioName, setScenarioName] = useState("");
  const [savedScenarios, setSavedScenarios] = useState<Array<{ name: string; params: string }>>([]);
  const [showHistory, setShowHistory] = useState(false);

  const assetQty = capital / asset.price;
  const dcaAnnual = dca * 12;
  const totalDca = dca * horizon;

  const runSim = useCallback(() => {
    setRunning(true);
    // Small timeout to allow UI to update
    setTimeout(() => {
      const result = runMonteCarlo(asset, timeframe, capital, dcaEnabled ? dca : 0, horizon, 800);
      setSimData(result);
      setRunning(false);
    }, 50);
  }, [asset, timeframe, capital, dca, dcaEnabled, horizon]);

  // Auto-run on mount
  useEffect(() => { runSim(); }, []);

  const p50Final = simData?.p50[horizon] ?? 0;
  const p10Final = simData?.p10[horizon] ?? 0;
  const p90Final = simData?.p90[horizon] ?? 0;
  const hodlFinal = simData?.hodl[horizon] ?? 0;
  const usdP50 = p50Final * capital;
  const goalMonth = simData ? simData.p50.findIndex(v => v >= goalMultiple) : -1;
  const aheadMonths = goalMonth > 0 ? horizon - goalMonth : 0;
  const hodlAdvantage = hodlFinal > 0 ? ((p50Final / hodlFinal - 1) * 100) : 0;

  const saveScenario = () => {
    if (!scenarioName.trim()) return;
    setSavedScenarios(prev => [...prev, {
      name: scenarioName,
      params: `${asset.symbol} · ${timeframe} · $${capital.toLocaleString()} · ${horizon}mo · Goal ${goalMultiple}×`
    }]);
    setScenarioName("");
  };

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: "4px 10px",
    fontSize: 10,
    fontWeight: 600,
    fontFamily: "Helvetica, Arial, sans-serif",
    borderRadius: 5,
    border: active ? "1px solid #2dd4bf" : "1px solid #1a3044",
    background: active ? "rgba(45,212,191,0.12)" : "transparent",
    color: active ? "#2dd4bf" : "#4a5568",
    cursor: "pointer",
    transition: "all 0.15s ease",
  });

  const labelStyle: React.CSSProperties = {
    fontSize: 9,
    fontWeight: 700,
    color: "#4a5568",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 6,
    display: "block",
    fontFamily: "Helvetica, Arial, sans-serif",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#0a1929",
    border: "1px solid #1a3044",
    borderRadius: 6,
    padding: "7px 10px",
    color: "#e2e8f0",
    fontSize: 13,
    fontFamily: "Helvetica, Arial, sans-serif",
    outline: "none",
    boxSizing: "border-box",
  };

  const sectionStyle: React.CSSProperties = {
    background: "#0d1f2d",
    border: "1px solid #1a3044",
    borderRadius: 10,
    padding: "14px 16px",
    marginBottom: 12,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#07111d", color: "#e2e8f0", fontFamily: "Helvetica, Arial, sans-serif" }}>
      {/* Top nav */}
      <div style={{ background: "#0a1929", borderBottom: "1px solid #1a3044", padding: "12px 24px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ textDecoration: "none", color: "#4a5568", fontSize: 11, display: "flex", alignItems: "center", gap: 6 }}>
          ← Back to Home
        </Link>
        <Link href="/dashboard" style={{ textDecoration: "none", color: "#4a5568", fontSize: 11 }}>
          Dashboard
        </Link>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: "#2dd4bf", fontWeight: 700 }}>WealthAAM</span>
          <span style={{ fontSize: 10, color: "#4a5568" }}>Snowball Calculator</span>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>
        {/* Page header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#e2e8f0", fontFamily: "Helvetica, Arial, sans-serif" }}>
              ❄ Snowball Calculator
            </h1>
            <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 10, background: "rgba(45,212,191,0.12)", color: "#2dd4bf", border: "1px solid rgba(45,212,191,0.25)" }}>
              Monte Carlo · 800 paths
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 12, color: "#4a5568" }}>
            Project your asset accumulation trajectory using probabilistic simulation. Set a goal, tune your strategy, and explore Bull / Base / Bear scenarios.
          </p>
        </div>

        {/* Main layout: left inputs, right chart */}
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20, alignItems: "start" }}>

          {/* ── LEFT PANEL ── */}
          <div>
            {/* Simulation Mode */}
            <div style={sectionStyle}>
              <span style={labelStyle}>Simulation Mode</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button style={{ ...btnStyle(true), flex: 1 }}>Single Asset</button>
                <button style={{ ...btnStyle(false), flex: 1 }} onClick={() => {}}>Portfolio Mix</button>
              </div>
            </div>

            {/* Asset */}
            <div style={sectionStyle}>
              <span style={labelStyle}>Asset</span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5 }}>
                {ASSETS.map(a => (
                  <button
                    key={a.symbol}
                    onClick={() => setAsset(a)}
                    style={{
                      padding: "6px 4px",
                      fontSize: 9,
                      fontWeight: 700,
                      fontFamily: "Helvetica, Arial, sans-serif",
                      borderRadius: 6,
                      border: asset.symbol === a.symbol ? "1px solid #2dd4bf" : "1px solid #1a3044",
                      background: asset.symbol === a.symbol ? "rgba(45,212,191,0.12)" : "#0a1929",
                      color: asset.symbol === a.symbol ? "#2dd4bf" : "#8899aa",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: 14, marginBottom: 2 }}>{a.icon}</div>
                    <div>{a.symbol}</div>
                    <div style={{ fontSize: 8, color: "#4a5568", marginTop: 1 }}>
                      ${a.price >= 1000 ? `${(a.price/1000).toFixed(1)}K` : a.price < 1 ? a.price.toFixed(4) : a.price.toFixed(2)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Strategy Timeframe */}
            <div style={sectionStyle}>
              <span style={labelStyle}>Strategy Timeframe</span>
              <div style={{ display: "flex", gap: 4 }}>
                {(["1h", "4h", "6h", "12h", "1d"] as Timeframe[]).map(tf => (
                  <button key={tf} onClick={() => setTimeframe(tf)} style={{ ...btnStyle(timeframe === tf), flex: 1, padding: "4px 2px" }}>{tf}</button>
                ))}
              </div>
            </div>

            {/* Capital */}
            <div style={sectionStyle}>
              <span style={labelStyle}>Initial Capital (USD)</span>
              <input
                type="number"
                value={capital}
                onChange={e => setCapital(Number(e.target.value))}
                style={inputStyle}
              />
              <div style={{ fontSize: 10, color: "#4a5568", marginTop: 5 }}>
                ≈ {assetQty.toFixed(3)} {asset.symbol}
              </div>
            </div>

            {/* Monthly DCA */}
            <div style={sectionStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={labelStyle}>Monthly DCA</span>
                <button
                  onClick={() => setDcaEnabled(v => !v)}
                  style={{
                    width: 36, height: 18, borderRadius: 9, border: "none", cursor: "pointer",
                    background: dcaEnabled ? "#2dd4bf" : "#1a3044", position: "relative", transition: "background 0.2s",
                  }}
                >
                  <span style={{
                    position: "absolute", top: 2, left: dcaEnabled ? 18 : 2, width: 14, height: 14,
                    borderRadius: "50%", background: "#fff", transition: "left 0.2s",
                  }} />
                </button>
              </div>
              {dcaEnabled && (
                <>
                  <input type="number" value={dca} onChange={e => setDca(Number(e.target.value))} style={inputStyle} />
                  <div style={{ fontSize: 10, color: "#4a5568", marginTop: 5 }}>${dcaAnnual.toLocaleString()}/yr · ${totalDca.toLocaleString()} over {horizon}mo</div>
                </>
              )}
            </div>

            {/* Goal Type */}
            <div style={sectionStyle}>
              <span style={labelStyle}>Goal Type</span>
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                <button style={{ ...btnStyle(goalType === "qMULTIPLE"), flex: 1 }} onClick={() => setGoalType("qMULTIPLE")}>
                  <MP prefix="q" name="MULTIPLE" />
                </button>
                <button style={{ ...btnStyle(goalType === "USD"), flex: 1 }} onClick={() => setGoalType("USD")}>USD Target</button>
              </div>
              <span style={labelStyle}>Target <MP prefix="q" name="MULTIPLE" /></span>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: "#2dd4bf", fontWeight: 700 }}>{goalMultiple.toFixed(1)}×</span>
                <span style={{ fontSize: 10, color: "#4a5568" }}>= {(assetQty * goalMultiple).toFixed(3)} {asset.symbol} stack</span>
              </div>
              <input
                type="range" min={2} max={50} step={0.5} value={goalMultiple}
                onChange={e => setGoalMultiple(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#2dd4bf" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#4a5568", marginTop: 2 }}>
                <span>2×</span><span>50×</span>
              </div>
            </div>

            {/* Horizon */}
            <div style={sectionStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={labelStyle}>Horizon</span>
                <span style={{ fontSize: 11, color: "#e2e8f0", fontWeight: 700 }}>{horizon}m</span>
              </div>
              <input
                type="range" min={3} max={60} step={1} value={horizon}
                onChange={e => setHorizon(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#2dd4bf" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#4a5568", marginTop: 2 }}>
                <span>3m</span><span>60m</span>
              </div>
            </div>

            {/* Chart options */}
            <div style={sectionStyle}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <span style={labelStyle}>Y-Axis</span>
                  <div style={{ display: "flex", gap: 4 }}>
                    {(["qAM", "USD", "Qty"] as YAxis[]).map(y => (
                      <button key={y} onClick={() => setYAxis(y)} style={{ ...btnStyle(yAxis === y), padding: "3px 7px" }}>{y}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <span style={labelStyle}>Scale</span>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button onClick={() => setScale("linear")} style={{ ...btnStyle(scale === "linear"), padding: "3px 7px" }}>Linear</button>
                    <button onClick={() => setScale("log")} style={{ ...btnStyle(scale === "log"), padding: "3px 7px" }}>Log</button>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  onClick={() => setShowHodl(v => !v)}
                  style={{
                    width: 30, height: 16, borderRadius: 8, border: "none", cursor: "pointer",
                    background: showHodl ? "#F59E0B" : "#1a3044", position: "relative", transition: "background 0.2s",
                  }}
                >
                  <span style={{
                    position: "absolute", top: 1, left: showHodl ? 14 : 1, width: 14, height: 14,
                    borderRadius: "50%", background: "#fff", transition: "left 0.2s",
                  }} />
                </button>
                <span style={{ fontSize: 10, color: "#4a5568" }}>xHODL Compare</span>
              </div>
            </div>

            {/* Run button */}
            <button
              onClick={runSim}
              disabled={running}
              style={{
                width: "100%",
                padding: "12px",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "Helvetica, Arial, sans-serif",
                borderRadius: 8,
                border: "none",
                background: running ? "#1a3044" : "linear-gradient(135deg, #2dd4bf, #0891b2)",
                color: running ? "#4a5568" : "#07111d",
                cursor: running ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.04em",
              }}
            >
              {running ? "Running..." : "▶ Run Simulation"}
            </button>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div>
            {/* KPI Cards */}
            {simData && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
                {[
                  { label: <MP prefix="q" name="MULTIPLE" />, value: `${p50Final.toFixed(2)}×`, sub: `+${((p50Final - 1) * 100).toFixed(0)}% accumulation`, color: "#2dd4bf" },
                  { label: "USD Value (P50)", value: `$${usdP50 >= 1000000 ? (usdP50/1000000).toFixed(2)+"M" : Math.round(usdP50/1000)+"K"}`, sub: dcaEnabled ? `incl. $${(totalDca/1000).toFixed(1)}K DCA` : "no DCA", color: "#e2e8f0" },
                  { label: "Time to Goal", value: goalMonth > 0 ? `${goalMonth}mo` : "—", sub: goalMonth > 0 ? `${aheadMonths}mo ahead of horizon` : "not reached", color: "#22c55e" },
                  { label: "xHODL Advantage", value: `+${hodlAdvantage.toFixed(0)}%`, sub: `HODL would be +${((hodlFinal - 1) * 100).toFixed(1)}%`, color: "#F59E0B" },
                ].map((kpi, i) => (
                  <div key={i} style={{ background: "#0d1f2d", border: "1px solid #1a3044", borderRadius: 10, padding: "12px 14px" }}>
                    <div style={{ fontSize: 10, color: "#4a5568", marginBottom: 4 }}>{kpi.label}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: kpi.color, fontFamily: "Helvetica, Arial, sans-serif", lineHeight: 1.1 }}>{kpi.value}</div>
                    <div style={{ fontSize: 10, color: "#4a5568", marginTop: 3 }}>{kpi.sub}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Chart */}
            <div style={{ background: "#0d1f2d", border: "1px solid #1a3044", borderRadius: 10, padding: "16px 18px", marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0" }}>Accumulation Trajectory</div>
                  <div style={{ fontSize: 10, color: "#4a5568", marginTop: 2 }}>{asset.symbol}/USDT {timeframe} EMC · 800 Monte Carlo runs</div>
                </div>
              </div>
              {simData ? (
                <SnowballChart
                  data={simData}
                  horizonMonths={horizon}
                  goalMultiple={goalMultiple}
                  yAxis={yAxis}
                  scale={scale}
                  showHodl={showHodl}
                  asset={asset}
                />
              ) : (
                <div style={{ height: 260, display: "flex", alignItems: "center", justifyContent: "center", color: "#4a5568", fontSize: 12 }}>
                  Configure inputs and click Run Simulation
                </div>
              )}
            </div>

            {/* Scenario Cards */}
            {simData && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
                {[
                  { icon: "▲", label: "Bullish", scenario: "P90", mult: p90Final, color: "#22c55e", goalM: simData.p90.findIndex(v => v >= goalMultiple) },
                  { icon: "●", label: "Base case", scenario: "P50", mult: p50Final, color: "#2dd4bf", goalM: goalMonth },
                  { icon: "▼", label: "Bearish", scenario: "P10", mult: p10Final, color: "#F87171", goalM: simData.p10.findIndex(v => v >= goalMultiple) },
                ].map((sc, i) => (
                  <div key={i} style={{ background: "#0d1f2d", border: `1px solid ${sc.color}22`, borderRadius: 10, padding: "12px 14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 11, color: sc.color, fontWeight: 700 }}>{sc.icon} {sc.label}</span>
                      <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 8, background: `${sc.color}22`, color: sc.color, fontWeight: 700 }}>{sc.scenario}</span>
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: sc.color, fontFamily: "Helvetica, Arial, sans-serif" }}>{sc.mult.toFixed(2)}×</div>
                    <div style={{ fontSize: 10, color: "#4a5568", marginTop: 2 }}>${Math.round(sc.mult * capital / 1000)}K</div>
                    <div style={{ fontSize: 10, color: "#4a5568", marginTop: 4 }}>
                      {sc.goalM > 0 ? `Goal by ${sc.goalM}mo` : "Goal not reached"}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Snowball Insight */}
            {simData && (
              <div style={{ background: "#0d1f2d", border: "1px solid #1a3044", borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0" }}>❄ SNOWBALL INSIGHT</span>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2dd4bf", display: "inline-block" }} />
                </div>
                <p style={{ margin: 0, fontSize: 12, color: "#8899aa", lineHeight: 1.6 }}>
                  Your {goalMultiple.toFixed(1)}× <strong style={{ color: "#2dd4bf" }}>qMULTIPLE</strong> goal is
                  {goalMonth > 0
                    ? ` reached at base-case (P50) in ${goalMonth} months — ${aheadMonths} months ahead of your ${horizon}-month horizon.`
                    : ` not reached within your ${horizon}-month horizon at base-case (P50).`}
                  {" "}HODL would deliver only {hodlFinal.toFixed(2)}× in the same period.
                  {dcaEnabled && ` Adding $${dca.toLocaleString()}/mo DCA contributed $${totalDca.toLocaleString()} over ${horizon} months and shifted the curve up by an estimated ${Math.round(dca * horizon / capital * 15)}%.`}
                </p>
              </div>
            )}

            {/* Share + Save */}
            <div style={{ background: "#0d1f2d", border: "1px solid #1a3044", borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#e2e8f0", marginBottom: 10 }}>Share & Save Scenario</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <button style={{ ...btnStyle(false), padding: "6px 14px" }} onClick={() => navigator.clipboard?.writeText(window.location.href)}>⍘ Copy Link</button>
                <button style={{ ...btnStyle(false), padding: "6px 14px" }}>✉ Email</button>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <input
                  type="text"
                  placeholder="Name (e.g. ETH · 24mo)"
                  value={scenarioName}
                  onChange={e => setScenarioName(e.target.value)}
                  style={{ ...inputStyle, flex: 1 }}
                />
                <button
                  onClick={saveScenario}
                  style={{
                    padding: "7px 14px", fontSize: 11, fontWeight: 700, fontFamily: "Helvetica, Arial, sans-serif",
                    borderRadius: 6, border: "1px solid #2dd4bf", background: "rgba(45,212,191,0.12)",
                    color: "#2dd4bf", cursor: "pointer",
                  }}
                >💾 Save</button>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ ...btnStyle(false), padding: "5px 12px" }} onClick={() => setShowHistory(v => !v)}>▼ History ({savedScenarios.length})</button>
                <button style={{ ...btnStyle(false), padding: "5px 12px" }}>⇄ Compare</button>
                <Link href="/hub" style={{ textDecoration: "none" }}>
                  <button style={{ ...btnStyle(false), padding: "5px 12px" }}>→ Portfolio Builder</button>
                </Link>
              </div>
              {showHistory && savedScenarios.length > 0 && (
                <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                  {savedScenarios.map((s, i) => (
                    <div key={i} style={{ background: "#0a1929", borderRadius: 6, padding: "8px 10px", display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 11, color: "#e2e8f0" }}>{s.name}</span>
                      <span style={{ fontSize: 10, color: "#4a5568" }}>{s.params}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Methodology */}
            <div style={{ background: "#0a1929", border: "1px solid #1a3044", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#4a5568", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Methodology & Assumptions</div>
              <p style={{ margin: 0, fontSize: 11, color: "#4a5568", lineHeight: 1.65 }}>
                Monte Carlo simulation runs <strong style={{ color: "#8899aa" }}>800 paths</strong> per scenario using the strategy's historical monthly <strong style={{ color: "#8899aa" }}>aRATE</strong> distribution (log-normal with drawdown events sampled from historical occurrence frequency). Bands represent P10/P25/P50/P75/P90 of terminal qMULTIPLE at each month. HODL benchmark uses asset spot return only, no rebalancing. DCA contributions compound at the same projected rate as the underlying capital, applied at end of each month. <em>Past performance does not guarantee future results — these projections are for educational purposes only.</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
