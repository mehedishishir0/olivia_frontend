/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormType = z.infer<typeof formSchema>;

const ForgotPasswordForm = () => {
  const router = useRouter();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: async (payload: FormType) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Something went wrong");
      }
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "OTP sent successfully!");
      const accessToken = data?.data?.accessToken;

      if (!accessToken) {
        toast.error("Access token not found.");
        return;
      }

      router.push(`/otp?token=${encodeURIComponent(accessToken)}`);
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });

  async function onSubmit(payload: FormType) {
    try {
      await mutateAsync(payload);
    } catch (error) {
      console.log(`error : ${error}`);
    }
  }

  return (
    <div className="lg:max-w-[500px] bg-white rounded-[24px] p-8 md:p-10 shadow-2xl mx-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] text-[#053535] leading-tight">
          Forgot Password
        </h1>
        <p className="text-[#6B9096] text-[14px] mt-3 leading-relaxed">
          Please enter the email address linked to your account. We&apos;ll send
          a one-time password (OTP) to your email for verification.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-[#053535] text-sm font-medium">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="hello@example.com"
                    className="h-12 border border-gray-200 bg-white rounded-lg focus-visible:ring-1 focus-visible:ring-[#053535] placeholder:text-gray-300"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isPending}
            type="submit"
            className="h-12 w-full bg-[#053535] hover:bg-[#042a2a] text-white rounded-lg text-base font-semibold transition-all active:scale-[0.98]"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending...
              </div>
            ) : (
              "Send OTP"
            )}
          </Button>
        </form>
      </Form>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-[14px] text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-[#053535]  hover:underline ml-1"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
