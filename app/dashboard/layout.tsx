import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/options";
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="relative min-h-screen bg-pastel-mesh text-ink selection:bg-sage selection:text-ink flex flex-col lg:flex-row overflow-x-clip transition-colors duration-500">
      {/* ═══ AMBIENT FLOATING GLOW BLOBS (MATCHING LANDING PAGE) ═══ */}
      <div className="pointer-events-none fixed top-1/4 left-[5%] h-64 w-64 rounded-full bg-sage/20 blur-[100px] z-0" />
      <div className="pointer-events-none fixed top-1/3 right-[5%] h-96 w-96 rounded-full bg-coral/20 blur-[120px] z-0" />

      {/* ═══ SIDEBAR NAVIGATION ═══ */}
      <Sidebar />

      {/* ═══ MAIN CONTENT AREA ═══ */}
      <div className="relative z-10 flex-1 lg:pl-72 min-h-screen flex flex-col">
        <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
