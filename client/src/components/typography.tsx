import { cn } from "@/lib/utils";
import { ElementType, ReactNode } from "react";

type TypographyProps = {
  variant?: ElementType;
  className?: string;
  children: ReactNode;
};

export const Typography = ({ variant: Tag = "p", className, children }: TypographyProps) => {
  return <Tag className={cn(className)}>{children}</Tag>;
};
