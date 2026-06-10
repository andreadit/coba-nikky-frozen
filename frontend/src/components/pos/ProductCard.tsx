import { Plus } from "lucide-react"

import type { Product } from "../../types/product"

interface Props {
  product: Product
  onAdd: (product: Product) => void
}

export default function ProductCard({
  product,
  onAdd
}: Props) {

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">

      <div className="flex items-center justify-center h-24 text-5xl">
        {product.emoji}
      </div>

      <div className="space-y-1 mt-3">

        <h3 className="font-bold text-gray-900 leading-tight">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500">
          {product.category}
        </p>

        <div className="flex items-center justify-between pt-2">

          <span className="font-bold text-blue-600">
            Rp {product.price.toLocaleString("id-ID")}
          </span>

          <button
            onClick={() =>
              onAdd(product)
            }
            className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>

        </div>

      </div>

    </div>
  )
}