import React from "react";
import { Briefcase, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const CareerServicesTiers = () => {
  const highlights = [
    "Professional Resume Reviews",
    "Mock Interviews & Prep",
    "Personalized Job Search Strategy",
  ];

  const pricingRows = [
    { label: "First session", value: "Free for everyone", isBadge: true },
    { label: "Non-members", value: "$20–$50", unit: "CAD / per hour" },
    { label: "Beginner Members", value: "10% discount" },
  ];

  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Content */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-[#064E4B]">
            <Briefcase className="w-6 h-6" />
            <h2 className="text-2xl">Career Services</h2>
          </div>

          <p className="text-[#528B8A] leading-relaxed max-w-lg">
            We&apos;re here to support your climate career journey. From resume
            reviews and interview preparation to job search strategy and career
            development, we&apos;ll help you navigate the climate job market
            with confidence.
          </p>

          <ul className="space-y-4">
            {highlights.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-[#064E4B] "
              >
                <CheckCircle2 className="w-5 h-5 text-[#42B0A8]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Pricing Card */}
        <div className="bg-[#F0F7F7] rounded-[32px] p-8 md:p-12">
          <h3 className="text-2xl text-[#064E4B] mb-8">Pricing & Discounts</h3>

          <div className="space-y-4">
            {pricingRows.map((row, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 flex justify-between items-center shadow-sm"
              >
                <span className=" text-[#064E4B] text-sm md:text-base">
                  {row.label}
                </span>

                {row.isBadge ? (
                  <span className="bg-[#E0F2F1] text-[#064E4B] px-4 py-1 rounded-full text-xs ">
                    {row.value}
                  </span>
                ) : (
                  <div className="text-right">
                    <span className=" text-[#064E4B]">{row.value}</span>
                    {row.unit && (
                      <span className="text-[10px] text-[#94A3B8] ml-1 uppercase">
                        {row.unit}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Featured Dark Row */}
            <div className="bg-[#064E4B] rounded-xl p-5 flex justify-between items-center text-white">
              <span className=" text-sm">Monthly & Annual Members</span>
              <span className="text-xs font-medium">
                Free access to all career services
              </span>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link href={"/survey"}>
              <button className="bg-[#064E4B] text-white px-10 py-3 rounded-xl  hover:bg-[#043331] transition-colors">
                Join Community
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerServicesTiers;
