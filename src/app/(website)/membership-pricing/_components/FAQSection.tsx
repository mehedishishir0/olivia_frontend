import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FAQSection = () => {
  const faqs = [
    {
      question: "How is this different from other climate communities?",
      answer:
        "Act on Climate moves beyond awareness by offering structured, career-focused support. Members gain access to curated job opportunities, industry events, expert networks, and practical resources. The goal is to help members actively build and advance their careers in the climate sector.",
    },
    {
      question: "Do I need prior experience?",
      answer:
        "No prior experience is necessary. Act on Climate welcomes individuals at any career stage, including those new to the climate sector. The main expectations are an interest in climate action and a willingness to engage with the community.",
    },
    {
      question: "How much time does it take?",
      answer:
        "Membership is flexible, with no required time commitment. Members choose their level of engagement based on their goals and availability, whether attending events, exploring resources, or pursuing opportunities.",
    },
    {
      question: "Where does my membership fee go?",
      answer:
        "Membership fees are reinvested to maintain and grow the platform. Funds support career resources, events, networking opportunities, and the infrastructure needed to deliver a high-quality member experience.",
    },
  ];

  return (
    <section className="bg-[#EEF4F5] py-24 px-6 font-sans">
      <div className="container mx-auto">
        {/* Title */}
        <h2 className="text-[#063b3d] text-4xl md:text-5xl  text-center mb-16 tracking-tight">
          Frequently Asked Questions
        </h2>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4 w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border-none  rounded-2xl overflow-hidden px-6 shadow-sm"
            >
              <AccordionTrigger className="text-[#004242] cursor-pointer text-base md:text-[20px] text-left py-6 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#004242] text-[16px]  leading-relaxed pb-6 border-t border-[#f0f7f9] pt-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Footer / Contact Section */}
        <div className="mt-16 text-center space-y-6">
          <p className="text-[#111827] font-medium">Still have questions?</p>
          <Link href="mailto:info@actonclimate.net">
            <Button className="bg-[#004242] hover:bg-[#042a2b] text-white font-bold px-8 py-6 rounded-lg transition-colors">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
