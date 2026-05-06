import { useState } from "react";

// FAQSection — dark cosmic theme, blue-violet-purple-pink palette
// Accordion pattern, 5 curated Q&As about WealthAAM platform

const faqs = [
  {
    q: "Can I switch tiers at any time?",
    a: "Yes. You can upgrade or downgrade your WealthAAM subscription tier at any time from your account settings. Upgrades take effect immediately and are prorated for the remaining billing period. Downgrades take effect at the start of your next billing cycle. If your current tier includes a mandatory AACCUMA bundle (POWERHOUSE or PINNACLE), switching to a lower tier will also adjust your AACCUMA access accordingly.",
    accent: "#4A90D9",
  },
  {
    q: "Is AACCUMA a separate login or integrated into WealthAAM?",
    a: "AACCUMA is a companion analytics platform developed by QuantaamLabs. When you subscribe to a WealthAAM bundle that includes AACCUMA, you receive a single sign-on experience — one account, one login. Your WealthAAM portfolio data flows directly into AACCUMA's AI-powered analytics engine, giving you the full AAM Diagnostic Triangle (eCOST, aVOLATILITY, qTARGET) without any manual data exports or separate credentials.",
    accent: "#7C5CBF",
  },
  {
    q: "What exchanges and asset classes are supported?",
    a: "WealthAAM currently connects to leading centralised exchanges including Binance, Coinbase Advanced, Kraken, Bybit, and OKX for digital assets. xStocks (tokenised equities) are supported on POWERHOUSE and above. Commodities access is available on POWERHOUSE and PINNACLE tiers. Traditional stock brokerage integration (via custom API) is available exclusively on the PINNACLE tier. The exchange connectivity layer is non-custodial — WealthAAM uses read-only API keys for data ingestion and executes trades only through permissioned, user-authorised keys.",
    accent: "#9B59B6",
  },
  {
    q: "How does the AAM engine actually accumulate assets?",
    a: "The AAM (Asset Accumulation Model) engine is built on a core philosophy: we don't just trade to make money — we trade to accumulate more assets. The AGM (Accumulation-Guided Model) processes live market signals across multiple timeframes and routes capital into positions designed to reduce the eCOST (effective cost basis) of each asset over time. This produces the Turtle Effect — steady, compounding accumulation — and the Snowball Effect, where each accumulated unit generates further accumulation. Performance is measured in asset quantity gained, not just USD profit, making it uniquely resilient during bear markets, recessions, and Black Swan events.",
    accent: "#C44BA0",
  },
  {
    q: "Is my capital safe? Who holds custody of my assets?",
    a: "WealthAAM is a non-custodial platform. Your assets remain on your chosen exchange or wallet at all times — WealthAAM never holds, moves, or controls your funds directly. The platform connects via exchange API keys that you generate and can revoke at any time. For additional security, we recommend using IP-whitelisted, trade-only API keys with withdrawal permissions disabled. WealthAAM does not provide financial advice or guarantee returns; all trading involves risk. Please review our full Risk Disclosure before activating any strategy.",
    accent: "#D946A8",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      style={{
        background: "linear-gradient(180deg, #0a0d1a 0%, #060810 100%)",
        padding: "100px 0 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(124,92,191,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(74,144,217,0.12)",
              border: "1px solid rgba(74,144,217,0.25)",
              borderRadius: "20px",
              padding: "6px 18px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "#4A90D9",
              textTransform: "uppercase",
              marginBottom: "20px",
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            FAQ
          </div>
          <h2
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              color: "#ffffff",
              margin: "0 0 16px",
              lineHeight: 1.2,
            }}
          >
            Frequently Asked{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #4A90D9 0%, #7C5CBF 40%, #9B59B6 70%, #D946A8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Questions
            </span>
          </h2>
          <p
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: "16px",
              color: "rgba(255,255,255,0.5)",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Everything you need to know about WealthAAM, the AAM engine, and
            how the platform works.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  background: isOpen
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(255,255,255,0.025)",
                  border: `1px solid ${isOpen ? faq.accent + "55" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "border-color 0.25s ease, background 0.25s ease",
                  boxShadow: isOpen
                    ? `0 0 24px ${faq.accent}18`
                    : "none",
                }}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    padding: "20px 24px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    {/* Accent dot */}
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: faq.accent,
                        flexShrink: 0,
                        boxShadow: `0 0 8px ${faq.accent}80`,
                        transition: "transform 0.25s ease",
                        transform: isOpen ? "scale(1.3)" : "scale(1)",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontSize: "15px",
                        fontWeight: 600,
                        color: isOpen ? "#ffffff" : "rgba(255,255,255,0.85)",
                        lineHeight: 1.4,
                        transition: "color 0.2s ease",
                      }}
                    >
                      {faq.q}
                    </span>
                  </div>

                  {/* Chevron */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isOpen ? faq.accent : "rgba(255,255,255,0.35)"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      flexShrink: 0,
                      transition: "transform 0.3s ease, stroke 0.25s ease",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Answer — CSS height animation via max-height */}
                <div
                  style={{
                    maxHeight: isOpen ? "400px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.35s ease",
                  }}
                >
                  <div
                    style={{
                      padding: "0 24px 22px 46px",
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontSize: "14px",
                      lineHeight: 1.75,
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: "52px",
            textAlign: "center",
            padding: "28px 32px",
            background: "rgba(74,144,217,0.06)",
            border: "1px solid rgba(74,144,217,0.15)",
            borderRadius: "14px",
          }}
        >
          <p
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: "14px",
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 12px",
            }}
          >
            Still have questions? Our team is here to help.
          </p>
          <a
            href="mailto:support@wealthaam.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: "#4A90D9",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#7C5CBF")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#4A90D9")
            }
          >
            Contact Support
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
