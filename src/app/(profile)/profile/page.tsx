"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { db } from '@/app/firebase/config';
import { BrandsGrid } from '../_comp/logolist';
import { brands } from '@/lib/cardse';
import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature';
import { ImageZoom } from '@/components/ui/zoomable-image';
import { Skeleton } from '@/components/ui/skeleton';

interface SavedText {
  title: string;
  description: string;
}

interface UserData {
  name?: string;
  title?: string;
  savedText?: SavedText[];
}

interface ImageData {
  name: string;
  url: string;
}

const ProfilePage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [images, setImages] = useState<ImageData[]>([]);

  const userId = "F4DXnuFmS5XN6RQ69UwddqKfsgE3"

  useEffect(() => {
    if (!userId) return;

    const fetchUserProfile = async () => {
      try {
        const docRef = doc(db, 'retailers', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);

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
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!userData) return (
    <div className='px-3'>
    <Skeleton className='w-full h-[10rem] bg-cream-gold mb-5 ' />
    <Skeleton className='w-full h-[20rem] bg-cream-gold mb-5' />
    <Skeleton className='w-full h-[10rem] bg-cream-gold mb-5' />
    <Skeleton className='w-full h-[20rem] bg-cream-gold mb-5' />
    <Skeleton className='w-full h-[10rem] bg-cream-gold mb-5' />
    <Skeleton className='w-full h-[20rem] bg-cream-gold mb-5' />
    </div>
  );

  const profileImage = images.find((img) => img.name === "person");
  const aboutText = userData.savedText?.find((text) => text.title === 'profiledes');
  const skillsText = userData.savedText
  ?.filter((text) => text.title === "skillss") // Get all items with title "tech"
  .map((text) => text.description) ?? [];  
  const nameText = userData.savedText?.find((text) => text.title === "name")?.description ?? "No name available.";
  const namesubText = userData.savedText?.find((text) => text.title === "profilesec")?.description ?? "No name available.";
  const techStack = userData.savedText
  ?.filter((text) => text.title === "tech") // Get all items with title "tech"
  .map((text) => text.description) ?? [];    // Extract their descriptions

  return (
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
  {/* Hero Section */}
  <section className="flex items-center gap-6">
    {profileImage ? (
      <Image
        src={profileImage.url}
        alt="Profile"
        width={150}
        height={150}
        className="rounded-full max-h-[150px] max-w-[150px] border-4 border-gold-brown"
      />
    ) : (
      <div className="w-[150px] h-[150px] bg-gray-200 rounded-full"></div>
    )}
    <div>
      <h1 className="text-4xl font-bold text-secondary-foreground">
        {nameText || 'Interior Designer'}
      </h1>
      <p className="text-lg text-accent">
        {namesubText || 'Creating inspiring spaces'}
      </p>
    </div>
  </section>

  {/* About Me */}
  <section>
    <h2 className="text-3xl font-semibold text-primary mb-4">About Me</h2>
    <p className="text-lg text-muted-foreground">
      {aboutText?.description || 'No information available.'}
    </p>
  </section>

  {/* Skills & Expertise */}
  <section>
    <h2 className="text-5xl text-center font-semibold text-primary mb-4">Skills & Expertise</h2>
    {skillsText.length ? (
    <FeaturesSectionWithHoverEffects />
  ) : (
    <p>No skills listed.</p>
  )}
  </section>

  {/* 🧰 Tech Stack & Tools */}
  <section>
    {techStack.length ? (
        <BrandsGrid
        brands={brands}
        title="Tech Stack & Tools"
        // Optionally, you can override the default values:
        // columns={{
        //   default: 2,
        //   md: 3,
        //   lg: 6
        // }}
        // maxWidth={{
        //   container: "max-w-screen-xl",
        //   grid: {
        //     default: "max-w-xs",
        //     md: "max-w-lg",
        //     lg: "max-w-3xl"
        //   }
        // }}
      />
  ) : (
    <p>No tools listed.</p>
  )}
  </section>

  {/* 🏢 Professional Experience */}
  {/* <section>
    <h2 className="text-3xl font-semibold text-primary mb-4">Professional Experience</h2>
    <div className="space-y-6">
      {experience?.length ? (
        experience.map((exp, index) => (
          <div key={index} className="border-l-4 border-gold-brown pl-4">
            <h3 className="text-xl font-semibold">{exp.role}</h3>
            <p className="text-accent">{exp.company} | {exp.duration}</p>
            <p className="text-muted-foreground">{exp.description}</p>
          </div>
        ))
      ) : (
        <p>No experience added.</p>
      )}
    </div>
  </section> */}

  {/* 🗂️ Portfolio Highlights */}
  <section>
    <h2 className="text-5xl text-center font-semibold text-primary mb-6">Portfolio Highlights</h2>
    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6">
      {images
        .filter((img) => img.name.startsWith('port-'))
        .map((img) => (
          <ImageZoom
            key={img.name}
            src={img.url}
            alt={img.name}
            width={300}
            height={200}
            className="rounded-xl min-h-[13rem] min-w-[20rem] object-cover shadow-md"
          />
        ))
      }
    </div>
  </section>
  </div>

  );
};

export default ProfilePage;
