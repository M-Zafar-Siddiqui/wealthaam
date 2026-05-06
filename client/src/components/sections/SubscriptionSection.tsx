import { AnimatedSection } from "@/components/AnimatedSection";
import React, { useState } from "react";
import { Check, Crown, Star, Zap, Gem, Info } from "lucide-react";
import { toast } from "sonner";

// Bundle pricing data
const TIERS = [
  {
    name: "FOUNDATION",
    tier: "Basic",
    tagline: "Start Your Wealth Journey",
    badge: null,
    wealthaamPrice: 19,
    aaccumaPrice: 19,
    bundlePrice: 19,
    bundleDiscount: 50,
    canToggleAaccuma: true,
    aaccumaMandatory: false,
    features: [
      "AGM Core Engine — 12hr & 24hr intervals",
      "Two Curated Wealth Pathways",
      "1 CEX + 2 sub-accounts",
      "Top 10 AVI-selected Crypto",
      "AI Assistant (Basic)",
      "Quarterly Auto-Rebalancing",
      "30-day Analytics",
      "Email Support (48hr)",
      "AGM Academy Access",
      "Mobile & Web Access",
    ],
    aaccumaFeatures: [
      "AAM Public Dashboard",
      "Crypto Asset Analytics",
      "Basic AAM Metrics (AAR%, SAAI)",
      "Turtle Effect Tracker",
    ],
  },
  {
    name: "ACCELERATOR",
    tier: "Advanced",
    tagline: "Accelerate Your Wealth",
    badge: "POPULAR",
    wealthaamPrice: 39,
    aaccumaPrice: 29,
    bundlePrice: 49,
    bundleDiscount: 28,
    canToggleAaccuma: true,
    aaccumaMandatory: false,
    features: [
      "Everything in Foundation, PLUS:",
      "AGM Advanced — 6hr, 12hr, 24hr",
      "4 Premium Wealth Pathways",
      "3 CEX + 6 sub-accounts",
      "Top 25 Crypto + 10 xStocks",
      "Multi-AI Agent System",
      "AI Assistant (Advanced + Voice)",
      "Monthly Auto-Rebalancing",
      "1-year Analytics + Benchmarks",
      "25 Smart Alerts",
      "Priority Support (24hr)",
      "Tax-Loss Harvesting Insights",
    ],
    aaccumaFeatures: [
      "Tier 1 Asset Analytics",
      "Crypto & xStocks Analytics",
      "Full AAM Metrics Suite",
      "Snowball Calculator",
      "Strategy Comparison Tools",
    ],
  },
  {
    name: "POWERHOUSE",
    tier: "Pro",
    tagline: "Professional-Grade Management",
    badge: "BEST VALUE",
    wealthaamPrice: 79,
    aaccumaPrice: 49,
    bundlePrice: 96,
    bundleDiscount: 25,
    canToggleAaccuma: false,
    aaccumaMandatory: true,
    features: [
      "Everything in Accelerator, PLUS:",
      "AGM Pro — 4hr, 6hr, 12hr, 24hr",
      "6 Elite Wealth Pathways",
      "10 CEX & DEX + 10 sub-accounts",
      "Top 100 Crypto + 25 xStocks + Gold",
      "Voice AI Assistant",
      "AI Journals (Tech + Fundamental)",
      "Bi-weekly Auto-Rebalancing",
      "Unlimited Analytics (Full History)",
      "100 Smart Alerts",
      "AI Account Manager",
      "Live Chat + Email (12hr)",
      "Full Tax Package",
      "Full API Access",
    ],
    aaccumaFeatures: [
      "Full Asset Suite (Crypto, xStocks, Commodities)",
      "Advanced AAM Risk Controls",
      "Low-Timeframe AI Analytics",
      "xCOMPOSITE & xRISK Metrics",
      "Institutional Analytics Suite",
    ],
  },
  {
    name: "PINNACLE",
    tier: "Elite",
    tagline: "Elite Wealth Management",
    badge: "ELITE",
    wealthaamPrice: 99,
    aaccumaPrice: 99,
    bundlePrice: 149,
    bundleDiscount: 25,
    canToggleAaccuma: false,
    aaccumaMandatory: true,
    features: [
      "Everything in Powerhouse, PLUS:",
      "AGM Elite — 1hr to 24hr + HIPs",
      "All Pathways + Custom HIPs",
      "10+ CEX & DEX + 15 sub-accounts",
      "100+ Crypto + 25+ xStocks + Gold",
      "Virtual AI Wealth Advisor",
      "Advanced AI Journals (All Analysis)",
      "Real-Time Auto-Rebalancing",
      "Unlimited Everything",
      "VIP Support (4hr + Phone)",
      "White-Glove Tax (CPA)",
      "Enterprise API + SLA",
      "Custom Strategy Development",
      "Elite Network Access",
    ],
    aaccumaFeatures: [
      "Custom Crypto & Traditional Stocks",
      "All xSeries Metrics (xCOMPOSITE, xTURTLE, xSNOWBALL…)",
      "Real-Time AI Risk Controls",
      "Priority AAM Analytics Access",
      "Beta Feature Access",
    ],
  },
] as const;

