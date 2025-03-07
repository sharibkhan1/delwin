"use client";
import React, { useEffect, useState, use } from "react";
import { useSession } from "next-auth/react";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import IconBackButton from "@/components/global/iconback";
import { ListCheck, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { data: session, status } = useSession();
  const { id: userId } = use(params); // ✅ Unwrap params with React.use()

  const [userData, setUserData] = useState<{ email?: string; savedText?: { title: string; description: string }[] }>({});
  const [, setLoading] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);

  useEffect(() => {
    if (!session?.user.id || !userId) return;

    const fetchUserData = async (Id: string) => {
      setLoading(true);
      try {
        const docRef = doc(db, "retailers", Id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
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
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData(userId);
  }, [session, userId]);

  const handleImageUpload = async () => {
    if (!imageFile || !imageName.trim()) return toast.error("Please select an image and provide a name.");

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `home/${imageName}`);
      await uploadBytes(storageRef, imageFile);
      toast.success("Image uploaded successfully!");
      setImageFile(null);
      setImageName("");
      const url = await getDownloadURL(storageRef);
      setImages((prev) => [...prev, { name: imageName, url }]);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
    }
  };

  const handleTextSave = async()=>{
    if(!title.trim() || !description.trim()){
      toast.error("both title and description are required");
      return;
    }

    try{
      const textDocRef = doc(db,"retailers",userId);
      await updateDoc(textDocRef,{
        savedText:arrayUnion({
          title:title.trim(),
          description:description.trim(),
        })
      });
      toast.success("Text saved successfully");
      setTitle("");
      setDescription("");

      const updatedDoc = await getDoc(textDocRef);
      if (updatedDoc.exists()) setUserData(updatedDoc.data());

    }catch(e){
      console.log("error saving text",e);
      toast.error("failed to save")
    }
  }

  const handleImageDelete = async (name: string) => {
    if (!window.confirm(`Delete image "${name}"?`)) return;

    try {
      const storage = getStorage();
      const imageRef = ref(storage, `home/${name}`);
      await deleteObject(imageRef);

      setImages((prev) => prev.filter((img) => img.name !== name));
      toast.success("Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image.");
    }
  };

  const handleTextDelete = async (title: string, description: string) => {
    if (!window.confirm(`Delete text titled "${title}"?`)) return;

    try {
      const textDocRef = doc(db, "retailers", userId);
      await updateDoc(textDocRef, {
        savedText: arrayRemove({ title, description }),
      });

      setUserData((prev) => ({
        ...prev,
        savedText: prev.savedText?.filter((text) => text.title !== title),
      }));

      toast.success("Text deleted successfully!");
    } catch (error) {
      console.error("Error deleting text:", error);
      toast.error("Failed to delete text.");
    }
  };
  
  if (status === "loading") return <p>Loading session...</p>;

  return (
    <div className="p-4 space-y-8">
<div className="w-full h-[100px] top-0 left-0 z-10 bg-secondary shadow-md">
        <div className="max-w-7xl  mx-auto flex items-center justify-between h-full py-3 px-4">
          {/* Back Button */}
          
          <IconBackButton/>
          {/* Page Title */}
          <h1 className="text-4xl font-semibold">Admin Page</h1>

          {/* Placeholder for spacing or future actions */}
          <div className="">
            <Link  href="admin/port">
            <ListCheck size={30} />
            </Link>
          </div>
        </div>
      </div>  
   <div className="bg-white p-3 rounded-lg shadow-md text-sm text-black flex-col shadow-black/35">
      <p>
      1. <span className="font-semibold" >home1:</span> herosection image ; <span className="font-semibold" >text1:</span> herosection title
      </p>
      <p>      2. <span className="font-semibold">grid1,2,3,4:</span> for mywork section</p>
      <p>      3. <span className="font-semibold" >person:</span> profile image ; <span className="font-semibold" >name:</span> your name ; <span className="font-semibold" >profilesub:</span> short skills ; <span className="font-semibold" >profiledes:</span> description
      </p>
      <p>      4. <span className="font-semibold" >port-1,port-2,.....</span> for profile detail your works images
      </p>
      <p>      5.<span className="font-semibold" >email:</span> email ; <span className="font-semibold" >location:</span> address ; <span className="font-semibold" >link1:</span> www.qweqe ; <span className="font-semibold" >link2:</span> www. ; <span className="font-semibold" >phone:</span> 9090989
      </p>
   </div>
  
    {/* Row 1: Forms (30%) | Images (70%) */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Forms Column (30%) */}
      <div className="space-y-6 col-span-1">
        {/* Image Upload Form */}
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-2">Upload Image to /home</h2>
          <Label htmlFor="imageName">Image Name</Label>
          <Input
            id="imageName"
            type="text"
            placeholder="Enter image name"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
          />
          <Label htmlFor="picture" className="mt-4">Select Image</Label>
          <Input
            id="picture"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          <Button
            className="mt-4"
            onClick={handleImageUpload}
            disabled={!imageFile || !imageName.trim()}
          >
            Upload Image
          </Button>
        </div>
  
        {/* Text Save Form */}
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-2">Save Text with Title</h2>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label htmlFor="description" className="mt-4">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            className="mt-4"
            onClick={handleTextSave}
            disabled={!title.trim() || !description.trim()}
          >
            Save Text
          </Button>
        </div>
      </div>
  
      {/* Uploaded Images Column (70%) */}
      <div className="col-span-2 bg-gray-50 p-4 overflow-y-auto max-h-[530px] h-[530px] rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Uploaded Images</h2>
        {images.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map(({ name, url }, index) => (
              <div key={index} className="relative border p-2 rounded-md">
                <button
                  onClick={() => handleImageDelete(name)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
                  aria-label="Delete image"
                >
                  <X size={16} />
                </button>
                <Image width={400} // Set a suitable width
                height={450} src={url} alt={name} className="w-full h-40 object-cover rounded" />
                <p className="mt-2 text-center font-medium">{name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No images uploaded yet.</p>
        )}
      </div>
    </div>
  
    {/* Row 2: Titles & Descriptions List (Single Column) */}
    <div className="bg-gray-50 p-4 overflow-y-auto max-h-[430px] h-[430px] rounded-lg shadow">
      <h2 className="text-lg font-medium mb-4">Saved Titles & Descriptions</h2>
      {userData.savedText?.length ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userData.savedText.map(({ title, description }, index) => (
              <li key={index} className="relative border p-4 rounded-md flex flex-col justify-between min-h-[120px]">
                <button
                  onClick={() => handleTextDelete(title, description)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
                  aria-label="Delete text"
                >
                  <X size={16} />
                </button>
                <p className="font-semibold text-primary">
                  <strong>Title:</strong> {title}
                </p>
                <p className="text-muted-foreground mt-2 overflow-hidden text-ellipsis">
                  <strong>Description:</strong> {description}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No saved texts found.</p>
        )}
    </div>
  </div>
  
);
};
export default Page;
