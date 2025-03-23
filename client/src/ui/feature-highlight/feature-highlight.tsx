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
      <div className="w-12 h-12 flex items-center justify-center bg-foreground text-white rounded-full p-2">
        <Icon className="w-8 h-8" />
      </div>
      <div className="w-11/12">
        <Typography variant="h3" className="text-xl font-bold pb-2">
          {headline}
        </Typography>
        <Typography className="text-base sm:text-lg leading-7">
          {description}
        </Typography>
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
    <div className="grid grid-cols-1 sm:grid-cols-3 py-16 sm:py-24 gap-8">
      {features.map((feature, index) => (
        <FeatureItem key={index} {...feature} />
      ))}
    </div>
  );
};
