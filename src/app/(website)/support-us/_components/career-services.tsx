import PageHero from "@/components/home/PageHero";
import React from "react";
import AssistanceSection from "./assistance-section";
import { Newsletter } from "@/components/home/Newsletter";
import CommunitySection from "@/components/home/CommunitySection";
import HowItWorks from "./how-it-work";
import PricingSection from "./pricing-section";

const CareerServices = () => {
  return (
    <div className="space-y-16 lg:space-y-20">
      <div>
        <PageHero
          bgImage="/courses-bg.jpg"
          subtitle="Through our career services, we offer one-on-one technical support from a trained career professional on the Act on Climate Team."
          title="We can Help"
          isHide={true}
        />
        <AssistanceSection />
      </div>
      <HowItWorks />

      <div>
        <PricingSection />
        <Newsletter />
        <CommunitySection />
      </div>
    </div>
  );
};

export default CareerServices;
