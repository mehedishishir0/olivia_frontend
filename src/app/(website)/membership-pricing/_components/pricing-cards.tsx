"use client";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface PricingPlan {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration?: string;
  buttonText?: string;
  features: string[];
  isHighlighted?: boolean;
  isDarkButton?: boolean;
  hasTrial?: boolean;
  billingType: string;
  currency?: string;
  link: string;
}

const PricingCards = () => {
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const session = useSession();
  // const token = session?.data?.user?.accessToken;

  const { data: plans, isLoading } = useQuery({
    queryKey: ["subscription-plans"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/subscription`,
      );
      const data = await res.json();
      return data;
    },
  });

  const subscriptionPlans = plans?.data;

  // const handlePurchase = async (planId: string) => {
  //   try {
  //     setLoadingPlanId(planId);

  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/purchase`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           subscriptionPlanId: planId,
  //         }),
  //       },
  //     );

  //     const result = await response.json();

  //     if (result.success && result.data?.checkoutUrl) {
  //       // Redirect to Stripe checkout page
  //       window.location.href = result.data.checkoutUrl;
  //     } else {
  //       console.error("Payment initialization failed:", result.message);
  //       // You can add a toast notification here
  //       toast.error(
  //         result.message || "Something went wrong. Please try again.",
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error during purchase:", error);
  //     toast.error("Failed to initialize payment. Please try again.");
  //   } finally {
  //     setLoadingPlanId(null);
  //   }
  // };

  // Skeleton loading state
  if (isLoading) {
    return (
      <section id="pricing" className="bg-[#eef4f5] py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 flex flex-col border-2 border-transparent"
            >
              <div className="mb-6">
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mt-1" />
              </div>

              <div className="mb-6">
                <Skeleton className="h-10 w-40" />
              </div>

              <Skeleton className="w-full h-12 rounded-lg mb-8" />

              <div className="flex-grow">
                <Skeleton className="h-4 w-24 mb-4" />
                <ul className="space-y-4">
                  {[1, 2, 3, 4].map((_, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Skeleton className="w-4 h-4 rounded-full shrink-0 mt-0.5" />
                      <Skeleton className="h-4 w-full" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="bg-[#eef4f5] py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {subscriptionPlans?.map((plan: PricingPlan, index: number) => (
          <div
            key={plan._id || index}
            className={`relative bg-white rounded-2xl p-8 flex flex-col border-2 transition-all duration-300 ${
              plan.isHighlighted
                ? "border-[#064E4B] scale-105 z-10 shadow-xl"
                : "border-transparent hover:shadow-lg"
            }`}
          >
            {plan.isHighlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#064E4B] text-white text-[10px] uppercase tracking-widest py-1.5 px-4 rounded-full">
                Most Popular
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-2xl text-[#064E4B] mb-2 font-bold">
                {plan.title}
              </h3>
              <p className="text-xs text-[#528B8A] leading-relaxed min-h-[40px]">
                {plan.description}
              </p>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-[#064E4B]">
                ${plan?.price}/
              </span>
              <span className="text-sm text-[#528B8A]">
                {plan?.billingType === "monthly" ? "mo" : "yr"}
              </span>
            </div>

            <Link href={`${plan?.link}`} target="_blank">
              <button
                className={`w-full py-3 rounded-lg cursor-pointer font-semibold text-sm mb-8 transition-all duration-300 ${
                  plan?.hasTrial === true
                    ? "bg-[#064E4B] text-white border-[#064E4B] hover:bg-[#043331] disabled:bg-[#064E4B]/70"
                    : "bg-white text-[#064E4B] border-2 border-[#064E4B] hover:bg-slate-50 disabled:opacity-70 disabled:cursor-not-allowed"
                }`}
              >
                {loadingPlanId === plan._id ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : plan.hasTrial === true ? (
                  "Start Free Trial"
                ) : (
                  "Get Started"
                )}
              </button>
            </Link>

            <div className="flex-grow">
              <p className="text-sm text-[#064E4B] mb-4 font-semibold">
                What you get:
              </p>
              <ul className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs text-[#528B8A] leading-tight"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#064E4B] shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center mt-16 text-xl opacity-75">
        Jump in and enjoy week one for free when joining our membership.
      </p>
    </section>
  );
};

export default PricingCards;
