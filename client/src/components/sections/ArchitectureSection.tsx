import { AnimatedSection } from "@/components/AnimatedSection";
import { ASSETS, ARCHITECTURE_LAYERS } from "@/lib/constants";
import { Layers, Network, Scale, Puzzle, Rocket } from "lucide-react";

export function ArchitectureSection() {
  return (
    <section id="architecture" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0D1A] to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#22D3EE] bg-[#22D3EE]/10 rounded-full mb-4">
              <Layers size={12} />
              10-Layer Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
              <span className="gradient-text">Modular Multi-Layered</span>
              <br />
              <span className="text-white">Architecture</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Engineered for scalability, security, and continuous evolution with a 10-layer architecture
              that powers the entire ecosystem.
            </p>
          </div>
        </AnimatedSection>

        {/* Architecture Visual from user */}
        <AnimatedSection delay={0.1}>
          <div className="max-w-3xl mx-auto mb-16 rounded-2xl overflow-hidden border border-white/10">
            <img
              src={ASSETS.images.architectureLayers}
              alt="Modular Multi-Layered Architecture"
              className="w-full h-auto"
            />
          </div>
        </AnimatedSection>

        {/* Layers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Core Layers */}
          <AnimatedSection delay={0.15} direction="left">
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#4A90D9]/10 flex items-center justify-center">
                  <Layers size={20} className="text-[#4A90D9]" />
                </div>
                <h3 className="text-xl font-bold text-white">Core Layers</h3>
              </div>
              <div className="space-y-4">
                {ARCHITECTURE_LAYERS.core.map((layer) => (
                  <div
                    key={layer.num}
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition-colors"
                  >
                    <span className="text-sm font-bold font-mono text-[#22D3EE] mt-0.5 shrink-0 w-6">
                      {layer.num}.
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{layer.name}</p>
                      <p className="text-xs text-white/40 mt-0.5">{layer.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Advanced Layers */}
          <AnimatedSection delay={0.2} direction="right">
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#9B59B6]/10 flex items-center justify-center">
                  <Network size={20} className="text-[#9B59B6]" />
                </div>
                <h3 className="text-xl font-bold text-white">Advanced Layers</h3>
              </div>
              <div className="space-y-4">
                {ARCHITECTURE_LAYERS.advanced.map((layer) => (
                  <div
                    key={layer.num}
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition-colors"
                  >
                    <span className="text-sm font-bold font-mono text-[#22D3EE] mt-0.5 shrink-0 w-6">
                      {layer.num}.
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{layer.name}</p>
                      <p className="text-xs text-white/40 mt-0.5">{layer.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Architecture Benefits */}
        <AnimatedSection delay={0.3}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Scale size={20} />, title: "Scalability", desc: "Handles growing users and data complexity" },
              { icon: <Puzzle size={20} />, title: "Flexibility", desc: "Rapid integration of new features" },
              { icon: <Layers size={20} />, title: "Robustness", desc: "System stability and reliability" },
              { icon: <Rocket size={20} />, title: "Future-Proof", desc: "Continuous evolution capability" },
            ].map((b) => (
              <div key={b.title} className="text-center py-6 px-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3 text-white/60">
                  {b.icon}
                </div>
                <p className="text-sm font-bold text-white mb-1">{b.title}</p>
                <p className="text-xs text-white/40">{b.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