type BillingPeriod = "monthly" | "quarterly" | "annual";

const tierGradients: Record<string, string> = {
  FOUNDATION: "from-[#4A90D9] to-[#6B5CBF]",
  ACCELERATOR: "from-[#6B5CBF] to-[#9B59B6]",
  POWERHOUSE: "from-[#9B59B6] to-[#D946A8]",
  PINNACLE: "from-[#D946A8] to-[#FF6B9D]",
};

const tierIcons: Record<string, React.ReactNode> = {
  FOUNDATION: <Star size={18} />,
  ACCELERATOR: <Zap size={18} />,
  POWERHOUSE: <Crown size={18} />,
  PINNACLE: <Gem size={18} />,
};

function calcPrice(basePrice: number, billing: BillingPeriod, isBundle: boolean): number {
  if (!isBundle) return basePrice; // no discount on standalone
  if (billing === "annual") return Math.round(basePrice * 0.75);
  if (billing === "quarterly") return Math.round(basePrice * 0.90);
  return basePrice;
}

// ─── Compare All Features Table ───────────────────────────────────────────
const COMPARE_CATEGORIES = [
  {
    category: "Core Engine",
    rows: [
      { label: "AGM Timeframes", values: ["12hr & 24hr", "6hr, 12hr, 24hr", "4hr, 6hr, 12hr, 24hr", "1hr–24hr + HIPs"] },
      { label: "Wealth Pathways", values: ["2 Pathways", "4 Pathways", "6 Elite Pathways", "All + Custom HIPs"] },
      { label: "Auto-Rebalancing", values: ["Quarterly", "Monthly", "Bi-weekly", "Real-Time"] },
      { label: "AI Assistant", values: ["Basic", "Advanced + Voice", "Voice AI", "Virtual Wealth Advisor"] },
    ],
  },
  {
    category: "Exchange & Assets",
    rows: [
      { label: "CEX / DEX Connections", values: ["1 CEX", "3 CEX", "10 CEX & DEX", "10+ CEX & DEX"] },
      { label: "Sub-accounts", values: ["2", "6", "10", "15"] },
      { label: "Crypto Coverage", values: ["Top 10", "Top 25", "Top 100", "100+"] },
      { label: "xStocks", values: ["—", "10 xStocks", "25 xStocks", "25+ xStocks"] },
      { label: "Commodities (Gold etc.)", values: ["—", "—", "✓", "✓"] },
      { label: "Traditional Stocks", values: ["—", "—", "—", "Custom"] },
    ],
  },
  {
    category: "Analytics & Reporting",
    rows: [
      { label: "Analytics History", values: ["30 days", "1 year", "Unlimited", "Unlimited"] },
      { label: "Smart Alerts", values: ["—", "25", "100", "Unlimited"] },
      { label: "Benchmarks", values: ["—", "✓", "✓", "✓"] },
      { label: "Tax-Loss Harvesting", values: ["—", "Insights", "Full Package", "White-Glove CPA"] },
      { label: "API Access", values: ["—", "—", "Full API", "Enterprise + SLA"] },
    ],
  },
  {
    category: "AACCUMA Analytics (Bundle)",
    rows: [
      { label: "Asset Coverage", values: ["Crypto only", "Crypto + xStocks", "Crypto, xStocks, Commodities", "Custom (all assets)"] },
      { label: "AAM Metrics", values: ["Basic (AAR%, SAAI)", "Full Suite", "Advanced + xCOMPOSITE/xRISK", "All xSeries Metrics"] },
      { label: "Turtle Effect Tracker", values: ["✓", "✓", "✓", "✓"] },
      { label: "Snowball Calculator", values: ["—", "✓", "✓", "✓"] },
      { label: "Real-Time AI Risk Controls", values: ["—", "—", "✓", "✓"] },
      { label: "Low-Timeframe AI Analytics", values: ["—", "—", "✓", "✓"] },
      { label: "Beta Feature Access", values: ["—", "—", "—", "✓"] },
    ],
  },
  {
    category: "Support",
    rows: [
      { label: "Support Channel", values: ["Email", "Priority Email", "Live Chat + Email", "VIP + Phone"] },
      { label: "Response Time", values: ["48hr", "24hr", "12hr", "4hr"] },
      { label: "AI Account Manager", values: ["—", "—", "✓", "✓"] },
      { label: "AGM Academy Access", values: ["✓", "✓", "✓", "✓"] },
    ],
  },
];

