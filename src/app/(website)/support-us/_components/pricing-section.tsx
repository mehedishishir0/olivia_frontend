import React from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const PricingSection = () => {
  const nonMemberFeatures = [
    "One free introductory session",
    "Resume writing support",
    "Cover letter development",
    "Interview preparation",
    "Flexible hourly pricing",
  ];

  const communityFeatures = [
    "Unlimited career coaching sessions",
    "Resume writing support",
    "Cover letter development",
    "Interview preparation",
    "Priority scheduling",
    "Ongoing career guidance",
  ];

  return (
    <section className="bg-[#EDF5F4] py-20 px-6 min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl text-[#064E4B] mb-4">
          Career Services Pricing
        </h2>
        <p className="text-[#528B8A] text-lg">
          Transparent pricing to help you invest in your climate career with
          confidence.
        </p>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 w-full max-w-4xl mb-12">
        {/* Non-Members Card */}
        <div className="bg-white rounded-3xl p-8 flex-1 flex flex-col border border-white shadow-sm">
          <div className="mb-6">
            <h3 className="text-2xl text-[#064E4B]">Non–Members</h3>
            <p className="text-xs text-[#528B8A] font-medium uppercase mt-1">
              Free For First Session
            </p>
            <p className="text-xs text-[#528B8A] mt-4 leading-relaxed">
              Non-members and members who pay for our beginner membership plan
              will have to pay a small fee.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6 flex-grow">
            <ul className="space-y-4">
              {nonMemberFeatures.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-sm text-[#064E4B] font-medium"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#0A5D5A] shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={`https://calendly.com/actonclimate-Info/30min?month=2026-04`}
            target="_blank"
          >
            <button className="w-full mt-10 bg-[#064E4B] text-white py-3 rounded-xl  hover:bg-[#085e5a] transition-colors cursor-pointer">
              Book a Call
            </button>
          </Link>
        </div>

        {/* Community Members Card (Featured) */}
        <div className="bg-[#064E4B] rounded-3xl flex-1 flex flex-col relative overflow-hidden shadow-xl border border-[#064E4B]">
          {/* Best Value Badge */}
          <div className="bg-[#043331] text-white text-center py-2 text-[10px]  uppercase tracking-widest">
            Best Value
          </div>

          <div className="p-8 flex flex-col flex-grow">
            <div className="mb-6">
              <h3 className="text-2xl text-white">Community Members</h3>
              <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                All career services included at{" "}
                <span className=" text-white">No Cost</span>
              </p>
            </div>

            <div className="border-t border-[#ffffff20] pt-6 flex-grow">
              <ul className="space-y-4">
                {communityFeatures.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-sm text-slate-100 font-medium"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#42B0A8] shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Link href={`/survey`}>
              <button className="w-full mt-10 bg-white text-[#064E4B] py-3 rounded-xl  hover:bg-slate-100 transition-colors cursor-pointer">
                Join the Community
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <Link href={"/membership-pricing"}>
        <button className="bg-[#064E4B] text-white px-8 py-3 rounded-lg  text-sm hover:bg-[#085e5a] transition-colors cursor-pointer">
          View Membership Plans
        </button>
      </Link>
    </section>
  );
};

export default PricingSection;
