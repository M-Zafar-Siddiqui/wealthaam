/**
 * WealthAAM Hub Page
 * Design: Dark cosmic theme matching wealthaam-hub.html
 * Intermediate page between landing and dashboard
 * Sections: Header, Hero (new/returning), How It Works, Pathways, Analytics Preview,
 *           AI Pathway Builder, Tier Matrix, Education, Insights, Ecosystem Strip, Footer
 */

import { useState } from "react";
import { Link } from "wouter";

// ─── Pathway data ────────────────────────────────────────────────────────────
const PATHWAYS = [
  {
    id: "WP-001",
    name: "Foundation Path",
    tag: "BTC · ETH · BNB · 4h–12h timeframes · Stable containers only",
    tier: "starter",
    tierLabel: "STARTER",
    featured: true,
    locked: false,
    aar: "702.3%",
    saai: "472.8",
    winRate: "62.6%",
    strategies: 6,
    assets: "BTC, ETH, BNB",
    timeframes: "4h–12h",
    sparkPoints: [20, 25, 22, 30, 28, 35, 33, 40, 38, 45, 43, 52, 50, 58],
  },
  {
    id: "WP-002",
    name: "Balanced Compounder",
    tag: "SOL · XRP · LINK · SUI · 4h–6h timeframes · Mixed containers",
    tier: "standard",
    tierLabel: "STANDARD",
    featured: false,
    locked: false,
    aar: "1,240%",
    saai: "618.4",
    winRate: "64.1%",
    strategies: 8,
    assets: "SOL, XRP, LINK, SUI",
    timeframes: "4h–6h",
    sparkPoints: [15, 20, 18, 28, 32, 38, 35, 44, 48, 55, 52, 62, 68, 75],
  },
  {
    id: "WP-003",
    name: "Mid-Cap Accelerator",
    tag: "NEAR · HBAR · AVAX · 1h–4h timeframes · High containers",
    tier: "standard",
    tierLabel: "STANDARD",
    featured: false,
    locked: false,
    aar: "2,180%",
    saai: "841.2",
    winRate: "61.8%",
    strategies: 10,
    assets: "NEAR, HBAR, AVAX",
    timeframes: "1h–4h",
    sparkPoints: [10, 18, 15, 25, 30, 22, 35, 42, 38, 50, 55, 48, 62, 70],
  },
  {
    id: "WP-004",
    name: "Premium Diversifier",
    tag: "BTC · ETH · SOL · XRP · LINK · 15m–4h · All containers",
    tier: "premium",
    tierLabel: "PREMIUM",
    featured: false,
    locked: false,
    aar: "4,820%",
    saai: "1,204.6",
    winRate: "66.3%",
    strategies: 16,
    assets: "BTC, ETH, SOL, XRP, LINK",
    timeframes: "15m–4h",
    sparkPoints: [12, 22, 20, 32, 38, 45, 42, 55, 60, 68, 72, 80, 85, 95],
  },
  {
    id: "WP-005",
    name: "Elite Alpha Engine",
    tag: "Full asset universe · 5m–1h · Adaptive containers",
    tier: "elite",
    tierLabel: "ELITE",
    featured: false,
    locked: false,
    aar: "12,400%",
    saai: "3,180.0",
    winRate: "68.9%",
    strategies: 24,
    assets: "Full universe",
    timeframes: "5m–1h",
    sparkPoints: [8, 18, 25, 35, 30, 45, 55, 50, 65, 75, 80, 90, 95, 108],
  },
  {
    id: "WP-006",
    name: "xStocks Hybrid",
    tag: "TSLA · NVDA · AAPL xStocks + BTC · ETH · 4h–12h",
    tier: "elite",
    tierLabel: "ELITE",
    featured: false,
    locked: true,
    aar: "—",
    saai: "—",
    winRate: "—",
    strategies: 12,
    assets: "xStocks + Crypto",
    timeframes: "4h–12h",
    sparkPoints: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
  },
];

const TIER_COLORS: Record<string, string> = {
  starter: "text-slate-400 bg-slate-400/10 border-slate-400/25",
  standard: "text-blue-400 bg-blue-400/10 border-blue-400/25",
  premium: "text-cyan-400 bg-cyan-400/10 border-cyan-400/25",
  elite: "text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/25",
};

