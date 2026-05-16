"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface PricingPlan {
  currency: string;
  _id: string;
  title: string;
  description: string;
  price: number;
  billingType: string;
  features: string[];
  hasTrial: boolean;
  trialDays: number;
  isHighlighted: boolean;
  status: string;
  order: number;
  accessLevels: {
    blogAndPodcast: string;
    mightyNetworks: string;
    aiChatbot: string;
    events: string;
    courses: string;
    careerServices: string;
    mentorship: string;
  };
  discounts: {
    aiChatbot: number;
    events: number;
    courses: number;
    careerServices: number;
  };
}

const ComparePlans = () => {
  const { data: plans, isLoading } = useQuery({
    queryKey: ["compare-plans"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/subscription`,
      );
      const data = await res.json();
      return data;
    },
  });

  const subscriptionPlans = plans?.data || [];

  // Define feature mapping based on access levels and discounts
  const getFeatureValue = (plan: PricingPlan, featureType: string): string => {
    switch (featureType) {
      case "Community Access":
        return plan.accessLevels?.mightyNetworks === "limited"
          ? "Limited"
          : plan.accessLevels?.mightyNetworks === "paid"
            ? "Full"
            : "Basic";

      case "Resources":
        return plan.title === "Intermediate"
          ? "Standard"
          : plan.title === "Pro" || plan.title === "Enterprise"
            ? "Premium"
            : "Basic";

      case "Events":
        if (plan.discounts?.events === 100) return "Free";
        if (plan.discounts?.events === 10) return "10% Off";
        if (plan.discounts?.events === 20) return "20% Off";
        if (plan.discounts?.events === 30) return "30% Off";
        return plan.accessLevels?.events === "paid" ? "Paid" : "Full Price";

      case "Courses":
        if (plan.discounts?.courses === 100) return "Free";
        if (plan.discounts?.courses === 10) return "10% Off";
        if (plan.discounts?.courses === 20) return "20% Off";
        if (plan.discounts?.courses === 30) return "30% Off";
        return plan.accessLevels?.courses === "paid" ? "Paid" : "Full Price";

      case "Career Services":
        if (plan.title === "Enterprise") return "Priority";
        if (plan.discounts?.careerServices === 100) return "Free";
        if (plan.discounts?.careerServices === 10) return "10% Off";
        if (plan.discounts?.careerServices === 20) return "20% Off";
        if (plan.discounts?.careerServices === 30) return "30% Off";
        return plan.accessLevels?.careerServices === "paid"
          ? "Paid"
          : "Full Price";

      case "AI Chatbot":
        if (plan.title === "Enterprise") return "Unlimited";
        if (plan.discounts?.aiChatbot === 100) return "Free";
        if (plan.discounts?.aiChatbot === 10) return "10% Off";
        if (plan.discounts?.aiChatbot === 20) return "20% Off";
        if (plan.discounts?.aiChatbot === 30) return "30% Off";
        return plan.accessLevels?.aiChatbot === "paid" ? "Paid" : "Full Price";

      case "Mentorship":
        return plan.accessLevels?.mentorship === "paid"
          ? "Available"
          : "Not Available";

      default:
        return "-";
    }
  };

  // Define features to compare
  const comparisonFeatures = [
    "Community Access",
    "Resources",
    "Events",
    "Courses",
    "Career Services",
    "AI Chatbot",
    "Mentorship",
  ];

  // Skeleton loading state
  if (isLoading) {
    return (
      <section className="py-20 bg-[#eef4f5]">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mb-10" />
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#F1F5F9]">
                    <th className="p-6 w-1/4">
                      <Skeleton className="h-6 w-20" />
                    </th>
                    <th className="p-6">
                      <Skeleton className="h-6 w-24" />
                    </th>
                    <th className="p-6">
                      <Skeleton className="h-6 w-24" />
                    </th>
                    <th className="p-6">
                      <Skeleton className="h-6 w-24" />
                    </th>
                    <th className="p-6">
                      <Skeleton className="h-6 w-24" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7].map((_, idx) => (
                    <tr key={idx} className="border-b border-[#F1F5F9]">
                      <td className="p-6">
                        <Skeleton className="h-5 w-32" />
                      </td>
                      <td className="p-6">
                        <Skeleton className="h-5 w-20" />
                      </td>
                      <td className="p-6">
                        <Skeleton className="h-5 w-20" />
                      </td>
                      <td className="p-6">
                        <Skeleton className="h-5 w-20" />
                      </td>
                      <td className="p-6">
                        <Skeleton className="h-5 w-20" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const tableData = [
    {
      feature: "Community Access",
      nonMember: "Limited",
      beginner: "Full",
      monthly: "Full",
      yearly: "Full",
    },
    {
      feature: "Resources",
      nonMember: "Basic",
      beginner: "Standard",
      monthly: "Premium",
      yearly: "Premium",
    },
    {
      feature: "Events",
      nonMember: "Paid",
      beginner: "10% Off",
      monthly: "Free",
      yearly: "Free",
      highlight: true,
    },
    {
      feature: "Courses",
      nonMember: "Full Price",
      beginner: "10% Off",
      monthly: "Free",
      yearly: "Included",
      highlight: true,
    },
    {
      feature: "Career Services",
      nonMember: "Full Price",
      beginner: "10% Off",
      monthly: "Free",
      yearly: "Priority",
      highlight: true,
    },
    {
      feature: "AI Chatbot",
      nonMember: "Full Price",
      beginner: "10% Off",
      monthly: "Free",
      yearly: "Unlimited",
      highlight: true,
    },
  ];

  return (
    <section className="container pb-20">
      <div>
        <h1 className="text-5xl text-[#0a3d3d] mb-10 tracking-tight">
          Compare Plans
        </h1>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-bottom border-slate-100">
                <th className="p-6 text-xl font-bold text-[#0a3d3d]">
                  Feature
                </th>
                <th className="p-6 text-xl font-bold text-[#0a3d3d] text-center">
                  Non-Member
                </th>
                <th className="p-6 text-xl font-bold text-[#0a3d3d] text-center">
                  Beginner
                </th>
                <th className="p-6 text-xl font-bold text-[#0a3d3d] text-center">
                  Monthly
                </th>
                <th className="p-6 text-xl font-bold text-[#0a3d3d] text-center">
                  Yearly
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className="border-t border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="p-5 font-medium text-slate-700">
                    {row.feature}
                  </td>
                  <td className="p-5 text-center">{row.nonMember}</td>
                  <td className="p-5 text-center">{row.beginner}</td>
                  <td
                    className={`p-5 text-center ${row.highlight ? "text-emerald-700 font-semibold" : ""}`}
                  >
                    {row.monthly}
                  </td>
                  <td
                    className={`p-5 text-center ${row.highlight ? "text-[#1b4332] font-bold" : ""}`}
                  >
                    {row.yearly}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparePlans;
