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

  // Find plans by title
  const beginnerPlan = subscriptionPlans.find(
    (p: PricingPlan) => p.title === "Intermediate",
  );
  const monthlyPlan = subscriptionPlans.find(
    (p: PricingPlan) => p.title === "Pro",
  );
  const yearlyPlan = subscriptionPlans.find(
    (p: PricingPlan) => p.title === "Enterprise",
  );

  // Default values if plans not found
  const plansToShow = {
    beginner: beginnerPlan || subscriptionPlans[0],
    monthly: monthlyPlan || subscriptionPlans[1],
    yearly: yearlyPlan || subscriptionPlans[2],
  };

  return (
    <section className="">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-[#064E4B] mb-10 font-bold">
          Compare Plans
        </h2>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[768px]">
              <thead>
                <tr className="border-b border-[#F1F5F9] bg-gray-50">
                  <th className="p-6 text-lg font-semibold text-[#064E4B] w-1/4">
                    Feature
                  </th>
                  <th className="p-6 text-lg font-semibold text-[#064E4B]">
                    Non-Member
                  </th>
                  <th className="p-6 text-lg font-semibold text-[#064E4B]">
                    {plansToShow.beginner?.title || "Beginner"}
                  </th>
                  <th className="p-6 text-lg font-semibold text-[#064E4B]">
                    {plansToShow.monthly?.title || "Pro"} (Monthly)
                  </th>
                  <th className="p-6 text-lg font-semibold text-[#064E4B]">
                    {plansToShow.yearly?.title || "Enterprise"} (Yearly)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {comparisonFeatures.map((feature, idx) => {
                  // Determine if this row should have highlighted cells
                  const isMonthlyHighlighted =
                    feature === "Events" &&
                    plansToShow.monthly?.discounts?.events === 100;
                  const isYearlyHighlighted =
                    (feature === "Courses" &&
                      plansToShow.yearly?.discounts?.courses === 100) ||
                    (feature === "Career Services" &&
                      plansToShow.yearly?.title === "Enterprise") ||
                    (feature === "AI Chatbot" &&
                      plansToShow.yearly?.title === "Enterprise");

                  return (
                    <tr
                      key={idx}
                      className="hover:bg-[#F8FAFC] transition-colors"
                    >
                      <td className="p-6 text-[#064E4B] font-medium text-sm md:text-base">
                        {feature}
                      </td>

                      {/* Non-Member */}
                      <td className="p-6 text-[#528B8A] text-sm md:text-base">
                        {feature === "Community Access" && "Limited"}
                        {feature === "Resources" && "Basic"}
                        {feature === "Events" && "Paid"}
                        {feature === "Courses" && "Full Price"}
                        {feature === "Career Services" && "Full Price"}
                        {feature === "AI Chatbot" && "Full Price"}
                        {feature === "Mentorship" && "Not Available"}
                      </td>

                      {/* Beginner/Intermediate */}
                      <td className="p-6 text-[#528B8A] text-sm md:text-base">
                        {getFeatureValue(plansToShow.beginner, feature)}
                      </td>

                      {/* Monthly/Pro */}
                      <td
                        className={`p-6 text-sm md:text-base ${
                          isMonthlyHighlighted
                            ? "text-[#064E4B] font-semibold"
                            : "text-[#528B8A]"
                        }`}
                      >
                        {getFeatureValue(plansToShow.monthly, feature)}
                      </td>

                      {/* Yearly/Enterprise */}
                      <td
                        className={`p-6 text-sm md:text-base ${
                          isYearlyHighlighted
                            ? "text-[#064E4B] font-semibold"
                            : "text-[#528B8A]"
                        }`}
                      >
                        {getFeatureValue(plansToShow.yearly, feature)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Summary */}
        {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 text-center border border-[#E2E8F0]">
            <p className="text-sm text-[#528B8A]">Non-Member</p>
            <p className="text-xl font-bold text-[#064E4B]">Free</p>
          </div>

          <div className="bg-white rounded-xl p-4 text-center border border-[#E2E8F0]">
            <p className="text-sm text-[#528B8A]">
              {plansToShow.beginner?.title}
            </p>
            <p className="text-xl font-bold text-[#064E4B]">
              ${plansToShow.beginner?.price}/
              {plansToShow.beginner?.billingType === "monthly" ? "mo" : "yr"}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 text-center border-2 border-[#064E4B] relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#064E4B] text-white text-xs px-3 py-1 rounded-full">
              Most Popular
            </div>
            <p className="text-sm text-[#528B8A]">
              {plansToShow.monthly?.title}
            </p>
            <p className="text-xl font-bold text-[#064E4B]">
              ${plansToShow.monthly?.price}/mo
            </p>
            {plansToShow.monthly?.hasTrial && (
              <p className="text-xs text-green-600 mt-1">
                {plansToShow.monthly?.trialDays}-day free trial
              </p>
            )}
          </div>

          <div className="bg-white rounded-xl p-4 text-center border border-[#E2E8F0]">
            <p className="text-sm text-[#528B8A]">
              {plansToShow.yearly?.title}
            </p>
            <p className="text-xl font-bold text-[#064E4B]">
              ${plansToShow.yearly?.price}/
              {plansToShow.yearly?.billingType === "yearly" ? "yr" : "mo"}
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default ComparePlans;