// ─── Spark SVG ───────────────────────────────────────────────────────────────
function SparkLine({ points, locked }: { points: number[]; locked: boolean }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 300;
  const h = 50;
  const pts = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p - min) / (max - min || 1)) * (h - 6) - 3;
    return `${x},${y}`;
  });
  const d = `M ${pts.join(" L ")}`;
  const fill = `M ${pts[0]} L ${pts.join(" L ")} L ${w},${h} L 0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={locked ? "#64748b" : "#8175ff"} stopOpacity="0.3" />
          <stop offset="100%" stopColor={locked ? "#64748b" : "#8175ff"} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill="url(#sparkFill)" />
      <path d={d} fill="none" stroke={locked ? "#475569" : "#8175ff"} strokeWidth="1.5" />
    </svg>
  );
}

// ─── Radar Triangle SVG ──────────────────────────────────────────────────────
function RadarTriangle() {
  const cx = 65, cy = 65, r = 52;
  const pts = [0, 1, 2].map((i) => {
    const angle = (i * 120 - 90) * (Math.PI / 180);
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
  const vals = [0.82, 0.76, 0.71];
  const dataPts = vals.map((v, i) => {
    const angle = (i * 120 - 90) * (Math.PI / 180);
    return { x: cx + r * v * Math.cos(angle), y: cy + r * v * Math.sin(angle) };
  });
  const outline = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const data = dataPts.map((p) => `${p.x},${p.y}`).join(" ");
  return (
    <svg viewBox="0 0 130 130" className="w-32 h-32">
      <defs>
        <linearGradient id="radarGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#cc15fd" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#15d6ff" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <polygon points={outline} fill="none" stroke="rgba(129,117,255,0.2)" strokeWidth="1" />
      <polygon points={data} fill="url(#radarGrad)" stroke="#8175ff" strokeWidth="1.5" />
      {dataPts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={i === 2 ? "#15d6ff" : "#8175ff"} />
      ))}
    </svg>
  );
}

// ─── eCOST Decay SVG ─────────────────────────────────────────────────────────
function ECostDecay() {
  const w = 600, h = 110;
  const pts: [number, number][] = [];
  for (let i = 0; i <= 14; i++) {
    const x = (i / 14) * w;
    const y = h - 10 - (h - 20) * (1 - Math.exp(-i * 0.28));
    pts.push([x, y]);
  }
  const line = pts.map(([x, y]) => `${x},${y}`).join(" L ");
  const fill = `M ${pts[0][0]},${pts[0][1]} L ${line.slice(line.indexOf(",") + 1)} L ${w},${h} L 0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-28" preserveAspectRatio="none">
      <defs>
        <linearGradient id="ecostGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15d6ff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#15d6ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M ${pts.map(([x, y]) => `${x},${y}`).join(" L ")} L ${w},${h} L 0,${h} Z`} fill="url(#ecostGrad)" />
      <polyline points={pts.map(([x, y]) => `${x},${y}`).join(" ")} fill="none" stroke="#15d6ff" strokeWidth="2" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="4" fill="#15d6ff" />
    </svg>
  );
}

