import { AnimatedSection } from "@/components/AnimatedSection";
import { ASSETS, WEALTH_PATHWAYS } from "@/lib/constants";
import { Route, ArrowRight } from "lucide-react";

const riskColors: Record<string, string> = {
  Low: "#22D3EE",
  Medium: "#4A90D9",
  "Medium-High": "#9B59B6",
  High: "#D946A8",
};

export function PathwaysSection() {
  return (
    <section id="pathways" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#4A90D9]/5 rounded-full blur-[180px]" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#7C5CBF] bg-[#7C5CBF]/10 rounded-full mb-4">
              <Route size={12} />
              Wealth Pathways
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Your Path to <span className="gradient-text">Wealth Accumulation</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Choose from curated wealth pathways tailored to your risk tolerance and accumulation goals.
              Each pathway is optimized by our AI agents for maximum asset growth.
            </p>
          </div>
        </AnimatedSection>

        {/* Pathways Image */}
        <AnimatedSection delay={0.1}>
          <div className="max-w-3xl mx-auto mb-16 rounded-2xl overflow-hidden">
            <img
              src={ASSETS.images.wealthPathways}
              alt="Wealth Pathways"
              className="w-full h-auto"
            />
          </div>
        </AnimatedSection>

        {/* Pathway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WEALTH_PATHWAYS.map((pathway, i) => (
            <AnimatedSection key={pathway.name} delay={0.15 + i * 0.1}>
              <div className="glass-card rounded-2xl p-6 h-full group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{pathway.name}</h3>
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                      style={{
                        color: riskColors[pathway.risk],
                        backgroundColor: `${riskColors[pathway.risk]}15`,
                      }}
                    >
                      {pathway.risk} Risk
                    </span>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all"
                  />
                </div>
                <p className="text-sm text-white/45 leading-relaxed mb-4">{pathway.description}</p>
                <div className="pt-3 border-t border-white/5">
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-1">Allocation</p>
                  <p className="text-xs text-white/60">{pathway.allocation}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
