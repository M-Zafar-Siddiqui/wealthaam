import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight, CheckCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Pure CSS Background */}
      <div className="absolute inset-0 z-0 bg-[#0B0D1A]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(74,144,217,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(155,89,182,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_80%,rgba(217,70,168,0.08),transparent_50%)]" />
      </div>

      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4A90D9]/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D946A8]/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="max-w-4xl">
          {/* Badge */}
          <AnimatedSection delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <CheckCircle size={14} className="text-emerald-400" />
              <span className="text-xs font-medium text-white/80 tracking-wide uppercase">
                Alpha Test Complete • Closed Beta Live
              </span>
            </div>
          </AnimatedSection>

          {/* Main Headline */}
          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
              <span className="text-white">The First </span>
              <span className="gradient-text">Asset-Centric</span>
              <br />
              <span className="gradient-text">Wealth Management </span>
              <span className="text-white">Platform</span>
            </h1>
          </AnimatedSection>

          {/* Sub-headline */}
          <AnimatedSection delay={0.2}>
            <p className="text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed mb-4">
              WealthAAM's proprietary Asset Accumulation Model leverages cryptocurrency volatility
              as an opportunity, not a risk. Our Multi-AI agent system systematically accumulates
              more assets while you sleep.
            </p>
          </AnimatedSection>

          {/* Philosophy Quote */}
          <AnimatedSection delay={0.25}>
            <div className="border-l-2 border-[#4A90D9]/50 pl-4 mb-10">
              <p className="text-base italic text-white/50">
                "We don't just trade to make money — we trade to accumulate more assets."
              </p>
              <p className="text-xs text-[#9B59B6] mt-1 font-medium">THE AAM PHILOSOPHY</p>
            </div>
          </AnimatedSection>

          {/* CTA Buttons */}
          <AnimatedSection delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <a
                href="#subscription"
                className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white rounded-xl gradient-bg hover:opacity-90 transition-all shadow-lg shadow-purple-500/20"
              >
                Express Your Interest
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#performance"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white/80 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
              >
                View Performance Data
              </a>
            </div>
          </AnimatedSection>

          {/* Key Stats */}
          <AnimatedSection delay={0.4}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-8 border-t border-white/5">
              {[
                { value: "72 / 346", label: "Strategy Containers" },
                { value: "50,738", label: "Total Trades" },
                { value: "702.3K%", label: "Avg AAR%" },
                { value: "62.6%", label: "Avg Win Rate" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl sm:text-3xl font-bold gradient-text font-mono">{stat.value}</p>
                  <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
