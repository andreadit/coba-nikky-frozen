import {
  Minus,
  Plus,
  Trash2
} from "lucide-react"

import type { CartItem as CartItemType } from "../../pages/pos/POSPage"

interface Props {
  item: CartItemType

  onIncrease: (id: number) => void
  onDecrease: (id: number) => void
  onRemove: (id: number) => void
}

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove
}: Props) {

  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 bg-gray-50">

      <div className="text-3xl">
        {item.emoji}
      </div>

      <div className="flex-1">

        <h4 className="font-semibold text-sm text-gray-900">
          {item.name}
        </h4>

        <p className="text-xs text-gray-500">
          Rp {item.price.toLocaleString("id-ID")}
        </p>

      </div>

      <div className="flex items-center gap-2">

        <button
          onClick={() =>
            onDecrease(item.id)
          }
          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center"
        >
          <Minus className="w-3 h-3" />
        </button>

        <span className="w-5 text-center text-sm font-bold">
          {item.qty}
        </span>

        <button
          onClick={() =>
            onIncrease(item.id)
          }
          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center"
        >
          <Plus className="w-3 h-3" />
        </button>

      </div>

      <button
        onClick={() =>
          onRemove(item.id)
        }
        className="text-red-500"
      >
        <Trash2 className="w-4 h-4" />
      </button>

    </div>
  )
}