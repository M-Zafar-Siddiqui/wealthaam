import { AnimatedSection } from "@/components/AnimatedSection";
import { FEATURES } from "@/lib/constants";
import {
  TrendingUp, Brain, Database, BarChart3, Shield, Zap, Clock, Lock, FileCheck,
} from "lucide-react";

// Theme palette: #4A90D9 (blue) → #7C5CBF (violet) → #9B59B6 (purple) → #D946A8 (pink)
// 9 features → cycle through the 4 palette colors
const CARD_ACCENTS = [
  { icon: "text-[#4A90D9]", bg: "bg-[#4A90D9]/10", border: "border-[#4A90D9]/20", hover: "hover:border-[#4A90D9]/30", glow: "#4A90D9" },
  { icon: "text-[#7C5CBF]", bg: "bg-[#7C5CBF]/10", border: "border-[#7C5CBF]/20", hover: "hover:border-[#7C5CBF]/30", glow: "#7C5CBF" },
  { icon: "text-[#9B59B6]", bg: "bg-[#9B59B6]/10", border: "border-[#9B59B6]/20", hover: "hover:border-[#9B59B6]/30", glow: "#9B59B6" },
  { icon: "text-[#D946A8]", bg: "bg-[#D946A8]/10", border: "border-[#D946A8]/20", hover: "hover:border-[#D946A8]/30", glow: "#D946A8" },
  { icon: "text-[#4A90D9]", bg: "bg-[#4A90D9]/10", border: "border-[#4A90D9]/20", hover: "hover:border-[#4A90D9]/30", glow: "#4A90D9" },
  { icon: "text-[#7C5CBF]", bg: "bg-[#7C5CBF]/10", border: "border-[#7C5CBF]/20", hover: "hover:border-[#7C5CBF]/30", glow: "#7C5CBF" },
  { icon: "text-[#9B59B6]", bg: "bg-[#9B59B6]/10", border: "border-[#9B59B6]/20", hover: "hover:border-[#9B59B6]/30", glow: "#9B59B6" },
  { icon: "text-[#D946A8]", bg: "bg-[#D946A8]/10", border: "border-[#D946A8]/20", hover: "hover:border-[#D946A8]/30", glow: "#D946A8" },
  { icon: "text-[#4A90D9]", bg: "bg-[#4A90D9]/10", border: "border-[#4A90D9]/20", hover: "hover:border-[#4A90D9]/30", glow: "#4A90D9" },
];

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp size={22} />,
  Brain: <Brain size={22} />,
  Database: <Database size={22} />,
  BarChart3: <BarChart3 size={22} />,
  Shield: <Shield size={22} />,
  Zap: <Zap size={22} />,
  Clock: <Clock size={22} />,
  Lock: <Lock size={22} />,
  FileCheck: <FileCheck size={22} />,
};

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      {/* Subtle background glows */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#4A90D9]/4 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#D946A8]/4 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#9B59B6] bg-[#9B59B6]/10 rounded-full mb-4">
              Revolutionary Features
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Comprehensive <span className="gradient-text">Wealth Engine</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              WealthAAM combines cutting-edge AI, proprietary analytics, and innovative architecture
              to deliver unprecedented asset accumulation capabilities.
            </p>
          </div>
        </AnimatedSection>

        {/* Features Grid — color-per-card with hover animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => {
            const accent = CARD_ACCENTS[i];
            return (
              <AnimatedSection key={feature.title} delay={i * 0.07}>
                <div
                  className={`relative rounded-2xl border ${accent.border} ${accent.hover} bg-gradient-to-b from-[#0D1020]/90 to-[#090E18]/90 p-6 h-full group overflow-hidden
                    transition-all duration-300 ease-out backdrop-blur-sm
                    hover:-translate-y-1.5 hover:shadow-lg`}
                  style={{
                    boxShadow: `0 0 25px ${accent.glow}0D`,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${accent.glow}28, 0 0 0 1px ${accent.glow}30`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 25px ${accent.glow}0D`;
                  }}
                >
                  {/* Shimmer sweep on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(105deg, transparent 30%, ${accent.glow}10 50%, transparent 70%)`,
                      transform: "translateX(-100%)",
                      animation: "none",
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(ellipse at top left, ${accent.glow}08 0%, transparent 60%)`,
                      }}
                    />
                  </div>

                  {/* Icon — scale + rotate on hover */}
                  <div
                    className={`relative w-11 h-11 rounded-xl ${accent.bg} border ${accent.border} flex items-center justify-center mb-5 ${accent.icon}
                      group-hover:scale-110 group-hover:rotate-3
                      transition-transform duration-300 ease-out`}
                  >
                    {iconMap[feature.icon]}
                  </div>

                  {/* Title — subtle color shift on hover */}
                  <h3
                    className="relative text-base font-bold text-white mb-2 leading-snug
                      group-hover:text-white transition-colors duration-200"
                  >
                    {feature.title}
                  </h3>

                  {/* Description — slightly brighter on hover */}
                  <p className="relative text-sm text-white/50 group-hover:text-white/65 leading-relaxed transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Bottom accent line — slides in from left on hover */}
                  <div className="relative mt-5 h-0.5 rounded-full overflow-hidden bg-white/5">
                    <div
                      className="absolute inset-y-0 left-0 w-0 group-hover:w-full rounded-full transition-all duration-500 ease-out"
                      style={{ background: `linear-gradient(90deg, ${accent.glow}, ${accent.glow}80)` }}
                    />
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* USP Bar */}
        <AnimatedSection delay={0.35}>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "First & Only", sub: "Asset-Centric Platform", color: "#4A90D9" },
              { label: "Proprietary", sub: "Volatility-Leveraging Framework", color: "#9B59B6" },
              { label: "Revolutionary", sub: "Risk Management (AQaR)", color: "#D946A8" },
            ].map((usp) => (
              <div
                key={usp.label}
                className="text-center py-6 px-4 rounded-2xl border border-white/5 bg-white/[0.02]"
                style={{ borderColor: `${usp.color}20` }}
              >
                <p
                  className="text-sm font-bold uppercase tracking-wider"
                  style={{ color: usp.color }}
                >
                  {usp.label}
                </p>
                <p className="text-white/50 text-sm mt-1">{usp.sub}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
