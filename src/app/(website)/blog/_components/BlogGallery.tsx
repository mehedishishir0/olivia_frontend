// "use client";

// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { MoveRight } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// interface BlogPost {
//   _id: string;
//   title: string;
//   category: string;
//   content: string;
//   thumbnailImage: {
//     url: string;
//     public_id: string;
//   };
//   read_time: string;
// }

// const fetchBlogs = async (): Promise<BlogPost[]> => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/apply-blog/get-all-blog-ideas`,
//   );
//   const data = await res.json();
//   if (!data.success) throw new Error(data.message || "Failed to fetch blogs");
//   return data.data;
// };

// const BlogGallery = () => {
//   const categories = [
//     "View All Posts",
//     "Expert Insights",
//     "Climate Careers",
//     "Research",
//     "Toolkit",
//     "Community",
//   ];

//   const [activeCategory, setActiveCategory] = useState("View All Posts");

//   // TanStack Query
//   const {
//     data: blogPosts = [],
//     isLoading,
//     isError,
//   } = useQuery<BlogPost[]>({
//     queryKey: ["blogs"],
//     queryFn: fetchBlogs,
//   });

//   const filteredPosts =
//     activeCategory === "View All Posts"
//       ? blogPosts
//       : blogPosts.filter((post) => post.category === activeCategory);

//   if (isLoading) return <p className="text-center">Loading blogs...</p>;
//   if (isError)
//     return <p className="text-center text-red-500">Failed to load blogs.</p>;

//   return (
//     <section className="bg-[#f0f7f7] py-20 px-6 md:px-20">
//       <div className="container">
//         {/* Filter Navigation */}
//         <div className="flex flex-wrap justify-center gap-3 mb-12">
//           {categories.map((cat, index) => (
//             <button
//               key={index}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-5 py-2 rounded-md text-sm font-semibold transition-colors duration-300 ${activeCategory === cat
//                   ? "bg-[#004d4d] text-white"
//                   : "bg-white text-[#004d4d] border border-gray-100 hover:bg-gray-50 shadow-sm"
//                 }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* Blog Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredPosts.map((post) => (
//             <BlogCard key={post._id} post={post} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// /* Individual Card Component */
// const BlogCard = ({ post }: { post: BlogPost }) => {
//   return (
//     <div className="bg-[#EEF4F5] rounded-2xl overflow-hidden border-2 border-[#E3ECEC] flex flex-col h-full">
//       <div className="p-4">
//         <Image
//           width={800}
//           height={400}
//           quality={100}
//           src={post?.thumbnailImage?.url}
//           alt={post.title}
//           className="w-full h-52 object-cover rounded-xl"
//         />
//       </div>

//       <div className="px-6 pb-6 flex flex-col flex-grow">
//         <span className="inline-block bg-[#5D8AA8] text-white text-[10px] px-3 py-1 rounded-full mb-3 w-fit">
//           {post.category}
//         </span>

//         <h3 className="text-[#004242] font-normal text-xl mb-3 leading-tight">
//           {post.title.slice(0, 50)}
//         </h3>

//         <p
//           className="text-[#5D8AA8] text-xs leading-relaxed mb-6 flex-grow"
//           dangerouslySetInnerHTML={{
//             __html: post.content.slice(0, 450) + "...",
//           }}
//         />

//         <Link href={`/blog/${post._id}`}>
//           <button className="flex items-center cursor-pointer gap-2 text-[#5D8AA8] font-bold text-sm hover:gap-3 transition-all">
//             Read  More <MoveRight size={18} />
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default BlogGallery;

"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  _id: string;
  title: string;
  category: string;
  content: string;
  thumbnailImage?: {
    url: string;
    public_id: string;
  };
  read_time?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    data: BlogPost[];
  };
}

const fetchBlogs = async (): Promise<BlogPost[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/apply-blog/get-all-blog-ideas`,
  );
  const data: ApiResponse = await res.json();
  if (!data.success) throw new Error(data.message || "Failed to fetch blogs");
  return data.data.data; // <-- get the actual array of blog posts
};

const BlogGallery = () => {
  const categories = [
    "View All Posts",
    "Expert Insights",
    "Climate Careers",
    "Research",
    "Toolkit",
    "Community",
  ];

  const [activeCategory, setActiveCategory] = useState("View All Posts");

  // TanStack Query
  const {
    data: blogPosts = [],
    isLoading,
    isError,
  } = useQuery<BlogPost[]>({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  const filteredPosts =
    activeCategory === "View All Posts"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  if (isLoading) return <p className="text-center">Loading blogs...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load blogs.</p>;

  return (
    <section className="bg-[#f0f7f7] py-20 px-6 md:px-20">
      <div className="container">
        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-md text-sm font-semibold transition-colors duration-300 ${
                activeCategory === cat
                  ? "bg-[#004d4d] text-white"
                  : "bg-white text-[#004d4d] border border-gray-100 hover:bg-gray-50 shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* Individual Card Component */
const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <div className="bg-[#EEF4F5] rounded-2xl overflow-hidden border-2 border-[#E3ECEC] flex flex-col h-full">
      {post.thumbnailImage && (
        <div className="p-4">
          <Image
            width={800}
            height={400}
            quality={100}
            src={post.thumbnailImage.url}
            alt={post.title}
            className="w-full h-52 object-cover rounded-xl"
          />
        </div>
      )}

      <div className="px-6 pb-6 flex flex-col flex-grow">
        <span className="inline-block bg-[#5D8AA8] text-white text-[10px] px-3 py-1 rounded-full mb-3 w-fit">
          {post.category}
        </span>

        <h3 className="text-[#004242] font-normal text-xl mb-3 leading-tight">
          {post.title.slice(0, 50)}
        </h3>

        <p
          className="text-[#5D8AA8] text-xs leading-relaxed mb-6 flex-grow"
          dangerouslySetInnerHTML={{
            __html: post.content.slice(0, 450) + "...",
          }}
        />

        <Link href={`/blog/${post._id}`}>
          <button className="flex items-center cursor-pointer gap-2 text-[#5D8AA8] font-bold text-sm hover:gap-3 transition-all">
            Read More <MoveRight size={18} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogGallery;
