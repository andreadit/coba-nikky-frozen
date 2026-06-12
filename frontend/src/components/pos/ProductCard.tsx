import { Plus } from "lucide-react"
import ProductVisual from "../products/ProductVisual"

import type { Product } from "../../types/product"

interface Props {
  product: Product
  onAdd: (product: Product) => void
}

export default function ProductCard({
  product,
  onAdd
}: Props) {
  const isOutOfStock = product.stock <= 0

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">

      <div className="flex items-center justify-center h-24">
        <ProductVisual
          category={product.category}
          size="lg"
        />
      </div>

      <div className="space-y-1 mt-3">

        <h3 className="font-bold text-gray-900 leading-tight">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500">
          {product.category}
        </p>

        <p className="text-xs font-semibold text-gray-500">
          Stok: {product.stock}
        </p>

        <p className="text-[11px] text-gray-400">
          {product.branch}
        </p>

        <div className="flex items-center justify-between pt-2">

          <span className="font-bold text-blue-600">
            Rp {product.price.toLocaleString("id-ID")}
          </span>

          <button
            onClick={() =>
              onAdd(product)
            }
            disabled={isOutOfStock}
            className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>

        </div>

      </div>

    </div>
  )
}
