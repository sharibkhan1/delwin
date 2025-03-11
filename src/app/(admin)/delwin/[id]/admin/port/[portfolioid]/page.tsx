"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/app/firebase/config";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import IconBackadminButton from "@/components/global/iconadminback";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

type Portfolio = {
  id: string;
  name: string;
  description: string;
  type: string;
  images: string[];
};

const PortfolioEditor = ({ params }: { params: Promise<{ portfolioid: string }> }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const userId = session?.user?.id;
  const { portfolioid: portfolioId } = use(params);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Bedroom"); // Dropdown state
  const [loading, setLoading] = useState(false);
  const [portfolioImages, setPortfolioImages] = useState<File[]>([]);
  const [portfolioImageUrls, setPortfolioImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!userId) return;

    const fetchPortfolio = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "retailers", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          const portfolio = userData.portfolios?.find((p: Portfolio) => p.id === portfolioId);
                   if (portfolio) {
            setName(portfolio.name);
            setDescription(portfolio.description);
            setType(portfolio.type || "Bedroom");
            setPortfolioImageUrls(portfolio.images || []);
          }
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [userId, portfolioId]);

  const uploadImages = async (files: File[], path: string) => {
    const uploadPromises = files.map(async (file) => {
      const fileRef = ref(storage, `${path}/${file.name}`);
      await uploadBytes(fileRef, file);
      return getDownloadURL(fileRef);
    });

    return await Promise.all(uploadPromises);
  };
  const handleSave = async () => {
    if (!name.trim() || !description.trim()) {
      toast.error("Both name and description are required.");
      return;
    }
    if (!userId) return;
  
    try {
      const docRef = doc(db, "retailers", userId);
      const docSnap = await getDoc(docRef);
  
      let existingPortfolios = [];
      let existingImages: string[] = [];

      if (docSnap.exists()) {
        const userData = docSnap.data();
        existingPortfolios = userData.portfolios || [];

        const existingPortfolio = existingPortfolios.find((p: Portfolio) => p.id === portfolioId);
        if (existingPortfolio) {
          existingImages = existingPortfolio.images || [];
        }
      } else {
        await setDoc(docRef, { portfolios: [] });
      }
  
      // ✅ Ensure we only store URLs (not File objects)
    const uploadedPortfolioImages = portfolioImages.length > 0
      ? await uploadImages(portfolioImages, `port/${portfolioId}`)
      : [];
      const finalImageUrls = [...existingImages, ...uploadedPortfolioImages]; // Merge images

      // ✅ Check if portfolio already exists
      const portfolioIndex = existingPortfolios.findIndex((p: Portfolio) => p.id === portfolioId);
  
      if (portfolioIndex !== -1) {
        // ✅ Update existing portfolio
        existingPortfolios[portfolioIndex] = {
          id: portfolioId,
          name,
          description,
          type,
          images: finalImageUrls,
        };
      } else {
        // ✅ Add new portfolio if not found
        existingPortfolios.push({
          id: portfolioId,
          name,
          description,
          type,
          images: finalImageUrls,
        });
      }
  
      // ✅ Update the document with the modified array
      await updateDoc(docRef, { portfolios: existingPortfolios });
  
      toast.success("Portfolio saved successfully!");
      router.back();
    } catch (error) {
      console.error("Error saving portfolio:", error);
      toast.error("Failed to save portfolio.");
    }
  };

  const removePortfolioImage = (index: number) => {
    setPortfolioImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 space-y-6">
      <div className="w-full h-[100px] top-0 left-0 z-10 bg-secondary shadow-md flex items-center justify-between px-4">
        <IconBackadminButton />
        <h1 className="text-4xl font-semibold">Edit Portfolio</h1>
        <div className="w-10" />
      </div>

      {loading ? (
        <p>Loading portfolio data...</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-secondary shadow-primary/80 p-6 rounded-lg shadow-md space-y-4">
          <div>
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Portfolio Name" />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Portfolio Description" />
          </div>

          <div>
            <Label>Portfolio Type</Label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 bg-secondary rounded-md w-full">
              <option>BEDROOM</option>
              <option>LIVING ROOM</option>
              <option>BATHROOM</option>
              <option>EXTERIOR</option>
              <option>KITCHEN</option>
              <option>COMMERCIAL</option>
            </select>
          </div>

          <div>
            <Label>Upload Portfolio Images</Label>
            <Input type="file" multiple onChange={(e) => setPortfolioImages(Array.from(e.target.files || []))} />
          </div>

          <div className="flex gap-2 flex-wrap">
            {portfolioImageUrls.map((url, index) => (
              <div key={index} className="relative">
                <Image 
                width={400} // Set a suitable width
                height={450} src={url} alt="Portfolio" className="w-20 h-20 object-cover rounded-md" />
                <button onClick={() => removePortfolioImage(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2">❌</button>
              </div>
            ))}
          </div>
          <Button className="" onClick={handleSave}>Save Portfolio</Button>
        </div>
      )}
    </div>
  );
};

export default PortfolioEditor;
