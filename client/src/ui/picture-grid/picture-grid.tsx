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

export const PictureGrid = ({ datasetGrid = { heading: "Your Ultimate Destination for Smart Shopping", description: "", imageGrid: [] } }: PictureGridProps) => {
  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col items-center gap-10">
      <div className="flex flex-col items-center justify-center gap-5">
        <Typography variant="h1" className="text-foreground max-w-3xl text-center text-4xl font-bold md:text-5xl">
          {datasetGrid.heading}
        </Typography>

        <Typography variant="p" className="text-accent max-w-2xl text-center text-lg">
          {datasetGrid.description}
        </Typography>
      </div>

      {!!datasetGrid.imageGrid?.length && (
        <div className="grid h-auto w-full auto-rows-[30vh] gap-8 pb-24 sm:grid-cols-7">
          {datasetGrid.imageGrid.slice(0, 4).map((image, index) => (
            <div
              key={`picture-grid-image-${index}`}
              className={clsx("flex justify-center", {
                "sm:col-span-3 sm:row-span-2": index === 0,
                "sm:col-span-4": index === 1,
                "sm:col-span-2": index > 1,
              })}
            >
              <CustomImage {...image} className="absolute inset-0 h-full w-full overflow-hidden rounded-3xl" loading="lazy" layout="fill" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
