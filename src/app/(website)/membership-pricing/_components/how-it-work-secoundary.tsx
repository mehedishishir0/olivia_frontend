import React from "react";
import { UserPlus, Search, Rocket } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    title: "Sign Up",
    description:
      "Create your account and choose a membership tier that fits your needs.",
    icon: <UserPlus className="w-6 h-6 text-slate-700" />,
  },
  {
    title: "Explore",
    description:
      "Browse resources, join networks, and participate in global events.",
    icon: <Search className="w-6 h-6 text-slate-700" />,
  },
  {
    title: "Grow",
    description:
      "Browse resources, join networks, and participate in global events.",
    icon: <Rocket className="w-6 h-6 text-slate-700" />,
  },
];

const HowItWorksSecondary = () => {
  return (
    <section className="bg-[#EDF5F4] py-20">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#064E4B] mb-4">
            How It Works
          </h2>
          <p className="text-lg text-[#528B8A] max-w-2xl mx-auto">
            Start your climate journey in three simple steps. No complications,
            just action.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-12 bg-white rounded-[40px] shadow-sm border border-white hover:shadow-md transition-all duration-300"
            >
              {/* Icon Circle */}
              <div className="w-20 h-20 bg-[#E8F0F0] rounded-full flex items-center justify-center mb-8">
                <div className="bg-white p-4 rounded-full shadow-sm">
                  {step.icon}
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-2xl text-[#064E4B] mb-4">{step.title}</h3>
              <p className="text-[#528B8A] leading-relaxed text-sm max-w-[240px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSecondary;
