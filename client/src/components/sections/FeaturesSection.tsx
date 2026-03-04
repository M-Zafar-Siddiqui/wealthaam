import { AnimatedSection } from "@/components/AnimatedSection";
import { FEATURES } from "@/lib/constants";
import {
  TrendingUp, Brain, Database, BarChart3, Shield, Zap, Clock, Lock, FileCheck,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp size={24} />,
  Brain: <Brain size={24} />,
  Database: <Database size={24} />,
  BarChart3: <BarChart3 size={24} />,
  Shield: <Shield size={24} />,
  Zap: <Zap size={24} />,
  Clock: <Clock size={24} />,
  Lock: <Lock size={24} />,
  FileCheck: <FileCheck size={24} />,
};

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.08}>
              <div className="glass-card rounded-2xl p-6 h-full group">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform">
                  {iconMap[feature.icon]}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* USP Bar */}
        <AnimatedSection delay={0.3}>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "First & Only", sub: "Asset-Centric Platform" },
              { label: "Proprietary", sub: "Volatility-Leveraging Framework" },
              { label: "Revolutionary", sub: "Risk Management (AQaR)" },
            ].map((usp) => (
              <div
                key={usp.label}
                className="text-center py-6 px-4 rounded-2xl border border-white/5 bg-white/[0.02]"
              >
                <p className="text-sm font-bold gradient-text uppercase tracking-wider">{usp.label}</p>
                <p className="text-white/50 text-sm mt-1">{usp.sub}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
