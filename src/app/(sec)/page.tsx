"use client"
import React, { useEffect } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
    const router = useRouter();

    useEffect(() => {
      setTimeout(() => {
      const digit1 = document.querySelector(".digit-1");
      const digit2 = document.querySelector(".digit-2");
      const digit3 = document.querySelector(".digit-3");
    
      if (!digit1 || !digit2 || !digit3) {
        console.warn("Digits not found");
        return;
      }    
        console.log("Digits found");
        // Function to split text into spans (same as in vanilla JS)
      const splitTextIntoSpans = (selector: string) => {
        const element = document.querySelector(selector);
        if (element) {
          const text = element.textContent || "";
          const splitText = text.split("").map((char) => `<span>${char}</span>`).join("");
          element.innerHTML = splitText;
        }
      };
    
      splitTextIntoSpans(".headerr h1");
    
      // Function to create numbers dynamically (same as in vanilla JS)
      const createNumberSequence = (digit: Element | null, isDigit1 = false) => {
        if (!digit) return;
        digit.innerHTML = ""; // Clear previous content
    
        if (isDigit1) {
          // Only add 0 and 1 for digit1
          ["0", "1"].forEach(num => {
            const div = document.createElement("div");
            div.className = "num";
            div.textContent = num;
            digit.appendChild(div);
          });
        } else {
          for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 10; j++) {
              const div = document.createElement("div");
              div.className = "num";
              div.textContent = j.toString();
              digit.appendChild(div);
            }
          }
        // Append final digit 0
        const finalDigit = document.createElement("div");
        finalDigit.className = "num";
        finalDigit.textContent = "0";
        digit.appendChild(finalDigit);
      };
    };
      createNumberSequence(digit3, ); // 0 → 9 (twice) → 0
      createNumberSequence(digit2, ); // 0 → 9 → 0
      createNumberSequence(digit1,true); // 0 → 1
  
      // Function to animate digits (same as in vanilla JS)
      const animate = (digit: Element | null, duration: number, delay = 0) => {
        if (!digit) return;
    
        const numHeight = digit.querySelector(".num")?.clientHeight || 0;
        const totalDistance = (digit.querySelectorAll(".num").length - 1) * numHeight;
    
        gsap.to(digit, {
          y: -totalDistance,
          duration: duration,
          delay: delay,
          ease: "power2.inOut",
        });
      };
      animate(digit3, 2); // 0 → 9 (twice) → 0
      animate(digit2, 3); // 0 → 9 → 0
      animate(digit1, 1, 2); // 0 → 1
      gsap.to(".headerr h1 span", {
        opacity:0,
        delay:0,
      })
      gsap.to(".progress-bar",{
        width:"30%",
        duration:2,
        ease:"power4.inOut",
        delay:3.5,
      });

      gsap.to(".progress-bar",{
        width:"100%",
        opacity:0,
        duration:2,
        delay:5,
        ease:"power3.out",
        onComplete:()=>{
          gsap.set(".pre-loader",{
            display:"none"
          });
        }
      });
      gsap.to(".hero-img > img",{
        clipPath:"polygon(100% 0%,0% 0%,0% 100%,100% 100%)",
        duration:3.5,
        ease:"power4.inOut",
        stagger:0.25,
        delay:6,
      });
      gsap.to(".hero",{
        duration:3.5,
        ease:"power3.inOut",
        delay:6,
        onComplete:()=>{
          router.replace("/home")
        }
      })
      gsap.to(".headerr h1 span", {
        top:"0px",
        stagger:0.1,
        duration:1,
        ease:"power3.out",
        opacity:1,
        delay:11,
      });
    }, 2000); // 500ms delay to ensure elements have been rendered
    }, [router]);

  return (
    <section className='hero w-screen h-screen bg-cream-gold' >
      <div className="pre-loader bg-cream-gold w-[200%] h-[100%] p-2 fixed top-0 right-0 flex items-end gap-[0.5em] overflow-hidden z-20 justify-end ">
        <p className='w-max text-[40px] md:text-[60px]' >loading</p>
        <div className="counter text-[70px] md:text-[100px] ">
          <div  className="digit-1 relative top-[-15px]">
            <div className="num">0</div>
            <div className="num offset relative right-[-5px] md:right-[-7.5px]">1</div>
          </div>
          <div className="digit-2 relative top-[-15px]">
            <div className="num">0</div>
            <div className="num offset relative right-[-5px] md:right-[-7.5px]">1</div>
            <div className="num">2</div>
            <div className="num">3</div>
            <div className="num">4</div>
            <div className="num">5</div>
            <div className="num">6</div>
            <div className="num">7</div>
            <div className="num">8</div>
            <div className="num">9</div>
            <div className="num">0</div>
          </div>
          <div className="digit-3 relative top-[-15px]">
            <div className="num">0</div>
            <div className="num ">1</div>
            <div className="num">2</div>
            <div className="num">3</div>
            <div className="num">4</div>
            <div className="num">5</div>
            <div className="num">6</div>
            <div className="num">7</div>
            <div className="num">8</div>
            <div className="num">9</div>
            <div className="num">0</div>
          </div>
          <div className="digit-4 relative top-[-15px]">
            %
          </div>
        </div>
        <div className="progress-bar relative top-[-15px] w-0 h-[4px] bg-black "></div>
      </div>
      <div className="hero-img relative w-[100%] h-[100%] overflow-hidden z-0 ">
        {/* <img className='imgg' src='/assets/d1.jpg' />
        <img className='imgg' src='/assets/d2.jpg' />
        <img className='imgg' src='/assets/d3.jpg' /> */}
        <Image alt='' fill className='imgg' src='/assets/d4.jpg' />
        <Image alt='' fill className='imgg' src='/assets/d5.jpg' />
        <Image alt='' fill className='imgg' src='/assets/d6.jpg' />
        <Image alt=''fill  className='imgg' src='/assets/d2.jpg' />
      </div>
    </section>
  );
}

export default Page