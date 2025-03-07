"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { db } from "@/app/firebase/config";
import { DownloadCloudIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { InteractiveHoverButton } from "../ui/animbutton";

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
  
const ProfilePage = () => {

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [images, setImages] = useState<ImageData[]>([]);

  const userId = "F4DXnuFmS5XN6RQ69UwddqKfsgE3"

  // 🔄 Fetch data from Firestore and Storage
  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "retailers", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as UserData;
          setUserData(data);

          const storage = getStorage();
          const listRef = ref(storage, "home");
          const res = await listAll(listRef);

          const urls = await Promise.all(
            res.items.map(async (itemRef) => ({
              name: itemRef.name,
              url: await getDownloadURL(itemRef),
            }))
          );
          setImages(urls);
        } else {
          console.warn("No user document found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
      fetchUserData();
  }, [userId]);

  if (status === "loading" || loading) return  (
    <Skeleton className="h-[20rem] w-full bg-dark-brown-gold rounded-xl" />
  )
  if (!userData) return <p>No user data available.</p>;

  // 🎯 Extract texts and profile image
  const nameText = userData.savedText?.find((text) => text.title === "name")?.description ?? "No name available.";
  const profileSub = userData.savedText?.find((text) => text.title === "profilesub")?.description ?? "No subtitle.";
  const profileDesc = userData.savedText?.find((text) => text.title === "profiledes")?.description ?? "No description.";
  const profileImage = images.find((img) => img.name === "person");

  return (
    <div>
              <h2 className=" text-4xl md:text-5xl font-bold text-center text-[#5c4b36] mb-10">
        Profile Details
      </h2>
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 bg-brown-ivory2 rounded-2xl p-8 shadow-lg transition hover:shadow-md shadow-[#a88568]">
    {/* Profile Image */}
    
    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-border shadow-md">
    <Image
            src={profileImage?.url ?? "/d1.jpg"}
            alt="Profile"
            width={160}
            height={160}
            className="object-cover"
          />
    </div>

    {/* Profile Details */}
    <div className="flex-1 text-center md:text-left">
    <h3 className="text-3xl font-bold text-secondary mb-2">{nameText}</h3>
    <p className="text-lg text-accent-foreground mb-4">{profileSub}</p>
    <p className="text-popover-foreground md:block hidden leading-relaxed">{profileDesc}</p>

      <div className="flex gap-4 mt-6 justify-center md:justify-start">
        <a
          href="/resume.pdf" // Replace with your resume link
          target="_blank"
          className="px-6 flex py-2 rounded-full border-accent-foreground border-2 bg-accent-gold text-white font-medium hover:bg-rich-brown transition"
        >
          <DownloadCloudIcon size={20} className="mr-2" /> Resume
        </a>
        <div className='relative'>
        <a
          href="/profile"
        >
          <InteractiveHoverButton text="More Info " />
        </a>
        </div>

      </div>
    </div>
  </div>
    </div>
  )
}

export default ProfilePage