// ─── Main Hub Page ────────────────────────────────────────────────────────────
export default function Hub() {
  const [userMode, setUserMode] = useState<"new" | "existing">("existing");
  const [activeFilter, setActiveFilter] = useState("All");
  const [riskPref, setRiskPref] = useState("Balanced");
  const [horizon, setHorizon] = useState("12 mo");
  const [assets, setAssets] = useState<string[]>(["Large caps", "Mid caps"]);
  const [compareOpen, setCompareOpen] = useState(false);

  const filters = ["All", "Conservative", "Balanced", "Aggressive", "Unlocked"];
  const filteredPaths = PATHWAYS.filter((p) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Unlocked") return !p.locked;
    if (activeFilter === "Conservative") return p.id === "WP-001";
    if (activeFilter === "Balanced") return ["WP-002", "WP-003"].includes(p.id);
    if (activeFilter === "Aggressive") return ["WP-004", "WP-005"].includes(p.id);
    return true;
  });

  const toggleAsset = (a: string) =>
    setAssets((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);

  return (
    <div className="min-h-screen bg-[#07111d] text-[#c8d8e8] font-sans">
      {/* ── CSS Variables ── */}
      <style>{`
        .hub-gradient-text {
          background: linear-gradient(90deg, #cc15fd, #8175ff, #15d6ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hub-brand-gradient { background: linear-gradient(90deg, #cc15fd, #8175ff, #15d6ff); }
        .hub-border-gradient { border-image: linear-gradient(90deg, #cc15fd, #8175ff, #15d6ff) 1; }
        .hub-card { background: #0d1e2e; border: 1px solid rgba(129,117,255,0.15); border-radius: 14px; }
        .hub-card-hover:hover { border-color: rgba(129,117,255,0.4); transform: translateY(-2px); box-shadow: 0 12px 32px -8px rgba(0,0,0,0.5); }
        .hub-surface { background: #0a1828; }
        .hub-surface-2 { background: #0d1e2e; }
        .hub-pulse { width: 7px; height: 7px; border-radius: 50%; background: #15d6ff; box-shadow: 0 0 8px #15d6ff; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.3)} }
        .pfx-q { color: #8175ff; font-weight: 800; font-style: italic; }
        .pfx-e { color: #15d6ff; font-weight: 800; font-style: italic; }
        .pfx-a { color: #cc15fd; font-weight: 800; font-style: italic; }
        .pfx-x { color: #f59e0b; font-weight: 800; font-style: italic; }
        .metric-name { font-weight: 700; letter-spacing: 0.5px; }
        .pos { color: #4ade80; }
        .neg { color: #f87171; }
      `}</style>

      {/* ══════════════════════════════════════════════════════════
          APP HEADER
      ══════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 flex items-center gap-4 px-6 py-3 border-b border-white/5 hub-surface backdrop-blur-md">
        {/* Brand */}
        <div className="flex items-center gap-3 mr-4">
          <svg viewBox="0 0 120 110" className="w-8 h-8" fill="none">
            <defs>
              <linearGradient id="waGrad" x1="0" y1="0.5" x2="1" y2="0.5">
                <stop offset="0%" stopColor="#cc15fd" />
                <stop offset="50%" stopColor="#8175ff" />
                <stop offset="100%" stopColor="#15d6ff" />
              </linearGradient>
            </defs>
            <path fill="url(#waGrad)" d="M 14 22 L 30 22 L 38 78 L 48 30 L 60 30 L 72 78 L 80 22 L 96 22 L 82 96 L 66 96 L 54 50 L 42 96 L 26 96 Z" />
            <circle cx="60" cy="60" r="3" fill="#15d6ff" opacity="0.9" />
          </svg>
          <div>
            <span className="font-bold text-white text-lg tracking-tight">WealthAAM</span>
            <span className="ml-1.5 text-sm font-medium hub-gradient-text">Hub</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {["Hub", "Pathways", "Builder", "Education", "Pricing"].map((item) => (
            <a
              key={item}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                item === "Hub"
                  ? "bg-white/10 text-white"
                  : "text-[#8a9bb0] hover:text-white hover:bg-white/5"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Ecosystem switcher */}
        <div className="hidden lg:flex items-center gap-1 text-xs font-semibold mr-2">
          {["WealthAAM", "AACCUMA", "SocioAAM"].map((eco) => (
            <a
              key={eco}
              href={eco === "AACCUMA" ? "https://aaccuma.com" : "#"}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                eco === "WealthAAM"
                  ? "hub-gradient-text bg-white/5"
                  : "text-[#8a9bb0] hover:text-white"
              }`}
            >
              {eco}
            </a>
          ))}
        </div>

        {/* CTA */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white hub-brand-gradient transition-all hover:brightness-110 hover:-translate-y-0.5">
          Open Dashboard
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </button>

        {/* User chip */}
        <div className="hidden sm:flex items-center gap-2 ml-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <div className="w-6 h-6 rounded-full hub-brand-gradient flex items-center justify-center text-white text-xs font-bold">Z</div>
          <span className="text-sm text-white font-medium">Zafar</span>
          <span className="text-[10px] font-bold text-fuchsia-400 bg-fuchsia-400/10 px-1.5 py-0.5 rounded">PINNACLE</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6">

        {/* ══════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#8a9bb0] mb-6">
                <div className="hub-pulse" />
                QuantaamLab AAM Ecosystem · Retail Wealth Tier
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
                Digital wealth,<br />
                on <em className="hub-gradient-text not-italic">Pathways</em>.
              </h1>
              <p className="text-[#8a9bb0] text-lg leading-relaxed mb-8">
                WealthAAM is the <strong className="text-white">execution layer</strong> of the AAM ecosystem — pick a curated{" "}
                <strong className="text-white">Pathway</strong>, fund it, and let QuantFai's autonomous strategies accumulate. Track everything in your dashboard, and open AACCUMA when you want to dig into the analytics.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <button className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white hub-brand-gradient hover:brightness-110 transition-all hover:-translate-y-0.5 shadow-lg shadow-purple-500/20">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  Start a free Demo Pathway
                </button>
                <button className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-white/5 border border-white/15 hover:bg-white/10 transition-all">
                  Continue to Dashboard
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", text: "Non-custodial · keys stay yours" },
                  { icon: "M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", text: "Powered by QuantFai R&D" },
                  { icon: "M22 11.08V12a10 10 0 11-5.93-9.14M22 4 12 14.01l-3-2.99", text: "14-month verified track record" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#8a9bb0]">
                    <svg className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d={t.icon} />
                    </svg>
                    <span dangerouslySetInnerHTML={{ __html: t.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Welcome card */}
            <div className="hub-card p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 hub-brand-gradient" />
              {/* Tab switcher */}
              <div className="flex gap-1 p-1 rounded-lg bg-black/20 mb-5">
                {(["new", "existing"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setUserMode(mode)}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-semibold transition-all ${
                      userMode === mode ? "bg-white/10 text-white" : "text-[#8a9bb0] hover:text-white"
                    }`}
                  >
                    {mode === "new" ? "New here" : "Welcome back"}
                  </button>
                ))}
              </div>

              {userMode === "existing" ? (
                <>
                  <div className="text-2xl font-bold text-white mb-1">
                    Welcome back, <em className="hub-gradient-text not-italic">Zafar</em>
                  </div>
                  <p className="text-sm text-[#8a9bb0] mb-5">
                    Your 3 active Pathways accumulated <strong className="text-green-400">+$47.20</strong> today across 6 trades. Markets favorable for ETH & XRP holders.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { label: "Total Wealth", value: "$10,150", sub: "+9.05% · 30d", pos: true },
                      { label: "Active Pathways", value: "3 / 6", sub: "22 strategies", pos: false },
                      { label: "qMULTIPLE", value: "3.42×", sub: "avg across pathways", pos: true },
                      { label: "Tier", value: "PINNACLE", sub: "All pathways unlocked", pos: false, cyan: true },
                    ].map((s, i) => (
                      <div key={i} className="p-3 rounded-xl bg-black/20 border border-white/5">
                        <div className="text-xs text-[#8a9bb0] mb-1 font-medium">{s.label}</div>
                        <div className={`text-xl font-bold font-mono ${s.cyan ? "text-cyan-400" : s.pos ? "text-green-400" : "text-white"}`}>{s.value}</div>
                        <div className="text-xs text-[#8a9bb0] mt-0.5">{s.sub}</div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white hub-brand-gradient hover:brightness-110 transition-all">
                    Continue to Dashboard
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-white mb-1">Start your wealth journey</div>
                  <p className="text-sm text-[#8a9bb0] mb-5">
                    Browse curated Pathways, run a free demo, and see exactly how the AAM engine accumulates assets before committing any capital.
                  </p>
                  <div className="space-y-3 mb-5">
                    {[
                      "Free to browse all Pathways",
                      "Demo mode with $10,000 paper capital",
                      "No exchange connection required to start",
                      "Full AAM analytics preview in AACCUMA",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-[#c8d8e8]">
                        <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white hub-brand-gradient hover:brightness-110 transition-all">
                    Create Free Account
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            HOW WEALTHAAM WORKS
        ══════════════════════════════════════════════════════════ */}
        <section className="py-12 border-t border-white/5">
          <div className="text-center mb-10">
            <div className="inline-block text-xs font-bold tracking-widest uppercase text-[#8a9bb0] mb-3">How WealthAAM works</div>
            <h2 className="text-4xl font-bold text-white mb-3">
              Five steps from <em className="hub-gradient-text not-italic">signup</em> to <em className="hub-gradient-text not-italic">compounding</em>.
            </h2>
            <p className="text-[#8a9bb0] max-w-2xl mx-auto">
              Pathways are curated bundles of AAM strategies — pre-validated by QuantFai's R&D Hub and ready to fund. The whole flow takes about 8 minutes from first visit to first trade.
            </p>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { n: 1, title: "Sign up & pick tier", desc: "Free to browse. Subscribe at the tier that matches your capital and risk appetite.", pill: "≈ 90 sec" },
              { n: 2, title: "Choose a Pathway", desc: "Browse curated bundles or use the AI Pathway Builder. Preview AAM analytics before committing.", pill: "≈ 3 min" },
              { n: 3, title: "Demo or fund", desc: "Test any pathway in demo mode with $10,000 paper capital. Connect your exchange when ready.", pill: "≈ 2 min" },
              { n: 4, title: "Auto-execute", desc: "QuantFai's autonomous execution agent runs your pathway 24/7 — accumulating, rebalancing, routing sub-second.", pill: "Always-on", brand: true },
              { n: 5, title: "Track & analyze", desc: "Watch your pathway in the WealthAAM dashboard. For deep analytics, open in AACCUMA.", pill: "Daily / weekly", brand: true },
            ].map((step) => (
              <div key={step.n} className="hub-card p-5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-0.5 hub-brand-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg hub-brand-gradient flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {step.n}
                  </div>
                </div>
                <div className="text-sm font-bold text-white mb-2">{step.title}</div>
                <div className="text-xs text-[#8a9bb0] leading-relaxed mb-3">{step.desc}</div>
                <div className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${
                  step.brand
                    ? "hub-brand-gradient text-white"
                    : "bg-white/5 border border-white/10 text-[#8a9bb0]"
                }`}>
                  {step.pill}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            FEATURED PATHWAYS
        ══════════════════════════════════════════════════════════ */}
        <section className="py-12 border-t border-white/5">
          <div className="mb-8">
            <div className="text-xs font-bold tracking-widest uppercase text-[#8a9bb0] mb-2">Wealth Pathways</div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h2 className="text-4xl font-bold text-white">
                Curated AAM strategy <em className="hub-gradient-text not-italic">bundles</em>.
              </h2>
              <div className="flex flex-wrap gap-2">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      activeFilter === f
                        ? "text-white bg-white/10 border-purple-500/30"
                        : "text-[#8a9bb0] bg-[#0d1e2e] border-white/10 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[#8a9bb0] mt-3 text-sm max-w-3xl">
              Every pathway is a portfolio of AAM strategies validated against 14+ months of live R&D data. AAM metrics shown below use the v1.3.7 prefix grammar — open any pathway for the full analytics in AACCUMA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredPaths.map((p) => (
              <div
                key={p.id}
                className={`hub-card relative overflow-hidden flex flex-col transition-all duration-200 ${
                  p.locked ? "opacity-60 saturate-50" : "hub-card-hover cursor-pointer"
                } ${p.featured ? "border-cyan-500/30" : ""}`}
              >
                {p.featured && <div className="absolute top-0 left-0 right-0 h-0.5 hub-brand-gradient" />}
                {p.locked && <div className="absolute inset-0 bg-[#07111d]/30 rounded-[14px] pointer-events-none z-10" />}

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="text-[10px] font-mono text-[#8a9bb0] mb-1 tracking-wide">{p.id}</div>
                      <div className="text-xl font-bold text-white leading-tight">{p.name}</div>
                      <div className="text-xs text-[#8a9bb0] mt-1 leading-relaxed">{p.tag}</div>
                    </div>
                    <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-1 rounded border flex-shrink-0 ${TIER_COLORS[p.tier]}`}>
                      {p.tierLabel}
                    </span>
                  </div>

                  {/* AAM metrics */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-black/20 mb-3">
                    {[
                      { label: "aAAR%", value: p.aar, pfx: "pfx-a" },
                      { label: "SAAI", value: p.saai, pfx: "" },
                      { label: "Win Rate", value: p.winRate, pfx: "" },
                    ].map((m, i) => (
                      <div key={i} className="flex flex-col">
                        <div className="text-[10px] text-[#8a9bb0] font-semibold mb-1">{m.label}</div>
                        <div className="font-mono text-base font-bold text-white">{m.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Meta pills */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {[
                      `${p.strategies} strategies`,
                      p.timeframes,
                      p.assets,
                    ].map((pill, i) => (
                      <span key={i} className="text-[10px] font-medium px-2 py-1 rounded bg-white/5 border border-white/8 text-[#8a9bb0]">
                        {pill}
                      </span>
                    ))}
                  </div>

                  {/* Spark */}
                  <div className="mb-3">
                    <SparkLine points={p.sparkPoints} locked={p.locked} />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    {p.locked ? (
                      <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold text-[#8a9bb0] border border-dashed border-white/20 cursor-not-allowed">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                        Upgrade to Unlock
                      </button>
                    ) : (
                      <>
                        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold text-white hub-brand-gradient hover:brightness-110 transition-all">
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                          Start Demo
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold text-[#c8d8e8] bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                          View Details
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            ANALYTICS PREVIEW (AACCUMA)
        ══════════════════════════════════════════════════════════ */}
        <section className="py-12 border-t border-white/5">
          <div className="text-center mb-8">
            <div className="text-xs font-bold tracking-widest uppercase text-[#8a9bb0] mb-2">Pathway AAM Analytics</div>
            <h2 className="text-4xl font-bold text-white">
              The deeper picture lives in <em className="hub-gradient-text not-italic">AACCUMA</em>.
            </h2>
          </div>

          <div className="hub-card relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 hub-brand-gradient" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left */}
              <div className="p-8 lg:border-r border-purple-500/15">
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-fuchsia-400 mb-4">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                  </svg>
                  Preview · Foundation Path
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Open this pathway in <em className="hub-gradient-text not-italic">AACCUMA</em> for the full analytics.
                </h3>
                <p className="text-sm text-[#8a9bb0] leading-relaxed mb-5">
                  WealthAAM gives you the execution surface — dashboard, trades, holdings. AACCUMA gives you the analyst surface. The same pathway, same strategies, deeper lens. Available to all WealthAAM subscribers from <strong className="text-white">Standard tier</strong> onwards.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    { icon: "polygon", text: "<strong>Diagnostic Triangle</strong> · qMULTIPLE × qRISK × xCOMPOSITE radar position" },
                    { icon: "wave", text: "<strong>eCOST decay</strong> · how your effective cost basis falls trade-by-trade" },
                    { icon: "bar", text: "<strong>aRATE% vs qTARGET</strong> divergence — realized vs achievable accumulation" },
                    { icon: "info", text: "<strong>14-day signal heatmap</strong> · trade frequency × hour of day, per strategy" },
                    { icon: "headphones", text: "<strong>AI Voice Reports</strong> · weekly natural-language audit of your pathway" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#c8d8e8]">
                      <svg className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span dangerouslySetInnerHTML={{ __html: item.text }} />
                    </li>
                  ))}
                </ul>
                <a
                  href="https://aaccuma.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white hub-brand-gradient hover:brightness-110 transition-all hover:-translate-y-0.5 shadow-lg shadow-purple-500/20"
                >
                  Open in AACCUMA
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>

              {/* Right: Charts */}
              <div className="p-6 bg-black/20 flex flex-col gap-4">
                {/* Diagnostic Triangle */}
                <div className="hub-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <svg className="w-3.5 h-3.5 text-fuchsia-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                      </svg>
                      Diagnostic Triangle
                    </div>
                    <div className="text-[10px] font-mono text-[#8a9bb0]">Foundation · 14m</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <RadarTriangle />
                    <div className="flex flex-col gap-2.5">
                      {[
                        { pfx: "pfx-q", name: "qMULTIPLE", desc: "Quantity multiplier", val: "3.42×" },
                        { pfx: "pfx-q", name: "qRISK", desc: "Risk-adjusted accumulation", val: "3.18" },
                        { pfx: "pfx-x", name: "xCOMPOSITE", desc: "Compounding elegance", val: "1.118" },
                      ].map((m, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i < 2 ? "bg-purple-400" : "bg-amber-400"}`} />
                          <div className="text-[#8a9bb0]">
                            <span className={m.pfx}>{m.name.charAt(0)}</span>
                            <span className="metric-name text-[#c8d8e8]">{m.name.slice(1)}</span>
                            <br />
                            <span className="text-[10px]">{m.desc}</span>
                          </div>
                          <div className="font-mono font-bold text-white ml-auto">{m.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* eCOST Decay */}
                <div className="hub-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                      <span className="pfx-e">e</span><span className="metric-name">COST</span> Decay
                    </div>
                    <div className="text-[10px] font-mono text-[#8a9bb0]">14-month trail</div>
                  </div>
                  <ECostDecay />
                  <div className="text-xs text-[#8a9bb0] mt-2">
                    Initial entry <strong className="text-white">$3,385</strong> → effective cost today{" "}
                    <strong className="text-cyan-400">$177</strong>.{" "}
                    <strong className="text-green-400">+1,058%</strong> safety buffer vs ETH live price.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            AI PATHWAY BUILDER
        ══════════════════════════════════════════════════════════ */}
        <section className="py-12 border-t border-white/5">
          <div className="text-center mb-8">
            <div className="text-xs font-bold tracking-widest uppercase text-[#8a9bb0] mb-2">AI Pathway Builder</div>
            <h2 className="text-4xl font-bold text-white">
              Build a pathway that fits <em className="hub-gradient-text not-italic">you</em>.
            </h2>
            <p className="text-[#8a9bb0] mt-3 max-w-2xl mx-auto text-sm">
              Tell the builder your capital, risk profile, and time horizon. The AI matches strategies from QuantFai's R&D library, simulates the resulting pathway, and shows projected AAM metrics before you commit.
            </p>
          </div>

          <div className="hub-card overflow-hidden">
            {/* Builder header */}
            <div className="flex items-center justify-between gap-4 p-6 bg-black/20 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(204,21,253,0.18), rgba(21,214,255,0.18))", border: "1px solid rgba(129,117,255,0.30)" }}>
                  <svg className="w-7 h-7 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-bold text-white">Custom <em className="hub-gradient-text not-italic">Pathway Builder</em></div>
                  <div className="text-xs text-[#8a9bb0] mt-0.5">AI-matched strategies · pre-trade simulation · save as draft, fund when ready</div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-[#8a9bb0] bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" /><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
                </svg>
                Reset
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Inputs */}
              <div className="p-6 border-r border-white/5 space-y-5">
                <div>
                  <div className="text-xs font-bold tracking-wider uppercase text-[#8a9bb0] mb-2">Capital to deploy</div>
                  <input
                    type="text"
                    defaultValue="$10,000"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-purple-500/50"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-wider uppercase text-[#8a9bb0] mb-2">Risk preference</div>
                  <div className="flex gap-2">
                    {["Conservative", "Balanced", "Aggressive"].map((r) => (
                      <button
                        key={r}
                        onClick={() => setRiskPref(r)}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                          riskPref === r
                            ? "text-white hub-brand-gradient border-transparent"
                            : "text-[#8a9bb0] bg-white/5 border-white/10 hover:border-white/20"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold tracking-wider uppercase text-[#8a9bb0] mb-2">Time horizon</div>
                  <div className="flex gap-2">
                    {["3 mo", "6 mo", "12 mo", "24 mo+"].map((h) => (
                      <button
                        key={h}
                        onClick={() => setHorizon(h)}
                        className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold border transition-all ${
                          horizon === h
                            ? "text-white hub-brand-gradient border-transparent"
                            : "text-[#8a9bb0] bg-white/5 border-white/10 hover:border-white/20"
                        }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold tracking-wider uppercase text-[#8a9bb0] mb-2">Asset preference</div>
                  <div className="flex flex-wrap gap-2">
                    {["Large caps", "Mid caps", "Small caps", "Stables"].map((a) => (
                      <button
                        key={a}
                        onClick={() => toggleAsset(a)}
                        className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
                          assets.includes(a)
                            ? "text-white hub-brand-gradient border-transparent"
                            : "text-[#8a9bb0] bg-white/5 border-white/10 hover:border-white/20"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output */}
              <div className="p-6 bg-black/10">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8a9bb0] mb-3">
                  <div className="hub-pulse" />
                  AI-generated pathway · ready to demo
                </div>
                <div className="text-lg font-bold text-white mb-1">
                  Pathway: <em className="hub-gradient-text not-italic">Balanced Mid-Cap Compounder</em>
                </div>
                <div className="text-xs text-[#8a9bb0] mb-4 leading-relaxed">
                  8 strategies across SOL, XRP, LINK, SUI, NEAR, HBAR · 4h–6h timeframes · Stable + High container mix · projected for your $10,000 over 12 months.
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { pfx: "pfx-q", name: "qMULTIPLE", val: "4.12×" },
                    { pfx: "pfx-q", name: "qRISK", val: "3.74" },
                    { pfx: "pfx-x", name: "xCOMPOSITE", val: "1.142" },
                    { pfx: "pfx-a", name: "aAAR%", val: "1,240%" },
                  ].map((m, i) => (
                    <div key={i} className="p-3 rounded-xl bg-black/20 border border-white/5">
                      <div className="text-[10px] text-[#8a9bb0] mb-1">
                        <span className={m.pfx}>{m.name.charAt(0)}</span>
                        <span className="metric-name">{m.name.slice(1)}</span>
                      </div>
                      <div className="font-mono text-lg font-bold text-white">{m.val}</div>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-black/20 border border-white/5 mb-4">
                  <div className="text-[10px] text-[#8a9bb0] mb-2 font-semibold">STRATEGY ALLOCATION</div>
                  {[
                    { asset: "SOL", pct: 22, color: "#8175ff" },
                    { asset: "XRP", pct: 18, color: "#cc15fd" },
                    { asset: "LINK", pct: 16, color: "#15d6ff" },
                    { asset: "SUI", pct: 14, color: "#4ade80" },
                    { asset: "Other", pct: 30, color: "#f59e0b" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-2 mb-1.5">
                      <div className="text-[10px] text-[#8a9bb0] w-8">{s.asset}</div>
                      <div className="flex-1 h-1.5 rounded-full bg-white/5">
                        <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                      </div>
                      <div className="text-[10px] font-mono text-[#c8d8e8] w-6 text-right">{s.pct}%</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white hub-brand-gradient hover:brightness-110 transition-all">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                    Demo this Pathway
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-[#c8d8e8] bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    Save as Draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            TIER MATRIX
        ══════════════════════════════════════════════════════════ */}
        <section className="py-12 border-t border-white/5">
          <div className="text-center mb-8">
            <div className="text-xs font-bold tracking-widest uppercase text-[#8a9bb0] mb-2">Subscription Tiers</div>
            <h2 className="text-4xl font-bold text-white">
              Choose your <em className="hub-gradient-text not-italic">accumulation tier</em>.
            </h2>
          </div>

          <div className="hub-card overflow-hidden">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
              {[
                { name: "FOUNDATION", price: "$19", color: "text-slate-400", features: ["6 strategies", "BTC, ETH, BNB", "4h–12h timeframes", "1 Pathway", "Basic dashboard"], locked: false },
                { name: "ACCELERATOR", price: "$49", color: "text-blue-400", features: ["16 strategies", "+ SOL, XRP, LINK", "1h–12h timeframes", "3 Pathways", "AACCUMA Standard"], locked: false },
                { name: "POWERHOUSE", price: "$96", color: "text-cyan-400", features: ["32 strategies", "Full crypto universe", "15m–12h timeframes", "5 Pathways", "AACCUMA Premium"], locked: false, popular: true },
                { name: "PINNACLE", price: "$149", color: "text-fuchsia-400", features: ["All strategies", "Crypto + xStocks", "All timeframes", "Unlimited Pathways", "AACCUMA Elite"], locked: false },
              ].map((tier, i) => (
                <div key={i} className={`p-5 relative ${tier.popular ? "bg-white/3" : ""}`}>
                  {tier.popular && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 hub-brand-gradient" />
                  )}
                  {tier.popular && (
                    <div className="text-[9px] font-black tracking-wider uppercase text-white hub-brand-gradient px-2 py-0.5 rounded-full inline-block mb-2">
                      Most Popular
                    </div>
                  )}
                  <div className={`text-xs font-black tracking-wider uppercase mb-1 ${tier.color}`}>{tier.name}</div>
                  <div className="text-2xl font-bold text-white mb-1">{tier.price}<span className="text-xs text-[#8a9bb0] font-normal">/mo</span></div>
                  <div className="text-[10px] text-[#8a9bb0] mb-4">Bundle with AACCUMA</div>
                  <ul className="space-y-2 mb-4">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-[#c8d8e8]">
                        <svg className="w-3 h-3 text-cyan-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${
                    tier.popular
                      ? "text-white hub-brand-gradient hover:brightness-110"
                      : "text-[#c8d8e8] bg-white/5 border border-white/10 hover:bg-white/10"
                  }`}>
                    Get Started
                  </button>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-white/5 text-center">
              <Link href="/#subscription" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                View full pricing comparison →
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            ECOSYSTEM STRIP
        ══════════════════════════════════════════════════════════ */}
        <section className="py-12 border-t border-white/5">
          <div className="text-center mb-8">
            <div className="text-xs font-bold tracking-widest uppercase text-[#8a9bb0] mb-2">The AAM Ecosystem</div>
            <h2 className="text-4xl font-bold text-white">
              WealthAAM is one layer of <em className="hub-gradient-text not-italic">QuantaamLab</em>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "WealthAAM",
                badge: "You are here",
                badgeColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/25",
                desc: "The execution layer. Pick a Pathway, fund it, and let the AAM engine accumulate assets autonomously.",
                link: "#",
                active: true,
              },
              {
                name: "AACCUMA",
                badge: "Analytics Layer",
                badgeColor: "text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/25",
                desc: "The analytics layer. Deep AAM metrics, Diagnostic Triangle, eCOST decay, regime reads, and AI voice reports.",
                link: "https://aaccuma.com",
                active: false,
              },
              {
                name: "SocioAAM",
                badge: "Community Layer",
                badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/25",
                desc: "The community layer. DAO-governed communities, social accumulation strategies, and collective wealth building.",
                link: "#",
                active: false,
              },
            ].map((eco, i) => (
              <div key={i} className={`hub-card p-6 relative overflow-hidden ${eco.active ? "border-cyan-500/30" : "hub-card-hover"}`}>
                {eco.active && <div className="absolute top-0 left-0 right-0 h-0.5 hub-brand-gradient" />}
                <div className="flex items-start justify-between mb-3">
                  <div className="text-lg font-bold text-white">{eco.name}</div>
                  <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-1 rounded border ${eco.badgeColor}`}>
                    {eco.badge}
                  </span>
                </div>
                <p className="text-sm text-[#8a9bb0] leading-relaxed mb-4">{eco.desc}</p>
                <a
                  href={eco.link}
                  target={eco.link.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {eco.active ? "Explore Pathways" : `Visit ${eco.name}`}
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ══════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════ */}
      <footer className="border-t border-white/5 mt-8 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <svg viewBox="0 0 120 110" className="w-7 h-7" fill="none">
                  <defs>
                    <linearGradient id="waGradF" x1="0" y1="0.5" x2="1" y2="0.5">
                      <stop offset="0%" stopColor="#cc15fd" /><stop offset="50%" stopColor="#8175ff" /><stop offset="100%" stopColor="#15d6ff" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#waGradF)" d="M 14 22 L 30 22 L 38 78 L 48 30 L 60 30 L 72 78 L 80 22 L 96 22 L 82 96 L 66 96 L 54 50 L 42 96 L 26 96 Z" />
                </svg>
                <span className="font-bold text-white">WealthAAM</span>
              </div>
              <p className="text-xs text-[#8a9bb0] leading-relaxed max-w-xs">
                The First Asset-Centric Wealth Management Platform. Powered by QuantFai R&D. Part of the QuantaamLab AAM Ecosystem.
              </p>
            </div>
            {[
              { title: "Product", links: ["Pathways", "AI Builder", "AACCUMA Analytics", "Pricing", "Roadmap"] },
              { title: "Company", links: ["About QuantaamLab", "QuantFai R&D", "Blog", "Careers", "Contact"] },
              { title: "Legal", links: ["Terms of Service", "Privacy Policy", "Risk Disclosure", "Compliance"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-[10px] font-black tracking-widest uppercase text-white mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j} className="text-xs text-[#8a9bb0] hover:text-white cursor-pointer transition-colors">{link}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-[10px] text-[#8a9bb0]">
            <div>© 2026 QuantaamLab. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <span><strong className="text-white">Non-custodial</strong> · Your keys, your assets</span>
              <span><strong className="text-white">QuantFai R&D</strong> · 14-month verified track record</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
