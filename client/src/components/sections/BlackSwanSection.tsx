import { AnimatedSection } from "@/components/AnimatedSection";
import { TrendingDown, AlignJustify, Activity, Shield } from "lucide-react";

// ─── Black Swan scenario cards data ───────────────────────────────────────────
// Theme palette: #4A90D9 (blue) → #7C5CBF (violet) → #9B59B6 (purple) → #D946A8 (pink)
const SCENARIOS = [
  {
    icon: <TrendingDown size={20} />,
    iconBg: "bg-[#4A90D9]/10",
    iconBorder: "border-[#4A90D9]/20",
    iconColor: "text-[#4A90D9]",
    accentColor: "#4A90D9",
    hoverBorder: "hover:border-[#4A90D9]/25",
    title: "Market Crashes",
    subtitle: "Flash crashes & sudden corrections",
    body: (
      <>
        When markets plunge 30–60% in days, AAM's volatility-leveraging framework activates
        aggressive accumulation protocols.{" "}
        <strong className="text-white font-semibold">
          Lower prices mean more assets per dollar
        </strong>{" "}
        — turning panic into opportunity.
      </>
    ),
    badge: { label: "3–5×", desc: "More assets accumulated vs bull markets" },
    badgeText: "text-[#4A90D9]",
  },
  {
    icon: <AlignJustify size={20} />,
    iconBg: "bg-[#7C5CBF]/10",
    iconBorder: "border-[#7C5CBF]/20",
    iconColor: "text-[#7C5CBF]",
    accentColor: "#7C5CBF",
    hoverBorder: "hover:border-[#7C5CBF]/25",
    title: "Recessions",
    subtitle: "Prolonged economic downturns",
    body: (
      <>
        During extended bear markets lasting months or years, AAM's{" "}
        <strong className="text-white font-semibold">Turtle Effect</strong> ensures steady,
        incremental accumulation. Each dip is systematically exploited while risk is managed
        through qRISK metrics.
      </>
    ),
    badge: { label: "aCONSISTENCY", desc: "Turtle Effect Quantifier" },
    badgeText: "text-[#7C5CBF]",
  },
  {
    icon: <TrendingDown size={20} className="scale-x-[-1]" />,
    iconBg: "bg-[#9B59B6]/10",
    iconBorder: "border-[#9B59B6]/20",
    iconColor: "text-[#9B59B6]",
    accentColor: "#9B59B6",
    hoverBorder: "hover:border-[#9B59B6]/25",
    title: "Depressions",
    subtitle: "Severe & sustained decline",
    body: (
      <>
        In the most extreme downturns, AAM's{" "}
        <strong className="text-white font-semibold">non-custodial architecture</strong> ensures
        your assets remain in your custody. The Snowball Effect compounds accumulated assets,
        building positions at historically low prices.
      </>
    ),
    badge: { label: "SEI", desc: "Snowball Effect compounds growth" },
    badgeText: "text-[#9B59B6]",
  },
  {
    icon: <Activity size={20} />,
    iconBg: "bg-[#D946A8]/10",
    iconBorder: "border-[#D946A8]/20",
    iconColor: "text-[#D946A8]",
    accentColor: "#D946A8",
    hoverBorder: "hover:border-[#D946A8]/25",
    title: "Stagflation",
    subtitle: "High inflation + stagnant growth",
    body: (
      <>
        When traditional assets erode under inflation and stagnation, AAM's{" "}
        <strong className="text-white font-semibold">market-agnostic</strong> approach continues
        accumulating digital assets. aVOLATILITY identifies exploitable volatility even in
        sideways markets.
      </>
    ),
    badge: { label: "aVOLATILITY", desc: "Identifies opportunity in any condition" },
    badgeText: "text-[#D946A8]",
  },
];

