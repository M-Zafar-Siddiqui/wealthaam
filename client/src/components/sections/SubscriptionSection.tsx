import { AnimatedSection } from "@/components/AnimatedSection";
import { SUBSCRIPTION_TIERS } from "@/lib/constants";
import { Check, Crown, Star, Zap, Gem } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const tierIcons: Record<string, React.ReactNode> = {
  FOUNDATION: <Star size={18} />,
  ACCELERATOR: <Zap size={18} />,
  POWERHOUSE: <Crown size={18} />,
  PINNACLE: <Gem size={18} />,
};

const tierGradients: Record<string, string> = {
  FOUNDATION: "from-[#4A90D9] to-[#6B5CBF]",
  ACCELERATOR: "from-[#6B5CBF] to-[#9B59B6]",
  POWERHOUSE: "from-[#9B59B6] to-[#D946A8]",
  PINNACLE: "from-[#D946A8] to-[#FF6B9D]",
};

export function SubscriptionSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="subscription" className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4A90D9]/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#D946A8] bg-[#D946A8]/10 rounded-full mb-4">
              <Crown size={12} />
              Subscription Plans
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Choose Your <span className="gradient-text">Wealth Tier</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Start building wealth with the plan that matches your ambition. All plans include
              real-time portfolio tracking, mobile & web access, bank-grade security, and AGM Academy.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-3 bg-white/5 rounded-full p-1">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                  !isYearly ? "bg-white/10 text-white" : "text-white/50 hover:text-white/70"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                  isYearly ? "bg-white/10 text-white" : "text-white/50 hover:text-white/70"
                }`}
              >
                Yearly <span className="text-emerald-400 text-xs ml-1">Save 10%</span>
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {SUBSCRIPTION_TIERS.map((tier, i) => (
            <AnimatedSection key={tier.name} delay={i * 0.1}>
              <div
                className={`relative glass-card rounded-2xl p-6 h-full flex flex-col ${
                  tier.badge === "BEST VALUE" ? "ring-2 ring-[#9B59B6]/50" : ""
                }`}
              >
                {/* Badge */}
                {tier.badge && (
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-gradient-to-r ${tierGradients[tier.name]} text-white`}
                  >
                    {tier.badge}
                  </div>
                )}

                {/* Header */}
                <div className="mb-6 pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tierGradients[tier.name]} flex items-center justify-center text-white`}
                    >
                      {tierIcons[tier.name]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white/40 uppercase tracking-wider">{tier.name}</p>
                      <p className="text-xs text-white/30">{tier.tier}</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/60 mt-2">{tier.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-white">
                      ${isYearly ? Math.round(tier.yearlyPrice / 12) : tier.price}
                    </span>
                    <span className="text-sm text-white/30">/month</span>
                  </div>
                  {isYearly && (
                    <p className="text-xs text-emerald-400 mt-1">
                      ${tier.yearlyPrice.toFixed(0)}/year (save 10%)
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="flex-1 space-y-2.5 mb-6">
                  {tier.features.map((feature, fi) => (
                    <div key={fi} className="flex items-start gap-2">
                      <Check size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                      <span className="text-xs text-white/50 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => toast("Feature coming soon — Express your interest!")}
                  className={`w-full py-3 text-sm font-bold rounded-xl transition-all ${
                    tier.badge === "BEST VALUE"
                      ? "gradient-bg text-white hover:opacity-90"
                      : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                  }`}
                >
                  Get Started
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Institutional */}
        <AnimatedSection delay={0.5}>
          <div className="mt-10 glass-card rounded-2xl p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A90D9] to-[#D946A8] flex items-center justify-center text-white">
                    <Crown size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">INSTITUTIONAL</h3>
                    <p className="text-xs text-white/40">White-Label & Enterprise Solutions</p>
                  </div>
                </div>
                <p className="text-sm text-white/50 max-w-xl mt-3 leading-relaxed">
                  Custom enterprise solutions with white-label capabilities, dedicated infrastructure,
                  and personalized support for institutions and large organizations.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  {[
                    "Full White-Label Customization",
                    "Enterprise API with SLA",
                    "Dedicated Infrastructure & 24/7 Support",
                    "Revenue Sharing & Custom Agreements",
                  ].map((f) => (
                    <span key={f} className="inline-flex items-center gap-1.5 text-xs text-emerald-400/80">
                      <Check size={12} /> {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-center lg:text-right shrink-0">
                <p className="text-2xl font-extrabold text-white mb-1">Custom Pricing</p>
                <p className="text-xs text-white/40 mb-4">Tailored to your needs</p>
                <button
                  onClick={() => toast("Feature coming soon — Contact our sales team!")}
                  className="px-8 py-3 text-sm font-bold text-white rounded-xl gradient-bg hover:opacity-90 transition-opacity"
                >
                  Contact Sales Team
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
