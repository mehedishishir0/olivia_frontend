import Image from "next/image";
import Link from "next/link";

const AssistanceSection = () => {
  return (
    <section className="flex items-center justify-center bg-[#eef4f5] py-16">
      <div className="container flex flex-col lg:flex-row gap-12 items-center">
        {/* Left: Image Container */}
        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg">
          <div className="relative rounded-[15px] overflow-hidden aspect-[4/3] lg:aspect-square xl:aspect-[1.4/1] ">
            <Image
              src="/assist.jpg" // Replace with your actual image path
              alt="Team working on laptops"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right: Content Container */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-6">
          <h2 className="text-[#004d4d] text-3xl md:text-4xl lg:text-5xl  tracking-tight">
            We’re Here to Assist
          </h2>

          <p className="text-[#4a5568] text-base md:text-lg leading-relaxed max-w-xl">
            Are you struggling with putting your resume together? Unsure about
            your cover letter? Need help with interview prep? Act on Climate is
            here to assist early-career professionals entering the climate
            career space with resume writing, cover letter development, and
            interview prep.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href={"/survey"}>
              {" "}
              <button className="bg-[#004d4d] text-white px-8 py-3 rounded-lg  hover:bg-[#003a3a] transition-colors border-2 border-[#004d4d] cursor-pointer">
                Apply Here
              </button>
            </Link>
            <Link href={"/membership-pricing#pricing"}>
              <button className="bg-transparent text-[#004d4d] px-8 py-3 rounded-lg  hover:bg-[#eef2f2] transition-colors border-2 border-[#004d4d] cursor-pointer">
                View Pricing
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssistanceSection;
