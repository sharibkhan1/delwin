"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchUserDataa } from "../../../action/userService";
import { NavBar } from "../ui/animated-background";
import { Home, User, Settings, Mail } from "lucide-react"; // Import icons from lucide-react

export default function Navbar() {
  const [isAdmin,setIsAdmin] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    // If there's no session or id, exit early
    if (!session?.user.id) return;

    const id = session.user.id;
    const fetchUserData = async (userId: string) => {
      try {
        const data = await fetchUserDataa(userId); // Fetch user data

        console.log("useIddd",data)
        if (userId === "qUWjbrYhDyXyVDgaWlOCenHInDJ2") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(id);
}, [session]);

  const BASE_TABS = [
    { name: "Home", url: "/home/#home", icon: Home  },
    { name: "About", url: "#about", icon: User  },
    { name: "Services", url: "#services", icon: Settings  },
    { name: "Contact", url: "#contact", icon: Mail  },
  ];
  const ADMIN_TAB = { name: "Admin", url: `/delwin/${session?.user?.id}/admin`, icon: Settings };

  const TABS = isAdmin ? [...BASE_TABS, ADMIN_TAB] : BASE_TABS;



  return (
    <NavBar items={TABS} />
  );
}
