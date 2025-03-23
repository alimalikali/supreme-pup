import CustomImage from "@/components/image";
import { Typography } from "@/components/typography";
import clsx from "clsx";

interface ImageProps {
  src: string;
  alt: string;
}

interface ImageDataset {
  heading: string;
  description: string;
  imageGrid: ImageProps[];
}

interface PictureGridProps {
  datasetGrid?: ImageDataset;
}

export const PictureGrid = ({
    datasetGrid = { heading: "Your Ultimate Destination for Smart Shopping", description: "" ,imageGrid: [] },
}: PictureGridProps) => {
  return (
    <div className="flex flex-col items-center max-w-screen-2xl mx-auto gap-10">
      <div className="flex flex-col justify-center items-center gap-5">
        <Typography
          variant="h1"
          className="text-4xl md:text-5xl font-bold text-foreground max-w-3xl text-center"
        >
          {datasetGrid.heading}
        </Typography>

        <Typography
          variant="p"
          className="text-lg text-accent max-w-2xl text-center"
        >
         {datasetGrid.description}
        </Typography>
      </div>

      {!!datasetGrid.imageGrid?.length && (
        <div className="grid gap-8 sm:grid-cols-7 auto-rows-[30vh] w-full h-auto pb-24">
          {datasetGrid.imageGrid.slice(0, 4).map((image, index) => (
            <div
              key={`picture-grid-image-${index}`}
              className={clsx("flex justify-center", {
                "sm:col-span-3 sm:row-span-2": index === 0,
                "sm:col-span-4": index === 1,
                "sm:col-span-2": index > 1,
              })}
            >
              <CustomImage
                {...image}
                className="rounded-3xl overflow-hidden absolute inset-0 w-full h-full"
                loading="lazy"
                layout="fill"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
