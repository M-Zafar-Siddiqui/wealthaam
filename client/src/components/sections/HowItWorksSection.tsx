import { AnimatedSection } from "@/components/AnimatedSection";
import { useEffect, useRef, useState } from "react";
import { Radio, Cpu, TrendingUp, ArrowRight } from "lucide-react";

// ─── Steps data ───────────────────────────────────────────────────────────────
const STEPS = [
  {
    number: "01",
    icon: <Radio size={28} />,
    iconColor: "text-[#4A90D9]",
    iconBg: "bg-[#4A90D9]/10 border-[#4A90D9]/20",
    glowColor: "rgba(74,144,217,0.18)",
    title: "Market Signal Detection",
    subtitle: "Real-time data ingestion",
    description:
      "Six specialized AI agents continuously monitor 100+ crypto assets, 10+ xStocks, and 5+ commodities across all timeframes. aVOLATILITY and qRISK metrics identify high-probability accumulation windows before they close.",
    metrics: [
      { label: "Assets Monitored", value: "115+" },
      { label: "Data Points / Day", value: "50M+" },
    ],
    color: "#4A90D9",
  },
  {
    number: "02",
    icon: <Cpu size={28} />,
    iconColor: "text-[#9B59B6]",
    iconBg: "bg-[#9B59B6]/10 border-[#9B59B6]/20",
    glowColor: "rgba(155,89,182,0.18)",
    title: "AGM Engine Processing",
    subtitle: "Autonomous decision execution",
    description:
      "The Asset Growth Model engine evaluates each signal through 346 strategy containers. The Turtle Effect ensures steady accumulation while the Snowball Effect compounds gains — all without manual intervention.",
    metrics: [
      { label: "Strategy Containers", value: "346" },
      { label: "Avg Win Rate", value: "62.6%" },
    ],
    color: "#9B59B6",
  },
  {
    number: "03",
    icon: <TrendingUp size={28} />,
    iconColor: "text-[#22D3EE]",
    iconBg: "bg-[#22D3EE]/10 border-[#22D3EE]/20",
    glowColor: "rgba(34,211,238,0.18)",
    title: "Asset Accumulation",
    subtitle: "Systematic wealth compounding",
    description:
      "Every executed trade increases your asset holdings. Lower prices mean more assets per dollar — turning market volatility into your greatest advantage. Your portfolio grows in asset quantity, not just dollar value.",
    metrics: [
      { label: "Avg AAR%", value: "702K%" },
      { label: "Total Trades", value: "50,738" },
    ],
    color: "#22D3EE",
  },
];

// ─── Animated connector line ──────────────────────────────────────────────────
function ConnectorLine({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="hidden lg:flex items-center justify-center w-16 shrink-0 mt-10">
      <div className="relative w-full h-0.5 bg-white/8 overflow-hidden rounded-full">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animated ? "100%" : "0%",
            background: `linear-gradient(90deg, ${color}, transparent)`,
          }}
        />
      </div>
      <ArrowRight size={14} className="shrink-0 ml-1" style={{ color }} />
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section id="howitworks" className="relative py-24 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(74,144,217,0.06),transparent_60%)]" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#4A90D9] bg-[#4A90D9]/10 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A90D9]" />
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              Three steps to{" "}
              <span className="gradient-text">autonomous accumulation</span>
            </h2>
            <p className="text-white/50 text-base sm:text-lg leading-relaxed">
              From market signal to asset accumulation — fully automated, continuously compounding.
            </p>
          </div>
        </AnimatedSection>

        {/* Steps row */}
        <div className="flex flex-col lg:flex-row items-start gap-0 lg:gap-0">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex flex-col lg:flex-row items-start flex-1">
              {/* Step Card */}
              <AnimatedSection delay={0.1 + i * 0.15} className="flex-1 w-full">
                <div
                  className="relative h-full rounded-2xl border border-white/8 bg-gradient-to-b from-[#0D1520]/80 to-[#090E18]/80 p-7 group hover:border-white/15 transition-all duration-300"
                  style={{ boxShadow: `0 0 40px ${step.glowColor}` }}
                >
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl border ${step.iconBg} flex items-center justify-center ${step.iconColor}`}>
                      {step.icon}
                    </div>
                    <span
                      className="text-5xl font-black font-mono opacity-10 select-none"
                      style={{ color: step.color }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-xs font-medium uppercase tracking-wider mb-4" style={{ color: step.color }}>
                    {step.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-white/50 leading-relaxed mb-6">{step.description}</p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    {step.metrics.map((m) => (
                      <div key={m.label} className="bg-white/[0.03] border border-white/6 rounded-xl p-3">
                        <p className="text-lg font-bold font-mono" style={{ color: step.color }}>{m.value}</p>
                        <p className="text-[10px] text-white/35 uppercase tracking-wider mt-0.5">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }}
                  />
                </div>
              </AnimatedSection>

              {/* Connector between steps */}
              {i < STEPS.length - 1 && <ConnectorLine color={STEPS[i + 1].color} />}
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <AnimatedSection delay={0.55}>
          <div className="mt-12 text-center">
            <p className="text-sm text-white/30 italic">
              All three stages operate simultaneously, 24/7, across every supported asset and exchange.
            </p>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
