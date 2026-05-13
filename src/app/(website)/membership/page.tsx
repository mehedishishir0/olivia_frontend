import CommunitySection from "@/components/home/CommunitySection";
import { Newsletter } from "@/components/home/Newsletter";
import PageHero from "@/components/home/PageHero";
import HowItWorks from "./_components/how-it-works";
import BenefitsSection from "./_components/benefits-section";
import LearnMoreSection from "./_components/learn-more-section";
import MembershipSection from "./_components/Our-membership";
import MembershipOffers from "./_components/MembershipOffers";

const page = () => {
  return (
    <div className="space-y-16 lg:space-y-20">
      <div>
        <PageHero
          bgImage="/membership.jpg"
          subtitle="Act on Climate brings together students, early-career professionals, and experienced leaders from around the world who are committed to driving climate solutions. We are building a collaborative community for learning, connection, and real-world impact."
          title="Join a Global Climate Community"
          isHide={false}
          buttonTitle="Become a Member"
          buttonLink="/membership-pricing#pricing"
        />
        <HowItWorks />
      </div>
      <BenefitsSection />
      <MembershipSection />
      <MembershipOffers />
      <div>
        <LearnMoreSection />
        <Newsletter />
        <CommunitySection />
      </div>
    </div>
  );
};

export default page;
