export interface CourseImage {
  url?: string;
  public_id?: string;
}

export interface CourseLesson {
  _id?: string;
  title: string;
  duration?: string;
  level?: string;
  videoUrl?: string;
  isLocked?: boolean;
}

export interface Course {
  _id: string;
  title: string;
  category?: string;
  difficulty?: string;
  instructorName?: string;
  instructorBio?: string;
  instructorImage?: CourseImage;
  description?: string;
  durationHours?: number;
  estimatedWeeks?: number;
  lessonCount?: number;
  totalDuration?: string;
  price?: number;
  currency?: string;
  isAvailable?: boolean;
  isLocked?: boolean;
  isEnrolled?: boolean;
  totalEnrolled?: number;
  image?: CourseImage;
  lessons?: CourseLesson[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CoursesApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Course[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface CourseApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Course;
}

const getBackendUrl = () => process.env.NEXT_PUBLIC_BACKEND_URL || "";

export const getCourseImageUrl = (imageUrl?: string) => {
  if (!imageUrl || imageUrl === "undefined") return "/placeholder.png";
  if (imageUrl.startsWith("http") || imageUrl.startsWith("/")) {
    return imageUrl;
  }
  const backendUrl = getBackendUrl();
  return backendUrl ? `${backendUrl}/${imageUrl}` : `/${imageUrl}`;
};

const parseLessonMinutes = (duration?: string) => {
  const minutes = Number.parseInt(String(duration || "0"), 10);
  return Number.isNaN(minutes) ? 0 : minutes;
};

export const getCourseLessonCount = (course: Course) =>
  course.lessonCount ?? course.lessons?.length ?? 0;

export const getCourseDuration = (course: Course) => {
  if (course.totalDuration) return course.totalDuration;

  const minutes =
    course.lessons?.reduce(
      (total, lesson) => total + parseLessonMinutes(lesson.duration),
      0,
    ) ?? 0;

  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
  }

  if (minutes > 0) return `${minutes} min`;
  if (course.durationHours && course.durationHours > 0) {
    return `${course.durationHours}h`;
  }

  return "0 min";
};

export const getCourseLevel = (lessons?: CourseLesson[]) => {
  if (!lessons?.length) return "Beginner";
  const levels = lessons.map((lesson) => lesson.level?.toLowerCase() || "");
  if (levels.includes("advanced")) return "Advanced";
  if (levels.includes("intermediate")) return "Intermediate";
  return "Beginner";
};

export const getCourseLevelColor = (level: string) => {
  switch (level) {
    case "Advanced":
      return "text-purple-500 bg-purple-50";
    case "Intermediate":
      return "text-blue-500 bg-blue-50";
    default:
      return "text-green-500 bg-green-50";
  }
};

export const formatCoursePrice = (price = 0, currency = "CAD") => {
  if (price <= 0) return "Free";
  return `${currency} ${price.toLocaleString()}`;
};

export const getVideoEmbedUrl = (url?: string) => {
  if (!url || url === "LOCKED") return "";

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoId = url.includes("youtube.com/watch?v=")
      ? url.split("v=")[1]?.split("&")[0]
      : url.split("youtu.be/")[1]?.split("?")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }

  if (url.includes("vimeo.com")) {
    const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
    return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
  }

  return url;
};
