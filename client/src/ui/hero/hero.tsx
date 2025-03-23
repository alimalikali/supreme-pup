"use client";

import { Typography } from "@/components/typography";
import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  banner?: {
    title: string;
    subtitle: string;
    imageUrl: string;
  };
};

// Default values for the banner
const defaultBanner = {
  title: "Welcome to Our Store",
  subtitle: "Discover the best products with us.",
  imageUrl: "/default-hero.jpg", // Ensure this image exists in your public folder
};

export const Hero = ({ banner = defaultBanner }: HeroProps) => {
  return (
    <section className="bg-accent flex flex-col items-center text-center justify-center py-20 sm:py-40 px-2 sm:px-6 min-h-screen w-full">
      <Typography variant="h1" className="text-4xl md:text-5xl font-bold text-white max-w-3xl">
        {banner.title}
      </Typography>

      <Typography variant="p" className="text-lg text-white max-w-2xl mt-4">
        {banner.subtitle}
      </Typography>

      <Link
        href="/products"
        className="mt-6 px-6 py-3 bg-foreground text-white rounded-lg text-lg font-medium hover:bg-gray-900 transition"
      >
        Go to products
      </Link>

      <div className="mt-10 max-w-6xl w-full">
        <Image
          src={banner.imageUrl}
          alt="Hero Image"
          width={1200}
          height={500}
          className="rounded-3xl h-full md:h-[400px] object-cover"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
