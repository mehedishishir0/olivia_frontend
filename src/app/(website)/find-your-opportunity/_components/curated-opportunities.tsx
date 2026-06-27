"use client";

import React, {
  useState,
  useDeferredValue,
  useEffect,
  useTransition,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Standard Interfaces
interface Job {
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

interface JobApiResponse {
  success: boolean;
  data: Job[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

const JobCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm p-2">
    <Skeleton className="aspect-[16/10] w-full rounded-xl" />
    <div className="p-4 space-y-3">
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  </div>
);

const CuratedOpportunities = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDeferredValue(searchTerm);
  const [, startTransition] = useTransition();

  // ✅ Static Categories (ONLY CHANGE)
  const dynamicCategories = [
    "All",
    "Fellowships",
    "Events",
    "Resources",
    "Courses",
    "Grants & Fundraising",
  ];

  // Main Query for Paginated & Filtered Data
  const { data, isLoading } = useQuery<JobApiResponse>({
    queryKey: ["jobs", currentPage, selectedCategory, debouncedSearch],
    queryFn: async () => {
      const categoryParam =
        selectedCategory !== "All"
          ? `&category=${encodeURIComponent(selectedCategory)}`
          : "";
      const searchParam = debouncedSearch
        ? `&search=${encodeURIComponent(debouncedSearch)}`
        : "";

      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/all?page=${currentPage}&limit=6${categoryParam}${searchParam}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      return res.json();
    },
  });

  const jobs = data?.data || [];
  const totalPages = data?.meta?.totalPage || 1;

  // Reset to page 1 on filter change
  useEffect(() => {
    startTransition(() => {
      setCurrentPage(1);
    });
  }, [selectedCategory, debouncedSearch]);

  // UI Helper for Level Colors (matching image_33f602.jpg)
  const getBadgeStyles = (category: string) => {
    if (category.toLowerCase().includes("software"))
      return "bg-blue-50 text-blue-600";
    if (category.toLowerCase().includes("design"))
      return "bg-purple-50 text-purple-600";
    return "bg-emerald-50 text-emerald-600";
  };

  const formatDate = (date?: string) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatSalary = (salary?: Job["salary"]) => {
    if (!salary) return "Salary not specified";

    const formatter = new Intl.NumberFormat("en-US");
    return `${salary.currency} ${formatter.format(salary.min)} - ${formatter.format(salary.max)} / ${salary.period}`;
  };

  return (
    <section id="curated-opportunities">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl  text-[#004D4D] mb-3">
            Curated Opportunities, Updated in Real Time
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
            Externally sourced and AI-suggested climate opportunities based on
            relevance and current demand.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* Dynamic Category Chips */}
          <div className="flex gap-5 overflow-x-auto max-w-full scrollbar-hide">
            {dynamicCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-lg text-sm  transition-all whitespace-nowrap shadow-5xl cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#004D4D] text-white shadow-md"
                    : "text-slate-500 hover:bg-slate-50 bg-[#eef4f5]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search opportunities..."
              className="pl-10 h-12 bg-white border-slate-200 rounded-xl focus:ring-[#004D4D] shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group p-2 flex flex-col h-full"
              >
                {/* Thumbnail Area */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                  <Image
                    src={job.media?.images?.[0]?.url || "/placeholder.png"}
                    alt={job.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/95 text-slate-800 border-none  text-[9px] tracking-widest px-2 py-1 shadow-sm">
                      {job.category.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge
                      variant="secondary"
                      className={`${getBadgeStyles(job.category)} border-none px-3 py-1 text-[11px]  rounded-md`}
                    >
                      {job.jobType || "Full-time"}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={`border-none px-3 py-1 text-[11px] font-medium rounded-full
    ${
      job.status?.toLowerCase() === "open"
        ? "bg-emerald-100 text-emerald-700"
        : job.status?.toLowerCase() === "closed"
          ? "bg-red-100 text-red-700"
          : job.status?.toLowerCase() === "filled"
            ? "bg-blue-100 text-blue-700"
            : "bg-slate-100 text-slate-700"
    }`}
                    >
                      {job.status}
                    </Badge>
                  </div>

                  <h3 className="text-xl  text-[#004D4D] mb-3 line-clamp-1">
                    {job.title}
                  </h3>

                  <div className="space-y-1 mb-4 text-[12px] text-slate-500">
                    <p className="line-clamp-1">
                      {job.companyName} • {job.location}
                    </p>
                    <p className="line-clamp-1">{formatSalary(job.salary)}</p>
                    <p className="line-clamp-1">
                      Deadline {formatDate(job.deathLine)} • Posted{" "}
                      {formatDate(job.postedDate)}
                    </p>
                    <p className="line-clamp-1">
                      Hiring {job.hiredCount || 0}
                      {job.totalHiredCount
                        ? ` of ${job.totalHiredCount}`
                        : ""}{" "}
                      candidates
                    </p>
                  </div>

                  <p
                    className="text-slate-500 text-[13px] leading-relaxed line-clamp-3 mb-6 flex-grow"
                    dangerouslySetInnerHTML={{
                      __html:
                        job.description ||
                        "Building future-proof solutions for the climate ecosystem through modern technology.",
                    }}
                  />
                  <Link
                    href={`/find-your-opportunity/${job._id}`}
                    className="mt-auto"
                  >
                    <Button className="w-full bg-[#004D4D] hover:bg-[#003D3D] text-white py-6 rounded-xl  transition-all shadow-sm">
                      Explore Opportunity
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <Search className="mx-auto w-12 h-12 text-slate-200 mb-4" />
              <p className="text-slate-500 ">
                No results found for &quot;{searchTerm}&quot;
              </p>
            </div>
          )}
        </div>

        {/* Improved Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center w-[500px] mx-auto">
            <Pagination className="bg-white border border-slate-100 p-1.5 rounded-2xl shadow-sm">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={`cursor-pointer border-none hover:bg-slate-50 ${currentPage === 1 ? "opacity-30 pointer-events-none" : ""}`}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`cursor-pointer border-none rounded-lg  ${
                        currentPage === i + 1
                          ? "bg-[#B4C7C7] text-[#004242]"
                          : "text-slate-400"
                      }`}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    className={`cursor-pointer border-none hover:bg-slate-50 ${currentPage === totalPages ? "opacity-30 pointer-events-none" : ""}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
};

export default CuratedOpportunities;
