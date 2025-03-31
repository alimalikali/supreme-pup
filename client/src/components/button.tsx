import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: ReactNode;
}

export const Button = ({ className, variant = "primary", size = "md", isLoading = false, icon, children, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition duration-200 focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        // Variants
        variant === "primary" ? "bg-black text-white hover:bg-gray-800 focus:ring-gray-600" : "",
        variant === "secondary" ? "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500" : "",
        variant === "outline" ? "border border-gray-400 text-gray-800 hover:bg-gray-100 focus:ring-gray-400" : "",
        variant === "ghost" ? "text-gray-600 hover:bg-gray-200 focus:ring-gray-300 dark:text-gray-300 dark:hover:bg-gray-800" : "",
        variant === "destructive" ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500" : "",
        // Sizes
        size === "sm" ? "rounded-md px-3 py-1.5 text-sm" : "",
        size === "md" ? "rounded-lg px-5 py-2 text-base" : "",
        size === "lg" ? "rounded-xl px-6 py-3 text-lg" : "",
        className,
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : icon}
      {children}
    </button>
  );
};
