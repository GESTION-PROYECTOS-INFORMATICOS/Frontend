import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { NextResponse } from "next/server";

export const authOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const allowedDomains = ["uv.cl", "alumnos.uv.cl"];
      const emailDomain = user.email?.split("@")[1];
      return allowedDomains.includes(emailDomain) ? true : "/unauthorized";
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
};

const handler = NextAuth(authOptions);

// 👇 Correcto para App Router
export const GET = handler;
export const POST = handler;
