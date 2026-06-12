import { api } from "./api";

export interface DashboardSummary {
  today_revenue: number;
  monthly_revenue: number;
  today_transaction_count: number;
  active_branch_count: number;
  product_count: number;
  low_stock_count: number;
  expiring_count: number;
  branch_performance: Array<{
    branch: string;
    revenue: number;
    pct: number;
    trend: string;
  }>;
}

export async function getDashboardSummary() {
  const response =
    await api.get<DashboardSummary>("/dashboard");

  return response.data;
}
