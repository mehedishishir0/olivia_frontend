/* eslint-disable react-hooks/set-state-in-effect */
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
import { useForm } from "react-hook-form";
import z from "zod";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password should be at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormType = z.infer<typeof formSchema>;

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(decodeURIComponent(tokenParam));
    }
  }, [searchParams]);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: async (payload: FormType) => {
      if (!token) {
        throw new Error("Access token not found.");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newPassword: payload.newPassword }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Something went wrong");
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Password reset successful!");
      router.push(`/login`);
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
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-[28px] text-[#053535] leading-tight">
          New Password
        </h1>
        <p className="text-[#6B9096] text-[14px] mt-1 leading-relaxed">
          Please create your new password
        </p>
      </div>

      {/* Form Section */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-[#053535] text-sm font-medium">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="h-11 border border-gray-100 bg-white rounded-lg pr-12 focus-visible:ring-1 focus-visible:ring-[#053535] placeholder:text-gray-300"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-[#053535] text-sm font-medium">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      className="h-11 border border-gray-100 bg-white rounded-lg pr-12 focus-visible:ring-1 focus-visible:ring-[#053535] placeholder:text-gray-300"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isPending}
            type="submit"
            className="h-12 w-full bg-[#053535] hover:bg-[#042a2a] text-white rounded-lg text-base font-semibold transition-all active:scale-[0.98] mt-2"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Changing...
              </div>
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </Form>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-[14px] text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-[#053535]  hover:underline ml-1">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
