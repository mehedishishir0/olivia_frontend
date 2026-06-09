"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { getSession, signIn } from "next-auth/react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters." }),
  rememberMe: z.boolean().optional(),
});

type FormType = z.infer<typeof formSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleSignIn = async (payload: FormType) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: payload.email,
        password: payload.password,
        redirect: false,
      });
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      router.push("/");
      toast.success("Login successful!");
    } catch (error) {
      console.error(`login error : ${error}`);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  async function onSubmit(payload: FormType) {
    await handleSignIn(payload);
  }

  return (
    <div className="lg:max-w-[500px] bg-white rounded-[24px] p-8 md:p-10 shadow-2xl mx-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] text-[#053535] leading-tight">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-[14px] mt-2">
          Enter your credentials to mange your attractions.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                    placeholder="hello@example.com"
                    className="h-11 border border-gray-100 bg-white rounded-lg focus-visible:ring-1 focus-visible:ring-[#053535] placeholder:text-gray-300"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-[#053535] text-sm font-medium">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
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

          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                className="w-4 h-4 border-gray-300 rounded data-[state=checked]:bg-[#053535] data-[state=checked]:border-[#053535]"
              />
              <label
                htmlFor="remember"
                className="text-[13px] text-[#053535] font-medium cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-[13px] font-medium text-[#008080] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="h-12 w-full bg-[#053535] hover:bg-[#042a2a] text-white rounded-lg text-base font-semibold transition-all active:scale-[0.98]"
          >
            {isLoading ? <Spinner className="mr-2" /> : "Sign In"}
          </Button>
        </form>
      </Form>
      {/* Footer */}
      <div className="text-center mt-5">
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

export default LoginForm;
