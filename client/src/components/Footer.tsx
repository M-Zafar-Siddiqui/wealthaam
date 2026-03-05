import { ASSETS, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src={ASSETS.logo.footer}
              alt="WealthAAM"
              className="h-12 w-auto mb-4"
            />
            <p className="text-sm text-white/40 leading-relaxed mb-4">
              Advanced Asset Accumulation Model — the First Asset-Centric Digital Tokenized Assets
              Wealth Management Engine, transforming volatility into wealth-building through our
              Multi-AI agent system.
            </p>
            <div className="flex gap-3">
              {["X", "LinkedIn", "Discord", "Telegram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/10 transition-colors text-xs font-bold"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Product</h4>
            <div className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Ecosystem</h4>
            <div className="space-y-2.5">
              {["$AACCUMA Token", "Referral Program", "Staking Rewards", "Governance", "AAM.Foundation"].map((item) => (
                <a
                  key={item}
                  href={item === "$AACCUMA Token" ? "#token" : "#"}
                  className="block text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Resources</h4>
            <div className="space-y-2.5">
              {["Documentation", "API Reference", "Tutorials", "Community"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <p className="text-xs text-white/25">
              © 2026 WealthAAM. All rights reserved. WealthAAM is a product of QuantaamLabs.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"].map((item) => (
                <a key={item} href="#" className="text-xs text-white/25 hover:text-white/40 transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-[10px] text-white/15 text-center leading-relaxed mb-8 max-w-4xl mx-auto">
            Disclaimer: Cryptocurrency trading involves risk. Past performance is not indicative of future results.
            WealthAAM's Asset Accumulation Model is designed for asset accumulation but does not guarantee profits.
            The platform is for informational purposes only and should not be considered as financial advice.
          </p>

          {/* Stretched Brand Name */}
          <div className="text-center overflow-hidden">
            <h2
              className="text-[8vw] lg:text-[6vw] font-extrabold tracking-[0.15em] uppercase leading-none"
              style={{
                background: "linear-gradient(135deg, rgba(74,144,217,0.08), rgba(155,89,182,0.08), rgba(217,70,168,0.08))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              WealthAAM
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
}
