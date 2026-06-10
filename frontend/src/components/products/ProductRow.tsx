import { Edit2, Trash2 } from "lucide-react"

import { Badge } from "../ui";
import ExpiryBadge from "./ExpiryBadge"

import type { Product } from "../../types/product"

import { fmt } from "../../utils"
import { daysFromNow } from "../../utils"
import { cn } from "../../lib/cn"

interface Props {
  product: Product
  onEdit: (product: Product) => void
}

export default function ProductRow({
  product,
  onEdit,
}: Props) {
  const days = daysFromNow(product.expiry)

  const isLow = product.stock <= 10

  return (
    <tr
      className={cn(
        "hover:bg-blue-50/30 transition-colors",
        days < 0 && "bg-red-50/20"
      )}
    >
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg">
            {product.emoji}
          </div>

          <p className="font-semibold text-gray-900">
            {product.name}
          </p>
        </div>
      </td>

      <td className="px-4 py-3.5 hidden md:table-cell">
        <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
          {product.sku}
        </code>
      </td>

      <td className="px-4 py-3.5">
        <Badge variant="info">
          {product.category}
        </Badge>
      </td>

      <td className="px-4 py-3.5 font-bold text-gray-900">
        {fmt(product.price)}
      </td>

      <td className="px-4 py-3.5 text-center">
        <span
          className={cn(
            "text-sm font-bold",
            isLow ? "text-red-600" : "text-gray-900"
          )}
        >
          {product.stock}
        </span>

        {isLow && (
          <div className="text-[9px] text-red-400 font-bold uppercase">
            Menipis
          </div>
        )}
      </td>

      <td className="px-4 py-3.5 hidden lg:table-cell text-xs text-gray-500">
        {product.expiry}
      </td>

      <td className="px-4 py-3.5 hidden lg:table-cell">
        <ExpiryBadge expiry={product.expiry} />
      </td>

      <td className="px-4 py-3.5 hidden xl:table-cell text-xs text-gray-500">
        {product.branch}
      </td>

      <td className="px-4 py-3.5">
        <div className="flex items-center gap-1">

          <button
            onClick={() => onEdit(product)}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>

          <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
            <Trash2 className="w-3.5 h-3.5" />
          </button>

        </div>
      </td>
    </tr>
  )
}