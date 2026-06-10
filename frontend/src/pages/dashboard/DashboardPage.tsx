// src/pages/dashboard/DashboardPage.tsx

import { PRODUCTS } from "../../data/products";
import { REVENUE_WEEKLY, CATEGORY_DIST } from "../../data/dashboard";

import { daysFromNow } from "../../utils/date";
import { fmt } from "../../utils/currency";
import { BRANCH_PERFORMANCE } from "../../data/branches";

import {
  ExpiryAlertBanner,
  DashboardStats,
  RevenueChartCard,
  CategoryChartCard,
  BranchPerformanceCard,
  ExpiryProductList,
} from "../../components/dashboard";

export function DashboardPage() {
  const expiringProducts = PRODUCTS.filter(
    (p) => daysFromNow(p.expiry) <= 7
  );

  const lowStockProducts = PRODUCTS.filter(
    (p) => p.stock <= 10
  );

  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* Alert Banner */}
      <ExpiryAlertBanner
        total={expiringProducts.length}
      />

      {/* Statistic Cards */}
      <DashboardStats
        expiringCount={expiringProducts.length}
        lowStockCount={lowStockProducts.length}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <RevenueChartCard
          data={REVENUE_WEEKLY}
          formatCurrency={fmt}
        />

        <CategoryChartCard
          data={CATEGORY_DIST}
        />
      </div>

      {/* Branch Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <BranchPerformanceCard
        branches={BRANCH_PERFORMANCE}/>

      {/* Expiry Product List */}
      
        <ExpiryProductList
        products={expiringProducts}
        daysUntilExpiry={daysFromNow}/>
      </div>
    </div>
  );
}