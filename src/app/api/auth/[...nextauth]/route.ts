
import NextAuth from "next-auth";
import { authOptions } from "@/auth"; // تأكد من المسار الصحيح

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

/*
import NextAuth from "next-auth/next";
import { authOptions } from "@/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

*/