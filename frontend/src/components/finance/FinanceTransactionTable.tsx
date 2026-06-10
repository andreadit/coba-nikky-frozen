import { fmt } from "../../utils/currency"

interface Transaction {

  id: number

  title: string

  category: string

  amount: number

  type: string

  date: string
}

interface Props {
  transactions: Transaction[]
}

export default function FinanceTransactionTable({

  transactions

}: Props) {

  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">

      <div className="p-5 border-b border-gray-100">

        <h3 className="font-bold text-gray-900">

          Transaksi Terbaru

        </h3>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead>

            <tr className="bg-gray-50 border-b border-gray-100">

              {[
                "Transaksi",
                "Kategori",
                "Tanggal",
                "Jumlah",
                "Tipe"
              ].map(header => (

                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-400 font-bold"
                >
                  {header}
                </th>

              ))}

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-50">

            {transactions.map(item => (

              <tr
                key={item.id}
                className="hover:bg-gray-50"
              >

                <td className="px-4 py-3 font-semibold text-gray-900">

                  {item.title}

                </td>

                <td className="px-4 py-3 text-gray-500">

                  {item.category}

                </td>

                <td className="px-4 py-3 text-gray-500">

                  {item.date}

                </td>

                <td className="px-4 py-3 font-bold">

                  {fmt(item.amount)}

                </td>

                <td className="px-4 py-3">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.type === "income"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >

                    {item.type === "income"
                      ? "Pemasukan"
                      : "Pengeluaran"}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}