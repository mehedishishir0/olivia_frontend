/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Clock, BookOpen, BarChart, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import {
  CourseApiResponse,
  formatCoursePrice,
  getCourseDuration,
  getCourseImageUrl,
  getCourseLessonCount,
  getCourseLevel,
  getVideoEmbedUrl,
} from "@/lib/course-utils";

interface EnrollmentResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    result: {
      userId: string;
      courseId: string;
      transactionId: string;
      paymentStatus: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
    };
    checkoutUrl: string | null;
  };
}

const FeaturedCourseSection = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const [showVideo, setShowVideo] = useState(false);

  const { data, isLoading, error } = useQuery<CourseApiResponse>({
    queryKey: ["course-details", id, token],
    queryFn: async () => {
      const res = await api.get(`/course/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const enrollmentMutation = useMutation<EnrollmentResponse, Error, void>({
    mutationFn: async () => {
      if (!token) {
        throw new Error("Please login to enroll in this course");
      }

      const res = await api.post("/enrollment/create", { courseId: id });
      return res.data;
    },
    onSuccess: (data) => {
      if (data.success && data.data?.checkoutUrl) {
        window.location.href = data.data.checkoutUrl;
      } else if (data.success && !data.data?.checkoutUrl) {
        toast.success("Successfully enrolled in course!");
        setTimeout(() => {
          router.push(`/courses/${id}/enroll-course`);
        }, 2000);
      }
    },
    onError: (error: any) => {
      let errorMessage = "Failed to enroll in course. Please try again.";

      if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      } else if (error?.errorSource && error.errorSource.length > 0) {
        errorMessage = error.errorSource[0].message;
      }

      toast.error(errorMessage);
    },
  });

  const handleEnroll = async () => {
    if (!session) {
      toast.error("Please login to enroll in this course");
      router.push("/login");
      return;
    }

    if (!token) {
      toast.error("Authentication error. Please login again.");
      router.push("/login");
      return;
    }

    enrollmentMutation.mutate();
  };

  const course = data?.data;

  if (error) {
    return (
      <section className="bg-[#EDF2F2]">
        <div className="container">
          <div className="text-center py-16">
            <p className="text-red-500">
              Error loading course details. Please try again later.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4 bg-[#004242] hover:bg-[#003333]"
            >
              Retry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="bg-[#EDF2F2]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch py-16">
            {/* Left Content Skeleton */}
            <div className="bg-white/40 border border-white/60 rounded-2xl p-5 md:p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <Skeleton className="h-24 w-3/4" />
                <Skeleton className="h-24 w-full" />
                <div className="grid grid-cols-3 bg-white rounded-xl p-4 shadow-sm">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-14 w-full mt-8 rounded-lg" />
            </div>

            {/* Right Image Skeleton */}
            <div className="bg-white p-3 rounded-2xl shadow-sm">
              <Skeleton className="h-[400px] w-full rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!course) {
    return (
      <section className="bg-[#EDF2F2]">
        <div className="container">
          <div className="text-center py-16">
            <p className="text-gray-500">Course not found.</p>
          </div>
        </div>
      </section>
    );
  }

  const lessons = course.lessons || [];
  const skillLevel = getCourseLevel(lessons);
  const formattedDuration = getCourseDuration(course);
  const lessonCount = getCourseLessonCount(course);
  const firstLesson = lessons[0];
  const videoUrl = firstLesson?.videoUrl;
  const previewUrl = getVideoEmbedUrl(videoUrl);
  const isEnrollingLoading = enrollmentMutation.isPending;
  const isFree = !course.price || course.price <= 0;
  const canWatch = course.isEnrolled || !course.isLocked;

  return (
    <section className="bg-[#EDF2F2]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch py-16">
          {/* Left Content Card */}
          <div className="bg-white/40 border border-white/60 rounded-2xl p-5 md:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#004242] leading-[1.1]">
                {course.title}
              </h2>

              <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg">
                Master the fundamentals of {course.title.toLowerCase()}. This
                course includes {lessonCount} lessons with a total
                duration of {formattedDuration}. Perfect for{" "}
                {skillLevel.toLowerCase()} level learners
                {course.category
                  ? ` looking to enhance their skills in ${course.category.toLowerCase()}.`
                  : "."}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="space-y-1">
                  <p className="text-[#004242] font-extrabold text-[13px]">
                    Duration
                  </p>

                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Clock size={14} className="text-[#004242]" />
                    {formattedDuration}
                  </div>
                </div>
                <div className="space-y-1 border-x border-gray-100 px-4">
                  <p className="text-[#004242] font-extrabold text-[13px]">
                    Lessons
                  </p>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <BookOpen size={14} className="text-[#004242]" />
                    {lessonCount} Units
                  </div>
                </div>
                <div className="space-y-1 pl-4">
                  <p className="text-[#004242] font-extrabold text-[13px]">
                    Skill Level
                  </p>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <BarChart size={14} className="text-[#004242]" />
                    {skillLevel}
                  </div>
                </div>
              </div>

              {/* Price if available */}
              {!isFree && (
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#004242]">
                    {formatCoursePrice(course.price, course.currency)}
                  </span>
                  <span className="text-gray-500 text-sm">
                    one-time payment
                  </span>
                </div>
              )}
            </div>

            <Button
              onClick={() =>
                canWatch
                  ? router.push(`/courses/${id}/enroll-course`)
                  : handleEnroll()
              }
              disabled={isEnrollingLoading}
              className="w-full bg-[#004242] hover:bg-[#003333] text-white py-7 rounded-lg text-lg mt-8 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEnrollingLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                canWatch
                  ? "Continue Learning"
                  : isFree
                    ? "Start Free Course"
                    : `Enroll in Course - ${formatCoursePrice(course.price, course.currency)}`
              )}
            </Button>
          </div>

          {/* Right Video/Image Preview */}
          <div className="relative group bg-white p-3 rounded-2xl shadow-sm border border-white">
            <div className="relative h-full min-h-[400px] w-full overflow-hidden rounded-xl">
              {showVideo && previewUrl ? (
                <iframe
                  src={previewUrl}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <Image
                    src={getCourseImageUrl(course.image?.url)}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {previewUrl && videoUrl !== "LOCKED" && (
                    <button
                      type="button"
                      onClick={() => setShowVideo(true)}
                      className="absolute inset-0 flex items-center justify-center bg-black/20 text-white transition-colors hover:bg-black/30"
                      aria-label="Play course preview"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[#004242] shadow-lg">
                        <Play size={30} fill="currentColor" />
                      </span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourseSection;
