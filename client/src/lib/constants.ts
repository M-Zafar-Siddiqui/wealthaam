// WealthAAM CDN Assets
export const ASSETS = {
  logo: {
    header: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030055216/WBVS3mAKGLmF2rKomRzShD/WealthAAMLogoHeader_668c71f0.png",
    footer: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030055216/WBVS3mAKGLmF2rKomRzShD/WealthAAMLogofooter_dae324c2.png",
    favicon: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030055216/WBVS3mAKGLmF2rKomRzShD/WealthAAMFavicon_f0b6d084.png",
  },
  images: {
    pathwaysVisual: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030055216/WBVS3mAKGLmF2rKomRzShD/pathways-visual_e21d0964.png",
    aiAgentsNetwork: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030055216/WBVS3mAKGLmF2rKomRzShD/ai-agents-network_98bbfc91.png",
    architectureLayers: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030055216/WBVS3mAKGLmF2rKomRzShD/architecture-layers-visual_10597353.png",
  },
} as const;

export const NAV_LINKS = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Features", href: "#features" },
  { label: "Assets", href: "#assets" },
  { label: "Black Swan", href: "#blackswan" },
  { label: "Architecture", href: "#architecture" },
  { label: "AI Agents", href: "#agents" },
  { label: "Pathways", href: "#pathways" },
  { label: "$AACCUMA", href: "#token" },
  { label: "Pricing", href: "#subscription" },
] as const;

export const FEATURES = [
  {
    title: "Asset Accumulation Model (AAM)",
    description: "Revolutionary framework that prioritizes asset quantity accumulation over USD-denominated returns, transforming how wealth is measured and built.",
    icon: "TrendingUp",
  },
  {
    title: "Multi-AI Agent System",
    description: "Six specialized AI agents working in concert: Data Collection, Strategy, Risk Management, Execution, Reporting, and Communication agents.",
    icon: "Brain",
  },
  {
    title: "Multi-Timeframe Data Core",
    description: "Real-time data collection across multiple timeframes (5min-24hr) from 50+ exchanges with proprietary normalization and validation.",
    icon: "Database",
  },
  {
    title: "Proprietary AAM Indicators",
    description: "Custom technical indicators calibrated for asset accumulation: AVI, AAR, AAM-PI, and S-AAI metrics for precise measurement.",
    icon: "BarChart3",
  },
  {
    title: "Asset Quantity at Risk (AQaR)",
    description: "Revolutionary risk metric that measures potential asset quantity losses rather than USD value, aligning risk with accumulation objectives.",
    icon: "Shield",
  },
  {
    title: "Hybrid Execution Strategies",
    description: "Combines algorithmic precision with AI-driven optimization for multi-asset, multi-timeframe strategy execution across CEX and DEX.",
    icon: "Zap",
  },
  {
    title: "24/7 Autonomous Operation",
    description: "Continuous market monitoring and strategy execution with intelligent adaptation to changing market conditions and opportunities.",
    icon: "Clock",
  },
  {
    title: "Non-Custodial Architecture",
    description: "Your assets remain in your exchange accounts at all times. WealthAAM connects via read/trade API keys — never withdrawal access.",
    icon: "Lock",
  },
  {
    title: "IP-Protected Innovation",
    description: "Patent-filing protected AAM framework including proprietary metrics, multi-agent coordination, and wealth pathway algorithms.",
    icon: "FileCheck",
  },
] as const;

export const BEAR_MARKET_SCENARIOS = [
  {
    scenario: "Market Crash (30-60% drop)",
    traditional: "Panic selling, portfolio devastation, emotional decisions",
    aam: "Accelerated accumulation at discounted prices, systematic buying",
    advantage: "3-5x higher accumulation rate during crash periods",
  },
  {
    scenario: "Prolonged Bear Market",
    traditional: "Capital erosion, forced liquidations, strategy abandonment",
    aam: "Consistent accumulation through volatility exploitation",
    advantage: "Compound asset growth regardless of price direction",
  },
  {
    scenario: "Recession / Depression",
    traditional: "Risk-off positioning, missed recovery opportunities",
    aam: "Counter-cyclical accumulation, positioned for recovery",
    advantage: "Maximum accumulation when others exit the market",
  },
  {
    scenario: "Stagflation",
    traditional: "Eroded purchasing power, uncertain positioning",
    aam: "Asset-centric approach preserves and grows holdings",
    advantage: "Focus on asset quantity insulates from fiat devaluation",
  },
] as const;

