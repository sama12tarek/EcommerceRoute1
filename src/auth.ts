import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import type { JWT } from "next-auth/jwt";
import type { User, Session } from "next-auth";

interface DecodedToken {
  id: string;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const response = await fetch(`${process.env.API}/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const payload = await response.json();

          if (payload.message === "success" && payload.token && payload.user) {
            const decodedToken: DecodedToken = jwtDecode(payload.token);

            return {
              id: decodedToken.id,
              name: payload.user.name,
              email: payload.user.email,
              token: payload.token,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt" as const,
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.user) {
        session.user = token.user;
        // @ts-expect-error token غير معرف في النوع الافتراضي للجلسة
        session.user.token = token.token;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };







/*
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import {jwtDecode} from "jwt-decode";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const response = await fetch(`${process.env.API}/auth/signin`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          const payload = await response.json();
              console.log(payload)
          if (payload.message === "success") {
            const decodedToken: { id: string } = jwtDecode(payload.token);

            return {
              id: decodedToken.id,
              name: payload.user.name,
              email: payload.user.email,
              token: payload.token,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user=user; 
        token.token=user.token;
      }
        return token
    },

    async session({ session, token }) {
      session.user = token?.user;
    
 session.user.token = token?.token;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };









*/