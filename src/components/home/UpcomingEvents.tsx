"use client";
import React from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type Event = {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  lumaUrl: string;
  price: number;
  currency: string;
  createdAt: string;
};

const fetchEvents = async (): Promise<Event[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/event/published`,
  );

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message || "Failed to fetch events");
  }

  return data.data;  
};

export const UpcomingEvents = () => {
  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) return <p className="text-center py-20">Loading events...</p>;

  if (isError)
    return (
      <p className="text-center py-20 text-red-500">Failed to load events.</p>
    );

  return (
    <section className="py-[100px] bg-[#F1F5F9]">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-[40px] hero-font text-[#0D3B3F] leading-tight">
              Upcoming Events
            </h2>
            <p className="text-[#5D8AA8] font-medium mt-2">
              Join us live and learn from industry leaders.
            </p>
          </div>

          <Link href="/event">
            <Button
              variant="ghost"
              className="text-[#004242] hover:bg-transparent flex items-center gap-2 group"
            >
              View All Events
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.slice(0, 6).map((event) => {
            const date = new Date(event.createdAt);
            const day = date.getDate();
            const month = date.toLocaleString("default", { month: "short" });

            return (
              <Card
                key={event._id}
                className="rounded-[16px] p-2 pb-4 overflow-hidden border-none shadow-sm bg-white"
              >
                {/* Image */}
                <div className="relative">
                  <Image
                    height={400}
                    width={400}
                    src={event.thumbnail}
                    alt={event.title}
                    className="w-full h-[220px] object-cover rounded-lg"
                  />

                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow-md text-center min-w-[50px]">
                    <p className="text-[10px] text-blue-500 uppercase tracking-tighter">
                      {month}
                    </p>
                    <p className="text-xl font-black text-[#0D3B3F] leading-none">
                      {day}
                    </p>
                  </div>
                  
                </div>

                {/* Content */}
                <CardContent>
                  <h3 className="text-xl font-black text-[#0D3B3F] mb-3 line-clamp-1">
                    {event.title}
                  </h3>

                  <p className="text-slate-400 text-sm font-medium mb-6 leading-relaxed line-clamp-2">
                    {event.description || "No description available"}
                  </p>

                  <div className="flex items-center gap-2 text-slate-500 text-[13px] font-semibold mb-6">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {date.toDateString()}
                  </div>

                  <a href={event.lumaUrl} target="_blank">
                    <Button className="w-full py-6 rounded-xl border border-slate-100 bg-white text-[#0D3B3F] font-black hover:bg-slate-50 shadow-none">
                      Register Now
                    </Button>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
