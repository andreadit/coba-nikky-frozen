import CartItem from "./CartItem"

import type { CartItem as CartItemType } from "../../pages/pos/POSPage"

interface Props {
  items: CartItemType[]

  subtotal: number
  paymentMethod: "cash" | "midtrans"
  checkoutLoading: boolean

  onIncrease: (id: number) => void
  onDecrease: (id: number) => void
  onRemove: (id: number) => void
  onPaymentMethodChange: (
    method: "cash" | "midtrans"
  ) => void
  onCheckout: () => void
}

export default function CartPanel({
  items,
  subtotal,
  paymentMethod,
  checkoutLoading,
  onIncrease,
  onDecrease,
  onRemove,
  onPaymentMethodChange,
  onCheckout
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

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Metode pembayaran
          </label>

          <select
            value={paymentMethod}
            onChange={(event) =>
              onPaymentMethodChange(
                event.target.value as
                  | "cash"
                  | "midtrans"
              )
            }
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="cash">
              Tunai
            </option>
            <option value="midtrans">
              Midtrans
            </option>
          </select>
        </div>

        <button
          type="button"
          onClick={onCheckout}
          disabled={
            checkoutLoading ||
            items.length === 0
          }
          className="w-full py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {checkoutLoading
            ? "Memproses..."
            : "Checkout"}
        </button>

      </div>

    </div>
  )
}
