import {

  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip

} from "recharts"

interface FinanceChartItem {

  name: string

  income: number

  expense: number
}

interface Props {

  data: FinanceChartItem[]
}

export default function FinanceChart({
  data
}: Props) {

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-5">

      <div className="mb-4">

        <h3 className="font-bold text-gray-900">

          Cashflow Mingguan

        </h3>

        <p className="text-sm text-gray-400 mt-1">

          Pemasukan & pengeluaran

        </p>

      </div>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart data={data}>

            <XAxis
              dataKey="name"
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              fill="#10b98122"
              strokeWidth={3}
            />

            <Area
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              fill="#ef444422"
              strokeWidth={3}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}