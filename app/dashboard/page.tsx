import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/options";
import dbConnect from "@/lib/mongodb";
import { Expense } from "@/models/Expense";
import { Item } from "@/models/Item";
import { Need } from "@/models/Need";
import { Wishlist } from "@/models/Wishlist";
import { Saving } from "@/models/Saving";
import DashboardView from "@/components/DashboardView";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const userId = (session as any)?.userId;
  await dbConnect();

  const [expenses, items, needs, wishlists, savings] = await Promise.all([
    Expense.find({ userId }).sort({ date: -1 }).lean(),
    Item.find({ userId }).lean(),
    Need.find({ userId }).lean(),
    Wishlist.find({ userId }).lean(),
    Saving.find({ userId }).lean(),
  ]);

  const userName = session?.user?.name?.split(" ")[0] || "Teman Paus";

  return (
    <DashboardView
      userName={userName}
      expenses={JSON.parse(JSON.stringify(expenses))}
      items={JSON.parse(JSON.stringify(items))}
      needs={JSON.parse(JSON.stringify(needs))}
      savings={JSON.parse(JSON.stringify(savings))}
      wishlists={JSON.parse(JSON.stringify(wishlists))}
    />
  );
}