const TIER_NAMES = ["FOUNDATION", "ACCELERATOR", "POWERHOUSE", "PINNACLE"];
const TIER_COLORS = ["text-[#4A90D9]", "text-[#6B5CBF]", "text-[#9B59B6]", "text-[#D946A8]"];

function CompareTable() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-6">
      {/* Toggle Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
        >
          <span>{open ? "Hide" : "See full"} feature comparison</span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Expandable Table */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-[4000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass-card rounded-2xl overflow-x-auto">
          <table className="w-full text-xs min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-white/40 font-semibold py-4 px-5 w-[220px]">Feature</th>
                {TIER_NAMES.map((name, i) => (
                  <th key={name} className={`text-center font-bold py-4 px-4 ${TIER_COLORS[i]}`}>
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_CATEGORIES.map((cat) => (
                <React.Fragment key={cat.category + '-frag'}>
                  {/* Category Header Row */}
                  <tr key={cat.category} className="bg-white/3">
                    <td
                      colSpan={5}
                      className="py-2.5 px-5 text-[10px] font-bold uppercase tracking-widest text-white/30"
                    >
                      {cat.category}
                    </td>
                  </tr>
                  {/* Feature Rows */}
                  {cat.rows.map((row, ri) => (
                    <tr
                      key={row.label}
                      className={`border-b border-white/5 transition-colors hover:bg-white/2 ${
                        ri % 2 === 0 ? "" : "bg-white/1"
                      }`}
                    >
                      <td className="py-3 px-5 text-white/50 font-medium">{row.label}</td>
                      {row.values.map((val, vi) => (
                        <td key={vi} className="py-3 px-4 text-center">
                          {val === "✓" ? (
                            <span className={`font-bold ${TIER_COLORS[vi]}`}>✓</span>
                          ) : val === "—" ? (
                            <span className="text-white/15">—</span>
                          ) : (
                            <span className="text-white/55">{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────
export function SubscriptionSection() {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  // Per-card AACCUMA toggle state (only relevant for Foundation & Accelerator)
  const [aaccumaEnabled, setAaccumaEnabled] = useState<Record<string, boolean>>({
    FOUNDATION: true,
    ACCELERATOR: true,
  });

  const toggleAaccuma = (name: string) => {
    setAaccumaEnabled((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <section id="subscription" className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4A90D9]/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#D946A8] bg-[#D946A8]/10 rounded-full mb-4">
              <Crown size={12} />
              Subscription Plans
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Choose Your <span className="gradient-text">Wealth Tier</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-3">
              Bundle <span className="text-[#4A90D9] font-semibold">WealthAAM</span> with{" "}
              <span className="text-[#D946A8] font-semibold">AACCUMA Analytics</span> and save up to 50%.
              Foundation &amp; Accelerator tiers let you opt out of AACCUMA. Powerhouse &amp; Pinnacle
              require AACCUMA for advanced AI risk controls at lower timeframes.
            </p>

            {/* Bundle discount note */}
            <p className="text-xs text-emerald-400/80 mb-6">
              Annual &amp; Quarterly discounts apply on Bundle subscriptions only.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-1 bg-white/5 rounded-full p-1">
              {(["monthly", "quarterly", "annual"] as BillingPeriod[]).map((period) => (
                <button
                  key={period}
                  onClick={() => setBilling(period)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all capitalize ${
                    billing === period
                      ? "bg-white/10 text-white"
                      : "text-white/40 hover:text-white/60"
                  }`}
                >
                  {period}
                  {period === "quarterly" && (
                    <span className="ml-1 text-[10px] text-amber-400">-10%</span>
                  )}
                  {period === "annual" && (
                    <span className="ml-1 text-[10px] text-emerald-400">-25%</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Why Bundle Callout */}
        <AnimatedSection delay={0.15}>
          <div className="max-w-3xl mx-auto mb-10 rounded-2xl border border-[#D946A8]/20 bg-gradient-to-r from-[#4A90D9]/8 via-[#9B59B6]/8 to-[#D946A8]/8 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A90D9] to-[#D946A8] flex items-center justify-center shrink-0">
              <Info size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white mb-1">Why bundle with AACCUMA?</p>
              <p className="text-xs text-white/50 leading-relaxed">
                AACCUMA's proprietary AAM analytics power the AI risk controls inside the AGM engine — providing real-time asset accumulation metrics, Turtle Effect tracking, and Snowball compounding signals that keep your strategies calibrated across every market cycle.
                <a href="https://aaccuma.com" target="_blank" rel="noopener noreferrer" className="ml-1.5 text-[#D946A8] hover:text-[#FF6B9D] font-semibold transition-colors">Explore AACCUMA →</a>
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {TIERS.map((tier, i) => {
            const isBundle = tier.aaccumaMandatory || (aaccumaEnabled[tier.name] ?? false);
            const displayPrice = isBundle
              ? calcPrice(tier.bundlePrice, billing, true)
              : tier.wealthaamPrice;

            const isBestValue = tier.badge === "BEST VALUE";
            const isElite = tier.badge === "ELITE";

            return (
              <AnimatedSection key={tier.name} delay={i * 0.1}>
                <div
                  className={`relative glass-card rounded-2xl p-6 h-full flex flex-col ${
                    isBestValue ? "ring-2 ring-[#9B59B6]/50" : ""
                  } ${isElite ? "ring-2 ring-[#D946A8]/40" : ""}`}
                >
                  {/* Badge */}
                  {tier.badge && (
                    <div
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-gradient-to-r ${tierGradients[tier.name]} text-white whitespace-nowrap`}
                    >
                      {tier.badge}
                    </div>
                  )}

                  {/* Header */}
                  <div className="mb-4 pt-2">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tierGradients[tier.name]} flex items-center justify-center text-white`}
                      >
                        {tierIcons[tier.name]}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white/40 uppercase tracking-wider">{tier.name}</p>
                        <p className="text-xs text-white/30">{tier.tier}</p>
                      </div>
                    </div>
                    <p className="text-sm text-white/60">{tier.tagline}</p>
                  </div>

                  {/* AACCUMA Toggle */}
                  <div
                    className={`rounded-xl p-3 mb-4 border ${
                      isBundle
                        ? "bg-[#D946A8]/8 border-[#D946A8]/20"
                        : "bg-white/3 border-white/8"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`text-xs font-semibold ${
                            isBundle ? "text-[#D946A8]" : "text-white/30"
                          }`}
                        >
                          + AACCUMA Analytics
                        </span>
                        {tier.aaccumaMandatory && (
                          <span className="text-[10px] text-amber-400/80 bg-amber-400/10 px-1.5 py-0.5 rounded-full shrink-0">
                            Required
                          </span>
                        )}
                      </div>
                      {tier.canToggleAaccuma ? (
                        <button
                          onClick={() => toggleAaccuma(tier.name)}
                          className={`relative w-10 h-5 rounded-full transition-all duration-300 shrink-0 ${
                            isBundle ? "bg-[#D946A8]" : "bg-white/15"
                          }`}
                          aria-label="Toggle AACCUMA"
                        >
                          <span
                            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${
                              isBundle ? "left-5" : "left-0.5"
                            }`}
                          />
                        </button>
                      ) : (
                        <div className="w-10 h-5 rounded-full bg-[#D946A8] relative shrink-0 opacity-60">
                          <span className="absolute top-0.5 left-5 w-4 h-4 rounded-full bg-white shadow" />
                        </div>
                      )}
                    </div>

                    {/* Price breakdown */}
                    {isBundle ? (
                      <div className="mt-2 space-y-0.5">
                        <div className="flex justify-between text-[11px] text-white/35">
                          <span>WealthAAM</span>
                          <span>${tier.wealthaamPrice}/mo</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-white/35">
                          <span>AACCUMA</span>
                          <span>${tier.aaccumaPrice}/mo</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-emerald-400/80 font-semibold border-t border-white/10 pt-1 mt-1">
                          <span>Bundle saves {tier.bundleDiscount}%</span>
                          <span>${tier.wealthaamPrice + tier.aaccumaPrice}/mo → ${tier.bundlePrice}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-white/30 mt-1">WealthAAM only — add AACCUMA anytime</p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-white">${displayPrice}</span>
                      <span className="text-sm text-white/30">/month</span>
                    </div>
                    {billing !== "monthly" && isBundle && (
                      <p className="text-xs text-emerald-400 mt-1">
                        Billed {billing === "annual" ? "annually" : "quarterly"} · 
                        {billing === "annual" ? " 25%" : " 10%"} off bundle price
                      </p>
                    )}
                    {!isBundle && billing !== "monthly" && (
                      <p className="text-xs text-white/30 mt-1">
                        Discount applies to bundle only
                      </p>
                    )}
                  </div>

                  {/* WealthAAM Features */}
                  <div className="flex-1 mb-4">
                    <p className="text-[10px] font-bold text-[#4A90D9] uppercase tracking-wider mb-2">WealthAAM</p>
                    <div className="space-y-1.5">
                      {tier.features.map((feature, fi) => (
                        <div key={fi} className="flex items-start gap-2">
                          <Check size={12} className="text-[#4A90D9] mt-0.5 shrink-0" />
                          <span className="text-[11px] text-white/45 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AACCUMA Features */}
                  {isBundle && (
                    <div className="mb-5 pt-3 border-t border-white/8">
                      <p className="text-[10px] font-bold text-[#D946A8] uppercase tracking-wider mb-2">AACCUMA Analytics</p>
                      <div className="space-y-1.5">
                        {tier.aaccumaFeatures.map((feature, fi) => (
                          <div key={fi} className="flex items-start gap-2">
                            <Check size={12} className="text-[#D946A8] mt-0.5 shrink-0" />
                            <span className="text-[11px] text-white/45 leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <a
                        href="https://aaccuma.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-3 text-[11px] text-[#D946A8] hover:text-[#FF6B9D] font-semibold transition-colors"
                      >
                        Learn more about AACCUMA →
                      </a>
                    </div>
                  )}

                  {/* CTA */}
                  <button
                    onClick={() => toast("Feature coming soon — Express your interest!")}
                    className={`w-full py-3 text-sm font-bold rounded-xl transition-all ${
                      isBestValue || isElite
                        ? "gradient-bg text-white hover:opacity-90"
                        : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Bundle Summary Table */}
        <AnimatedSection delay={0.4}>
          <div className="mt-10 glass-card rounded-2xl p-6 lg:p-8 overflow-x-auto">
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4">Bundle Pricing Summary</h3>
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs text-white/40 font-semibold pb-3 pr-4">Tier</th>
                  <th className="text-right text-xs text-[#4A90D9]/70 font-semibold pb-3 px-4">WealthAAM</th>
                  <th className="text-right text-xs text-[#D946A8]/70 font-semibold pb-3 px-4">AACCUMA</th>
                  <th className="text-right text-xs text-white/40 font-semibold pb-3 px-4">Combined</th>
                  <th className="text-right text-xs text-amber-400/70 font-semibold pb-3 px-4">Discount</th>
                  <th className="text-right text-xs text-emerald-400/80 font-semibold pb-3 pl-4">Bundle Price</th>
                </tr>
              </thead>
              <tbody>
                {TIERS.map((tier) => (
                  <tr key={tier.name} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${tierGradients[tier.name]}`} />
                        <span className="text-white/70 font-medium text-xs">{tier.name}</span>
                      </div>
                    </td>
                    <td className="text-right text-white/50 text-xs py-3 px-4">${tier.wealthaamPrice}/mo</td>
                    <td className="text-right text-white/50 text-xs py-3 px-4">${tier.aaccumaPrice}/mo</td>
                    <td className="text-right text-white/40 text-xs py-3 px-4">${tier.wealthaamPrice + tier.aaccumaPrice}/mo</td>
                    <td className="text-right text-amber-400 text-xs font-semibold py-3 px-4">{tier.bundleDiscount}%</td>
                    <td className="text-right text-emerald-400 text-xs font-bold py-3 pl-4">${tier.bundlePrice}/mo</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[11px] text-white/25 mt-4">
              * Annual bundle: additional 25% off · Quarterly bundle: additional 10% off · Standalone WealthAAM pricing has no billing period discount.
            </p>
          </div>
        </AnimatedSection>

        {/* Compare All Features */}
        <AnimatedSection delay={0.45}>
          <CompareTable />
        </AnimatedSection>

        {/* Institutional */}
        <AnimatedSection delay={0.5}>
          <div className="mt-6 glass-card rounded-2xl p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A90D9] to-[#D946A8] flex items-center justify-center text-white">
                    <Crown size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">INSTITUTIONAL</h3>
                    <p className="text-xs text-white/40">White-Label &amp; Enterprise Solutions</p>
                  </div>
                </div>
                <p className="text-sm text-white/50 max-w-xl mt-3 leading-relaxed">
                  Custom enterprise solutions with white-label capabilities, dedicated infrastructure,
                  and personalized support for institutions and large organizations.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  {[
                    "Full White-Label Customization",
                    "Enterprise API with SLA",
                    "Dedicated Infrastructure & 24/7 Support",
                    "Revenue Sharing & Custom Agreements",
                  ].map((f) => (
                    <span key={f} className="inline-flex items-center gap-1.5 text-xs text-emerald-400/80">
                      <Check size={12} /> {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-center lg:text-right shrink-0">
                <p className="text-2xl font-extrabold text-white mb-1">Custom Pricing</p>
                <p className="text-xs text-white/40 mb-4">Tailored to your needs</p>
                <button
                  onClick={() => toast("Feature coming soon — Contact our sales team!")}
                  className="px-8 py-3 text-sm font-bold text-white rounded-xl gradient-bg hover:opacity-90 transition-opacity"
                >
                  Contact Sales Team
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
