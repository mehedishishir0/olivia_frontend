"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  BookOpen,
  ChevronDown,
  Clock,
  Lock,
  Play,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import {
  CourseApiResponse,
  CourseLesson,
  getCourseDuration,
  getCourseLessonCount,
  getCourseLevel,
  getVideoEmbedUrl,
} from "@/lib/course-utils";

interface PlaylistSection {
  id: string;
  title: string;
  lessons: number;
  time: string;
  isLocked?: boolean;
  items: CourseLesson[];
}

const CourseWatchPage = () => {
  const { id } = useParams();
  const { data: session } = useSession();
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "section-0",
  );
  const [activeLesson, setActiveLesson] = useState("");
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const { data, isLoading, error } = useQuery<CourseApiResponse>({
    queryKey: ["enroll-course", id, session?.user?.accessToken],
    queryFn: async () => {
      const res = await api.get(`/course/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const course = data?.data;
  const lessons = useMemo(() => {
    return (course?.lessons || []).map((lesson, index) => ({
      ...lesson,
      _id: lesson._id || `lesson-${index}`,
      duration: lesson.duration?.includes("min")
        ? lesson.duration
        : `${lesson.duration || 0} min`,
      videoUrl: lesson.videoUrl || "",
    }));
  }, [course?.lessons]);

  const activeLessonId = activeLesson || lessons[0]?._id || "";
  const activeLessonData =
    lessons.find((lesson) => lesson._id === activeLessonId) || lessons[0];

  const handleLessonClick = (lesson: CourseLesson) => {
    if (!lesson._id || lesson.videoUrl === "LOCKED") return;
    setActiveLesson(lesson._id);
    setIsVideoLoading(true);
  };

  if (error) {
    return (
      <section className="bg-[#F8FAFA] py-16">
        <div className="container text-center py-12">
          <p className="text-red-500">
            Error loading course. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="bg-[#F8FAFA] py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <Skeleton className="h-10 w-96" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-xl border border-gray-100 p-4"
                >
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </div>
            <div className="lg:col-span-8 space-y-8">
              <Skeleton className="aspect-video w-full rounded-2xl" />
              <div className="bg-white rounded-2xl p-8">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-12 w-full mb-6" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!course) {
    return (
      <section className="bg-[#F8FAFA] py-16">
        <div className="container text-center py-12">
          <p className="text-gray-500">Course not found.</p>
        </div>
      </section>
    );
  }

  const skillLevel = getCourseLevel(course.lessons);
  const formattedDuration = getCourseDuration(course);
  const lessonCount = getCourseLessonCount(course);
  const embedVideoUrl = getVideoEmbedUrl(activeLessonData?.videoUrl);
  const playlistItems: PlaylistSection[] = [
    {
      id: "section-0",
      title: course.title,
      lessons: lessonCount,
      time: formattedDuration,
      isLocked: course.isLocked,
      items: lessons,
    },
  ];

  if (course.isLocked) {
    return (
      <section className="bg-[#F8FAFA] py-16">
        <div className="container">
          <div className="mx-auto max-w-xl rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
            <Lock size={40} className="mx-auto mb-4 text-[#004242]" />
            <h1 className="mb-3 text-2xl font-bold text-[#004242]">
              Enroll to watch this course
            </h1>
            <p className="mb-6 text-sm text-gray-500">
              Your account does not have access to these lessons yet.
            </p>
            <Link href={`/courses/${id}`}>
              <Button className="bg-[#004242] hover:bg-[#003333]">
                Back to Course
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F8FAFA] py-16">
      <div className="container">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-[#004242]">
            {course.title}
          </h1>
          <div className="text-gray-400 font-medium text-sm hidden md:block">
            {lessonCount} Lessons • Total {formattedDuration}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="space-y-3 sticky top-32 z-40">
              {playlistItems.map((section) => (
                <div
                  key={section.id}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() =>
                      setExpandedSection(
                        expandedSection === section.id ? null : section.id,
                      )
                    }
                    className="w-full p-4 flex items-center justify-between text-left transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-semibold text-[#004242]">
                        01
                      </span>
                      <div>
                        <h4 className="text-sm font-medium text-[#004242] leading-tight">
                          {section.title}
                        </h4>
                        <p className="text-[11px] text-gray-400 font-medium">
                          {section.lessons} Lessons • {section.time}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-gray-400 transition-transform ${
                        expandedSection === section.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expandedSection === section.id && (
                    <div className="px-4 pb-4 space-y-1 bg-gray-50/30">
                      {section.items.map((lesson, index) => (
                        <button
                          key={lesson._id}
                          onClick={() => handleLessonClick(lesson)}
                          className={`w-full flex items-center justify-between p-2 rounded-md transition-all ${
                            activeLessonId === lesson._id
                              ? "bg-[#004242]/5 text-[#004242]"
                              : "text-gray-600 hover:bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <PlayCircle
                              size={18}
                              className={
                                activeLessonId === lesson._id
                                  ? "text-[#004242]"
                                  : "text-gray-300"
                              }
                            />
                            <span
                              className={`text-sm font-medium ${
                                activeLessonId === lesson._id
                                  ? "text-[#004242]"
                                  : ""
                              }`}
                            >
                              {index + 1}. {lesson.title}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400 font-medium">
                            {lesson.duration}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl">
              {embedVideoUrl ? (
                <>
                  {isVideoLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                      <div className="w-12 h-12 border-4 border-[#004242] border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                  <iframe
                    src={embedVideoUrl}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={() => setIsVideoLoading(false)}
                  />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="text-center text-white">
                    <Play size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-gray-400">
                      No video available for this lesson
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-[#004242] mb-4">
                {activeLessonData?.title || course.title}
              </h2>

              {activeLessonData?.title && (
                <p className="text-gray-600 mb-6">
                  Currently watching: {activeLessonData.title}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-12 pt-6 border-t">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-[#004242] uppercase tracking-wider">
                    Duration
                  </p>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                    <Clock size={14} className="text-[#004242]" />
                    {activeLessonData?.duration || formattedDuration}
                  </div>
                </div>
                <div className="space-y-1 border-x px-12 border-gray-100">
                  <p className="text-xs font-semibold text-[#004242] uppercase tracking-wider">
                    Lessons
                  </p>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                    <BookOpen size={14} className="text-[#004242]" />
                    {lessonCount} Units
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-[#004242] uppercase tracking-wider">
                    Skill Level
                  </p>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                    <BarChart size={14} className="text-[#004242]" />
                    {skillLevel}
                  </div>
                </div>
              </div>

              {(course.totalEnrolled || 0) > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    {course.totalEnrolled} student
                    {course.totalEnrolled !== 1 ? "s" : ""} enrolled
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseWatchPage;
