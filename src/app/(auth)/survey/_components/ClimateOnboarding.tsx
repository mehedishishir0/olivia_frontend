/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import z from "zod";
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  BookOpen,
  Users,
  Briefcase,
  Lightbulb,
  Bell,
  Mail,
  Sparkles,
  GraduationCap,
  PartyPopper,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createSurvey } from "@/hooks/Surveyapi";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const HubCard = ({ icon: Icon, label, selected = false, onClick }: any) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all border-2 ${
      selected
        ? "bg-white border-[#003D3D] shadow-sm"
        : "bg-[#F1F4F4] border-transparent hover:bg-[#E8EBEB]"
    }`}
  >
    <div className={`p-2 rounded-lg bg-white shadow-sm`}>
      <Icon className="w-5 h-5 text-[#003D3D]" />
    </div>
    <span className="text-sm font-bold text-[#003D3D]">{label}</span>
  </div>
);

const STEPS = [
  "Welcome",
  "Identity",
  "Journey",
  "Interests",
  "Career",
  "Connect",
];

const identitySchema = z.object({
  name: z.string().trim().min(1, "Full name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Enter a valid email address"),
  city: z.string().trim().min(1, "City is required"),
  country: z.string().trim().min(1, "Country is required"),
  link: z.string().trim().min(1, "LinkedIn / Website is required"),
});

const journeySchema = z.object({
  climateJourney: z
    .string()
    .trim()
    .min(1, "Please select where you are in your climate journey"),
  message: z.string().trim().min(1, "This field is required"),
});

const interestsSchema = z.object({
  interest: z.array(z.string()).min(1, "Please select at least one interest"),
  goals: z.array(z.string()).min(1, "Please select at least one goal"),
  successMessage: z.string().trim().min(1, "This field is required"),
});

const careerSchema = z.object({
  whatLooking: z.array(z.string()).min(1, "Please select at least one option"),
  engagementPreference: z
    .string()
    .trim()
    .min(1, "Please select your engagement preference"),
  opportunity: z.string().trim().min(1, "Please select an opportunity"),
});

const connectSchema = z.object({
  hubs: z.string().trim().min(1, "Please select a hub"),
  region: z.string().trim().min(1, "Please select your region"),
  updateFrequency: z.string().trim().min(1, "Please select update frequency"),
  tellAbout: z.string().trim().min(150, "Please enter at least 150 characters"),
});

const stepSchemas = {
  1: identitySchema,
  2: journeySchema,
  3: interestsSchema,
  4: careerSchema,
  5: connectSchema,
} as const;

export default function ClimateOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const router = useRouter();

  const [formData, setFormData] = useState({
    // Step 1 - Identity
    name: "",
    email: "",
    city: "",
    country: "",
    link: "",
    // Step 2 - Journey
    climateJourney: "",
    message: "",
    // Step 3 - Interests
    interest: [] as string[], // climate topic checkboxes
    goals: [] as string[], // "What do you want from this community?" buttons
    successMessage: "",
    // Step 4 - Career
    whatLooking: [] as string[], // multi-select: Full-time job, Internship, etc.
    engagementPreference: "",
    opportunity: "", // single selected opportunity label
    // Step 5 - Connect
    hubs: "", // single hub name string
    region: "",
    impactNewsletter: true,
    localNotification: true,
    updateFrequency: "Weekly",
    tellAbout: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});

  const buildPayload = () => ({
    name: formData.name,
    email: formData.email,
    city: formData.city,
    country: formData.country,
    link: formData.link,
    climateJourney: formData.climateJourney,
    message: formData.message,
    interest: formData.interest,
    goals: formData.goals,
    successMessage: formData.successMessage,
    whatLooking: formData.whatLooking,
    engagementPreference: formData.engagementPreference,
    opportunity: formData.opportunity,
    hubs: formData.hubs,
    region: formData.region,
    impactNewsletter: formData.impactNewsletter,
    localNotification: formData.localNotification,
    updateFrequency: formData.updateFrequency,
    tellAbout: formData.tellAbout,
  });

  const validateCurrentStep = () => {
    const schema = stepSchemas[currentStep as keyof typeof stepSchemas];
    if (!schema) return true;

    const result = schema.safeParse(formData);

    if (result.success) {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        Object.keys(result.data).forEach((key) => {
          delete nextErrors[key as keyof typeof formData];
        });
        return nextErrors;
      });
      return true;
    }

    const fieldErrors = result.error.flatten().fieldErrors;

    setErrors((prev) => {
      const nextErrors = { ...prev };

      Object.keys(schema.shape).forEach((key) => {
        const message = fieldErrors[key as keyof typeof fieldErrors]?.[0];
        if (message) {
          nextErrors[key as keyof typeof formData] = message;
        } else {
          delete nextErrors[key as keyof typeof formData];
        }
      });

      return nextErrors;
    });

    return false;
  };

  const nextStep = async () => {
    if (!validateCurrentStep()) return;

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const payload = buildPayload();
      try {
        if (token) {
          const res = await createSurvey(payload, token);
          toast.success(res.message);

          if (res.success) {
            router.push("/survey/success");
          }
        }
      } catch (error: any) {
        toast.error(error.message);
        console.error(error);
      }
    }
  };

  const prevStep = () => setCurrentStep(Math.max(0, currentStep - 1));

  const updateField = (field: string, value: any) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Toggle for interest[] and goals[]
  const toggleArrayItem = (
    field: "interest" | "goals" | "whatLooking",
    item: string,
  ) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i: string) => i !== item)
        : [...prev[field], item],
    }));
  };

  const renderError = (field: keyof typeof formData) =>
    errors[field] ? (
      <p className="mt-1 text-xs font-medium text-red-500">{errors[field]}</p>
    ) : null;

  return (
    <div className="min-h-screen !max-w-2xl flex flex-col items-center justify-center py-10 font-sans text-[#003D3D]">
      {/* Progress Bar */}
      {currentStep > 0 && (
        <div className="w-full  px-6 mb-8">
          <div className="flex justify-between text-xs font-bold mb-2">
            <span className="text-[#007A7A]">Step {currentStep} / 5</span>
            <span className="text-gray-400 uppercase tracking-tighter">
              {STEPS[currentStep]}
            </span>
          </div>
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#004D4D] transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>
      )} 
      <Card className="w-full max-w-3xl p-10 shadow-sm border-none rounded-3xl bg-white">
        {/* STEP 0: WELCOME */}
        {currentStep === 0 && (
          <div className="flex flex-col items-center text-center">
            <div className="rounded-2xl overflow-hidden mb-8 w-full">
              <Image
                width={800}
                height={400}
                src="/images/survey.png"
                alt="Climate Scene"
                className="w-full h-[280px] object-cover"
              />
            </div>
            <h1 className="text-4xl font-black mb-4 text-black leading-tight">
              Welcome to Your <br />
              <span className="text-[#004242]">Climate Journey 🌍</span>
            </h1>
            <p className="text-gray-500 mb-8 max-w-md">
              You&apos;re joining a global community working toward climate
              action. Let&apos;s personalize your experience.
            </p>
            <Button
              onClick={nextStep}
              className="w-full bg-[#004D4D] hover:bg-[#003333] h-14 text-lg rounded-xl font-bold transition-all"
            >
              Get Started
            </Button>
            <p className="text-xs text-gray-400 mt-4">
              Takes less than 2 minutes to set up
            </p>
          </div>
        )} 
        {/* STEP 1: IDENTITY */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-3xl font-black mb-2 text-[#002A2A]">
                Tell us who you are.
              </h2>
              <p className="text-gray-500 text-sm">
                We use this information to connect you with local initiatives
                and track your collective impact.
              </p>
            </div>
            <div className="space-y-8">
              <div className="space-y-1">
                <Label className="uppercase text-[10px] font-bold tracking-widest text-[#004242]">
                  Full Name
                </Label>
                <Input
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Your full name"
                  className="bg-[#F1F4F4] border-none h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-[#004D4D]"
                />
                {renderError("name")}
              </div>
              <div className="space-y-1">
                <Label className="uppercase text-[10px] font-bold tracking-widest text-[#004242]">
                  Email Address
                </Label>
                <Input
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="you@example.com"
                  className="bg-[#F1F4F4] border-none h-12 rounded-xl"
                />
                {renderError("email")}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="uppercase text-[10px] font-bold tracking-widest text-[#004242]">
                    City
                  </Label>
                  <Input
                    value={formData.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    placeholder="Dhaka"
                    className="bg-[#F1F4F4] border-none h-12 rounded-xl"
                  />
                  {renderError("city")}
                </div>
                <div className="space-y-1">
                  <Label className="uppercase text-[10px] font-bold tracking-widest text-[#004242]">
                    Country
                  </Label>
                  <Input
                    value={formData.country}
                    onChange={(e) => updateField("country", e.target.value)}
                    placeholder="Bangladesh"
                    className="bg-[#F1F4F4] border-none h-12 rounded-xl"
                  />
                  {renderError("country")}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="uppercase text-[10px] font-bold tracking-widest text-[#004242]">
                  LinkedIn / Website
                </Label>
                <Input
                  value={formData.link}
                  onChange={(e) => updateField("link", e.target.value)}
                  placeholder="https://linkedin.com/in/yourname"
                  className="bg-[#F1F4F4] border-none h-12 rounded-xl"
                />
                {renderError("link")}
              </div>
            </div>
          </div>
        )}
        {/* STEP 2: JOURNEY */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-3xl text-[#002A2A] font-black mb-6">
              Where are you in your climate journey?
            </h2>
            {/* maps to: climateJourney */}
            <div className="space-y-4">
              {[
                { id: "started", label: "🌱 Just getting started" },
                { id: "learning", label: "📚 Learning & exploring" },
                { id: "working", label: "👱‍♀️ Working in climate (0–3 years)" },
                { id: "exp", label: "🌎 Experienced professional (3+ years)" },
                { id: "founder", label: "🚀 Founder / building something" },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => updateField("climateJourney", opt.label)}
                  className={`p-4 rounded-xl cursor-pointer border-2 transition-all ${
                    formData.climateJourney === opt.label
                      ? "bg-white border-[#003D3D] shadow-sm"
                      : "bg-[#F1F4F4] border-transparent"
                  }`}
                >
                  <span className="text-sm font-bold">{opt.label}</span>
                </div>
              ))}
            </div>
            {renderError("climateJourney")}
            {/* maps to: message */}
            <div className="mt-6">
              <Label className="font-bold mb-2 text-[#002A2A] text-[20px] hero-font block">
                How are you currently involved in climate?
              </Label>
              <Textarea
                className="bg-[#F1F4F4] border-none min-h-[100px] rounded-xl"
                placeholder="Tell us about your current involvement..."
                value={formData.message}
                onChange={(e) => updateField("message", e.target.value)}
              />
              {renderError("message")}
            </div>
          </div>
        )}

        {/* STEP 3: INTERESTS */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl text-[#004242] text-[30px] font-black uppercase tracking-tight">
                What sparks your interest?
              </h2>
              <p>
                Select the areas of climate action you&apos;re most passionate
                about or currently working in.
              </p>
            </div>

            {/* maps to: interest[] */}
            <div className="grid grid-cols-2 gap-3">
              {[
                "Climate Science",
                "Climate Policy & Advocacy",
                "Climate Justice",
                "Climate Finance",
                "Adaptation & Mitigation",
                "Oceans & Biodiversity",
                "Renewable Energy",
                "Climate Communication",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center space-x-3 bg-[#F1F4F4] p-4 rounded-xl"
                >
                  <Checkbox
                    id={item}
                    className="bg-transparent"
                    checked={formData.interest.includes(item)}
                    onCheckedChange={() => toggleArrayItem("interest", item)}
                  />
                  <Label htmlFor={item} className="text-sm  cursor-pointer">
                    {item}
                  </Label>
                </div>
              ))}
            </div>
            {renderError("interest")}

            {/* maps to: goals[] */}
            <div>
              <h2 className="text-lg hero-font text-[#004242] font-bold mb-4">
                What do you want from this community?
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Learning", icon: BookOpen },
                  { label: "Networking", icon: Users },
                  { label: "Career", icon: Briefcase },
                  { label: "Mentorship", icon: Lightbulb },
                  { label: "Build projects", icon: Rocket },
                  { label: "Stay informed", icon: Globe },
                ].map((goal) => (
                  <button
                    key={goal.label}
                    onClick={() => toggleArrayItem("goals", goal.label)}
                    className={`flex flex-col items-center p-4 rounded-xl transition-all border ${
                      formData.goals.includes(goal.label)
                        ? "bg-[#E6F2F2] border-[#004D4D]"
                        : "bg-gray-50 border-transparent"
                    }`}
                  >
                    <goal.icon className="w-6 h-6 mb-2 text-[#004D4D]" />
                    <span className="text-[10px] font-bold uppercase">
                      {goal.label}
                    </span>
                  </button>
                ))}
              </div>
              {renderError("goals")}
            </div>

            {/* maps to: successMessage */}
            <div>
              <h2 className="text-lg hero-font text-[#004242] mb-4">
                What would success look like in 3 months?
              </h2>
              <Textarea
                value={formData.successMessage}
                onChange={(e) => updateField("successMessage", e.target.value)}
                placeholder="Imagine your climate impact journey..."
                className="bg-[#F1F4F4] min-h-[100px] border-none rounded-xl"
              />
              {renderError("successMessage")}
            </div>
          </div>
        )}

        {/* STEP 4: CAREER */}
        {currentStep === 4 && (
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl text-[#002A2A] mb-4 font-black uppercase">
                Career & Community
              </h2>
              <p>
                Align your professional growth with your environmental values.
              </p>
            </div>

            {/* maps to: whatLooking[] — multi-select */}
            <div>
              <Label className="font-bold text-2xl hero-font text-[#246679] block mb-3">
                What are you looking for?
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Full-time job",
                  "Internship",
                  "Career switch",
                  "Co-founder",
                  "Funding",
                  "Collaboration",
                  "Mentorship",
                  "Learning resources",
                ].map((opt) => (
                  <div
                    key={opt}
                    onClick={() => toggleArrayItem("whatLooking", opt)}
                    className={`flex items-center space-x-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${
                      formData.whatLooking.includes(opt)
                        ? "bg-white border-[#003D3D] shadow-sm"
                        : "bg-[#F1F4F4] border-transparent"
                    }`}
                  >
                    <Checkbox
                      checked={formData.whatLooking.includes(opt)}
                      onCheckedChange={() =>
                        toggleArrayItem("whatLooking", opt)
                      }
                    />
                    <Label className="text-sm font-bold cursor-pointer">
                      {opt}
                    </Label>
                  </div>
                ))}
              </div>
              {renderError("whatLooking")}
            </div>

            {/* maps to: engagementPreference */}
            <div className="space-y-2">
              <Label className="font-bold text-xl hero-font text-[#246679] block mb-3">
                Engagement preference
              </Label>
              <div className="flex rounded-lg p-1 gap-3.5 border ">
                {[
                  "Mostly read",
                  "Occasionally contribute",
                  "Actively participate",
                  "Lead / host",
                ].map((pref) => (
                  <button
                    key={pref}
                    onClick={() => updateField("engagementPreference", pref)}
                    className={`flex-1  text-[10px] py-2 px-1  rounded-md font-bold uppercase transition-all ${
                      formData.engagementPreference === pref
                        ? "bg-white border border-[#003D3D] shadow-sm text-[#003D3D]"
                        : "text-gray-400 border "
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
              {renderError("engagementPreference")}
            </div>

            {/* maps to: opportunity (single string) */}
            <div>
              <Label className="font-bold text-xl hero-font text-[#246679] block mb-3">
                Open to climate opportunities
              </Label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "Mentorship", icon: BookOpen },
                  { label: "Speaking", icon: Users },
                  { label: "Ambassador", icon: Globe },
                  { label: "Writing", icon: Lightbulb },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() =>
                      updateField(
                        "opportunity",
                        formData.opportunity === item.label ? "" : item.label,
                      )
                    }
                    className={`flex flex-col items-center p-4 rounded-xl transition-all border-2 ${
                      formData.opportunity === item.label
                        ? "bg-white border-[#003D3D]"
                        : "bg-[#F1F4F4] border-transparent"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-tighter">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
              {renderError("opportunity")}
            </div>
          </div>
        )}

        {/* STEP 5: CONNECT */}
        {currentStep === 5 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* maps to: hubs (single string) */}
            <section>
              <div className="mb-10">
                <h3 className="text-4xl text-[#002A2A] mb-2">
                  Connect & Communicate
                </h3>
                <p className="text-[#404848]">
                  Tailor your experience to stay informed about the climate
                  actions that matter most to you.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Welcome Hub", icon: Sparkles },
                  { label: "Learning Hub", icon: GraduationCap },
                  { label: "Careers & Jobs", icon: Briefcase },
                  { label: "Events & Social", icon: PartyPopper },
                ].map((hub) => (
                  <HubCard
                    key={hub.label}
                    icon={hub.icon}
                    label={hub.label}
                    selected={formData.hubs === hub.label}
                    onClick={() =>
                      updateField(
                        "hubs",
                        formData.hubs === hub.label ? "" : hub.label,
                      )
                    }
                  />
                ))}
                <div className="col-span-2">
                  <HubCard
                    icon={Users}
                    label="Community"
                    selected={formData.hubs === "Community"}
                    onClick={() =>
                      updateField(
                        "hubs",
                        formData.hubs === "Community" ? "" : "Community",
                      )
                    }
                  />
                </div>
              </div>
              {renderError("hubs")}
            </section>

            {/* maps to: region */}
            <section>
              <h3 className="text-lg font-black text-[#003D3D] mb-4">
                Your Primary Region
              </h3>
              <Select
                value={formData.region}
                onValueChange={(val) => updateField("region", val)}
              >
                <SelectTrigger className="w-full h-14 bg-[#F1F4F4] border-none rounded-xl text-[#003D3D] font-bold">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia">Asia</SelectItem>
                  <SelectItem value="North America">North America</SelectItem>
                  <SelectItem value="Europe">Europe</SelectItem>
                  <SelectItem value="Africa">Africa</SelectItem>
                  <SelectItem value="South America">South America</SelectItem>
                  <SelectItem value="Oceania">Oceania</SelectItem>
                </SelectContent>
              </Select>
              {renderError("region")}
            </section>

            {/* maps to: impactNewsletter, localNotification */}
            <section className="space-y-4">
              <h3 className="text-lg font-black text-[#003D3D]">
                Communication Preferences
              </h3>
              <div className="flex items-center justify-between p-4 bg-[#F1F4F4] rounded-xl">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#003D3D]" />
                  <span className="text-sm font-bold">
                    Climate Impact Newsletter
                  </span>
                </div>
                <Switch
                  checked={formData.impactNewsletter}
                  onCheckedChange={(val) =>
                    updateField("impactNewsletter", val)
                  }
                  className="data-[state=checked]:bg-[#003D3D]"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-[#F1F4F4] rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-[#003D3D]" />
                  <span className="text-sm font-bold">
                    Local Event Notifications
                  </span>
                </div>
                <Switch
                  checked={formData.localNotification}
                  onCheckedChange={(val) =>
                    updateField("localNotification", val)
                  }
                  className="data-[state=checked]:bg-[#003D3D]"
                />
              </div>
            </section>

            {/* maps to: updateFrequency */}
            <section>
              <h3 className="text-lg font-black text-[#003D3D] mb-4">
                Update Frequency
              </h3>
              <Select
                value={formData.updateFrequency}
                onValueChange={(val) => updateField("updateFrequency", val)}
              >
                <SelectTrigger className="w-full h-14 bg-[#F1F4F4] border-none rounded-xl text-[#003D3D] font-bold">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              {renderError("updateFrequency")}
            </section>

            {/* maps to: tellAbout */}
            <section>
              <h3 className="text-lg font-black text-[#003D3D] mb-4">
                Tell us something unique about you 🌍
              </h3>
              <Textarea
                value={formData.tellAbout}
                onChange={(e) => updateField("tellAbout", e.target.value)}
                placeholder="How did you find us? What drives you?"
                className="bg-[#F1F4F4] border-none rounded-2xl min-h-[100px]"
              />
              {renderError("tellAbout")}
            </section>
          </div>
        )}

        {/* Footer Buttons */}
        {currentStep > 0 && (
          <div className="flex justify-between items-center pt-6 border-t border-gray-100">
            <button
              onClick={prevStep}
              className="flex items-center text-sm font-black text-gray-400 hover:text-[#004D4D] transition-colors uppercase tracking-widest"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </button>
            <Button
              onClick={nextStep}
              className="bg-[#004D4D] hover:bg-[#003333] px-10 py-6 rounded-xl font-bold shadow-lg shadow-[#004d4d2e]"
            >
              {currentStep === 5 ? "Finish & Submit" : "Next"}{" "}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
