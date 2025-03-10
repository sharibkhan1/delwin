"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, CustomEase } from "gsap/all"; // ✅ Import CustomEase
import { useRouter } from "next/navigation";
import SvgIcon from "@/components/logosvg";

gsap.registerPlugin(ScrollTrigger);
CustomEase.create(
  "hop",
  "M0,0 C0.29,0 0.348,0.05 0.422,0.134 0.494,0.217 0.484,0.355 0.5,0.5 0.518,0.662 0.515,0.793 0.596,0.876 0.701,0.983 0.72,0.987 1,1"
);
const Page = () => {
  const [counter, setCounter] = useState(0);
  const counterRef = useRef<HTMLParagraphElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const splitTextIntoSpans = (selector: string) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        const text = element.textContent || "";
        const splitText = text
          .split("")
          .map((char) => `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`)
          .join("");
        element.innerHTML = splitText;
      });
    };

    splitTextIntoSpans(".header h1");
    splitTextIntoSpans(".header h2");

    const animateCounter = () => {
      let currentValue = 0;
      const updateInterval = 300;
      const maxDuration = 2000;
      const endValue = 100;
      const startTime = Date.now();

      const updateCounter = () => {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < maxDuration) {
          currentValue = Math.min(
            currentValue + Math.floor(Math.random() * 30) + 5,
            endValue
          );
          setCounter(currentValue);
          setTimeout(updateCounter, updateInterval);
        } else {
          setCounter(endValue);
          setTimeout(() => {
            if (counterRef.current) {
              gsap.to(counterRef.current, {
                y: -20,
                duration: 1,
                ease: "power3.inOut",
                opacity:0,
                onStart:()=>{
                  revealLandingPage();
                }
              });
            }
          }, -500);
        }
      };
      updateCounter();
    };

    gsap.to(".counter p", {
      y: 0,
      duration: 1,
      ease: "power3.inOut",
      delay: 1,
      onComplete: animateCounter,
    });

    function revealLandingPage(){
      gsap.to(".hero",{
        clipPath:"polygon(0% 100%, 100% 100% , 100% 0%, 0% 0%)",
        duration:2,
        ease:"hop",
        onStart: () => {
          const tl = gsap.timeline({
            onComplete: () => {
              router.replace("/home");
            },
          });
        
          tl.to(".hero", {
            transform: "translate(-50% , -50%) scale(1)",
            duration: 2.25,
            ease: "power3.inOut",
            delay: 0.25,
          })
          .to(
            ".overlay",
            {
              clipPath: "polygon(0% 0%, 100% 0% , 100% 0%, 0% 0%)",
              duration: 2,
              ease: "hop",
            },
            "-=2" // Starts with the previous animation
          )
          .to(
            ".hero-img img",
            {
              transform: "scale(1)",
              duration: 2.25,
              ease: "power3.inOut",
            },
            "-=2"
          )
          .to(
            ".header h1 span",
            {
              y: 0,
              stagger: 0.1,
              duration: 2,
              ease: "power4.inOut",
            },
            "-=1.5" // Starts slightly earlier
          )
          .to(
            ".header h2 span",
            {
              y: 0,
              stagger: 0.1,
              duration: 2,
              ease: "power4.inOut",
            },
            "-=1.8" // Overlapping with h1
          );
        },
        
      })
    }
  }, [router]);

  return (
<div className='container w-screen h-screen overflow-hidden' >
  {/* <div className="counter top-[50%] left-[50%] text-xl font-semibold w-[40px] h-[20px] "> */}
  <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">

    <div><SvgIcon/></div>
    <p ref={counterRef}>{counter}</p>
  </div>

  <section className='hero top-[50%] left-[50%] w-screen h-screen ' >
    <div className="overlay top-0 left-0 w-full bg-gray-700 h-full absolute "></div>

    {/* Centered Header */}
    <div className="header flex w-screen flex-col items-center text-center font-extrabold uppercase absolute md:top-[30%] top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1 className="text-[24vw] md:text-[15.5vw] text-primary leading-none">STONE</h1>
      <h2 className="text-xl ml-[50%] md:text-2xl text-primary font-semibold">& STRAND</h2>
    </div>

    <div className="hero-img w-full h-[40vh] p-4 md:px-10 md:h-[50%] ">
      <img className='w-full h-full object-cover rounded-b-[2rem]' src='/d1.jpg' alt='' />
    </div>
  </section>
</div>

  );
}

export default Page;
