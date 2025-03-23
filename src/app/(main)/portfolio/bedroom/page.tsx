"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { CarouselDemo } from "@/components/imagesldier";
import { IconMoodEmptyFilled } from "@tabler/icons-react";

type Portfolio = {
  id: string;
  name: string;
  type: string;
  images: string[];
};

const Page = () => {
  const [slides, setSlides] = useState<{ id: string;title: string; src: string }[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchPortfolios = async () => {
      setLoading(true);

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
      }finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
    {loading ? (
      <div className="flex justify-center items-center min-h-[400px]">
        {/* Circular Loader */}
        <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      </div>
    ) : slides.length > 0 ? (
      <CarouselDemo slides={slides} />
    ) : (
      <div className="h-[50vh] w-full flex flex-col items-center justify-center " >
      <IconMoodEmptyFilled className="h-20 w-20" />
      <p className="text-center text-gray-300 mt-4">No Works found !!!</p>
        </div>    )}
  </div>
  );
};

export default Page;
