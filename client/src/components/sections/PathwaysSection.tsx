import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ASSETS, WEALTH_PATHWAYS } from "@/lib/constants";
import { Route, CheckCircle, ChevronRight } from "lucide-react";

const TAB_KEYS = Object.keys(WEALTH_PATHWAYS) as Array<keyof typeof WEALTH_PATHWAYS>;

export function PathwaysSection() {
  const [activeTab, setActiveTab] = useState(0);
  const currentKey = TAB_KEYS[activeTab];
  const currentPathway = WEALTH_PATHWAYS[currentKey];

  return (
    <section id="pathways" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#4A90D9]/5 rounded-full blur-[180px]" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#22D3EE] bg-[#22D3EE]/10 rounded-full mb-4">
              <Route size={12} />
              Wealth Pathways
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              WealthAAM <span className="gradient-text">Wealth Pathways</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Customized strategies designed to meet your specific wealth-building objectives,
              leveraging our revolutionary Asset Accumulation Model.
            </p>
          </div>
        </AnimatedSection>

        {/* Pathways Visual */}
        <AnimatedSection delay={0.1}>
          <div className="max-w-3xl mx-auto mb-12 rounded-2xl overflow-hidden border border-white/10">
            <img
              src={ASSETS.images.pathwaysVisual}
              alt="WealthAAM Wealth Pathways"
              className="w-full h-auto"
            />
          </div>
        </AnimatedSection>

        {/* Tab Navigation */}
        <AnimatedSection delay={0.15}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {TAB_KEYS.map((key, i) => (
              <button
                key={key}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === i
                    ? "gradient-bg text-white shadow-lg shadow-purple-500/20"
                    : "text-white/50 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white/80"
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Active Tab Content */}
        <div className="max-w-5xl mx-auto">
          {/* Pathway Description */}
          <p className="text-center text-white/50 text-base mb-8">
            {currentPathway.description}
          </p>

          {/* Strategy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentPathway.strategies.map((strategy) => (
              <div
                key={strategy.name}
                className="glass-card rounded-2xl p-6 lg:p-8 group hover:border-[#4A90D9]/20 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{strategy.name}</h4>
                    <p className="text-sm text-white/45 leading-relaxed">{strategy.description}</p>
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-2 mb-5">
                  {strategy.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                      <span className="text-xs text-white/50">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Metric */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider">Performance</p>
                    <p className="text-lg font-bold gradient-text font-mono mt-0.5">{strategy.metric}</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/30 group-hover:text-white/60 transition-colors">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
