import React from "react";
import Image from "next/image";
import {
  Mail,
  Briefcase,
  Users,
  Heart,
  Mic,
  Search,
  Share2,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const ActOnClimateSponsorship = () => {
  return (
    <div className="">
      <div className="container mx-auto px-6 py-12  space-y-24 font-sans text-[#0d2e2a]">
        {/* SECTION 1: SPONSOR ACT ON CLIMATE */}
        <section className="grid grid-cols-1 gap-10  lg:grid-cols-2 ">
          <div className="space-y-7 ">
            <span className="inline-block  hero-font px-3 py-1 text-[18px] font-semibold bg-[#eef2f1] text-[#004242] rounded-full border border-[#5D8AA880]">
              Partnership Opportunities
            </span>
            <h1 className="text-5xl text-[#004242] leading-15 ">
              Sponsor <br /> Act on Climate
            </h1>
            <p className="text-[#5D8AA8] leading-relaxed ">
              Interested in elevating your environmental and social impact while
              enhancing the quality and reach of our programming? Partner with
              Act on Climate as a sponsor.
            </p>
            <p className="text-[#5D8AA8] text-sm leading-relaxed ">
              Your investment directly supports individuals exploring and
              pursuing green career pathways, while empowering the next
              generation of climate leaders to create meaningful change.
            </p>

            <div className="bg-[#EEF4F5] p-4 rounded-xl flex items-center gap-4 ">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Mail className="w-5 h-5 text-[#0d2e2a]" />
              </div>
              <div>
                <p className="text-[18px] hero-font  text-[#004242]">
                  Connect with us to explore opportunities
                </p>
                <p className="text-sm text-[#5D8AA8]">info@actonclimate.net</p>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href={
                  "https://drive.google.com/file/d/11aAkaJBkWPuuh0vq8vzDHKL1moiJFbZQ/view?usp=sharing"
                }
                target="_blank"
              >
                <Button className="bg-[#04312d] hover:bg-[#06423d] text-white px-8 py-6 rounded-md w-full ">
                  Contact Sponsorship Team
                </Button>
              </Link>
              <p className="text-[10px] mt-4 text-center  text-gray-500 uppercase tracking-widest">
                Learn more about our sponsorship opportunities here &rsaquo;
              </p>
            </div>
          </div>

          <div className="  border border-[#E3ECEC] p-3 bg-[#FFFFFF] w-full rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/helpourwork.jpg" // Replace with your forest asset
              alt="Misty Forest"
              width={900}
              height={900}
              className="object-cover rounded-xl w-full h-full"
            />
          </div>
        </section>

        {/* THREE CARDS SUB-SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Briefcase,
              title: "Support Green Careers",
              desc: "Directly fund pathways for professionals entering the sustainable economy.",
            },
            {
              icon: Users,
              title: "Empower Leadership",
              desc: "Help cultivate the next generation of diverse and capable climate leaders.",
            },
            {
              icon: Heart,
              title: "Expand Education",
              desc: "Increase access to critical climate education resources for underserved communities.",
            },
          ].map((item, i) => (
            <Card
              key={i}
              className=" shadow-sm bg-[#fafcfc] border border-[#E3ECEC] p-6 rounded-2xl"
            >
              <div className="bg-[#E8F4F4] w-10 h-10 flex items-center justify-center rounded-full shadow-sm mb-4">
                <item.icon className="w-5 h-5 text-[#0d2e2a]" />
              </div>
              <h3 className=" text-[#004242] hero-font text-[24px] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[#5D8AA8] leading-relaxed">
                {item.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
      {/* SECTION 2: PARTNER WITH US */}
      <div className=" bg-[#EEF4F5] py-[100px]">
        <section className="grid grid-cols-1 container  lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-[64px] text-[#004242] leading-tight">
                Partner With Us
              </h2>
              <p className="text-[18px] text-[#5D8AA8] leading-relaxed ">
                At Act on Climate, collaboration is foundational to our work.
                Our programs and initiatives are strengthened by partnerships
                with organizations and community leaders who are equally
                committed to advancing local climate solutions.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className=" text-[32px] hero-font text-[#367588] leading-snug">
                We welcome opportunities to collaborate in the <br /> following
                areas:
              </h3>
              <ul className="space-y-5">
                {[
                  {
                    icon: Mic,
                    text: "Speaking engagements for workshops, panels, classrooms, and community events",
                  },
                  {
                    icon: Search,
                    text: "Collaborative research and resource development focused on community-based climate action",
                  },
                  {
                    icon: Share2,
                    text: "Cross-promotional initiatives to amplify campaigns, events, and educational materials",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="mt-1 bg-white p-1 rounded-full border border-slate-100 shadow-sm">
                      <item.icon className="w-3.5 h-3.5 text-[#04312d]" />
                    </div>
                    <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* PLANNING GUIDELINES BOX - Updated to match image style */}
            <div className="bg-[#FFFFFF] border border-[#E3ECEC] border-l-[3px] border-l-[#04312d] rounded-2xl p-7 shadow-sm space-y-4 ">
              <div className="flex items-center gap-2 font-bold text-[#04312d] text-sm">
                <ClipboardList className="w-5 h-5" color="#367588" />
                <span className="text-[#004242] text-[20px] ">
                  Planning Guidelines
                </span>
              </div>
              <p className="text-[16px] font-bold text-[#004242]  tracking-wide">
                To ensure we can thoughtfully support your request:
              </p>
              <ul className="text-[12px] space-y-2.5 list-disc pl-5 text-[#5D8AA8]">
                <li>
                  Please provide a minimum of{" "}
                  <span className="font-bold text-[#004242]">
                    2 Weeks&apos; Notice
                  </span>{" "}
                  for marketing and speaking engagements.
                </li>
                <li>
                  Please provide a minimum of{" "}
                  <span className="font-bold text-[#004242]">
                    1 Months&apos; Notice
                  </span>{" "}
                  for event partnerships, research collaborations, and resource
                  development.
                </li>
              </ul>
              <p className="text-[14px] text-[#5D8AA8] italic leading-relaxed pt-1">
                Advance planning enables us to allocate appropriate staff and
                volunteer capacity and to build meaningful, well-coordinated
                partnerships.
              </p>
            </div>

            <div className="pt-2 space-y-5">
              <p className="text-[18px] font-medium text-[#004242]">
                We look forward to exploring how we can work together to
                strengthen climate <br /> action across our community.
              </p>
              {/* <div className="flex flex-wrap items-center gap-4">
                <Button className="bg-[#004242] hover:bg-[#06423d] text-white px-8 py-6 rounded-lg text-sm font-bold shadow-md">
                  Submit an Inquiry
                </Button>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="w-5 h-5 flex items-center justify-center border border-slate-300 rounded-full text-[10px]">
                    ?
                  </span>
                  <span>We typically respond within 3-5 business days.</span>
                </div>
              </div> */}
            </div>
          </div>

          {/* Right Column: Image with Overlay */}
          <div className="relative h-full w-full rounded-[40px] overflow-hidden shadow-2xl">
            <Image
              src="/helpourworkcta.jpg"
              alt="Partnership Meeting"
              fill
              className="object-cover"
            />

            {/* Active Partners Card Overlay - Precise Styling */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl flex items-center gap-5 shadow-xl border border-white/20">
              <div className="flex -space-x-3">
                {[
                  "https://randomuser.me/api/portraits/men/32.jpg",
                  "https://randomuser.me/api/portraits/women/44.jpg",
                  "https://randomuser.me/api/portraits/men/75.jpg",
                ].map((img, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative shadow-sm"
                  >
                    <Image
                      src={img}
                      alt="Partner"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}

                <div className="w-10 h-10 rounded-full border-2 border-white  text-[10px] text-[#004242] flex items-center justify-center font-bold shadow-sm z-10">
                  +120
                </div>
              </div>

              <div className="space-y-0.5">
                <p className="text-[14px] font-bold text-[#04312d]">
                  Active Partners
                </p>
                <p className="text-[11px] text-slate-500 italic leading-snug">
                  &quot;Together, we are building a resilient and sustainable
                  future <br /> for our community.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ActOnClimateSponsorship;
