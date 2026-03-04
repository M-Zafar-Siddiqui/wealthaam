import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { TurtleSnowballSection } from "@/components/sections/TurtleSnowballSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { AssetsSection } from "@/components/sections/AssetsSection";
import { BlackSwanSection } from "@/components/sections/BlackSwanSection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { AgentsSection } from "@/components/sections/AgentsSection";
import { AnalyticsSection } from "@/components/sections/AnalyticsSection";
import { PathwaysSection } from "@/components/sections/PathwaysSection";
import { TokenSection } from "@/components/sections/TokenSection";
import { SubscriptionSection } from "@/components/sections/SubscriptionSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0D1A]">
      <Navbar />
      <HeroSection />
      <TurtleSnowballSection />
      <FeaturesSection />
      <AssetsSection />
      <BlackSwanSection />
      <ArchitectureSection />
      <AgentsSection />
      <AnalyticsSection />
      <PathwaysSection />
      <TokenSection />
      <SubscriptionSection />
      <Footer />
    </div>
  );
}
