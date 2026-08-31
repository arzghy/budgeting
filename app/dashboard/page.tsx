import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/options";
import dbConnect from "@/lib/mongodb";
import { Expense } from "@/models/Expense";
import { Need } from "@/models/Need";
import { Wishlist } from "@/models/Wishlist";
import { Saving } from "@/models/Saving";
import { Whale } from "@/components/Whale";

function formatRp(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const userId = (session as any).userId;
  await dbConnect();

  const [expenses, needs, wishlists, savings] = await Promise.all([
    Expense.find({ userId }),
    Need.find({ userId }),
    Wishlist.find({ userId }),
    Saving.find({ userId }),
  ]);

  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);
  const totalSaved = savings.reduce((s, x) => s + x.amount, 0);
  const totalWishlistTarget = wishlists.reduce((s, w) => s + w.target, 0);
  const totalWishlistSaved = wishlists.reduce((s, w) => s + w.saved, 0);
  const needsHabis = needs.filter((n) => n.status === "habis").length;
  const wishlistPurchased = wishlists.filter((w) => w.purchased).length;

  const stats = [
    { label: "Pengeluaran", value: formatRp(totalExpense), bg: "bg-blush" },
    { label: "Total Nabung", value: formatRp(totalSaved), bg: "bg-sage" },
    { label: "Wishlist tercapai", value: `${wishlistPurchased} / ${wishlists.length}`, bg: "bg-peach" },
    { label: "Kebutuhan habis", value: `${needsHabis} item`, bg: "bg-cream" },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* greeting */}
      <div className="flex items-center gap-4">
        <div className="animate-bob">
          <Whale size={76} />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">
            halo, {session?.user?.name?.split(" ")[0] || "kamu"}.
          </h1>
          <p className="mt-1 text-sm font-semibold text-ink/60">ringkasan keuangan kamu hari ini</p>
        </div>
      </div>

      {/* stats grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={`card ${s.bg} p-4`}>
            <div className="text-xs font-bold text-ink/60">{s.label}</div>
            <div className="mt-1.5 font-display text-lg font-bold text-ink leading-tight">{s.value}</div>
          </div>
        ))}
      </div>

      {/* wishlist progress */}
      {wishlists.length > 0 && (
        <div className="card bg-paper p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-bold text-ink">progress wishlist</h2>
              <p className="mt-1 text-sm font-semibold text-ink/60">
                {formatRp(totalWishlistSaved)} dari {formatRp(totalWishlistTarget)}
              </p>
            </div>
            <div className="font-display text-2xl font-bold text-pistachioDeep">
              {totalWishlistTarget > 0 ? Math.round((totalWishlistSaved / totalWishlistTarget) * 100) : 0}%
            </div>
          </div>
          <div className="mt-4 h-4 w-full overflow-hidden rounded-full border-2 border-ink bg-cream">
            <div
              className="h-full rounded-full bg-pistachio transition-all"
              style={{ width: `${totalWishlistTarget > 0 ? Math.min(100, (totalWishlistSaved / totalWishlistTarget) * 100) : 0}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
