"use client";
import React, { useEffect, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { LayoutGrid } from "./ui/layout-grid";

// 👇 Interface for Image Data
interface ImageData {
  name: string;
  url: string;
}

export function LayoutGridDemo() {
  const [images, setImages] = useState<ImageData[]>([]);

  // 🔄 Fetch images from Firebase Storage on mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storage = getStorage();
        const listRef = ref(storage, "home"); // 📁 Folder path in Firebase Storage
        const res = await listAll(listRef);

        const urls = await Promise.all(
          res.items.map(async (itemRef) => ({
            name: itemRef.name, // e.g., grid1, grid2...
            url: await getDownloadURL(itemRef),
          }))
        );

        setImages(urls); // ✅ Save to state
        localStorage.setItem("cachedImages", JSON.stringify(urls));
        localStorage.setItem("lastFetched", JSON.stringify(Date.now()));
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    const cachedImages = localStorage.getItem("cachedImages");
    const lastFetched = localStorage.getItem("lastFetched");
    const tenMinutes = 10 * 60 * 1000;

    if (cachedImages && lastFetched && Date.now() - JSON.parse(lastFetched) < tenMinutes) {
      setImages(JSON.parse(cachedImages)); // ✅ Load cached images
    } else {
      fetchImages(); // 🔄 Fetch new images after 10 min
    }

    // ⏳ Set interval to refetch images every 10 minutes
    const interval = setInterval(fetchImages, tenMinutes);
    return () => clearInterval(interval);
  }, []);

  // 🧩 Find images by name
  const getImageByName = (name: string, id: number) => {
    const defaultImages: Record<number, string> = {
      1: "/d1.jpg",
      2: "/assets/final@2x.jpg",
      3: "/assets/FIN.jpg",
      4: "/iii.jpeg",
    };
  
    return images.find((img) => img.name === name)?.url ?? defaultImages[id] ?? "/d1.jpg";
  };
  
  const cards = [
    { id: 1, className: "md:col-span-2", thumbnail: getImageByName("grid1", 1) },
    { id: 2, className: "col-span-1", thumbnail: getImageByName("grid2", 2) },
    { id: 3, className: "col-span-1", thumbnail: getImageByName("grid3", 3) },
    { id: 4, className: "md:col-span-2", thumbnail: getImageByName("grid4", 4) },
  ];
  

  return (
    <div className="h-screen w-full">
       <h2 className="volkhov-bold  text-5xl md:text-6xl font-bold text-center text-foreground">
       Glimpse <span className="text-primary/50">of Our</span> Work
      </h2>
      <LayoutGrid cards={cards} />
    </div>
  );
}

