import { useEffect, useState } from "react"

import {

  FinanceStats,
  FinanceChart,
  FinanceTransactionTable

} from "../../components/finance"

import {
  getFinanceData,
  type FinanceChartItem,
  type FinanceTransaction
} from "../../services/financeService"

export function FinancePage() {

  const [revenue, setRevenue] = useState(0)
  const [expense, setExpense] = useState(0)
  const [profit, setProfit] = useState(0)
  const [transactions, setTransactions] =
    useState<FinanceTransaction[]>([])
  const [chart, setChart] =
    useState<FinanceChartItem[]>([])
  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    async function loadFinance() {
      try {
        setLoading(true)
        const data = await getFinanceData()

        setRevenue(data.revenue)
        setExpense(data.expense)
        setProfit(data.profit)
        setTransactions(data.transactions)
        setChart(data.chart)
      } catch (error: any) {
        alert(
          error.response?.data?.message ||
            "Gagal memuat keuangan"
        )
      } finally {
        setLoading(false)
      }
    }

    loadFinance()
  }, [])

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* STATS */}
      <FinanceStats
        revenue={revenue}
        expense={expense}
        profit={profit}
      />

      {/* CHART */}
      <FinanceChart
        data={chart}
      />

      {/* TABLE */}
      <FinanceTransactionTable
        transactions={transactions}
      />

      {loading && (
        <div className="bg-white border border-gray-100 rounded-3xl p-5 text-sm text-gray-500">
          Memuat data keuangan...
        </div>
      )}

    </div>
  )
}
