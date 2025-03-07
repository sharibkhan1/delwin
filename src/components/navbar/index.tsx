"use client";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { AnimatedBackground } from "../ui/animated-background";
import { useSession } from "next-auth/react";
import { fetchUserDataa } from "../../../action/userService";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin,setIsAdmin] = useState(false);
  const { data: session } = useSession();

  const BASE_TABS = ['Home', 'About', 'Services', 'Contact'];
  const TABS = isAdmin ? [...BASE_TABS , "Admin"]:BASE_TABS;

  useEffect(() => {
    // If there's no session or id, exit early
    if (!session?.user.id) return;

    const id = session.user.id;
    const fetchUserData = async (userId: string) => {
      try {
        const data = await fetchUserDataa(userId); // Fetch user data

        console.log("useIddd",data)
        if (userId === "F4DXnuFmS5XN6RQ69UwddqKfsgE3") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(id);
}, [session]);

  return (
    <nav className="navv w-full md:p-0 p-2 fixed top-6 left-0 z-50 text-foreground">
      <div className="max-w-7xl bg-card rounded-full mx-auto flex justify-between items-center p-4 border border-border shadow-md">
        <Link href="/home" className="text-2xl text-gradient-brown md:ml-4 font-bold tracking-wide">
        Interior <span className="text-gradient-gold">X</span>
        </Link>
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-foreground hover:text-primary transition-colors duration-200"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <div className="hidden md:flex gap-8 mr-4 font-medium text-lg">
          <AnimatedBackground
            defaultValue={TABS[0]}
            className="rounded-lg bg-primary dark:bg-zinc-800"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
            enableHover
          >
            {TABS.map((tab, index) => {
              const lowerTab = tab.toLowerCase();
              const href =
                tab === "Admin" && session?.user?.id
                  ? `/delwin/${session.user.id}/admin`
                  : `/home/#${lowerTab}`;

              return (
                <Link
                  key={index}
                  href={href}
                  data-id={tab}
                  className="px-2 py-0.5 text-zinc-600 transition-colors duration-300 hover:text-primary-foreground dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  {tab}
                </Link>
              );
            })}
          </AnimatedBackground>
        </div>
      </div>

      {isOpen && (
        <ul className="md:hidden flex flex-col items-center gap-6 py-6 bg-popover text-popover-foreground font-medium text-lg border-t border-border rounded-2xl shadow-lg">
          {TABS.map((tab, index) => {
            const lowerTab = tab.toLowerCase();
            const href =
              tab === "Admin" && session?.user?.id
                ? `/admin/${session.user.id}/admin`
                : `/#${lowerTab}`;

            return (
              <li key={index}>
                <Link
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-primary"
                >
                  {tab}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
