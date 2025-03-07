"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { CarouselDemo } from "@/components/imagesldier";

type Portfolio = {
  id: string;
  name: string;
  type: string;
  images: string[];
};

const Page = () => {
  const [slides, setSlides] = useState<{ id: string;title: string; src: string }[]>([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "retailers"));
        const bathroomSlides: {id: string; title: string; src: string }[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const bathroomPortfolios: Portfolio[] = data.portfolios?.filter((p: Portfolio) => p.type === "BEDROOM") || [];

          bathroomPortfolios.forEach((portfolio: Portfolio) => {
            if (portfolio.images?.length > 0) {
              bathroomSlides.push({
                id: portfolio.id,
                title: portfolio.name || "Untitled",
                src: portfolio.images[0], // First image of the portfolio
              });
            }
          });
        });

        setSlides(bathroomSlides);
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      }
    };

    fetchPortfolios();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <CarouselDemo slides={slides} />
    </div>
  );
};

export default Page;
