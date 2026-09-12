import { getServerSession } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import { verifyPassword } from "@/lib/password";
import { Account } from "@/models/Account";

export const authOptions: NextAuthOptions = {
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
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
        await dbConnect();
        const account = await Account.findOne({ email: id });
        if (!account || !verifyPassword(credentials.password, account.passwordHash)) return null;
        return { id: account._id.toString(), name: account.name, email: account.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "whale-sanctuary-super-secret-key-12345",
  pages: { signIn: "/login" },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google" || !user.email) return true;
      await dbConnect();
      const existing = await Account.findOne({ email: user.email.toLowerCase() });
      const linked = existing || await Account.create({
        email: user.email.toLowerCase(),
        name: user.name || user.email.split("@")[0],
        passwordHash: "",
      });
      user.id = linked._id.toString();
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        await dbConnect();
        const account = await Account.findById(user.id).select("sessionVersion");
        (token as typeof token & { sessionVersion?: number }).sessionVersion = account?.sessionVersion ?? 0;
      } else if (token.sub && typeof (token as typeof token & { sessionVersion?: number }).sessionVersion === "number") {
        await dbConnect();
        const account = await Account.findById(token.sub).select("sessionVersion");
        (token as typeof token & { invalidated?: boolean }).invalidated = !account || account.sessionVersion !== (token as typeof token & { sessionVersion?: number }).sessionVersion;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).userId = token.sub;
      (session as any).sessionVersion = (token as typeof token & { sessionVersion?: number }).sessionVersion;
      return session;
    },
  },
};

export async function auth() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  await dbConnect();
  const account = await Account.findById((session as any).userId).select("sessionVersion");
  if (!account || account.sessionVersion !== (session as any).sessionVersion) return null;
  return session;
}
