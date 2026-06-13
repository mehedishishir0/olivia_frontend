"use client";

import Image from "next/image";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  CoursesApiResponse,
  formatCoursePrice,
  getCourseDuration,
  getCourseImageUrl,
  getCourseLessonCount,
  getCourseLevel,
  getCourseLevelColor,
} from "@/lib/course-utils";

const CourseCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col h-full">
    <div className="relative aspect-[16/10] w-full">
      <Skeleton className="w-full h-full" />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center gap-5 mb-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-7 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-6" />
      <Skeleton className="h-11 w-full rounded-lg" />
    </div>
  </div>
);

const ExploreOtherCourses = () => {
  const { id } = useParams();
  const currentCourseId = id as string;

  // Fetch other courses (excluding current course)
  const { data, isLoading, error } = useQuery<CoursesApiResponse>({
    queryKey: ["other-courses", currentCourseId],
    queryFn: async () => {
      // Fetch more courses than needed to ensure we have enough after filtering
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/all?limit=10`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch courses");
      return res.json();
    },
  });

  // Filter out the current course and take first 3
  const otherCourses =
    data?.data
      ?.filter((course) => course._id !== currentCourseId)
      ?.slice(0, 3) || [];

  if (error) {
    return (
      <section>
        <div className="container">
          <div className="text-center py-12">
            <p className="text-red-500">
              Error loading other courses. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section>
        <div className="container">
          {/* Section Header Skeleton */}
          <div className="flex items-center justify-between mb-10">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-36" />
          </div>

          {/* Courses Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <CourseCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (otherCourses.length === 0) {
    return null; // Don't show section if no other courses
  }

  return (
    <section>
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#004242] tracking-tight">
            Explore Other Courses
          </h2>
          <Link href="/courses">
            <Button
              variant="outline"
              className="border-[#004242] text-[#004242] hover:bg-[#004242] hover:text-white rounded-lg px-6"
            >
              View All Courses
            </Button>
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherCourses.map((course) => {
            const level = getCourseLevel(course.lessons);
            const levelColor = getCourseLevelColor(level);
            const formattedPrice = formatCoursePrice(
              course.price,
              course.currency,
            );
            const lessonCount = getCourseLessonCount(course);
            const isFree = !course.price || course.price <= 0;

            return (
              <div
                key={course._id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={getCourseImageUrl(course.image?.url)}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute top-4 left-4 bg-white/95 text-black hover:bg-white border-none px-3 py-1 text-[10px] tracking-widest shadow-sm">
                    {course.category}
                  </Badge>
                  {/* Price Badge */}
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-md text-xs font-bold shadow-sm bg-[#004242] text-white`}
                  >
                    {formattedPrice}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[13px] font-medium px-2 py-0.5 rounded-full ${levelColor}`}
                    >
                      {level}
                    </span>
                    <div className="flex items-center gap-1.5 text-gray-400 text-[13px] font-medium">
                      <Clock size={15} className="text-[#004242]" />
                      {getCourseDuration(course)}
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#004242] mb-3 leading-snug line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-gray-500 text-[14px] leading-relaxed line-clamp-2 mb-4">
                    {lessonCount} lessons • {course.totalEnrolled || 0}{" "}
                    enrolled
                  </p>

                  {/* Price and Button Section */}
                  <div className="mt-auto space-y-3">
                    {!isFree && (
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-[#004242]">
                          {formattedPrice}
                        </span>
                        <span className="text-gray-400 text-xs">
                          one-time payment
                        </span>
                      </div>
                    )}

                    <Link href={`/courses/${course._id}`}>
                      <Button className="w-full bg-[#004242] hover:bg-[#003333] text-white py-6 rounded-lg text-sm transition-colors">
                        {isFree ? "Start Free" : "Enroll Now"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreOtherCourses;
