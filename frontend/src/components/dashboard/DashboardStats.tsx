import {
  AlertTriangle,
  DollarSign,
  Package2,
  ShoppingCart,
} from "lucide-react";

import { StatCard } from "../ui";
import { fmt } from "../../utils/currency";

interface DashboardStatsProps {
  todayRevenue: number;
  todayTransactionCount: number;
  activeBranchCount: number;
  expiringCount: number;
  lowStockCount: number;
}

export function DashboardStats({
  todayRevenue,
  todayTransactionCount,
  activeBranchCount,
  expiringCount,
  lowStockCount,
}: DashboardStatsProps) {
  const todayLabel =
    new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Revenue Hari Ini"
        value={fmt(todayRevenue)}
        sub={todayLabel}
        icon={<DollarSign className="w-5 h-5" />}
        color="blue"
        trend={{
          label: "Realtime",
          up: true,
        }}
      />

      <StatCard
        title="Transaksi Hari Ini"
        value={String(todayTransactionCount)}
        sub={`dari ${activeBranchCount} cabang aktif`}
        icon={<ShoppingCart className="w-5 h-5" />}
        color="cyan"
        trend={{
          label: "Hari ini",
          up: true,
        }}
      />

      <StatCard
        title="Produk Kadaluarsa"
        value={String(expiringCount)}
        sub="<= 7 hari ke depan"
        icon={<AlertTriangle className="w-5 h-5" />}
        color="amber"
        trend={{
          label: "Perlu Aksi",
          up: false,
        }}
      />

      <StatCard
        title="Stok Menipis"
        value={String(lowStockCount)}
        sub="<= stok minimum"
        icon={<Package2 className="w-5 h-5" />}
        color="red"
        trend={{
          label: "Segera Restock",
          up: false,
        }}
      />
    </div>
  );
}
