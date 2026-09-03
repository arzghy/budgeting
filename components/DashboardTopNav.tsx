import Link from "next/link";
import { Bell, ChevronDown } from "lucide-react";
export default function DashboardTopNav(){return <header className="flex justify-end gap-3 border-b border-sanctuary-ink/10 bg-sanctuary-rose px-6 py-4"><button className="grid size-10 place-items-center rounded-full bg-sanctuary-peach"><Bell size={17}/></button><Link href="/dashboard/profile" className="flex items-center gap-3 rounded-full bg-sanctuary-pistachio px-4 py-2 text-sm font-semibold">M Profil <ChevronDown size={15}/></Link></header>}
