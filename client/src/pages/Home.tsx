import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { BlackSwanSection } from "@/components/sections/BlackSwanSection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { AgentsSection } from "@/components/sections/AgentsSection";
import { AnalyticsSection } from "@/components/sections/AnalyticsSection";
import { PerformanceSection } from "@/components/sections/PerformanceSection";
import { PathwaysSection } from "@/components/sections/PathwaysSection";
import { SubscriptionSection } from "@/components/sections/SubscriptionSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0D1A]">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <BlackSwanSection />
      <ArchitectureSection />
      <AgentsSection />
      <AnalyticsSection />
      <PerformanceSection />
      <PathwaysSection />
      <SubscriptionSection />
      <Footer />
    </div>
  );
}