export function BlackSwanSection() {
  return (
    <section id="blackswan" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background glows — using page theme colors */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7C5CBF]/5 rounded-full blur-[220px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4A90D9]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#D946A8]/3 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#9B59B6] bg-[#9B59B6]/10 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9B59B6] animate-pulse" />
              Black Swan Resilience
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
              Built to withstand the{" "}
              <em className="not-italic gradient-text">unthinkable</em>.
            </h2>
            <p className="text-white/50 text-base sm:text-lg leading-relaxed">
              While traditional strategies collapse during extreme market events, AAM transforms chaos into
              accumulation opportunity. Designed for the scenarios others fear most.
            </p>
          </div>
        </AnimatedSection>

        {/* ── Philosophy Quote Block ── */}
        <AnimatedSection delay={0.1}>
          <div className="max-w-4xl mx-auto mb-14 relative">
            {/* Large decorative quotes */}
            <div className="absolute -top-4 left-6 text-[#7C5CBF]/40 text-6xl font-serif leading-none select-none">"</div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#4A90D9]/5 via-[#0B1520]/80 to-[#D946A8]/5 px-10 py-8 text-center backdrop-blur-sm">
              <p className="text-white/85 text-xl sm:text-2xl italic font-light leading-relaxed">
                We don't just trade to make money — we trade to accumulate more assets.
              </p>
              <p className="mt-4 text-xs font-bold tracking-widest text-[#9B59B6]/70 uppercase">
                — The AAM Philosophy
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* ── 4 Scenario Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {SCENARIOS.map((s, i) => (
            <AnimatedSection key={s.title} delay={0.15 + i * 0.08}>
              <div
                className={`h-full rounded-2xl border border-white/8 bg-gradient-to-b from-[#0D1020]/90 to-[#090E18]/90 p-6 flex flex-col backdrop-blur-sm ${s.hoverBorder} transition-all duration-300 hover:-translate-y-1.5 group/card`}
                style={{ boxShadow: `0 0 30px ${s.accentColor}10` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px ${s.accentColor}30, 0 0 0 1px ${s.accentColor}20`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${s.accentColor}10`; }}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl ${s.iconBg} border ${s.iconBorder} flex items-center justify-center mb-4 ${s.iconColor}`}>
                  {s.icon}
                </div>

                {/* Title */}
                <h4 className="text-base font-bold text-white mb-1">{s.title}</h4>
                <p className="text-xs text-white/35 italic mb-4">{s.subtitle}</p>

                {/* Body */}
                <p className="text-sm text-white/50 leading-relaxed flex-1">{s.body}</p>

                {/* Badge */}
                <div className="mt-5 flex items-center gap-2 bg-white/[0.04] border border-white/8 rounded-xl px-3 py-2">
                  <span className={`text-xs font-bold whitespace-nowrap ${s.badgeText}`}>{s.badge.label}</span>
                  <span className="text-[11px] text-white/35 leading-tight">{s.badge.desc}</span>
                </div>

                {/* Bottom accent line on hover */}
                <div
                  className="mt-3 h-0.5 rounded-full opacity-30"
                  style={{ background: `linear-gradient(90deg, transparent, ${s.accentColor}, transparent)` }}
                />
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* ── Counter-Intuitive Advantage strip ── */}
        <AnimatedSection delay={0.45}>
          <div className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-r from-[#4A90D9]/8 via-[#7C5CBF]/6 to-[#D946A8]/8 px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A90D9]/20 to-[#9B59B6]/20 border border-white/10 flex items-center justify-center shrink-0">
              <Shield size={20} className="text-[#9B59B6]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white mb-1">The Counter-Intuitive Advantage: Bear Market Alpha</p>
              <p className="text-xs text-white/45 leading-relaxed">
                AAM achieves 3–5× higher accumulation rates during bear markets compared to bull markets.
                While others flee, our system accelerates — systematically buying assets at discounted prices.
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <div className="text-center">
                <p className="text-xs text-white/35 uppercase tracking-wider mb-1">Bull Market AAR</p>
                <p className="text-xl font-extrabold font-mono text-[#4A90D9]">303%</p>
                <p className="text-[10px] text-white/25">Case Study 1B (12hr)</p>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <p className="text-xs text-white/35 uppercase tracking-wider mb-1">Bear Market AAR</p>
                <p className="text-xl font-extrabold font-mono gradient-text">1,236%</p>
                <p className="text-[10px] text-white/25">Case Study 2B (12hr)</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
