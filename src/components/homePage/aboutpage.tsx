"use client";

import { Sparkles } from "lucide-react";
import DisplayCards from "../ui/caranim";
import { CrossPatternCard, CrossPatternCardBody } from "../ui/card-with-cross-patter";

const defaultCards = [
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "Featured",
    description: "Discover amazing content",
    date: "Just now",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "Popular",
    description: "Trending this week",
    date: "2 days ago",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "New",
    description: "Latest updates and features",
    date: "Today",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

function AboutPage() {
  return (
<div className="flex flex-col items-center w-full min-h-[400px] px-4">
  {/* Page Title */}
  <h1 className="tpp text-4xl text-[#5c4b36] md:text-6xl font-bold text-center mb-10">
    About Our Services
  </h1>

  <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
    {/* Left Side - Text Section */}
    <div className="flex flex-col justify-center px-4 md:px-8">
      <h2 className="text-2xl md:text-4xl font-semibold mb-4">
        Why Choose Us?
      </h2>
      <p className="text-primary text-lg md:text-xl">
        We offer high-quality services tailored to your needs. Our expertise
        ensures that you get the best results with precision and creativity.
      </p>
    </div>

    {/* Right Side - Cards Section */}
    <div className="hidden md:block w-full">
    <DisplayCards cards={defaultCards} />
    </div>
    
    <div className="block md:hidden w-full space-y-6">
          {defaultCards.map((card, index) => (
            
            <CrossPatternCard key={index} patternClassName="">
            <CrossPatternCardBody>

              <div className="flex items-center  space-x-4">
                {card.icon}
                <h3 className={`text-xl text-secondary font-semibold ${card.titleClassName}`}>
                  {card.title}
                </h3>
              </div>
              <p className="text-gray-200 mt-2">{card.description}</p>
            </CrossPatternCardBody>
            </CrossPatternCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export { AboutPage };
