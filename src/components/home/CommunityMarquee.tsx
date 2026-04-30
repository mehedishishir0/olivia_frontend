/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Quote, Star, Loader2, MessageSquarePlus } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// --- Interfaces ---
interface ReviewUser {
  firstName: string;
  lastName: string;
  role: string;
}

interface Review {
  _id: string;
  user: ReviewUser;
  comment: string;
  rating: number;
}

interface ReviewApiResponse {
  success: boolean;
  data: Review[];
}

// --- Skeleton Component ---
const FeedbackSkeleton = () => (
  <div className="flex flex-col gap-3">
    <div className="flex gap-4 overflow-hidden">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-[350px] h-[220px] bg-slate-50 rounded-[24px] p-8 border border-slate-100 shrink-0"
        >
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-2/3 mb-8" />
          <div className="flex gap-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Individual Card ---
const TestimonialCard = ({ item }: { item: Review }) => (
  <div className="relative w-[350px] cursor-pointer overflow-hidden rounded-[24px] border border-slate-100 bg-white p-8 shadow-sm transition-all hover:shadow-md mx-2">
    <Quote className="absolute top-6 right-8 w-10 h-10 text-[#0D3B3F] opacity-5" />

    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < item.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}`}
        />
      ))}
    </div>

    <p className="text-[#0D3B3F] text-[15px] leading-relaxed mb-8 relative z-10 line-clamp-3">
      {item.comment}
    </p>

    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-[#0D3B3F]/5 flex items-center justify-center text-[#0D3B3F] font-bold border-2 border-slate-50">
        {item.user.firstName[0]}
        {item.user.lastName[0]}
      </div>
      <div>
        <h4 className="text-sm font-black text-[#0D3B3F] tracking-tight">
          {item.user.firstName} {item.user.lastName}
        </h4>
        <p className="text-[11px] text-slate-400 uppercase tracking-wider">
          {item.user.role}
        </p>
      </div>
    </div>
  </div>
);

export default function CommunityFeedback() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  // 1. GET Reviews
  const { data, isLoading } = useQuery<ReviewApiResponse>({
    queryKey: ["approved-reviews"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/review/approved`,
      );
      return res.json();
    },
  });

  // 2. SUBMIT Review
  const mutation = useMutation({
    mutationFn: async (payload: { comment: string; rating: number }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/review/submit-review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        // Backend er "You have already submitted a review" message-ti throw kora hocche
        throw new Error(result.message || "Failed to submit review");
      }
      return result;
    },
    onSuccess: () => {
      toast.success("Review submitted! Waiting for approval.");
      setOpen(false);
      setComment("");
      setRating(5);
      queryClient.invalidateQueries({ queryKey: ["approved-reviews"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
  const reviews = data?.data || [];
  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-white">
      {/* Header */}
      <div className="mb-12 text-center px-4">
        <h2 className="text-[42px] font-black text-[#0D3B3F] tracking-tighter mb-4">
          What Our Community Says
        </h2>

        {/* Review Submission Trigger */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0D3B3F]  hover:bg-[#082a2d] text-white rounded-full !px-5  py-6 shadow-lg transition-all active:scale-95 gap-2">
              <MessageSquarePlus className="w-5 h-5" />
              Share Your Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-[#0D3B3F] text-2xl font-black">
                Submit a Review
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 pt-4">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-8 h-8 cursor-pointer transition-all ${s <= rating ? "fill-yellow-400 text-yellow-400 scale-110" : "text-slate-200"}`}
                    onClick={() => setRating(s)}
                  />
                ))}
              </div>
              <Textarea
                placeholder="How has Act on Climate helped you?"
                className="min-h-[120px] rounded-xl border-slate-200 focus:ring-[#0D3B3F]"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                disabled={mutation.isPending || !comment}
                onClick={() => mutation.mutate({ comment, rating })}
                className="w-full bg-[#0D3B3F] py-6 rounded-xl font-bold"
              >
                {mutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Post Review"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Marquee Display */}
      {isLoading ? (
        <FeedbackSkeleton />
      ) : reviews.length > 0 ? (
        <div className="relative flex flex-col gap-3">
          <Marquee pauseOnHover className="[--duration:10s]">
            {firstRow.map((t) => (
              <TestimonialCard key={t._id} item={t} />
            ))}
          </Marquee>

          <Marquee reverse pauseOnHover className="[--duration:10s]">
            {secondRow.map((t) => (
              <TestimonialCard key={t._id} item={t} />
            ))}
          </Marquee>

          {/* Gradient Fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-white"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-white"></div>
        </div>
      ) : (
        <p className="text-slate-400 font-medium">
          No reviews yet. Be the first!
        </p>
      )}
    </section>
  );
}
