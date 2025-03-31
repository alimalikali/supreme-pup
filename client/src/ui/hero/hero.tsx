"use client";

import RippleButton from "@/components/RippleButton";
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
    <section className="bg-accent flex w-full flex-col items-center justify-center px-3 py-10 sm:px-12 sm:py-20 lg:px-20">
      <div className="mx-auto flex min-h-screen w-full max-w-screen-2xl flex-col items-center justify-center text-center">
        <Typography variant="h1" className="max-w-3xl text-4xl font-bold text-white md:text-5xl">
          {banner.title}
        </Typography>

        <Typography variant="p" className="mt-4 max-w-2xl text-lg text-white">
          {banner.subtitle}
        </Typography>

        <div className="flex flex-col items-center gap-4 p-10">
          <Link href="/products">
            <RippleButton className="bg-foreground hover:bg-foreground/50 px-5 py-3">Go to Products</RippleButton>
          </Link>
        </div>
        <div className="mt-10 w-full max-w-6xl">
          <Image src={banner.imageUrl} alt="Hero Image" width={1200} height={500} className="h-full rounded-3xl object-cover md:h-[400px]" priority />
        </div>
      </div>
    </section>
  );
};

export default Hero;
