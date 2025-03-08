"use client";
import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { Skeleton } from "../ui/skeleton";

interface SavedText {
  title: string;
  description: string;
}

interface UserData {
  savedText?: SavedText[];
}

const ContactPage2 = () => {

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

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
  const location = getText("location");
  const linkedin = getText("link1");
  const github = getText("link2");
  
  return (
    <div className="max-w-7xl mx-auto  py-16 px-6">
      <h2 className="text-4xl volkhov-bold font-semibold text-center text-[#5c4b36] mb-10">
        Get in Touch
      </h2>

        {/* Left Side: Contact Details */}
        <div className="flex flex-col md:flex-row justify-around  bg-[#f3f1ed] rounded-2xl p-8 shadow-md hover:shadow-lg transition">
          <div>
            <h3 className="text-2xl font-medium text-[#5c4b36] mb-8">
              Contact Information
            </h3>
            <ul className="space-y-5 text-[#7a5e47]">
              <li className="flex items-center">
              <Mail className="mr-3 text-[#c4a16c]" /> {email}
              </li>
              <li className="flex items-center">
              <Phone className="mr-3 text-[#c4a16c]" /> {phone}
              </li>
              <li className="flex items-center">
              <MapPin className="mr-3 text-[#c4a16c]" /> {location}
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="mt-8">
            <h4 className="text-lg font-medium text-[#5c4b36] mb-2">
              Connect with me:
            </h4>
            <div className="flex space-x-4">
            <a
              href={linkedin !== "Not available" ? linkedin : "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-7 h-7 text-[#c4a16c] hover:text-[#a8845b] transition" />
            </a>
            <a
              href={github !== "Not available" ? github : "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-7 h-7 text-[#c4a16c] hover:text-[#a8845b] transition" />
            </a>
          </div>
          </div>
        </div>
    </div>
  );
};

export default ContactPage2;
