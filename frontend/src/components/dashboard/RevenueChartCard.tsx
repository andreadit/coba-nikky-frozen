// src/components/dashboard/RevenueChartCard.tsx

import { RevenueChart } from "../charts";

interface RevenueData {
  day: string;
  revenue: number;
  orders: number;
}

interface RevenueChartCardProps {
  data: RevenueData[];
  formatCurrency: (value: number) => string;
}

export function RevenueChartCard({
  data,
  formatCurrency,
}: RevenueChartCardProps) {
  return (
    <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-bold text-gray-900">
            Revenue Mingguan
          </h3>

          <p className="text-xs text-gray-400 mt-0.5">
            Total: Rp 24,95 Juta
          </p>
        </div>

        <select className="text-xs border border-gray-200 rounded-xl px-3 py-2 text-gray-500 bg-white">
          <option>7 hari terakhir</option>
          <option>30 hari terakhir</option>
        </select>
      </div>

      <RevenueChart
        data={data}
        formatCurrency={formatCurrency}
      />
    </div>
  );
}