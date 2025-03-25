"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Typography } from "@/components/typography";
import { useSignupMutation } from "@/lib/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Register = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [signup] = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // ✅ Submit Handler
  const onSubmit = async (data: any) => {
    try {
      await signup(data).unwrap(); // ✅ Call RTK Mutation
      toast.success("Sign Up successful!");
      router.push("/");
      setLoading(true);
    } catch (err) {
      console.error("Signup failed:", err);
      toast.error("Sign Up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <Typography variant="h1" className="text-accent mb-2 text-center text-3xl font-bold">
          Pup Shop
        </Typography>
        <Typography variant="h1" className="text-foreground mb-6 text-center">
          Shop Anything
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label className="text-accent" htmlFor="name">
              Full Name
            </Label>
            <Input id="name" type="text" placeholder="John Doe" {...register("name")} className="text-accent w-full rounded-md border border-gray-300 bg-white p-2" />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <Label className="text-accent" htmlFor="email">
              Email
            </Label>
            <Input id="email" type="email" placeholder="example@email.com" {...register("email")} className="text-accent w-full rounded-md border border-gray-300 bg-white p-2" />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <Label className="text-accent" htmlFor="password">
              Password
            </Label>
            <Input id="password" type="password" placeholder="********" {...register("password")} className="text-accent w-full rounded-md border border-gray-300 bg-white p-2" />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="bg-foreground hover:bg-accent mt-4 w-full rounded-md p-2 text-white" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign Up"}
          </Button>
        </form>

        <Typography variant="h1" className="mt-4 text-center">
          Already a member?{" "}
          <Link href="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default Register;
