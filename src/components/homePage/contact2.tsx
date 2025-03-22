"use client";
import React, { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";
import Image from "next/image";

interface SavedText {
  title: string;
  description: string;
}

interface UserData {
  savedText?: SavedText[];
}

const ContactPage = () => {

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", description: "" });
  const [, setMessageSent] = useState(false);

  const userId = "F4DXnuFmS5XN6RQ69UwddqKfsgE3"

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "retailers", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as UserData;
          setUserData(data); // Set state
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

  // 🕒 Loading state
  if (loading) return (
    <Skeleton className="h-[20rem] w-full bg-dark-brown-gold rounded-xl" />
  );
  if (!userData) return <p>No user data available.</p>;

  // 🔍 Find text descriptions by title
  const getText = (title: string) =>
    userData.savedText?.find((text) => text.title === title)?.description ?? "Not available";

  const email = getText("email");
  const phone = getText("phone");
  // const location = getText("location");
  // const linkedin = getText("link1");
  // const github = getText("link2");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.description) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const docRef = doc(db, "retailers", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const existingMessages = docSnap.data().messages || [];
        const updatedMessages = [...existingMessages, form];

        await updateDoc(docRef, { messages: updatedMessages });
        setMessageSent(true);
        toast.success(" Message sent successfully!")
        setForm({ name: "", email: "", phone: "", description: "" });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto  py-16 px-6">
      <h2 className="text-4xl font-semibold text-center text-foreground mb-10">
        Get <span className="text-primary/70">in Touch</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side: Contact Details */}
        <div className="flex flex-col relative shadow-primary/60  justify-between bg-secondary rounded-2xl p-8 shadow-md hover:shadow-lg transition">
          <div className="flex items-start flex-col" >
            <h3 className="text-2xl font-medium text-secondary-foreground mb-8">
              Contact Information
            </h3>
            <ul className="space-y-5 text-secondary-foreground">
              <li className="flex items-center">
              <Mail className="mr-3 text-muted-foreground" /> {email}
              </li>
              <li className="flex items-center">
              <Phone className="mr-3 text-muted-foreground" /> {phone}
              </li>
              {/* <li className="flex items-center">
              <MapPin className="mr-3 text-muted-foreground" /> {location}
              </li> */}
            </ul>
          </div>

          {/* Social Links */}
          <Image
            src="/logo.png"
            alt="logo"
            width={200}
            height={200}
            className="mt-8 flex items-end"
          />
          {/* <div className="mt-8">
            <h4 className="text-lg font-medium text-secondary-foreground mb-2">
              Connect with me:
            </h4>
            <div className="flex space-x-4">
            <a
              href={linkedin !== "Not available" ? linkedin : "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-7 h-7 text-muted-foreground hover:text-[#a8845b] transition" />
            </a>
            <a
              href={github !== "Not available" ? github : "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-7 h-7 text-muted-foreground hover:text-[#a8845b] transition" />
            </a>
          </div>
          </div> */}
        </div>
          {/* 📞 Contact */}
          <div className="bg-secondary shadow-primary/60 rounded-2xl p-8 shadow-md hover:shadow-lg transition">
          <h3 className="text-2xl font-medium text-secondary-foreground mb-4">
            Send a Message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 bg-muted rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-[#a8845b]"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-muted rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-[#a8845b]"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-3 bg-muted rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-[#a8845b]"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-3 bg-muted rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-[#a8845b] h-32"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <button
              type="submit"
              className="w-full bg-primary text-muted py-3 rounded-md hover:bg-secondary-foreground/70 transition"
            >
              Send Message
            </button>
          </form>
        </div>
    </div>
    </div>
  );
};

export default ContactPage;
