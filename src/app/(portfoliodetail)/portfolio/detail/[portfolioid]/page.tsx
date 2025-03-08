"use client";
import { use, useEffect, useState } from "react";
import { db } from "@/app/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageZoom } from "@/components/ui/zoomable-image";

type Portfolio = {
  id: string;
  name: string;
  description: string;
  images: string[];
};

const PortfolioDetail = ({ params }: { params: Promise<{ portfolioid: string }> }) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const { portfolioid: portfolioId } = use(params);
  const userId = "F4DXnuFmS5XN6RQ69UwddqKfsgE3"

  useEffect(() => {
    if (!userId || !portfolioId) return;

    const fetchPortfolioDetails = async () => {
      setLoading(true);
      try {
        const portfolioRef = doc(db, "retailers", userId);
        const portfolioSnap = await getDoc(portfolioRef);
        if (portfolioSnap.exists()) {
          const userData =portfolioSnap.data();
          const foundPortfolio = userData.portfolios?.find((p: Portfolio) => p.id === portfolioId);
          if (foundPortfolio) {
            setPortfolio(foundPortfolio);
          } else {
            console.error("Portfolio not found in retailer's portfolios.");
          }
        } else {
          console.error("Retailer not found.");
        }
      } catch (error) {
        console.error("Error fetching portfolio details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolioDetails();
  }, [userId,portfolioId]);


  if (loading) return (
    <div className='px-3'>
    <Skeleton className='w-full h-[10rem] bg-cream-gold mb-5 ' />
    <Skeleton className='w-full h-[20rem] bg-cream-gold mb-5' />
    <Skeleton className='w-full h-[10rem] bg-cream-gold mb-5' />
    </div>
  );
  if (!portfolio) return <p>Portfolio not found.</p>;

  return (
    <div className=" p-6">
      {/* Header Section */}
      <h1 className="text-4xl volkhov-bold  md:text-6xl font-bold text-foreground">{portfolio.name}</h1>
      <p className="text-lg text-gray-600 mt-2">{portfolio.description}</p>

      {/* Image Gallery */}
      {portfolio.images?.length > 0 && (
        <div className="mt-6 border-t-2 border-black ">
          <h2 className="text-4xl font-bold text-foreground mt-5">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:p-5 md:grid-cols-3 gap-4 mt-4">
            {portfolio.images.map((image: string, index: number) => (
                image ? (
                  <ImageZoom
                    key={index}
                    src={image}
                    width={800}
                    height={450}
                    alt={`Portfolio Image ${index + 1}`}
                    className="rounded-lg shadow-md w-full md:h-max h-48 object-cover"
                  />
                ) : null
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default PortfolioDetail;