export const DEFENSE_LAYERS = [
  {
    name: "Non-Custodial Architecture",
    description: "Assets never leave your exchange. API-only connection with read/trade permissions — zero withdrawal risk.",
  },
  {
    name: "AQaR Risk Quantification",
    description: "Asset Quantity at Risk measures potential loss in asset terms, not USD — aligning risk management with accumulation goals.",
  },
  {
    name: "Multi-AI Agent Vigilance",
    description: "Six specialized agents monitor markets 24/7, detecting anomalies and adjusting strategies in real-time.",
  },
  {
    name: "CAPI Strategy Selection",
    description: "Compound Annual Performance Index selects optimal strategies based on historical resilience across all market conditions.",
  },
  {
    name: "eCOST Anchoring",
    description: "Effective Cost of Strategy Trading ensures every trade improves your average cost basis systematically.",
  },
  {
    name: "IP-Protected Framework",
    description: "Patent-filing protected algorithms ensure WealthAAM's competitive advantage cannot be replicated.",
  },
] as const;

export const ARCHITECTURE_LAYERS = {
  core: [
    { num: 1, name: "User Interface Layer", description: "Dashboard, analytics views, strategy controls, and mobile/web access" },
    { num: 2, name: "AI & Strategy Layer", description: "Multi-AI agent coordination, strategy execution, and optimization" },
    { num: 3, name: "AAM Intelligence Layer", description: "Proprietary AAM metrics calculation, AVI/AAR/AQaR processing" },
    { num: 4, name: "Execution Layer", description: "Order management, multi-exchange routing, and trade execution" },
    { num: 5, name: "Data & Reporting Layer", description: "Real-time data collection, normalization, and analytics reporting" },
  ],
  advanced: [
    { num: 6, name: "Security & Compliance Layer", description: "Non-custodial security, API key encryption, and audit trails" },
    { num: 7, name: "AGMFai Coordination Layer", description: "Asset Growth Model coordination across all AI agents" },
    { num: 8, name: "Pathway Management Layer", description: "Wealth pathway routing, risk profiling, and goal tracking" },
    { num: 9, name: "Integration & API Layer", description: "CEX/DEX connectors, third-party integrations, and API gateway" },
    { num: 10, name: "Infrastructure & Scaling Layer", description: "Cloud infrastructure, auto-scaling, and high-availability systems" },
  ],
} as const;

export const AI_AGENTS = [
  {
    name: "Data Collection",
    description: "Continuously collects, normalizes, and validates market data from 50+ exchanges across multiple timeframes.",
    metrics: "50M+ data points daily",
    color: "#4A90D9",
  },
  {
    name: "Strategy",
    description: "Analyzes market conditions and selects optimal accumulation strategies using proprietary AAM algorithms.",
    metrics: "Multi-timeframe analysis",
    color: "#6B5CBF",
  },
  {
    name: "Risk Management",
    description: "Monitors AQaR thresholds, manages position sizing, and protects accumulated assets in real-time.",
    metrics: "24/7 risk monitoring",
    color: "#9B59B6",
  },
  {
    name: "Execution",
    description: "Executes trades with algorithmic precision across multiple exchanges with optimal timing and routing.",
    metrics: "Sub-second execution",
    color: "#B94DB0",
  },
  {
    name: "Reporting",
    description: "Generates comprehensive asset-centric reports, performance analytics, and accumulation tracking.",
    metrics: "Real-time dashboards",
    color: "#D946A8",
  },
  {
    name: "Communication",
    description: "Provides intelligent alerts, portfolio updates, and AI-powered insights to keep you informed.",
    metrics: "Smart notifications",
    color: "#22D3EE",
  },
] as const;

export const PERFORMANCE_METRICS = [
  { name: "AAR", fullName: "Asset Accumulation Rate", range: "303% – 1,236%", description: "Rate of asset quantity accumulation over time" },
  { name: "S-AAI", fullName: "Strategy Asset Accumulation Index", range: "2.04x – 13.36x", description: "Strategy effectiveness multiplier" },
  { name: "Advantage", fullName: "Advantage % vs HODL", range: "104% – 860%", description: "Performance advantage over buy-and-hold" },
  { name: "PF", fullName: "Profit Factor", range: "6.6 – 23.1", description: "Ratio of winning to losing trades" },
  { name: "DD%", fullName: "Maximum Drawdown", range: "4.82% – 14.93%", description: "Maximum observed loss from peak" },
  { name: "SoR", fullName: "Sortino Ratio", range: "22.07 – 53.49", description: "Return per unit of downside risk" },
  { name: "SR", fullName: "Sharpe Ratio", range: "0.80 – 1.87", description: "Return per unit of total risk" },
  { name: "WR", fullName: "Win Rate", range: "72% – 89%", description: "Percentage of profitable trades" },
  { name: "eCOST", fullName: "Effective Cost of Strategy", range: "Dynamic", description: "Real-time cost basis optimization" },
  { name: "AVI", fullName: "Asset Volatility Index", range: "Proprietary", description: "Identifies optimal accumulation windows" },
] as const;

