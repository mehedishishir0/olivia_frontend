/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  MapPin,
  Briefcase,
  Calendar,
  Building2,
  ExternalLink,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

import { toast } from "sonner"; // ba tumi nizer moto notification use koro
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface JobData {
  _id: string;
  userId: string;
  title: string;
  category: string;
  jobType: string;
  location: string;
  description: string;
  responsibility: string;
  requirement: string;
  skill: string;
  applyUrl: string;
  companyName: string;
  companyURL: string;
  companyLogo?: {
    url: string;
    public_id?: string;
  };
  status: string;
  media: {
    images: {
      url: string;
      public_id?: string;
      _id?: string;
    }[];
    videos: {
      url: string;
      public_id?: string;
      _id?: string;
    }[];
  };
  deathLine: string;
  postedDate: string;
  hiredCount: number;
  totalHiredCount: number;
  salary?: {
    min: number;
    max: number;
    currency: string;
    period: string;
  };
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const JobDetails = () => {
  const { id } = useParams();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const session = useSession();
  const token = session?.data?.user?.accessToken;

  // 1. Fetch Job Details
  const { data, isLoading, error } = useQuery<{ data: JobData }>({
    queryKey: ["job-single", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/single/${id}`,
      );
      if (!res.ok) throw new Error("Failed to fetch job details");
      return res.json();
    },
  });

  // 2. Apply Job Mutation (Postman onujayi)
  const { mutate: submitApplication, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/apply-job/apply`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to apply");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Applied successfully!");
      // setIsModalOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  // const handleApplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   const formData = new FormData(form);

  //   // Postman-e 'jobId' field-ti proyojon chilo
  //   formData.append("jobId", id as string);

  //   submitApplication(formData);
  // };

  if (isLoading) return <JobDetailsSkeleton />;
  if (error || !data)
    return (
      <div className="text-center py-20 text-red-500 ">
        Error loading job details.
      </div>
    );

  const job = data.data;

  const heroImage =
    job.media?.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2000&auto=format&fit=crop";

  const formatDate = (date?: string) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatSalary = (salary?: JobData["salary"]) => {
    if (!salary) return "Salary not specified";

    const formatter = new Intl.NumberFormat("en-US");
    return `${salary.currency} ${formatter.format(salary.min)} - ${formatter.format(salary.max)} / ${salary.period}`;
  };

  const formatHiringCount = () => {
    if (job.totalHiredCount) {
      return `${job.hiredCount || 0} of ${job.totalHiredCount} candidates`;
    }

    return `${job.hiredCount || 0} candidates`;
  };

  return (
    <div className="min-h-screen pb-20 mt-20">
      {/* Hero Header Section */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden container bg-[#eef4f5] rounded-b-4xl">
        <Image
          src={heroImage}
          alt={job.title}
          fill
          priority
          className="object-cover brightness-75 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-6">
          <div className="flex gap-3 mb-4">
            <Badge className="bg-[#004D4D] text-white border-none px-4 py-1.5 rounded-lg uppercase text-[10px] tracking-wider">
              {job.category}
            </Badge>
            <Badge className="bg-white text-slate-800 border-none px-4 py-1.5 rounded-lg shadow-md text-[10px] tracking-wider">
              POSTED {formatDate(job.postedDate)}
            </Badge>
            <Badge className="bg-white text-slate-800 border-none px-4 py-1.5 rounded-lg shadow-md text-[10px] tracking-wider">
              DEADLINE {formatDate(job.deathLine)}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container !mt-8 relative z-10">
        <div className="mb-10">
          <p className="text-[#004D4D] text-sm mb-2 flex items-center gap-2 ">
            {job.companyName} • {job.location}
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#004D4D] tracking-tight">
            {job.title}
          </h1>
          <div className="flex flex-wrap gap-3 mt-5">
            <Badge className="bg-slate-50 text-slate-700 border border-slate-100 px-4 py-1.5 rounded-lg capitalize">
              {job.status}
            </Badge>
            <Badge className="bg-slate-50 text-slate-700 border border-slate-100 px-4 py-1.5 rounded-lg">
              {formatSalary(job.salary)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-xl text-[#004D4D] mb-4 ">Job Description</h2>
              <div
                className="text-slate-600 leading-relaxed prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />

              <h2 className="text-xl text-[#004D4D] mt-8 mb-4 ">
                Responsibilities
              </h2>
              <div
                className="text-slate-600 leading-relaxed prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: job.responsibility }}
              />

              <h2 className="text-xl text-[#004D4D] mt-8 mb-4 ">
                Requirements
              </h2>
              <div
                className="text-slate-600 leading-relaxed prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: job.requirement }}
              />

              <h2 className="text-xl text-[#004D4D] mt-8 mb-4 ">Core Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skill.split(",").map((s, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="bg-slate-50 text-slate-600 px-4 py-1.5 rounded-lg border border-slate-100 text-[11px] uppercase tracking-wide "
                  >
                    {s.trim()}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Company Section */}
            <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-xl text-[#004D4D] mb-6 ">
                Company Information
              </h2>
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-100 p-2 bg-white flex items-center justify-center shrink-0 shadow-inner">
                  <Image
                    src={job?.companyLogo?.url || "/placeholder.png"}
                    alt={job?.companyName || "Logo"}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-black mb-1">
                    Company Name
                  </p>
                  <h3 className="text-xl text-[#004D4D] ">
                    {job?.companyName}
                  </h3>
                  <div className="mt-3 space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                      Website
                    </p>
                    <a
                      href={
                        job?.companyURL?.startsWith("http")
                          ? job?.companyURL
                          : `https://${job.companyURL}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 text-sm flex items-center gap-1 hover:underline underline-offset-4 "
                    >
                      {job?.companyURL?.replace(/(^\w+:|^)\/\//, "")}{" "}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Summary */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm sticky top-24">
              <h2 className="text-xl text-[#004D4D] mb-6 ">Job Summary</h2>
              <div className="space-y-6">
                <SummaryItem
                  icon={<Building2 />}
                  label="Company"
                  value={job?.companyName}
                />
                <SummaryItem
                  icon={<MapPin />}
                  label="Location"
                  value={job?.location}
                />
                <SummaryItem
                  icon={<Briefcase />}
                  label="Job Type"
                  value={job?.jobType}
                />
                <SummaryItem
                  icon={<CheckCircle2 />}
                  label="Status"
                  value={job?.status || "N/A"}
                />
                <SummaryItem
                  icon={<Clock />}
                  label="Category"
                  value={job?.category}
                />
                <SummaryItem
                  icon={<DollarSign />}
                  label="Salary"
                  value={formatSalary(job?.salary)}
                />
                <SummaryItem
                  icon={<Calendar />}
                  label="Deadline"
                  value={formatDate(job?.deathLine)}
                />
                <SummaryItem
                  icon={<Calendar />}
                  label="Date Posted"
                  value={formatDate(job?.postedDate)}
                />
                <SummaryItem
                  icon={<Users />}
                  label="Hiring"
                  value={formatHiringCount()}
                />
                <SummaryItem
                  icon={<Clock />}
                  label="Last Updated"
                  value={formatDate(job?.updatedAt)}
                />
              </div>

              {/* Apply Modal Integration */}
              <Link href={job?.applyUrl} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-[#004D4D] hover:bg-[#003D3D] text-white py-6 rounded-xl mt-8 shadow-md  transition-all active:scale-95">
                  Apply Now
                </Button> 
              </Link>
              {/* <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-[#004D4D] hover:bg-[#003D3D] text-white py-6 rounded-xl mt-8 shadow-md  transition-all active:scale-95">
                    Apply Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl  text-[#004D4D]">
                      Apply for {job.title}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleApplySubmit} className="space-y-5 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="coverLetter" className="">
                        Cover Letter
                      </Label>
                      <Textarea
                        id="coverLetter"
                        name="coverLetter"
                        placeholder="I have 3 years of experience in..."
                        required
                        className="min-h-[120px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="portfolioUrl" className="">
                        Portfolio URL
                      </Label>
                      <Input
                        id="portfolioUrl"
                        name="portfolioUrl"
                        type="url"
                        placeholder="https://myportfolio.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedinUrl" className="">
                        LinkedIn URL
                      </Label>
                      <Input
                        id="linkedinUrl"
                        name="linkedinUrl"
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="file" className="">
                        Resume / CV (File)
                      </Label>
                      <Input
                        id="file"
                        name="file"
                        type="file"
                        required
                        className="cursor-pointer"
                      />
                    </div>
                    <Button
                      disabled={isPending}
                      type="submit"
                      className="w-full bg-[#004D4D] hover:bg-[#003D3D] text-white py-6 rounded-xl  shadow-lg"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-4">
    <div className="p-2.5 bg-slate-50 rounded-xl text-[#004D4D] border border-slate-100 shrink-0 shadow-sm">
      {React.cloneElement(icon as React.ReactElement, { size: 18 } as any)}
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-black mb-0.5">
        {label}
      </p>
      <p className="text-sm text-slate-700 capitalize ">{value}</p>
    </div>
  </div>
);

const JobDetailsSkeleton = () => (
  <div className="container py-20 space-y-10 animate-pulse mt-20">
    <Skeleton className="h-[400px] w-full rounded-3xl bg-slate-200" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Skeleton className="h-40 w-full rounded-2xl bg-slate-100" />
        <Skeleton className="h-60 w-full rounded-2xl bg-slate-100" />
      </div>
      <Skeleton className="h-[500px] w-full rounded-2xl bg-slate-100" />
    </div>
  </div>
);

export default JobDetails;
