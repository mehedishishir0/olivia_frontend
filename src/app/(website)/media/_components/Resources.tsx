"use client";

import React from "react";
import { Play, Headphones, ArrowRight, FileText } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

// ---------------- TYPES ----------------

interface MediaItem {
  _id: string;
  title: string;
  mediaType: "url" | "audio" | "files";
  category: string;
  description: string;
  contentUrl: string;
  thumbnailImage: string;
  createdAt?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: MediaItem[];
}

const MEDIA_CATEGORIES = [
  "All",
  "Videos",
  "Event Recordings",
  "Expert Interviews",
  "Insights",
  "Community",
] as const;

// ---------------- API FETCH ----------------

const fetchMedia = async (category?: string): Promise<MediaItem[]> => {
  const params = new URLSearchParams();

  if (category && category !== "All") {
    params.set("category", category);
  }

  const queryString = params.toString();
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/media/get-media${
    queryString ? `?${queryString}` : ""
  }`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch media");
  }

  const data: ApiResponse = await res.json();
  return data.data;
};

// ---------------- FILTER BAR ----------------

const FilterBar = ({
  categories,
  activeCategory,
  onCategoryChange,
}: {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
            activeCategory === cat
              ? "bg-[#00473e] text-white border-[#00473e]"
              : "bg-white text-[#00473e] border-gray-100 shadow-sm hover:shadow-md"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

// ---------------- RESOURCE CARD ----------------

const ResourceCard = ({ resource }: { resource: MediaItem }) => {
  return (
    <div className="bg-[#eff4f7] rounded-[2.5rem] p-5 flex flex-col h-full border border-white shadow-sm">
      {/* Image */}
      <div className="relative aspect-[16/10] w-full rounded-[1.8rem] overflow-hidden mb-6 group">
        <Image
          src={resource.thumbnailImage}
          alt={resource.title}
          width={500}
          height={300}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-[#00473e]/80 p-3 rounded-full text-white backdrop-blur-sm border border-white/20">
            {resource.mediaType === "url" ? (
              <Play size={24} fill="currentColor" />
            ) : resource.mediaType === "audio" ? (
              <Headphones size={24} />
            ) : (
              <FileText size={24} />
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-1">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#00473e] text-white text-[10px] font-bold uppercase tracking-wider mb-4">
          {resource.mediaType === "url"
            ? "Video"
            : resource.mediaType === "audio"
              ? "Audio"
              : "File"}
        </span>

        <h3 className="text-[#00473e] text-xl font-extrabold leading-[1.2] mb-3 line-clamp-2">
          {resource.title}
        </h3>

        <p
          className="text-slate-500 text-[13px] leading-relaxed mb-6 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html:
              resource.description.slice(0, 200) +
              (resource.description.length > 200 ? "..." : ""),
          }}
        />
      </div>

      {/* Link */}
      <div className="pt-4 border-t border-slate-200 mt-auto">
        <Link
          href={"/media/" + resource._id}
          target="_blank"
          className="flex items-center text-[#00473e] font-bold text-sm group"
        >
          Open Media
          <ArrowRight
            size={16}
            className="ml-2 transition-transform group-hover:translate-x-1"
            strokeWidth={3}
          />
        </Link>
      </div>
    </div>
  );
};

// ---------------- MAIN PAGE ----------------

export default function ResourceGridPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const { data, isLoading, error } = useQuery({
    queryKey: ["media-posts", selectedCategory],
    queryFn: () => fetchMedia(selectedCategory),
  });

  if (isLoading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading media...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">Failed to load media</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-20 px-4 sm:px-8">
      <div className="container mx-auto">
        <FilterBar
          categories={[...MEDIA_CATEGORIES]}
          activeCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {data?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((item) => (
              <ResourceCard key={item._id} resource={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[#00473e]/20 bg-white px-6 py-16 text-center">
            <h3 className="text-2xl font-bold text-[#00473e]">Not Found</h3>
            <p className="mt-3 text-sm text-slate-500">
              {selectedCategory === "All"
                ? "No media available right now."
                : `No media found in the ${selectedCategory} category.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
