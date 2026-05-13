import React from "react";
import { User, Mail, Rocket } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Tell Us What You Need",
    description:
      "Fill out our quick form and tell us where you'd like support whether it's polishing your resume, crafting a standout cover letter, or anything in between.",
    icon: <User className="w-6 h-6 text-slate-700" />,
  },
  {
    id: 2,
    title: "We Reach Out",
    description:
      "Once you submit, a member of the Act on Climate team will review your application and reach out by email to learn more about your goals and how we can best support you.",
    icon: <Mail className="w-6 h-6 text-slate-700" />,
  },
  {
    id: 3,
    title: "Start Building Your Path",
    description:
      "After that, you're all set to connect with us and start building your path forward. We can't wait to be part of your career journey!",
    icon: <Rocket className="w-6 h-6 text-slate-700" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white">
      <div className=" mx-auto container">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#0A3D3B] mb-4">
            How It Works
          </h2>
          <p className="text-lg text-[#528B8A] max-w-2xl mx-auto">
            Start your climate journey in three simple steps. No complications,
            just action.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center p-10 bg-white rounded-[32px] border border-[#E8F3F2] shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 bg-[#F1F7F6] rounded-full flex items-center justify-center mb-8">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  {step.icon}
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-2xl text-[#0A3D3B] mb-4">{step.title}</h3>
              <p className="text-[#528B8A] leading-relaxed text-sm md:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
