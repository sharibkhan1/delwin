"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Brand {
  name: string;
  logo: string;
}

interface BrandsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  brands: Brand[];
  imageHeight?: number;
}

export const BrandsGrid = React.forwardRef<HTMLDivElement, BrandsGridProps>(
  ({ 
    className,
    title = "Trusted and loved by fast-growing companies worldwide",
    brands,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("py-24", className)}
        {...props}
      >
        <div className="max-w-screen-4xl mx-auto px-4 lg:px-8">
          {title && (
            <p className="max-w-lg mx-auto text-pretty text-center font-bold mb-6 text-foreground md:text-5xl">
              {title}
            </p>
          )}

          <div className="max-w-xs mx-auto grid grid-cols-2 items-center md:grid-cols-2 md:max-w-lg lg:grid-cols-3 lg:max-w-3xl">
            {brands.map((brand) => (
              <div key={brand.name} className="flex items-center justify-center p-4">
                <div className="relative h-[76px] w-full">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

BrandsGrid.displayName = "BrandsGrid";