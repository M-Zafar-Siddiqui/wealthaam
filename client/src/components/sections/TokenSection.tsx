import { AnimatedSection } from "@/components/AnimatedSection";
import { AACCUMA_TOKEN } from "@/lib/constants";
import { Coins, Percent, Vote, Users, Trophy, Key } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Percent: <Percent size={20} />,
  Coins: <Coins size={20} />,
  Vote: <Vote size={20} />,
  Users: <Users size={20} />,
  Trophy: <Trophy size={20} />,
  Key: <Key size={20} />,
};

export function TokenSection() {
  return (
    <section id="token" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D946A8]/5 rounded-full blur-[200px]" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-[#4A90D9]/5 rounded-full blur-[150px]" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#D946A8] bg-[#D946A8]/10 rounded-full mb-4">
              <Coins size={12} />
              Ecosystem Token
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              <span className="gradient-text">{AACCUMA_TOKEN.name}</span>
            </h2>
            <p className="text-lg text-white/40 font-medium mb-2">{AACCUMA_TOKEN.fullName}</p>
            <p className="text-white/50 text-lg leading-relaxed">
              {AACCUMA_TOKEN.description}
            </p>
          </div>
        </AnimatedSection>

        {/* Token Tagline Banner */}
        <AnimatedSection delay={0.1}>
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/10 bg-gradient-to-r from-[#4A90D9]/10 via-[#9B59B6]/10 to-[#D946A8]/10">
              <Coins size={24} className="text-[#D946A8]" />
              <p className="text-xl font-bold gradient-text">{AACCUMA_TOKEN.tagline}</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Token Utilities Grid */}
        <AnimatedSection delay={0.15}>
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Token <span className="gradient-text">Utilities</span>
          </h3>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {AACCUMA_TOKEN.utilities.map((utility, i) => (
            <AnimatedSection key={utility.title} delay={0.2 + i * 0.06}>
              <div className="glass-card rounded-2xl p-6 h-full group hover:border-[#D946A8]/20 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4A90D9]/10 to-[#D946A8]/10 flex items-center justify-center mb-4 text-[#9B59B6] group-hover:text-[#D946A8] transition-colors">
                  {iconMap[utility.icon]}
                </div>
                <h4 className="text-base font-bold text-white mb-2">{utility.title}</h4>
                <p className="text-sm text-white/45 leading-relaxed">{utility.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Referral Rewards Table */}
        <AnimatedSection delay={0.4}>
          <div className="glass-card rounded-2xl p-8 lg:p-10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Users size={24} className="text-[#D946A8]" />
              <h3 className="text-xl font-bold text-white">
                Multi-Tier <span className="gradient-text">Referral Rewards</span>
              </h3>
            </div>
            <p className="text-center text-white/50 text-sm mb-8 max-w-2xl mx-auto">
              Earn $AACCUMA tokens for every successful referral. The more you share, the more you earn — 
              with escalating rewards and recurring monthly bonuses.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Tier</th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Requirement</th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-[#D946A8]/70 uppercase tracking-wider">$AACCUMA Reward</th>
                  </tr>
                </thead>
                <tbody>
                  {AACCUMA_TOKEN.referralTiers.map((tier, i) => {
                    const tierColors: Record<string, string> = {
                      Bronze: "text-amber-600",
                      Silver: "text-gray-300",
                      Gold: "text-yellow-400",
                      Platinum: "text-[#D946A8]",
                    };
                    return (
                      <tr key={tier.tier} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className={`py-4 px-4 text-sm font-bold ${tierColors[tier.tier] || "text-white"}`}>
                          {tier.tier}
                        </td>
                        <td className="py-4 px-4 text-sm text-white/60">{tier.requirement}</td>
                        <td className="py-4 px-4 text-sm text-white/70">{tier.reward}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { value: "Up to 30%", label: "Subscription Discount" },
                { value: "Recurring", label: "Monthly Rewards" },
                { value: "VIP Status", label: "Top Referrers" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <p className="text-xl font-bold gradient-text font-mono">{stat.value}</p>
                  <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
