import { getServerSession } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : [
          GoogleProvider({
            clientId: "dummy-google-client-id",
            clientSecret: "dummy-google-client-secret",
          }),
        ]),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Mohon masukkan email atau username beserta kata sandi.");
        }
        const id = credentials.identifier.trim().toLowerCase();
        return {
          id: id,
          name: credentials.identifier.split("@")[0],
          email: credentials.identifier.includes("@") ? id : `${id}@whalebudget.local`,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "whale-sanctuary-super-secret-key-12345",
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).userId = token.sub;
      return session;
    },
  },
};

export const auth = () => getServerSession(authOptions);