export const SUBSCRIPTION_TIERS = [
  {
    name: "FOUNDATION",
    tier: "Basic",
    price: 29.99,
    yearlyPrice: 323.89,
    tagline: "Start Your Wealth Journey",
    badge: null,
    features: [
      "AGM Core Engine — 12hr & 24hr intervals",
      "Two Curated Wealth Pathways",
      "1 CEX + 2 sub-accounts",
      "Top 10 AVI-selected Crypto",
      "AI Assistant (Basic)",
      "Quarterly Auto-Rebalancing",
      "30-day Analytics",
      "Email Support (48hr)",
      "AGM Academy Access",
      "Mobile & Web Access",
    ],
  },
  {
    name: "ACCELERATOR",
    tier: "Advanced",
    price: 49.99,
    yearlyPrice: 539.89,
    tagline: "Accelerate Your Wealth",
    badge: "POPULAR",
    features: [
      "Everything in Foundation, PLUS:",
      "AGM Advanced — 6hr, 12hr, 24hr",
      "4 Premium Wealth Pathways",
      "3 CEX + 6 sub-accounts",
      "Top 25 Crypto + 10 xStocks",
      "Multi-AI Agent System",
      "AI Assistant (Advanced + Voice)",
      "Monthly Auto-Rebalancing",
      "1-year Analytics + Benchmarks",
      "25 Smart Alerts",
      "Priority Support (24hr)",
      "Tax-Loss Harvesting Insights",
    ],
  },
  {
    name: "POWERHOUSE",
    tier: "Pro",
    price: 99.99,
    yearlyPrice: 1079.89,
    tagline: "Professional-Grade Management",
    badge: "BEST VALUE",
    features: [
      "Everything in Accelerator, PLUS:",
      "AGM Pro — 4hr, 6hr, 12hr, 24hr",
      "6 Elite Wealth Pathways",
      "10 CEX & DEX + 10 sub-accounts",
      "Top 100 Crypto + 25 xStocks + Gold",
      "Voice AI Assistant",
      "AI Journals (Tech + Fundamental)",
      "Bi-weekly Auto-Rebalancing",
      "Unlimited Analytics (Full History)",
      "100 Smart Alerts",
      "AI Account Manager",
      "Live Chat + Email (12hr)",
      "Full Tax Package",
      "Full API Access",
      "Early Feature Access",
    ],
  },
  {
    name: "PINNACLE",
    tier: "Elite",
    price: 199.99,
    yearlyPrice: 2159.89,
    tagline: "Elite Wealth Management",
    badge: "ELITE",
    features: [
      "Everything in Powerhouse, PLUS:",
      "AGM Elite — 1hr to 24hr + HIPs",
      "All Pathways + Custom HIPs",
      "10+ CEX & DEX + 15 sub-accounts",
      "100+ Crypto + 25+ xStocks + Gold",
      "Virtual AI Wealth Advisor",
      "Advanced AI Journals (All Analysis)",
      "Real-Time Auto-Rebalancing",
      "Institutional Analytics Suite",
      "Unlimited Everything",
      "VIP Support (4hr + Phone)",
      "White-Glove Tax (CPA)",
      "Enterprise API + SLA",
      "Beta Access",
      "Custom Strategy Development",
      "Elite Network Access",
    ],
  },
] as const;

