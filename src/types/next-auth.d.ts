// next-auth.d.ts
import { Session as NextAuthSession } from "next-auth";

declare module "next-auth" {
  // Define your custom User interface with the `token` property
  interface User {
    id: string;
    name: string;
    email: string;
    token?: string; // Add `token` to the `User` interface
  }

  // Extend Session to include the token in user
  interface Session extends NextAuthSession {
    user: {
      id: string;
      name: string;
      email: string;
      token?: string;
    };
  }
}




/*
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { AdapterUser } from "next-auth/adapters";

// توسيع الواجهة Session داخل next-auth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      token: string;
      
    };
  }
}


// تخصيص الكولباك jwt و session
export const callbacks = {
  async jwt({ token, user }: { token: JWT; user?: AdapterUser }) {
    if (user) {
      token.user = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      // تأكد من أن `user.token` موجودة أو تحتاج إلى إضافتها
      token.token = user.token || ''; // إذا لم يكن هناك token في user، يتم تعيين قيمة افتراضية
    }
    return token;
  },

  async session(params: {
    session: Session;
    token: JWT;
    user: AdapterUser;
    newSession: Session; // استبدال any بـ Session أو النوع المناسب
    trigger?: "update";
  }) {
    const { session, token } = params;

    if (token?.user) {
      session.user = token.user as AdapterUser; // استبدال any بـ AdapterUser أو النوع المناسب
      session.user.token = token.token;
    }
    return session;
  },
};






declare module "next-auth" {
  interface User {
    name: string;
    email: string;
    role: string;
    token: string;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string;
  }
}

*/