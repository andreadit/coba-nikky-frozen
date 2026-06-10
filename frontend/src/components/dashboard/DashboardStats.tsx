import {
  AlertTriangle,
  DollarSign,
  Package2,
  ShoppingCart,
} from "lucide-react";

import { StatCard } from "../ui";

interface DashboardStatsProps {
  expiringCount: number;
  lowStockCount: number;
}

export function DashboardStats({
  expiringCount,
  lowStockCount,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Revenue Hari Ini"
        value="Rp 4,25 Jt"
        sub="Sabtu, 15 Jan 2024"
        icon={<DollarSign className="w-5 h-5" />}
        color="blue"
        trend={{
          label: "+15%",
          up: true,
        }}
      />

      <StatCard
        title="Transaksi Hari Ini"
        value="85"
        sub="dari 3 cabang"
        icon={<ShoppingCart className="w-5 h-5" />}
        color="cyan"
        trend={{
          label: "+8%",
          up: true,
        }}
      />

      <StatCard
        title="Produk Kadaluarsa"
        value={String(expiringCount)}
        sub="≤ 7 hari ke depan"
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
        sub="< 10 unit tersisa"
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