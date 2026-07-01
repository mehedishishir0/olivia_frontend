/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import {  useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be 6 characters." }),
});

type FormType = z.infer<typeof formSchema>;

const OtpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isResending, setIsResending] = useState(false);

  // Derive token from search params to avoid setting state inside an effect
  const token = (() => {
    const tokenParam = searchParams.get("token");
    return tokenParam ? decodeURIComponent(tokenParam) : null;
  })();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: async (payload: FormType) => {
      if (!token) {
        throw new Error("Access token not found.");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Something went wrong");
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "OTP Verified!");
      const accessToken = data?.data?.accessToken;
      router.push(
        accessToken
          ? `/reset-password?token=${encodeURIComponent(accessToken)}`
          : "/reset-password",
      );
    },
    onError: (error: any) => {
      toast.error(error?.message);
      form.setValue("otp", "");
    },
  });

  const handleResendOTP = async () => {
    if (!token) {
      toast.error("Access token not found.");
      return;
    }
    try {
      setIsResending(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/resend-forgot-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) throw new Error("Failed to resend OTP");
      toast.success("OTP resent successfully!");
      form.setValue("otp", "");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="lg:max-w-[500px] bg-white rounded-[24px] p-8 md:p-10 shadow-2xl mx-4">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-[28px] text-[#053535] leading-tight">Enter OTP</h1>
        <p className="text-[#6B9096] text-[14px] mt-3 leading-relaxed">
          An OTP has been sent to your email address please verify it below
        </p>
      </div>

      {/* OTP Card Content */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((val) => mutateAsync(val))}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="flex gap-2 sm:gap-3">
                      {[...Array(6)].map((_, i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className="h-[55px] w-[42px] sm:h-[65px] sm:w-[55px] bg-[#F4F9F9] border-none rounded-lg text-xl  text-[#053535] focus:ring-1 focus:ring-[#053535]"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-center">
            <p className="text-sm text-gray-400 flex items-center justify-center gap-1">
              Didn&apos;t Receive OTP?
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isResending}
                className="text-[#053535]  hover:underline disabled:opacity-50"
              >
                {isResending ? "Resending..." : "Resend OTP"}
              </button>
            </p>
          </div>

          <Button
            disabled={isPending}
            type="submit"
            className="h-12 w-full bg-[#053535] hover:bg-[#042a2a] text-white rounded-lg text-base font-semibold transition-all active:scale-[0.98]"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Verifying...
              </div>
            ) : (
              "Verify"
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

export default OtpForm;
