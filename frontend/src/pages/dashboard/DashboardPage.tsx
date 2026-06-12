import { useEffect, useState } from "react";
import { REVENUE_WEEKLY } from "../../data/dashboard";

import { daysFromNow } from "../../utils/date";
import { fmt } from "../../utils/currency";
import { getProducts } from "../../services/productService";
import { getDashboardSummary } from "../../services/dashboardService";
import type { Product } from "../../types/product";
import type { DashboardSummary } from "../../services/dashboardService";

import {
  ExpiryAlertBanner,
  DashboardStats,
  RevenueChartCard,
  CategoryChartCard,
  BranchPerformanceCard,
  ExpiryProductList,
} from "../../components/dashboard";

const EMPTY_SUMMARY: DashboardSummary = {
  today_revenue: 0,
  monthly_revenue: 0,
  today_transaction_count: 0,
  active_branch_count: 0,
  product_count: 0,
  low_stock_count: 0,
  expiring_count: 0,
  branch_performance: [],
};

const CATEGORY_COLORS = [
  "#1565C0",
  "#06B6D4",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

export function DashboardPage() {
  const [products, setProducts] =
    useState<Product[]>([]);
  const [summary, setSummary] =
    useState<DashboardSummary>(EMPTY_SUMMARY);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        const [
          nextProducts,
          nextSummary,
        ] = await Promise.all([
          getProducts(),
          getDashboardSummary(),
        ]);

        setProducts(nextProducts);
        setSummary(nextSummary);
      } catch (error: any) {
        alert(
          error.response?.data?.message ||
            "Gagal memuat dashboard"
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const expiringProducts = products.filter(
    (p) =>
      p.expiry &&
      daysFromNow(p.expiry) <= 7
  );

  const lowStockProducts = products.filter(
    (p) =>
      p.stock <= (p.minimumStock ?? 10)
  );

  const categoryDistribution =
    Object.entries(
      products.reduce<Record<string, number>>(
        (acc, product) => {
          acc[product.category] =
            (acc[product.category] ?? 0) + 1;

          return acc;
        },
        {}
      )
    ).map(([name, count], index) => ({
      name,
      value: products.length
        ? Math.round((count / products.length) * 100)
        : 0,
      color:
        CATEGORY_COLORS[
          index % CATEGORY_COLORS.length
        ],
    }));

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <ExpiryAlertBanner
        total={expiringProducts.length}
      />

      <DashboardStats
        todayRevenue={summary.today_revenue}
        todayTransactionCount={summary.today_transaction_count}
        activeBranchCount={summary.active_branch_count}
        expiringCount={expiringProducts.length}
        lowStockCount={lowStockProducts.length}
      />

      {loading && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 text-sm text-gray-500">
          Memuat data dashboard...
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <RevenueChartCard
          data={REVENUE_WEEKLY}
          formatCurrency={fmt}
        />

        <CategoryChartCard
          data={categoryDistribution}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <BranchPerformanceCard
          branches={summary.branch_performance}
        />

        <ExpiryProductList
          products={expiringProducts}
          daysUntilExpiry={daysFromNow}
        />
      </div>
    </div>
  );
}
