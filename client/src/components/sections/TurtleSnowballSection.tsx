import { AnimatedSection } from "@/components/AnimatedSection";
import { Turtle, Snowflake, ArrowRight, TrendingUp, Clock, Shield } from "lucide-react";

export function TurtleSnowballSection() {
  return (
    <section id="philosophy" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#4A90D9]/5 rounded-full blur-[180px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#9B59B6]/5 rounded-full blur-[180px]" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 rounded-full mb-4">
              Core Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              The <span className="gradient-text">Turtle Effect</span> &{" "}
              <span className="gradient-text">Snowball Effect</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Two foundational principles that define how WealthAAM builds lasting wealth — 
              patience combined with compounding creates unstoppable momentum.
            </p>
          </div>
        </AnimatedSection>

        {/* Two Cards Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Turtle Effect */}
          <AnimatedSection delay={0.1} direction="left">
            <div className="glass-card rounded-2xl p-8 lg:p-10 h-full relative overflow-hidden">
              {/* Subtle gradient accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#4A90D9]/10 rounded-full blur-[80px]" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#4A90D9]/10 flex items-center justify-center">
                    <Turtle size={28} className="text-[#4A90D9]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">The Turtle Effect</h3>
                    <p className="text-xs text-[#4A90D9] font-medium uppercase tracking-wider">Slow & Steady Wins</p>
                  </div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  Inspired by the timeless wisdom of "slow and steady wins the race," the Turtle Effect 
                  embodies WealthAAM's approach to wealth building. Rather than chasing quick profits or 
                  timing the market, our system focuses on consistent, methodical asset accumulation that 
                  compounds over time.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      icon: <Clock size={16} />,
                      title: "Patience Over Panic",
                      desc: "Systematic accumulation regardless of market noise. No emotional trading, no FOMO-driven decisions.",
                    },
                    {
                      icon: <Shield size={16} />,
                      title: "Consistency Over Complexity",
                      desc: "Simple, repeatable strategies executed with precision across every market cycle — bull or bear.",
                    },
                    {
                      icon: <TrendingUp size={16} />,
                      title: "Long-Term Vision",
                      desc: "Every trade is a step toward accumulating more assets. The destination is wealth, not short-term gains.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="w-8 h-8 rounded-lg bg-[#4A90D9]/10 flex items-center justify-center shrink-0 mt-0.5 text-[#4A90D9]">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="text-xs text-white/40 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-xl border border-[#4A90D9]/20 bg-[#4A90D9]/5">
                  <p className="text-xs text-[#4A90D9] font-semibold uppercase tracking-wider mb-1">The Turtle Principle</p>
                  <p className="text-sm text-white/60 italic">
                    "In the race to wealth, the tortoise doesn't just win — it accumulates the entire track."
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Snowball Effect */}
          <AnimatedSection delay={0.15} direction="right">
            <div className="glass-card rounded-2xl p-8 lg:p-10 h-full relative overflow-hidden">
              {/* Subtle gradient accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#9B59B6]/10 rounded-full blur-[80px]" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#9B59B6]/10 flex items-center justify-center">
                    <Snowflake size={28} className="text-[#9B59B6]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">The Snowball Effect</h3>
                    <p className="text-xs text-[#9B59B6] font-medium uppercase tracking-wider">Compounding Momentum</p>
                  </div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  Like a snowball rolling downhill, each accumulated asset adds mass and momentum to your 
                  portfolio. WealthAAM's strategies are designed to reinvest gains into acquiring more assets, 
                  creating an accelerating cycle of accumulation that grows exponentially over time.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      icon: <ArrowRight size={16} />,
                      title: "Compounding Accumulation",
                      desc: "Each trade's gains are reinvested to accumulate more assets, creating exponential growth in holdings.",
                    },
                    {
                      icon: <TrendingUp size={16} />,
                      title: "Accelerating Returns",
                      desc: "As your asset base grows, the same percentage gain yields increasingly larger absolute accumulation.",
                    },
                    {
                      icon: <Snowflake size={16} />,
                      title: "Momentum Building",
                      desc: "Bear markets add more 'snow' to the ball — discounted prices mean faster accumulation and bigger momentum.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="w-8 h-8 rounded-lg bg-[#9B59B6]/10 flex items-center justify-center shrink-0 mt-0.5 text-[#9B59B6]">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="text-xs text-white/40 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-xl border border-[#9B59B6]/20 bg-[#9B59B6]/5">
                  <p className="text-xs text-[#9B59B6] font-semibold uppercase tracking-wider mb-1">The Snowball Principle</p>
                  <p className="text-sm text-white/60 italic">
                    "Start small, stay consistent, and let compounding do the heavy lifting. Your wealth snowball never stops growing."
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Combined Effect Visual */}
        <AnimatedSection delay={0.25}>
          <div className="glass-card rounded-2xl p-8 lg:p-10">
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              When <span className="text-[#4A90D9]">Patience</span> Meets{" "}
              <span className="text-[#9B59B6]">Compounding</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-5 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-3xl font-bold font-mono gradient-text mb-2">Year 1</p>
                <p className="text-sm text-white/60">Steady accumulation begins</p>
                <p className="text-xs text-white/30 mt-1">Foundation building phase</p>
              </div>
              <div className="text-center p-5 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-3xl font-bold font-mono gradient-text mb-2">Year 3</p>
                <p className="text-sm text-white/60">Compounding accelerates</p>
                <p className="text-xs text-white/30 mt-1">Snowball gains momentum</p>
              </div>
              <div className="text-center p-5 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-3xl font-bold font-mono gradient-text mb-2">Year 5+</p>
                <p className="text-sm text-white/60">Exponential asset growth</p>
                <p className="text-xs text-white/30 mt-1">Wealth engine at full power</p>
              </div>
            </div>
            <p className="text-center text-xs text-white/30 mt-6">
              The Turtle Effect provides the discipline. The Snowball Effect provides the acceleration. Together, they create WealthAAM's unstoppable wealth engine.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
