"use client";

import Carousel from "@/components/ui/carousel";

export function CarouselDemo({ slides }: { slides: { id: string;title: string; src: string }[] }) {
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slides} />
    </div>
  );
}
