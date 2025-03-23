import Image from "next/image";
import clsx from "clsx";

type ImageProps = {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  layout?: "intrinsic" | "responsive" | "fixed" | "fill";
  focalPoint?: { x: number; y: number };
  preserveRatio?: boolean;
  loading?: "eager" | "lazy";
  sizes?: string;
};

export default function CustomImage({
  src,
  alt = "Image",
  className,
  width,
  height,
  layout = "intrinsic",
  focalPoint,
  preserveRatio = false,
  loading = "lazy",
  sizes = "(max-width: 640px) 500w, 768w",
}: ImageProps) {
  const styles = {
    "--focus-x": focalPoint?.x,
    "--focus-y": focalPoint?.y,
    aspectRatio: preserveRatio && width && height ? `${width}/${height}` : "auto",
    objectFit: "cover", // ✅ Enforce object-fit using inline styles
  } as React.CSSProperties;

  return (
    <div className={clsx("relative", className)} style={styles}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        layout={layout}
        loading={loading}
        sizes={sizes}
        style={styles} 
      />
    </div>
  );
}
