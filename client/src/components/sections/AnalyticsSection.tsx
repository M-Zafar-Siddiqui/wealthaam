import { AnimatedSection } from "@/components/AnimatedSection";
import { PERFORMANCE_METRICS } from "@/lib/constants";
import { BarChart3, Activity, Database } from "lucide-react";

const AACCUMA_STATS = [
  { value: "72 / 346", label: "Strategy Containers", sublabel: "Active / Total" },
  { value: "50,738", label: "Total Trades", sublabel: "Executed" },
  { value: "702.3K%", label: "Avg AAR%", sublabel: "Asset Accumulation Rate" },
  { value: "62.6%", label: "Avg Win Rate", sublabel: "Across All Strategies" },
  { value: "472.8", label: "Avg SAAI", sublabel: "Strategy Accumulation Index" },
  { value: "11.6", label: "Avg Profit Factor", sublabel: "Gross Profit / Gross Loss" },
];

export function AnalyticsSection() {
  return (
    <section id="analytics" className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#4A90D9] bg-[#4A90D9]/10 rounded-full mb-4">
              <BarChart3 size={12} />
              Advanced Analytics
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Proprietary <span className="gradient-text">AAM Indicators</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              WealthAAM's proprietary analytics framework transforms traditional market data into
              actionable asset accumulation insights with 10 key performance metrics.
            </p>
          </div>
        </AnimatedSection>

        {/* AACCUMA Dashboard Live Stats */}
        <AnimatedSection delay={0.1}>
          <div className="mb-16">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Database size={16} className="text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">AACCUMA Dashboard — Live Stats</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {AACCUMA_STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-2xl p-5 text-center group"
                >
                  <p className="text-2xl lg:text-3xl font-extrabold font-mono gradient-text mb-1">{stat.value}</p>
                  <p className="text-xs font-bold text-white/70 mb-0.5">{stat.label}</p>
                  <p className="text-[10px] text-white/30">{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {PERFORMANCE_METRICS.map((metric, i) => (
            <AnimatedSection key={metric.name} delay={i * 0.06}>
              <div className="glass-card rounded-2xl p-5 h-full text-center group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3 group-hover:bg-white/10 transition-colors">
                  <Activity size={18} className="text-white/50" />
                </div>
                <p className="text-lg font-bold font-mono gradient-text mb-1">{metric.name}</p>
                <p className="text-xs text-white/60 font-medium mb-2">{metric.fullName}</p>
                <p className="text-sm font-bold font-mono text-white mb-2">{metric.range}</p>
                <p className="text-xs text-white/35 leading-relaxed">{metric.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* How AAM Works Process */}
        <AnimatedSection delay={0.4}>
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-white mb-10 text-center">
              How <span className="gradient-text">AAM</span> Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { step: "01", title: "Data Collection", desc: "50M+ data points daily from exchanges, on-chain metrics, sentiment analysis, and macro indicators." },
                { step: "02", title: "Volatility Analysis", desc: "AVI identifies optimal accumulation opportunities by measuring exploitable price movements." },
                { step: "03", title: "Strategy Execution", desc: "Multi-AI agents execute HMA-AAM MACC strategy at configurable intervals, buying dips and rebalancing peaks." },
                { step: "04", title: "Asset Accumulation", desc: "Systematic increase in asset quantity (measured by S-AAI) regardless of short-term price direction." },
                { step: "05", title: "Risk Management", desc: "AQaR protects accumulated assets while maintaining growth trajectory across all market conditions." },
                { step: "06", title: "Performance Tracking", desc: "Real-time monitoring of AGR, AAM-PI, and Advantage metrics to optimize ongoing accumulation." },
              ].map((item, i) => (
                <div key={item.step} className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                  <span className="text-3xl font-extrabold gradient-text font-mono shrink-0">{item.step}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
