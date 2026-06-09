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
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormType = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

//   const { mutate, isPending } = useMutation({
//     mutationFn: async (values: FormType) => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             firstName: values.firstName,
//             lastName: values.lastName,
//             email: values.email,
//             password: values.password,
//           }),
//         },
//       );

//       const data = await res.json();
//  console.log(data)
//       if (!res.ok) throw new Error(data?.message || "Registration failed");
//       return data;
//     },
//     onSuccess: () => {

//       toast.success("Account created successfully!");
//       router.push("/survey");
//     },
//     onError: (error) => {
//       toast.error(error.message);
//     },
//   });


const { mutate, isPending } = useMutation({
  mutationFn: async (values: FormType) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Registration failed");
    }

    return {
      response: data,
      values,
    };
  },

  onSuccess: async ({ values }) => {
    toast.success("Account created successfully!");

    // AUTO LOGIN
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (res?.error) {
      toast.error(res.error);
      return;
    }

    router.push("/survey");
  },

  onError: (error) => {
    toast.error(error.message);
  },
});

  const onSubmit = (values: FormType) => {
    mutate(values);
  };

  return (
    <div className="lg:max-w-[540px] w-full bg-white rounded-[24px] p-8 md:p-10 shadow-2xl mx-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] text-[#053535] leading-tight">
          Create your Account
        </h1>
        <p className="text-[#6B9096] text-[14px] mt-2">
          Join the premium ticketing experience.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-[#053535] text-sm font-medium">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Olivia"
                      className="h-11 border-gray-100 rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-[#053535] text-sm font-medium">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Karp"
                      className="h-11 border-gray-100 rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
                    className="h-11 border-gray-100 rounded-lg"
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
                      placeholder="Create a password"
                      className="h-11 border-gray-100 rounded-lg pr-12"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
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
                      className="h-11 border-gray-100 rounded-lg pr-12"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
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

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0 py-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-gray-300 rounded data-[state=checked]:bg-[#053535] data-[state=checked]:border-[#053535]"
                  />
                </FormControl>
                <FormLabel className="text-[13px] text-gray-500 font-normal">
                  I agree to the{" "}
                  <span className="text-[#053535] font-medium cursor-pointer">
                    Terms of services
                  </span>{" "}
                  and{" "}
                  <span className="text-[#053535] font-medium cursor-pointer">
                    Privacy Policy
                  </span>
                </FormLabel>
              </FormItem>
            )}
          />

          <Button
            disabled={isPending}
            type="submit"
            className="h-12 w-full bg-[#053535] hover:bg-[#042a2a] text-white rounded-lg text-base font-semibold transition-all"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Sign Up"}
          </Button>
        </form>
      </Form>

      {/* Divider */}
      {/* <div className="relative my-6">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
        <div className="relative flex justify-center text-[12px]"><span className="bg-white px-3 text-gray-400">Or continue with email</span></div>
      </div> */}

      {/* Social Grid */}
      {/* <div className="grid grid-cols-4 gap-3 mb-8">
        {["google", "facebook", "linkedin", "apple"].map((social) => (
          <Button key={social} variant="outline" className="h-12 w-full rounded-lg border-gray-100 p-0 hover:bg-gray-50 flex items-center justify-center">
            <Image src={`/icons/${social}.svg`} width={20} height={20} alt={social} />
          </Button>
        ))}
      </div> */}

      <div className="text-center mt-3">
        <p className="text-[14px] text-gray-400">
          Already a Member?{" "}
          <Link href="/login" className="text-[#053535]  hover:underline ml-1">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
