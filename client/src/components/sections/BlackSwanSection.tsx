import { AnimatedSection } from "@/components/AnimatedSection";
import { ASSETS, BEAR_MARKET_SCENARIOS, DEFENSE_LAYERS } from "@/lib/constants";
import { Shield, AlertTriangle, TrendingUp, ChevronRight } from "lucide-react";

export function BlackSwanSection() {
  return (
    <section id="blackswan" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D946A8]/5 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4A90D9]/5 rounded-full blur-[150px]" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-red-400 bg-red-500/10 rounded-full mb-4">
              <AlertTriangle size={12} />
              Black Swan Resilience
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Built to Withstand the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">
                Unthinkable
              </span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              While traditional strategies collapse during extreme market events, AAM transforms chaos
              into accumulation opportunity. Our framework is purpose-built for the scenarios others fear most.
            </p>
          </div>
        </AnimatedSection>

        {/* Black Swan Image */}
        <AnimatedSection delay={0.1}>
          <div className="max-w-4xl mx-auto mb-16 rounded-2xl overflow-hidden border border-white/5">
            <img
              src={ASSETS.images.blackSwan}
              alt="Black Swan Resilience"
              className="w-full h-auto"
            />
            <div className="bg-[#111328]/80 backdrop-blur-sm px-6 py-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[#22D3EE] text-xs font-semibold uppercase tracking-wider mb-1">
                  The AAM Philosophy
                </p>
                <p className="text-white/80 text-sm italic">
                  "We don't just trade to make money — we trade to accumulate more assets."
                </p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 text-xs font-medium text-[#22D3EE] border border-[#22D3EE]/30 rounded-full">
                  Market Agnostic
                </span>
                <span className="px-3 py-1 text-xs font-medium text-[#22D3EE] border border-[#22D3EE]/30 rounded-full">
                  Non-Custodial
                </span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Bear Market Scenarios Table */}
        <AnimatedSection delay={0.15}>
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Resilience Across <span className="gradient-text">Every Bear Market Scenario</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Scenario</th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-red-400/70 uppercase tracking-wider">Traditional Response</th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-emerald-400/70 uppercase tracking-wider">AAM Response</th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-[#9B59B6]/70 uppercase tracking-wider">AAM Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  {BEAR_MARKET_SCENARIOS.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 text-sm font-semibold text-white">{row.scenario}</td>
                      <td className="py-4 px-4 text-sm text-red-400/70">{row.traditional}</td>
                      <td className="py-4 px-4 text-sm text-emerald-400/80">{row.aam}</td>
                      <td className="py-4 px-4 text-sm text-[#9B59B6] font-medium">{row.advantage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        {/* Counter-Intuitive Advantage */}
        <AnimatedSection delay={0.2}>
          <div className="glass-card rounded-2xl p-8 lg:p-10 mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <TrendingUp size={24} className="text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  The Counter-Intuitive Advantage: Bear Market Alpha
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  AAM achieves 3-5x higher accumulation rates during bear markets compared to bull markets.
                  While others flee, our system accelerates — systematically buying assets at discounted prices.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/[0.03] rounded-xl p-5 border border-white/5">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Bull Market AAR</p>
                <p className="text-2xl font-bold font-mono text-[#4A90D9]">303%</p>
                <p className="text-xs text-white/30 mt-1">Case Study 1B (12hr)</p>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-5 border border-emerald-500/20">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Bear Market AAR</p>
                <p className="text-2xl font-bold font-mono text-emerald-400">1,236%</p>
                <p className="text-xs text-white/30 mt-1">Case Study 2B (12hr)</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Six Layers of Defense */}
        <AnimatedSection delay={0.25}>
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Six Layers of <span className="gradient-text">Defense</span>
          </h3>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEFENSE_LAYERS.map((layer, i) => (
            <AnimatedSection key={layer.name} delay={0.3 + i * 0.08}>
              <div className="glass-card rounded-2xl p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                    <Shield size={16} className="text-white" />
                  </div>
                  <span className="text-xs font-mono text-white/30">Layer {i + 1}</span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">{layer.name}</h4>
                <p className="text-sm text-white/45 leading-relaxed">{layer.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
