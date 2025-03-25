import { Typography } from "@/components/typography";
import { LucideIcon } from "lucide-react";

export interface FeatureHighlightProps {
  headline: string;
  description: string;
  icon: LucideIcon;
}

interface FeatureHighlightComponentProps {
  features?: FeatureHighlightProps[];
}

// Reusable FeatureItem Component
const FeatureItem = ({ headline, description, icon: Icon }: FeatureHighlightProps) => {
  return (
    <div className="flex items-start gap-2 sm:gap-6">
      <div className="bg-foreground flex h-12 w-12 items-center justify-center rounded-full p-2 text-white">
        <Icon className="h-8 w-8" />
      </div>
      <div className="w-11/12">
        <Typography variant="h3" className="pb-2 text-xl font-bold">
          {headline}
        </Typography>
        <Typography className="text-base leading-7 sm:text-lg">{description}</Typography>
      </div>
    </div>
  );
};

// Main FeatureHighlight Component (Now Handles Undefined Features)
export const FeatureHighlight = ({ features = [] }: FeatureHighlightComponentProps) => {
  if (features.length === 0) {
    return <p className="text-center text-gray-500">No features available.</p>;
  }

  return (
    <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 py-16 sm:grid-cols-3 sm:py-24">
      {features.map((feature, index) => (
        <FeatureItem key={index} {...feature} />
      ))}
    </div>
  );
};
