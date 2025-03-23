"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useSession } from "next-auth/react";
import IconBackadminButton from "@/components/global/iconadminback";


// const SOURCE_USER_ID = "F4DXnuFmS5XN6RQ69UwddqKfsgE3";
// const TARGET_USER_ID = "qUWjbrYhDyXyVDgaWlOCenHInDJ2";

const MessagesPage = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [messages, setMessages] = useState<{ name: string; email: string; phone: string; description: string }[]>([]);
  const [loading, setLoading] = useState(false);
  // const [copying, setCopying] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "retailers", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const messagesData = docSnap.data().messages || [];
          setMessages(messagesData);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userId]);


  // const copyPortfolio = async () => {
  //   setCopying(true);
  //   try {
  //     // Fetch source user's portfolio
  //     const sourceDocRef = doc(db, "retailers", SOURCE_USER_ID);
  //     const sourceDocSnap = await getDoc(sourceDocRef);

  //     if (!sourceDocSnap.exists()) {
  //       console.error("Source user portfolio not found!");
  //       return;
  //     }

  //     const sourceData = sourceDocSnap.data();
  //     const sourcePortfolios = sourceData.portfolios || [];

  //     if (sourcePortfolios.length === 0) {
  //       console.warn("No portfolios found for source user.");
  //       return;
  //     }

  //     // Update target user's portfolio
  //     const targetDocRef = doc(db, "retailers", TARGET_USER_ID);
  //     await updateDoc(targetDocRef, { portfolios: sourcePortfolios });

  //     console.log("Portfolio copied successfully!");
  //   } catch (error) {
  //     console.error("Error copying portfolio:", error);
  //   } finally {
  //     setCopying(false);
  //   }
  // };
  
  return (
    <div className="p-6 relative  mx-auto">
        <div className="w-full h-[100px] absolute top-0 left-0 z-10 bg-secondary shadow-md flex items-center">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between h-full py-3 px-4">
          <IconBackadminButton />
          <h1 className="text-4xl font-semibold">Messages</h1>
        </div>
      </div>
      <div className="mx-auto w-full max-w-7xl" >
      <h1 className="text-3xl font-bold mt-24 mb-6"></h1>

      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length > 0 ? (
        <div className="space-y-4 ">
          {messages.map((msg, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{msg.name}</h2>
              <p className="text-primary/70"><strong>Email:</strong> {msg.email}</p>
              <p className="text-primary/70"><strong>Phone:</strong> {msg.phone}</p>
              <p className="text-primary/90 mt-2">{msg.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No messages found.</p>
      )}
      {/* <button
          onClick={copyPortfolio}
          disabled={copying}
          className="mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md disabled:opacity-50"
        >
          {copying ? "Copying Portfolio..." : "Copy Portfolio to New User"}
        </button> */}
      </div>
    </div>
  );
};

export default MessagesPage;
