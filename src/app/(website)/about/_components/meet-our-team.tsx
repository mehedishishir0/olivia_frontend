"use client";

import Image from "next/image";
import {
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  Globe,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TeamMember {
  _id: string;
  name: string;
  designation: string;
  description: string;
  socialLinks: { platform: string; url: string }[];
  profilePicture?: { url: string; public_id: string };
  createdAt: string;
  updatedAt: string;
}

const platformIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  x: Twitter,
  youtube: Youtube,
  website: Globe,
};

const MeetOurTeam = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/team/all`,
      );

      if (!res.ok) throw new Error("Failed to fetch team");

      const result = await res.json();
      return result.data as TeamMember[];
    },
  });

  const renderSkeleton = () => (
    <div className="grid grid-cols-1  md:grid-cols-3 gap-8 items-center">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-white p-10 rounded-[32px] shadow-xl flex flex-col items-center text-center"
        >
          <Skeleton className="w-32 h-32 rounded-full mb-6" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-8" />

          <div className="flex gap-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <section>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-[#064E4B] mb-4">
              Meet Our Team
            </h2>

            <p className="text-[#528B8A] text-lg max-w-2xl mx-auto">
              Down below will have headshot and position of everyone on the Act
              on Climate team.
            </p>
          </div>

          {renderSkeleton()}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl text-[#064E4B] mb-4">
            Meet Our Team
          </h2>

          <p className="text-[#528B8A] text-lg">
            Failed to load team members. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return (
      <section>
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl text-[#064E4B] mb-4">
            Meet Our Team
          </h2>

          <p className="text-[#528B8A] text-lg">No team members found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#EDF5F4] ">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#064E4B] mb-4">
            Meet Our Team
          </h2>

          <p className="text-[#528B8A] text-lg max-w-2xl mx-auto">
            Down below will have headshot and position of everyone on the Act on
            Climate team.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {data.map((member) => (
            <Dialog key={member._id}>
              <DialogTrigger asChild>
                <div className="bg-white p-10 rounded-[32px] shadow-xl flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300 cursor-pointer">
                  {/* Image */}
                  <div className="relative w-32 h-32 mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-[#F1F7F6] overflow-hidden">
                      <Image
                        src={member.profilePicture?.url || "/placeholder.png"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="text-2xl text-[#064E4B] mb-1">
                    {member.name}
                  </h3>

                  {/* Designation */}
                  <p className="text-[#528B8A] font-semibold text-sm mb-4">
                    {member.designation}
                  </p>

                  {/* Short Description */}
                  <p className="text-[#528B8A] text-xs leading-relaxed mb-8 max-w-[220px]">
                    {member.description.length > 100
                      ? `${member.description.slice(0, 100)}...`
                      : member.description}
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-4">
                    {member.socialLinks.map((link, idx) => {
                      const Icon =
                        platformIcons[link.platform.toLowerCase()] || Globe;

                      return (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 bg-[#F1F7F6] rounded-full hover:bg-[#E2EEEB]"
                        >
                          <Icon className="w-4 h-4 text-[#064E4B]" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </DialogTrigger>

              {/* Modal */}
              <DialogContent className="max-w-lg h-[500px] no-scrollbar overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-[#064E4B]">
                    {member.name}
                  </DialogTitle>

                  <DialogDescription className="text-[#528B8A] font-semibold">
                    {member.designation}
                  </DialogDescription>
                </DialogHeader>

                {/* Image */}
                <div className="flex justify-center my-6">
                  <div className="relative w-36 h-36">
                    <Image
                      src={member.profilePicture?.url || "/placeholder.png"}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>

                {/* Full Description */}
                <p className="text-sm text-[#528B8A] leading-relaxed text-center">
                  {member.description}
                </p>

                {/* Social Links */}
                <div className="flex gap-4 mt-6 justify-center">
                  {member.socialLinks.map((link, idx) => {
                    const Icon =
                      platformIcons[link.platform.toLowerCase()] || Globe;

                    return (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-[#F1F7F6] rounded-full hover:bg-[#E2EEEB]"
                      >
                        <Icon className="w-4 h-4 text-[#064E4B]" />
                      </a>
                    );
                  })}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;
