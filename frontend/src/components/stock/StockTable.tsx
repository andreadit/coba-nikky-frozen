import { fmt } from "../../utils/currency"

import StockStatusBadge from "./StockStatusBadge"

import type { Product } from "../../types/product"

interface Props {
  products: Product[]
}

export default function StockTable({
  products
}: Props) {

  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead>

            <tr className="border-b border-gray-100 bg-gray-50">

              {[
                "Produk",
                "Kategori",
                "Harga",
                "Stok",
                "Cabang",
                "Status"
              ].map(header => (

                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-400 font-bold whitespace-nowrap"
                >
                  {header}
                </th>

              ))}

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-50">

            {products.map(product => (

              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
              >

                {/* PRODUCT */}
                <td className="px-4 py-3">

                  <div className="flex items-center gap-3">

                    <div className="text-3xl">

                      {product.emoji}

                    </div>

                    <div>

                      <p className="font-bold text-gray-900">

                        {product.name}

                      </p>

                      <p className="text-xs text-gray-400">

                        {product.sku}

                      </p>

                    </div>

                  </div>

                </td>

                {/* CATEGORY */}
                <td className="px-4 py-3 text-gray-500">

                  {product.category}

                </td>

                {/* PRICE */}
                <td className="px-4 py-3 font-semibold text-blue-600">

                  {fmt(product.price)}

                </td>

                {/* STOCK */}
                <td className="px-4 py-3 font-bold">

                  {product.stock}

                </td>

                {/* BRANCH */}
                <td className="px-4 py-3 text-gray-500">

                  {product.branch}

                </td>

                {/* STATUS */}
                <td className="px-4 py-3">

                  <StockStatusBadge
                    stock={product.stock}
                  />

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}