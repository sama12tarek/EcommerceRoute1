import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import type { JWT as NextAuthJWT } from "next-auth/jwt";
import type { User, Session } from "next-auth";

// تعريف الـ JWT الخاص بك
interface CustomJWT extends NextAuthJWT {
  user?: {
    id: string;
    name: string;
    email: string;
    token?: string;
  };
  token?: string;
}

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
      authorize: async (credentials): Promise<User | null> => {
        try {
          // إرسال طلب المصادقة إلى API
          const response = await fetch(`${process.env.API}/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const payload = await response.json();

          // التحقق من الرد
          if (!response.ok) {
            console.error('API request failed with status:', response.status);
            return null;
          }

          if (payload.message === "success" && payload.token && payload.user) {
            const decodedToken: DecodedToken = jwtDecode(payload.token);
            return {
              id: decodedToken.id,
              name: payload.user.name,
              email: payload.user.email,
              token: payload.token, // تضمين التوكن هنا
            };
          } else {
            console.error("Invalid response payload:", payload);
            return null;
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt" as const,
  },

  callbacks: {
    // دالة JWT
    async jwt({ token, user }: { token: CustomJWT; user?: User }) {
      if (user) {
        token.user = {
          id: user.id || "", // التأكد من أن المعرف غير فارغ
          name: user.name || "", // التأكد من أن الاسم غير فارغ
          email: user.email || "", // التأكد من أن البريد غير فارغ
        };

        if (user.token) {
          token.token = user.token; // تعيين التوكن إذا كان موجودًا
        }
      }

      return token;
    },

    // دالة session
    async session({ session, token }: { session: Session; token: CustomJWT }) {
      if (token?.user) {
        session.user = {
          id: token.user.id || "",
          name: token.user.name || "",
          email: token.user.email || "",
          token: token.token || "", // التأكد من أن التوكن هو سترينغ
        };
      } else {
        session.user = { id: "", name: "", email: "", token: "" };
      }

      console.log("Session Data:", session); // طباعة بيانات الجلسة للمراجعة
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