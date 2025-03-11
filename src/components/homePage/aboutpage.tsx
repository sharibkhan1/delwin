"use client";

import { Sparkles } from "lucide-react";
import DisplayCards from "../ui/caranim";
import { CrossPatternCard, CrossPatternCardBody } from "../ui/card-with-cross-patter";

const defaultCards = [
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "Personalized Approach",
    description: " Every project is tailored to your unique style",
    date: "Just now",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "Attention to Detail",
    description: "From big ideas to small touches, we ensure every element is thoughtfully crafted.",
    date: "2 days ago",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "Seamless Process",
    description: "We handle everything to completion making your design journey smooth and stress-free",
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
  <h1 className="tpp text-4xl volkhov-bold  text-foreground md:text-6xl font-bold text-center mb-10">
    About <span className="text-primary/50">Our</span>  Services
  </h1>

  <div className="w-full  max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
    {/* Left Side - Text Section */}
    <div className="flex h-[17rem] flex-col p-4 bg-gold-brown rounded-2xl  justify-around px-4 md:px-8">
      <h2 className="text-2xl text-primary md:text-4xl font-semibold">
        Why <span className="text-secondary-foreground/70 font-bold">Choose</span> Us?
      </h2>
      <p className="text-primary/70 text-sm md:text-lg">
      At Stone & Strand, we craft spaces that blend timeless design with modern living. Our name reflects our approach Stone for solid foundations, Strand for the finer details.

We work closely with our clients to transform homes and businesses into personalized, functional spaces that inspire.
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
                <h3 className={`text-xl text-secondary-foreground font-semibold ${card.titleClassName}`}>
                  {card.title}
                </h3>
              </div>
              <p className="text-gray-400 mt-2">{card.description}</p>
            </CrossPatternCardBody>
            </CrossPatternCard>
          ))}
        </div>
  </div>
    </div>
  );
}

export { AboutPage };
