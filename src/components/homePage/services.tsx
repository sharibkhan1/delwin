"use client";
import React, { useEffect, useRef, useState } from 'react';
import { MoveRightIcon } from "lucide-react";
import { doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { db } from '@/app/firebase/config';
import { cards } from '@/lib/cardse';
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger"
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface SavedText {
  title: string;
  description: string;
}

interface UserData {
  savedText?: SavedText[];
}

interface ImageData {
  name: string;
  url: string;
}
interface CardProps {
  title: string;
  copy: string;
  link: string;
  index: number;
}
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [, setImages] = useState<ImageData[]>([]);
  const container = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const userId = "F4DXnuFmS5XN6RQ69UwddqKfsgE3"

  useEffect(() => {
    const checkContainer = setInterval(() => {
      if (container.current && document.body.contains(container.current)) {  
        console.log("✅ container.current is assigned:", container.current);
        clearInterval(checkContainer);
  
        const cards = gsap.utils.toArray(".card") as HTMLElement[];
        if (cards.length === 0) return;
  
        ScrollTrigger.create({
          trigger: cards[0],
          start: "top 35%",
          endTrigger: cards[cards.length - 1],
          end: "top 30%",
          pin: ".intro",
          pinSpacing: false,
        });
  
        cards.forEach((card, index) => {
          const isLastCard = index === cards.length - 1;
          const cardInner = card.querySelector(".card-inner");

          if (!isLastCard) {
            ScrollTrigger.create({
              trigger: card,
              start: "top 35%",
              endTrigger: ".outro",
              end: "top 65%",
              pin: true,
              pinSpacing: false,
            });

            if (cardInner) {
              gsap.to(cardInner, {
                y: `-${(cards.length - index) * 14}vh`,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top 35%",
                  endTrigger: ".outro",
                  end: "top 65%",
                  scrub: true,
                },
              });
            }
          }
        });
        return () => {
          const triggers = ScrollTrigger.getAll();
          if (triggers.length) {
            triggers.forEach((trigger) => trigger.kill());
          }
        };
      }
    }, 100); // Check every 100ms until the ref is assigned
  
    return () => clearInterval(checkContainer); // Cleanup on unmount
  }, []);
  
  
  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      setLoading(true);
      try {
        // 🔎 Fetch user text data
        const docRef = doc(db, 'retailers', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as UserData;
          setUserData(data);

          // 📥 Fetch images from Firebase Storage (home folder)
          const storage = getStorage();
          const listRef = ref(storage, 'home');
          const res = await listAll(listRef);

          const urls = await Promise.all(
            res.items.map(async (itemRef) => ({
              name: itemRef.name,
              url: await getDownloadURL(itemRef),
            }))
          );
          setImages(urls);
        } else {
          console.warn('No user document found.');
        }
      } catch (error) {
        console.error('Error fetching user data or images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>No user data available.</p>;

  // 🎯 Get the image named "port1" and text with title "portfolio"
  // const portfolioImage = images.find((img) => img.name === 'port1');
  // const portfolioText = userData.savedText?.find((text) => text.title === 'portfolio');
  // src={portfolioImage?portfolioImage.url:"/d1.jpg"} // Replace with your image path


  
  const Card: React.FC<CardProps> = ({ title, copy, index ,link}) => {
    const handleClick = () => {
      router.push(link);
    };
    return(
      <div className='card  pointer-events-none relative' id={`card-${index+1}`} >
      <div
        className={`card-inner  relative transform w-screen h-full p-[2em] flex gap-[4em] ${
          index % 2 === 0 ? 'bg-secondary' : 'bg-popover'
        }`}
      >
        <div className='card-content flex-[3]' >
        <div className="flex items-center flex-row md:items-center gap-2 md:gap-4">
        <h1 className='font-bold mb-[2.5em] text-3xl  md:text-[4rem] ' >{title}</h1>
            <Button
            variant="link"
            onClick={handleClick}
            className={`text-lg md:text-2xl mb-[2.5em] pointer-events-auto font-semibold flex items-end gap-1 md:gap-2 ${
              index % 2 === 0 ? 'text-secondary-foreground/70' : 'text-popover-foreground/70'
            }`}
            >
              Explore <MoveRightIcon size={20} />
            </Button>
          </div>
            <p className='text-[1.25rem] text-secondary-foreground/70 md:max-w-[35rem] max-w-[30rem] font-semibold ' >{copy}</p>
          </div>
          <div className='card-img hidden md:block flex-1 rounded-lg overflow-hidden size-[16/9] ' >
            <img alt="" className='w-full h-full object-cover ' src={`/assets/d${index+1}.jpg`} />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='app' ref={container}>
      <section className='intro relative w-screen  pointer-events-none h-max py-6 px-2 flex items-center justify-center text-center' >
      <h1 className='text-center volkhov-bold  text-foreground text-4xl md:text-6xl  font-bold' >Projects</h1>
      </section>
      <section className='cards '>
        {cards.map((card,index)=>(
          <Card key={index} {...card} index={index} />
        ))}
      </section>  
      <section className='outro relative w-screen h-[1px] p-2 flex items-center ' >
      </section>
    </div>
  )
}

export default ServicesPage