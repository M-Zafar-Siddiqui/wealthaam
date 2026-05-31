import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

// ─── Animated counter hook ────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, decimals = 0, startOnVisible = true) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!startOnVisible) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(parseFloat((eased * target).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(step);
            else setValue(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, decimals, startOnVisible]);

  return { value, ref };
}

// ─── Individual stat with counter ────────────────────────────────────────────
function AnimatedStat({
  prefix = "",
  target,
  suffix = "",
  decimals = 0,
  label,
}: {
  prefix?: string;
  target: number;
  suffix?: string;
  decimals?: number;
  label: string;
}) {
  const { value, ref } = useCountUp(target, 1800, decimals);
  return (
    <div>
      <p className="text-2xl sm:text-3xl font-bold gradient-text font-mono">
        <span ref={ref}>
          {prefix}
          {decimals > 0 ? value.toFixed(decimals) : value.toLocaleString()}
          {suffix}
        </span>
      </p>
      <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">{label}</p>
    </div>
  );
}

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
              <span
                className="inline-flex items-center gap-1.5 ml-3 align-middle"
                style={{
                  fontSize: "clamp(0.75rem, 1.375vw, 1rem)",
                  fontWeight: 500,
                  color: "#2dd4bf",
                  borderBottom: "1.5px solid #2dd4bf",
                  paddingBottom: "2px",
                  letterSpacing: "0.01em",
                  verticalAlign: "middle",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  opacity: 0.92,
                }}
              >
                <ShieldCheck
                  style={{ width: "clamp(0.8rem, 1.5vw, 1.1rem)", height: "clamp(0.8rem, 1.5vw, 1.1rem)", flexShrink: 0 }}
                  strokeWidth={2.2}
                />
                Self-Custody / Non-Custodial Framework
              </span>
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
              <Link
                href="/hub"
                className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white rounded-xl gradient-bg hover:opacity-90 transition-all shadow-lg shadow-purple-500/20"
              >
                Express Your Interest
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#performance"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white/80 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
              >
                View Performance Data
              </a>
            </div>
          </AnimatedSection>

          {/* Key Stats — animated counters */}
          <AnimatedSection delay={0.4}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-8 border-t border-white/5">
              {/* AAR Range — static text, no counter needed */}
              <div>
                <p className="text-2xl sm:text-3xl font-bold gradient-text font-mono">303–1,236%</p>
                <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">AAR Range</p>
              </div>
              {/* Animated: 6 AI Agents */}
              <AnimatedStat target={6} suffix=" AI" label="Agents" />
              {/* Animated: 50M+ Data Points */}
              <AnimatedStat target={50} suffix="M+" label="Data Points/Day" />
              {/* Win Rate — static range */}
              <div>
                <p className="text-2xl sm:text-3xl font-bold gradient-text font-mono">72–89%</p>
                <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">Win Rate</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
