"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { db } from '@/app/firebase/config';
import { MorphingText } from '../ui/goofytext';
import { texts } from '@/lib/cardse';

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

const HeroSection = () => {
    const [, setLoading] = useState(false);
  const [, setUserData] = useState<UserData | null>(null);
  const [images, setImages] = useState<ImageData[]>([]);
  
    const userId = "F4DXnuFmS5XN6RQ69UwddqKfsgE3"
    useEffect(() => {
    
        const fetchUserData = async () => {
          setLoading(true);
          try {
            const docRef = doc(db, 'retailers', userId);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                const data = docSnap.data() as UserData;
                setUserData(data);

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
            }else {
                console.warn("No user document found.");
              }
          } catch (error) {
            console.error('Error fetching user data:', error);
          } finally {
            setLoading(false);
          }
        };


      fetchUserData();
    }, [userId]);
    
      const heroImage = images.find((img) => img.name === 'home1');
      // const text1 = userData?.savedText?.find((text) => text.title === 'text1');
      // const text2 = userData?.savedText?.find((text) => text.title === 'text2');

  return (
    <section className="relative  z-10 w-screen h-screen p-4 md:px-10 flex flex-col rounded-[2rem] overflow-hidden">

    {/* Upper Section - Text */}
    <div className="flex flex-col  items-center justify-center text-center h-full md:h-[50%] px-6 md:px-20">
      <h1 className="text-[24vw]  mt-[-5%] flex-col text-center flex md:text-[15.5vw] font-extrabold uppercase">
        <span className='text-gradient-brown' >
        STONE 
        </span>
        <span className='text-xl text-gradient-brown md:mt-[-7%] mt-[-5%] font-semibold text-end'>
          & STRAND
          </span>
        <span className='mt-5 md:mt-0 text-foreground'>
        <MorphingText texts={texts} />
        </span>
      </h1>
      {/* <p className="md:flex hidden text-lg md:text-xl text-gray-500 mt-4 max-w-[600px]">
        When seeking a combination of interior design for your home, you deserve an exclusive and aesthetic touch.
      </p> */}
  
    </div>
  
    {/* Lower Section - Image */}
    <div className="relative h-[50%] w-full">
      {heroImage ? (
        <Image
          src={heroImage.url}
          alt="Furnishing Hero"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="rounded-b-[2rem]"
        />
      ) : (
        <Image
          src="/d1.jpg"
          alt="Furnishing Hero"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="rounded-b-[2rem]"
        />
      )}
    </div>
  </section>
  
  );
}

export default HeroSection