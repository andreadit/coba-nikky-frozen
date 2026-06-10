import {

  FinanceStats,
  FinanceChart,
  FinanceTransactionTable

} from "../../components/finance"

import {

  FINANCE_TRANSACTIONS,
  FINANCE_CHART

} from "../../data/finance"

export function FinancePage() {

  const revenue =
    FINANCE_TRANSACTIONS
      .filter(t => t.type === "income")
      .reduce((s, t) => s + t.amount, 0)

  const expense =
    FINANCE_TRANSACTIONS
      .filter(t => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0)

  const profit =
    revenue - expense

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
        data={FINANCE_CHART}
      />

      {/* TABLE */}
      <FinanceTransactionTable
        transactions={FINANCE_TRANSACTIONS}
      />

    </div>
  )
}