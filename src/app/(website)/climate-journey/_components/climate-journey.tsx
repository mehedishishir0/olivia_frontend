import ClimateJourneyBanner from "./climate-journey-banner";
import CareerServicesTiers from "./career-services-tiers";
import PricingCards from "./pricing-cards";
import PricingCTA from "./pricing-cta";
import HowItWorksSecondary from "./how-it-work-secoundary";
import ComparePlans from "./compare-plans";
import { Newsletter } from "@/components/home/Newsletter";
import CommunitySection from "@/components/home/CommunitySection";
import FAQSection from "./FAQSection";

const ClimateJourney = () => {
  return (
    <div className="space-y-16 lg:space-y-20">
      <ClimateJourneyBanner />
      <CareerServicesTiers />
      <div className="mt-16 lg:mt-20">
        <PricingCards />
      </div>
      <PricingCTA />
      <HowItWorksSecondary />
      <ComparePlans />

      <div>
        <FAQSection />
        <Newsletter />
        <CommunitySection />
      </div>
    </div>
  );
};

export default ClimateJourney;
