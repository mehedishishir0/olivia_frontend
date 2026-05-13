import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react"; // Using Lucide for the leaf icon
import Link from "next/link";

const SuccessModal = () => {
  return (
    <div className="relative min-h-screen w-full flex  items-center justify-center overflow-hidden">
      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-3xl px-6">
        <div className="bg-white rounded-[20px] shadow-2xl p-12 flex flex-col items-center text-center">
          {/* Circular Icon Container */}
          <div className="w-20 h-20 bg-[#062d29] rounded-full flex items-center justify-center mb-8 shadow-lg">
            <Leaf className="text-white w-10 h-10 fill-current" />
          </div>

          {/* Heading */}
          <h1 className="text-[#004242] text-3xl md:text-[48px]  tracking-tight mb-4 flex items-center gap-2">
            YOU&apos;RE ALL SET 🚀
          </h1>

          {/* Description */}
          <p className="text-[#404848] text-sm md:text-base leading-relaxed mb-10 max-w-[440px]">
            Your personalized experience is ready. We&apos;ve curated the most
            impactful climate actions just for you.
          </p>

          {/* Action Button */}
          <Link href={"/membership-pricing"}>
            <Button
              variant="outline"
              className="border-2 border-[#004242] text-[#004242] text-[16px] font-extrabold  px-8 py-6 rounded-md hover:bg-[#062d29] hover:text-white transition-all duration-300"
            >
              View Membership Options
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
