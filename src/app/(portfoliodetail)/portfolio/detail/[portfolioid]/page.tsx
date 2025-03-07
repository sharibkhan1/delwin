"use client";
import { use, useEffect, useState } from "react";
import { db } from "@/app/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";

type Portfolio = {
  id: string;
  name: string;
  description: string;
  description2?: string;
  type: string;
  images: string[];
  materials: { title: string; description: string; imageUrls: string[] }[];
  features: string[];
};

const PortfolioDetail = ({ params }: { params: Promise<{ portfolioid: string }> }) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const { portfolioid: portfolioId } = use(params);
  const userId = session?.user?.id;

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


  if (loading) return <p>Loading portfolio details...</p>;
  if (!portfolio) return <p>Portfolio not found.</p>;

  return (
    <div className=" p-6">
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-gray-800">{portfolio.name}</h1>
      <p className="text-lg text-gray-600 mt-2">{portfolio.description}</p>
      <p className="text-md text-gray-500 mt-1 italic">{portfolio.description2}</p>

      {/* Features Section */}
      {portfolio.features?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700">Features</h2>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            {portfolio.features.map((feature: string, index: number) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Image Gallery */}
      {portfolio.images?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {portfolio.images.map((image: string, index: number) => (
              <Image
                key={index}
                src={image}
                width={800} // Set a suitable width
                height={450} 
                alt={`Portfolio Image ${index + 1}`}
                className="rounded-lg shadow-md w-full md:h-max h-48 object-cover"
              />
            ))}
          </div>
        </div>
      )}

      {/* Materials Section */}
      {portfolio.materials?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700">Materials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {portfolio.materials.map((material: { title: string; description: string; imageUrls: string[] }, index: number) => (
              <div key={index} className="p-4 border rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800">{material.title}</h3>
                <p className="text-gray-600">{material.description}</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {material.imageUrls?.map((image: string, imgIndex: number) => (
                    <Image
                      key={imgIndex}
                      width={800} // Set a suitable width
                      height={450} 
                      src={image}
                      alt={`Material Image ${imgIndex + 1}`}
                      className="rounded-lg shadow-sm w-full md:h-max h-32 object-cover"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioDetail;