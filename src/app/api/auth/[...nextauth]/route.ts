import NextAuth from "next-auth";
import authOptions from "../../../../../auth";

const handler = NextAuth(authOptions); // Pass options directly to NextAuth

export { handler as GET, handler as POST }; // Export handlers for GET and POST
