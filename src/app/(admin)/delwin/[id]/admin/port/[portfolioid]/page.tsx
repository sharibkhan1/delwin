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
  description2?: string;
  type: string;
  images: string[];
  materials: { title: string; description: string; imageUrls: string[] }[];
  features: string[];
};

const PortfolioEditor = ({ params }: { params: Promise<{ portfolioid: string }> }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const userId = session?.user?.id;
  const { portfolioid: portfolioId } = use(params);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [description2, setDescription2] = useState("");
  const [type, setType] = useState("Bedroom"); // Dropdown state
  const [loading, setLoading] = useState(false);
  const [portfolioImages, setPortfolioImages] = useState<File[]>([]);
  const [portfolioImageUrls, setPortfolioImageUrls] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);

  const [materials, setMaterials] = useState<{ title: string; description: string; images: File[]; imageUrls: string[] }[]>([]);

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
            setDescription2(portfolio.description2);
            setType(portfolio.type || "Bedroom");
            setPortfolioImageUrls(portfolio.images || []);
            setMaterials(portfolio.materials || []);
            setFeatures(portfolio.features || []);
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

  const addFeature = () => {
    setFeatures([...features, ""]); // Add empty feature input
  };
  const updateFeature = (index: number, value: string) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };
  
  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

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
      
      if (docSnap.exists()) {
        existingPortfolios = docSnap.data().portfolios || [];
      } else {
        await setDoc(docRef, { portfolios: [] });
      }
  
      // ✅ Ensure we only store URLs (not File objects)
      const uploadedPortfolioImages = portfolioImages.length > 0
        ? await uploadImages(portfolioImages, `port/${portfolioId}`)
        : portfolioImageUrls;
  
      const uploadedMaterials = await Promise.all(
        materials.map(async (material) => {
          const uploadedImages = Array.isArray(material.images) && material.images.length > 0
            ? await uploadImages(material.images, `port/${portfolioId}/${material.title}`)
            : material.imageUrls || [];
  
          return {
            title: material.title,
            description: material.description,
            imageUrls: uploadedImages,
          };
        })
      );
  
      // ✅ Check if portfolio already exists
      const portfolioIndex = existingPortfolios.findIndex((p: Portfolio) => p.id === portfolioId);
  
      if (portfolioIndex !== -1) {
        // ✅ Update existing portfolio
        existingPortfolios[portfolioIndex] = {
          id: portfolioId,
          name,
          description,
          description2,
          type,
          images: uploadedPortfolioImages,
          materials: uploadedMaterials,
          features,
        };
      } else {
        // ✅ Add new portfolio if not found
        existingPortfolios.push({
          id: portfolioId,
          name,
          description,
          description2,
          type,
          images: uploadedPortfolioImages,
          materials: uploadedMaterials,
          features,
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
  
  

  const addMaterialSection = () => {
    setMaterials([...materials, { title: "", description: "", images: [], imageUrls: [] }]);
  };

  const removeMaterialSection = (index: number) => {
    setMaterials((prev) => prev.filter((_, i) => i !== index));
  };
  const removePortfolioImage = (index: number) => {
    setPortfolioImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const removeMaterialImage = (materialIndex: number, imageIndex: number) => {
    setMaterials((prev) => {
      const updatedMaterials = [...prev];
      updatedMaterials[materialIndex].imageUrls = updatedMaterials[materialIndex].imageUrls.filter((_, i) => i !== imageIndex);
      return updatedMaterials;
    });
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
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Portfolio Name" />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Portfolio Description" />
          </div>
          <div>
            <Label>Description2</Label>
            <Textarea value={description2} onChange={(e) => setDescription2(e.target.value)} placeholder="Portfolio Description2" />
          </div>

          <div>
            <Label>Portfolio Type</Label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded-md w-full">
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
<div>
  <Label>Features</Label>
  {features.map((feature, index) => (
    <div key={index} className="flex items-center gap-2">
      <Input
        value={feature}
        onChange={(e) => updateFeature(index, e.target.value)}
        placeholder="Feature description"
        className="mb-2"
      />
      <button onClick={() => removeFeature(index)} className="text-red-500">❌</button>
    </div>
  ))}
  <Button className="ml-2" onClick={addFeature}>+ Add Feature</Button>
</div>

          {materials.map((material, index) => (
            <div key={index} className="border p-4 relative rounded-md space-y-2">
              <Label>Material Title</Label>
              <button onClick={() => removeMaterialSection(index)} className="absolute right-2 top-2 text-red-500">❌</button>
              <Input value={material.title} onChange={(e) => {
                const newMaterials = [...materials];
                newMaterials[index].title = e.target.value;
                setMaterials(newMaterials);
              }} />

              <Label>Description</Label>
              <Textarea value={material.description} onChange={(e) => {
                const newMaterials = [...materials];
                newMaterials[index].description = e.target.value;
                setMaterials(newMaterials);
              }} />

              <Label>Upload Material Images</Label>
              <Input type="file" multiple onChange={(e) => {
                const newMaterials = [...materials];
                newMaterials[index].images = Array.from(e.target.files || []);
                setMaterials(newMaterials);
              }} />

              <div className="flex gap-2 flex-wrap">
                {material.imageUrls.map((url, imgIndex) => (
                  <div key={imgIndex} className="relative">
                    <Image width={400} // Set a suitable width
                height={450} src={url} alt="Material" className="w-20 h-20 object-cover rounded-md" />
                    <button onClick={() => removeMaterialImage(index, imgIndex)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2">❌</button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <Button className="mr-2" onClick={addMaterialSection}>+ Add Material</Button>
          <Button className="" onClick={handleSave}>Save Portfolio</Button>
        </div>
      )}
    </div>
  );
};

export default PortfolioEditor;
