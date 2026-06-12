import { api } from "./api";

export interface FinanceTransaction {
  id: number;
  title: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string;
}

export interface FinanceChartItem {
  name: string;
  income: number;
  expense: number;
}

interface ApiFinance {
  revenue: number;
  expense: number;
  profit: number;
  transactions: Array<{
    id: number;
    invoice_no: string;
    total: number;
    created_at: string | null;
  }>;
  expenses: Array<{
    id: number;
    category: string;
    amount: number;
    expense_date: string;
    note: string | null;
  }>;
}

function toDate(value: string | null) {
  return value ? value.slice(0, 10) : "-";
}

export async function getFinanceData() {
  const response =
    await api.get<ApiFinance>("/finance");
  const data = response.data;

  const transactions: FinanceTransaction[] = [
    ...data.transactions.map((item) => ({
      id: item.id,
      title: item.invoice_no,
      category: "Penjualan",
      amount: item.total,
      type: "income" as const,
      date: toDate(item.created_at),
    })),
    ...data.expenses.map((item) => ({
      id: -item.id,
      title: item.note || item.category,
      category: item.category,
      amount: item.amount,
      type: "expense" as const,
      date: item.expense_date,
    })),
  ];

  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const chartMap = new Map<string, FinanceChartItem>();

  transactions.forEach((item) => {
    const date = new Date(item.date);
    const name = Number.isNaN(date.getTime())
      ? "-"
      : dayNames[date.getDay()];
    const row =
      chartMap.get(name) ??
      {
        name,
        income: 0,
        expense: 0,
      };

    if (item.type === "income") {
      row.income += item.amount;
    } else {
      row.expense += item.amount;
    }

    chartMap.set(name, row);
  });

  return {
    revenue: data.revenue,
    expense: data.expense,
    profit: data.profit,
    transactions,
    chart: Array.from(chartMap.values()),
  };
}
