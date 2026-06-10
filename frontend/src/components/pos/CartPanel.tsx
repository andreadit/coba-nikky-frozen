import CartItem from "./CartItem"

import type { CartItem as CartItemType } from "../../pages/pos/POSPage"

interface Props {
  items: CartItemType[]

  subtotal: number

  onIncrease: (id: number) => void
  onDecrease: (id: number) => void
  onRemove: (id: number) => void
}

export default function CartPanel({
  items,
  subtotal,
  onIncrease,
  onDecrease,
  onRemove
}: Props) {

  return (
    <div className="w-full lg:w-[400px] border-l border-gray-200 bg-white flex flex-col">

      <div className="p-5 border-b border-gray-100">

        <h2 className="text-lg font-bold text-gray-900">
          Keranjang
        </h2>

      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {items.length === 0 && (
          <div className="text-center text-sm text-gray-400 py-10">
            Keranjang masih kosong
          </div>
        )}

        {items.map(item => (

          <CartItem
            key={item.id}
            item={item}

            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
          />

        ))}

      </div>

      <div className="p-5 border-t border-gray-100 space-y-4">

        <div className="flex items-center justify-between">

          <span className="text-sm text-gray-500">
            Subtotal
          </span>

          <span className="text-xl font-bold text-gray-900">
            Rp {subtotal.toLocaleString("id-ID")}
          </span>

        </div>

        <button
          className="w-full py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
        >
          Checkout
        </button>

      </div>

    </div>
  )
}