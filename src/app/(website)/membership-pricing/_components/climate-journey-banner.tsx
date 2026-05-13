"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const ClimateJourneyBanner = () => {
  return (
    <section
      className="relative h-[550px] w-full flex items-center justify-center text-center px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/cliamte-journey.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Main Heading */}
        <h1 className="text-white text-4xl md:text-5xl hero-font tracking-tight">
          Choose Your Climate Journey
        </h1>

        {/* Subtext */}
        <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Join our community of climate advocates and start making an impact
          today. Access tools, networks, and resources designed for every stage
          of your advocacy.
        </p>

        {/* Reusable Button  */}
        <div className="space-x-5">
          <Link href={`/survey`}>
            <button
              className={`bg-[#004242] hover:bg-[#004444] cursor-pointer text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 shadow-lg`}
            >
              Start Free Trial
            </button>
          </Link>
          <button className="bg-inherit border border-white hover:bg-[#004444] cursor-pointer hover:border-primary font-semibold py-3 px-8 rounded-md transition-all duration-300 shadow-lg text-white">
            Explore Membership Benefits
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClimateJourneyBanner;
