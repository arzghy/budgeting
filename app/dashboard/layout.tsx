import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/options";
import Navbar from "@/components/Navbar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <div className="bg-pastel-mesh min-h-screen pb-20">
      <Navbar />
      <main className="mx-auto max-w-3xl px-5 py-6">{children}</main>
    </div>
  );
}