export const WEALTH_PATHWAYS = {
  "Systematic Wealth Building": {
    description: "Automated strategies focused on consistent asset accumulation through systematic approaches.",
    strategies: [
      {
        name: "Auto-Pilot Accumulator",
        description: "Fully automated asset accumulation strategy that leverages volatility for systematic growth.",
        features: ["Fully automated execution", "Multi-timeframe analysis", "Volatility-driven accumulation"],
        metric: "329.34% average returns",
      },
      {
        name: "SMART Accumulator",
        description: "Strategic Market-Adaptive Real-Time accumulation strategy with intelligent adaptation.",
        features: ["Adaptive to market conditions", "Real-time strategy adjustments", "Performance optimization"],
        metric: "297.50% average returns",
      },
    ],
  },
  "Income Generation": {
    description: "Strategies designed to generate consistent income streams while maintaining asset growth.",
    strategies: [
      {
        name: "YieldFlow",
        description: "Optimized yield farming strategy that maximizes income while minimizing impermanent loss.",
        features: ["Automated yield optimization", "Impermanent loss mitigation", "Multi-protocol strategies"],
        metric: "42.5% annual yield",
      },
      {
        name: "DeFi Yield Harvester",
        description: "Automated yield harvesting across multiple DeFi protocols with risk-adjusted allocation.",
        features: ["Cross-protocol yield aggregation", "Risk-based rebalancing", "Auto-compound optimization"],
        metric: "18-65% annual yield",
      },
    ],
  },
  "Goal-Based Investment": {
    description: "Target-driven strategies that align your portfolio with specific financial milestones.",
    strategies: [
      {
        name: "RetireForge",
        description: "Retirement-focused accumulation strategy with long-term compounding optimization.",
        features: ["Long-term compounding", "Risk-adjusted allocation", "Milestone tracking"],
        metric: "Target: 10x in 10 years",
      },
      {
        name: "MilestoneBuilder",
        description: "Goal-specific investment strategy that tracks progress toward defined financial targets.",
        features: ["Custom goal setting", "Progress tracking", "Dynamic rebalancing"],
        metric: "Customizable targets",
      },
    ],
  },
  "Risk-Managed Growth": {
    description: "Growth-oriented strategies with built-in risk management and capital protection.",
    strategies: [
      {
        name: "Risk-Guarded Growth",
        description: "Growth strategy with integrated risk management using AQaR framework.",
        features: ["AQaR-based risk limits", "Dynamic position sizing", "Drawdown protection"],
        metric: "Max DD: 8.5%",
      },
      {
        name: "SafeHaven",
        description: "Capital preservation strategy that maintains growth while protecting against severe downturns.",
        features: ["Capital preservation focus", "Hedging mechanisms", "Market crash protection"],
        metric: "Max DD: 4.2%",
      },
    ],
  },
  "Specialized Wealth": {
    description: "Advanced strategies for specific asset classes and market opportunities.",
    strategies: [
      {
        name: "Digital Treasury Pro",
        description: "Institutional-grade digital asset treasury management with multi-asset diversification.",
        features: ["Multi-asset allocation", "Institutional risk controls", "Regulatory compliance"],
        metric: "Institutional grade",
      },
      {
        name: "HedgeShield",
        description: "Advanced hedging strategy using derivatives and multi-asset correlation for portfolio protection.",
        features: ["Derivatives-based hedging", "Correlation analysis", "Portfolio insurance"],
        metric: "Advanced protection",
      },
    ],
  },
} as const;

export const AACCUMA_TOKEN = {
  name: "$AACCUMA",
  fullName: "AAM Ecosystem Token",
  tagline: "The Fuel of the WealthAAM Ecosystem",
  description: "The $AACCUMA token powers the entire WealthAAM ecosystem, rewarding active participants and enabling seamless access to premium features, governance, and referral benefits.",
  utilities: [
    {
      title: "Subscription Discounts",
      description: "Pay for WealthAAM subscriptions with $AACCUMA and receive up to 30% discount on all tiers.",
      icon: "Percent",
    },
    {
      title: "Staking Rewards",
      description: "Stake $AACCUMA tokens to earn passive rewards and unlock higher-tier features without upgrading your plan.",
      icon: "Coins",
    },
    {
      title: "Governance Voting",
      description: "Participate in platform governance — vote on new features, pathway additions, and ecosystem development priorities.",
      icon: "Vote",
    },
    {
      title: "Referral Rewards",
      description: "Earn $AACCUMA tokens for every successful referral. Multi-tier referral system with escalating rewards.",
      icon: "Users",
    },
    {
      title: "Performance Bonuses",
      description: "Top-performing strategies earn additional $AACCUMA rewards, incentivizing optimal accumulation behavior.",
      icon: "Trophy",
    },
    {
      title: "Exclusive Access",
      description: "Hold $AACCUMA to unlock beta features, elite pathways, institutional tools, and private community channels.",
      icon: "Key",
    },
  ],
  referralTiers: [
    { tier: "Bronze", requirement: "1-5 referrals", reward: "5% of referee's first month subscription in $AACCUMA" },
    { tier: "Silver", requirement: "6-15 referrals", reward: "8% + 2% recurring monthly for 6 months" },
    { tier: "Gold", requirement: "16-50 referrals", reward: "12% + 3% recurring monthly for 12 months" },
    { tier: "Platinum", requirement: "51+ referrals", reward: "15% + 5% recurring monthly + VIP status" },
  ],
} as const;
