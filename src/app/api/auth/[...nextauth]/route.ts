import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@/generated/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { z } from "zod";
import bcrypt from "bcryptjs"

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
  }
  interface Session {
    user: User;
  }
}

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({

      name: 'Credentials',
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials, req) {
        if (!credentials||!credentials.password||!credentials.email) throw new Error("Invalid credentials");
        const { email, password } = credentials;
        if (!email || !password) throw new Error("Invalid credentials");

        const user = await prisma.user.findUnique({
          where: { email }
         
        });

        if (!user || !user.password || !user.email) throw new Error("User not found");

        console.log(user.password, password);
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw new Error("Invalid password");


        return {
          id: user.id,
          email: user.email,
        };
      }

    })
  ],


  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${process.env.NEXTAUTH_URL}`;

    },
  },

});

export { handler as GET, handler as POST }



















