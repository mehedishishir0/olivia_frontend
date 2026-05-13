"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LearnMoreSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // logic: Youtube link ba local file source ekhane thakbe
  const videoSource =
    "https://www.youtube.com/embed/NDXrU6abj54?si=54hUGpv395WYil4K"; // Example stream link

  return (
    <section className="bg-[#eff6f6] py-20 px-4 min-h-screen">
      <div className="container max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-[#004D4D] tracking-tight leading-tight">
            Learn More About Our Platform
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Watch this short video to explore how Act on Climate supports your
            climate journey.
          </p>
        </div>

        {/* Video Player Container */}
        <div className="relative w-full max-w-6xl mx-auto p-4 md:p-5 bg-[#004D4D] rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden aspect-[16/10] md:aspect-[16/9]">
          {isPlaying ? (
            // YouTube ba other video embedding
            <iframe
              src={videoSource}
              title="Platform Overview Video"
              className="w-full h-full rounded-2xl md:rounded-3xl border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            // Static Thumbnail EBONG Play Button Overlay
            <>
              {/* Thumbnail Image */}
              <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden">
                <Image
                  src="/thumbnail.png" // Image matching image_10.png content
                  alt="Act on Climate Platform Overview Video Thumbnail"
                  fill
                  className="object-cover brightness-75 transition-all duration-500 hover:scale-105"
                />
              </div>

              {/* Central Dynamic Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  onClick={() => setIsPlaying(true)}
                  className="bg-[#004D4D] text-emerald-400 hover:bg-[#003D3D] transition-all duration-300 w-20 h-20 md:w-28 md:h-28 rounded-full shadow-2xl hover:scale-110 active:scale-95 flex items-center justify-center p-0"
                  size="icon"
                >
                  <Play
                    className="w-8 h-8 md:w-12 md:h-12 text-emerald-400"
                    fill="currentColor"
                  />
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Dynamic Meta Info Text */}
        <div className="text-center mt-8">
          <p className="text-sm uppercase tracking-widest text-[#004D4D] font-black">
            Platform overview · 1 min watch
          </p>
        </div>

        <div className="text-center mt-12">
          <Link href={`/membership-pricing#pricing`}>
            <Button className="h-[48px] font-bold">
              View our Membership Pricing
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LearnMoreSection;
