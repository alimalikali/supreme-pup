import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: ReactNode;
}

export const Button = ({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        // Variants
        variant === "primary" ? "bg-black text-white hover:bg-gray-800 focus:ring-gray-600" : "",
        variant === "secondary" ? "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500" : "",
        variant === "outline"
          ? "border border-gray-400 text-gray-800 hover:bg-gray-100 focus:ring-gray-400"
          : "",
        variant === "ghost"
          ? "text-gray-600 hover:bg-gray-200 focus:ring-gray-300 dark:text-gray-300 dark:hover:bg-gray-800"
          : "",
        variant === "destructive"
          ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
          : "",
        // Sizes
        size === "sm" ? "px-3 py-1.5 text-sm rounded-md" : "",
        size === "md" ? "px-5 py-2 text-base rounded-lg" : "",
        size === "lg" ? "px-6 py-3 text-lg rounded-xl" : "",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : icon}
      {children}
    </button>
  );
};
