import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/app/firebase/config";
import { getDoc, doc } from "firebase/firestore";
import authConfig from "./auth.config";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import type { AuthOptions, SessionStrategy } from "next-auth";

const authOptions:AuthOptions  = {
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" as SessionStrategy }, // Explicitly set the type
  pages: {
    signIn: "/signin",
    signOut: "/signin",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.sub = user.id;
        const currentTime = Math.floor(Date.now() / 1000);
        const expiresIn = 60 * 60;
        token.exp = currentTime + expiresIn;
      }
    
      if (token.sub) {  // Ensure token.sub is defined before using it
        const userDocRef = doc(db, "admins", token.sub);
        const userDoc = await getDoc(userDocRef);
    
        if (userDoc.exists()) {
          token.role = userDoc.data().role;
        } else {
          const retailerDocRef = doc(db, "retailers", token.sub);
          const retailerDoc = await getDoc(retailerDocRef);
          token.role = retailerDoc.exists() ? retailerDoc.data().role : null;
        }
      }
    
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role ?? null;
      }
      return session;
    },
  },
};

export default authOptions; // Export as default for NextAuth
