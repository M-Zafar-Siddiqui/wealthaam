import { AnimatedSection } from "@/components/AnimatedSection";
import { ASSETS, AI_AGENTS } from "@/lib/constants";
import { Bot } from "lucide-react";

export function AgentsSection() {
  return (
    <section id="agents" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7C5CBF]/5 rounded-full blur-[200px]" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#D946A8] bg-[#D946A8]/10 rounded-full mb-4">
              <Bot size={12} />
              Multi-AI Agent System
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Six Specialized <span className="gradient-text">AI Agents</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Working in concert to deliver 24/7 autonomous asset accumulation with unprecedented
              efficiency and performance.
            </p>
          </div>
        </AnimatedSection>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AI_AGENTS.map((agent, i) => (
            <AnimatedSection key={agent.name} delay={0.15 + i * 0.08}>
              <div className="glass-card rounded-2xl p-6 h-full group">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${agent.color}15` }}
                  >
                    <Bot size={18} style={{ color: agent.color }} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{agent.name}</h4>
                    <p className="text-xs font-mono" style={{ color: agent.color }}>Agent</p>
                  </div>
                </div>
                <p className="text-sm text-white/45 leading-relaxed mb-4">{agent.description}</p>
                <div className="pt-3 border-t border-white/5">
                  <p className="text-xs text-white/30 uppercase tracking-wider">Key Metric</p>
                  <p className="text-sm font-semibold text-white/70 mt-1">{agent.metrics}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Collaboration Framework */}
        <AnimatedSection delay={0.5}>
          <div className="mt-16 glass-card rounded-2xl p-8 lg:p-10">
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              Agent Collaboration Framework
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Hierarchical Decision Making",
                  desc: "Strategic decisions flow from Strategy and Risk agents to Execution, while data flows from Data Collection to all agents.",
                },
                {
                  title: "Real-Time Communication",
                  desc: "High-performance message bus enables real-time information sharing, decision propagation, and system-wide coordination.",
                },
                {
                  title: "Continuous Learning",
                  desc: "The agent system continuously learns and adapts based on performance feedback, market conditions, and execution outcomes.",
                },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
                  <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
