"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Typography } from "@/components/typography";
import { useLoginMutation } from "@/global/features/auth/authApi";
import { authFailure, authStart, authSuccess } from "@/global/features/auth/authSlice";
import { useAppDispatch } from "@/global/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// ✅ Validation Schema using Zod
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation(); // ✅ RTK Query mutation hook

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      dispatch(authStart());
      const userData = await login(data).unwrap();
      dispatch(authSuccess(userData));
      toast.success("Login successful!");
      router.push("/");
    } catch (e: any) {
      dispatch(authFailure(e.data?.message || "Login failed. Please try again."));
      toast.error(e.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('/assets/images/bg.jpg')] px-4">
      <div className="absolute top-1/2 left-1/2 h-fit w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-[17px] border-[5px] border-white/0 bg-white/10 p-5 shadow-[0_0_40px_rgba(129,236,174,0.6)] backdrop-blur-sm">
        <Typography variant="h1" className="mb-2 text-center text-3xl font-bold text-white">
          Pup Shop
        </Typography>
        <Typography variant="h1" className="mb-6 text-center text-white/70">
          Welcome Back
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label className="text-white" htmlFor="email">
              Email
            </Label>
            <Input id="email" type="email" placeholder="example@email.com" {...register("email")} className="w-full rounded-md border border-gray-500 bg-transparent p-2 text-white" />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <Label className="text-white" htmlFor="password">
              Password
            </Label>
            <Input id="password" type="password" placeholder="********" {...register("password")} className="w-full rounded-md border border-gray-500 bg-transparent p-2 text-white" />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="bg-foreground hover:bg-accent mt-4 w-full rounded-md p-2 text-white" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Login"}
          </Button>
        </form>

        <Typography variant="h1" className="mt-4 text-center text-white/70">
          New to Pup Shop?{" "}
          <Link href="/signup" className="text-red-500 hover:underline">
            Sign Up
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default Login;
