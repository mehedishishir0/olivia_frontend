import React from "react";
import Image from "next/image";
import { BookOpen, Users } from "lucide-react";

const OurMission = () => {
  return (
    <>
      {/* ===== Existing Section (UNCHANGED) ===== */}
      <section className="bg-[#EDF5F4] py-20 px-6">
        <div className="container flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Side: Image Container */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl border-8 border-white">
              <Image
                src="/assist.jpg"
                alt="Team working together"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl text-[#064E4B] mb-6">
                Our Mission
              </h2>
              <p className="text-[#528B8A] text-lg leading-relaxed max-w-xl">
                Act on Climate is a website-based platform for those who are
                interested in learning about climate change, getting into the
                sector, and wanting to take action.
              </p>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              {/* Education */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <BookOpen className="w-5 h-5 text-[#064E4B]" />
                </div>
                <div>
                  <h4 className="text-[#064E4B] text-base">Education</h4>
                  <p className="text-[#528B8A] text-sm mt-1">
                    Accessible resources for everyone.
                  </p>
                </div>
              </div>

              {/* Community */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Users className="w-5 h-5 text-[#064E4B]" />
                </div>
                <div>
                  <h4 className="text-[#064E4B] text-base">Community</h4>
                  <p className="text-[#528B8A] text-sm mt-1">
                    Connecting like-minded changemakers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurMission;
