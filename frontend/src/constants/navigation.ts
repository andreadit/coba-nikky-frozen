// navigation.ts

import type { LucideIcon } from "lucide-react";

import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  AlertTriangle,
  Package2,
  BarChart2,
  Users,
  Wifi,
} from "lucide-react";

import type { Page, Role } from "../types";

export interface NavItem {
  id: Page;
  label: string;
  icon: LucideIcon;
  roles: Role[];
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["owner", "admin_keuangan"],
  },
  {
    id: "pos",
    label: "Kasir / POS",
    icon: ShoppingCart,
    roles: ["owner", "kasir"],
  },
  {
    id: "products",
    label: "Produk",
    icon: Package,
    roles: ["owner", "admin_gudang"],
  },
  {
    id: "expiry",
    label: "Kadaluarsa",
    icon: AlertTriangle,
    roles: ["owner", "admin_gudang"],
    badge: "3",
  },
  {
    id: "stock",
    label: "Stok",
    icon: Package2,
    roles: ["owner", "admin_gudang"],
  },
  {
    id: "finance",
    label: "Keuangan",
    icon: BarChart2,
    roles: ["owner", "admin_keuangan"],
  },
  {
    id: "users",
    label: "Pengguna",
    icon: Users,
    roles: ["owner"],
  },
  {
    id: "offline",
    label: "Sinkronisasi",
    icon: Wifi,
    roles: [
      "owner",
      "kasir",
      "admin_gudang",
      "admin_keuangan",
    ],
  },
];