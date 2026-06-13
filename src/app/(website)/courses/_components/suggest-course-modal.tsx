/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Validation Schema
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  category: z.string().min(1, "Please select a category"),
  skillLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
  description: z.string().min(20, "Description should be more detailed"),
  keyTopics: z.string().min(1, "Enter at least one topic"),
  whoIsThisCourseFor: z.string().min(1, "Please specify the audience"),
  yourName: z.string().min(2, "Name is required"),
  yourEmail: z.string().email("Invalid email address"),
  isCollabInterested: z.string().min(1, "Please answer yes or no"),
});

type FormValues = z.infer<typeof formSchema>;

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SuggestCourseModal = ({ open, onOpenChange }: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      skillLevel: "Beginner",
      description: "",
      keyTopics: "",
      whoIsThisCourseFor: "",
      yourName: "",
      yourEmail: "",
      isCollabInterested: "No" as any,
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!token) {
      toast.error("Please login to submit a course idea.");
      onOpenChange(false);
      router.push("/login");
      return;
    }

    try {
      setIsLoading(true);

      // Backend expects keyTopics as an array and isCollabInterested as boolean
      const payload = {
        ...values,
        keyTopics: values.keyTopics.split(",").map((s) => s.trim()),
        isCollabInterested: values.isCollabInterested.toLowerCase() === "yes",
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/courseIdea/submit-idea`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        toast.success("Course idea submitted successfully!");
        form.reset();
        onOpenChange(false);
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-3xl text-[#004242]">
            Suggest a Course Idea
          </DialogTitle>
          <DialogDescription className="text-gray-500 lg:max-w-lg mx-auto">
            Help us build new climate courses for our community.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title Idea</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Solar Energy Basics" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Renewable Energy">
                          Renewable Energy
                        </SelectItem>
                        <SelectItem value="Climate Policy">
                          Climate Policy
                        </SelectItem>
                        <SelectItem value="Sustainable Agriculture">
                          Sustainable Agriculture
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Skill Level */}
              <FormField
                control={form.control}
                name="skillLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill Level</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex border rounded-md p-1"
                      >
                        {["Beginner", "Intermediate", "Advanced"].map(
                          (level) => (
                            <div key={level} className="flex-1">
                              <RadioGroupItem
                                value={level}
                                id={level}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={level}
                                className="flex items-center justify-center py-2 text-sm rounded-sm cursor-pointer peer-data-[state=checked]:bg-gray-100 peer-data-[state=checked]:text-[#004242]"
                              >
                                {level}
                              </Label>
                            </div>
                          ),
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the course impact..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Key Topics */}
            <FormField
              control={form.control}
              name="keyTopics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Topics (comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="Topic 1, Topic 2, Topic 3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Audience */}
            <FormField
              control={form.control}
              name="whoIsThisCourseFor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Who Is This Course For?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Students, Policy Makers"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="yourName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yourEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="hello@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isCollabInterested"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you want to collaborate?</FormLabel>
                  <FormControl>
                    <Input placeholder="Yes/No" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-[#004242] hover:bg-[#003333] text-white py-6 text-lg"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Submit Course Idea"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SuggestCourseModal;
