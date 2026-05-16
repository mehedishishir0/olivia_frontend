"use client";

import React from "react";
import { Target, Zap, Users, Info, ChevronDown, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner"; // Ba tumi jekono toast library use korte paro

// Common style definitions
const FORM_LABEL_STYLE = "text-sm  text-[#004D4D] mb-1.5 block";
const FORM_INPUT_STYLE =
  "w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#003D3D] focus:border-[#003D3D] focus:bg-white transition-all outline-none bg-slate-50";

interface OpportunityFormData {
  title: string;
  organizationName: string;
  opportunityType: string;
  location: string;
  officialLink: string;
  shortDescription: string;
}

export default function ContributeToClimatePage() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OpportunityFormData>();

  // API Mutation logic
  const mutation = useMutation({
    mutationFn: async (formData: OpportunityFormData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/opportunity/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to submit opportunity");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Opportunity submitted successfully for review!");
      reset(); // Form clear kore dibe
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const onSubmit = (data: OpportunityFormData) => {
    if (!token) {
      toast.error("Please login to submit an opportunity");
      return;
    }
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-[#F4F9F9] text-[#003D3D]">
      <main className="container max-w-7xl mx-auto py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start px-4">
        {/* LEFT COLUMN: Value Propositions */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-[#004D4D] tracking-tight leading-tight">
              Contribute to the Climate Ecosystem
            </h1>
            <p className="text-slate-600 max-w-lg leading-relaxed text-[15px]">
              Submit a climate job, fellowship, event, or resource to help
              expand access across the community.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: <Target />,
                title: "Reviewed by Our Team",
                desc: "Every submission is manually reviewed to ensure quality.",
              },
              {
                icon: <Zap />,
                title: "AI-Integrated Matching",
                desc: "Approved submissions are fed into our AI system.",
              },
              {
                icon: <Users />,
                title: "Reach the Right People",
                desc: "Your opportunity reaches thousands of professionals.",
              },
              {
                icon: <Info />,
                title: "Quick Submission",
                desc: "Most submissions take under 3 minutes.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4"
              >
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 shrink-0 mt-1 text-teal-700 w-5 h-5">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h3 className=" text-[15px]">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Submission Form */}
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100">
          <h2 className="text-xl  mb-8 text-[#004D4D]">
            Submit an Opportunity
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label className={FORM_LABEL_STYLE}>Opportunity Title</label>
              <input
                {...register("title", { required: true })}
                placeholder="e.g. Climate Policy Analyst"
                className={FORM_INPUT_STYLE}
              />
            </div>

            {/* Organization */}
            <div>
              <label className={FORM_LABEL_STYLE}>Organization Name</label>
              <input
                {...register("organizationName", { required: true })}
                placeholder="e.g. World Resources Institute"
                className={FORM_INPUT_STYLE}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Type */}
              <div>
                <label className={FORM_LABEL_STYLE}>Opportunity Type</label>
                <div className="relative">
                  <select
                    {...register("opportunityType", { required: true })}
                    className={`${FORM_INPUT_STYLE} appearance-none pr-10`}
                  >
                    <option value="">Select type</option>
                    <option value="Job">Job</option>
                    <option value="Fellowship">Fellowship</option>
                    <option value="Internship">Internship</option>
                    <option value="Resource">Resource</option>
                    <option value="courses">Courses</option>
                    <option value="events">Events</option>
                    <option value="grants">Grants</option>
                    <option value="fundraising">Fundraising</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              {/* Location */}
              <div>
                <label className={FORM_LABEL_STYLE}>Location</label>
                <input
                  {...register("location", { required: true })}
                  placeholder="City, State or Remote"
                  className={FORM_INPUT_STYLE}
                />
              </div>
            </div>

            {/* Link */}
            <div>
              <label className={FORM_LABEL_STYLE}>Official Link</label>
              <input
                {...register("officialLink", { required: true })}
                type="url"
                placeholder="https://example.com/opportunity"
                className={FORM_INPUT_STYLE}
              />
            </div>

            {/* Description */}
            <div>
              <label className={FORM_LABEL_STYLE}>Short Description</label>
              <textarea
                {...register("shortDescription", {
                  required: true,
                  maxLength: 300,
                })}
                rows={4}
                placeholder="Briefly describe the opportunity..."
                className={FORM_INPUT_STYLE}
              ></textarea>
              <p className="text-right text-[11px] text-slate-400 mt-1.5">
                Max 300 characters
              </p>
            </div>

            <button
              disabled={mutation.isPending}
              type="submit"
              className="w-full bg-[#003D3D] text-white py-4 rounded-xl  text-lg hover:bg-[#002D2D] shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                </>
              ) : (
                "Submit Opportunity"
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
