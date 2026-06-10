import { X } from "lucide-react"

import type { Product } from "../../types/product"

interface Props {
  open: boolean
  editing: Product | null
  onClose: () => void
}

export default function ProductModal({
  open,
  editing,
  onClose
}: Props) {

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">

          <h3 className="text-lg font-bold text-gray-900">
            {editing
              ? "Edit Produk"
              : "Tambah Produk"}
          </h3>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>

        </div>

        {/* CONTENT */}
        <div className="space-y-4">

          <input
            placeholder="Nama Produk"
            className="w-full px-4 py-3 rounded-xl border border-gray-200"
          />

          <input
            placeholder="SKU"
            className="w-full px-4 py-3 rounded-xl border border-gray-200"
          />

          <button
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold"
          >
            Simpan Produk
          </button>

        </div>

      </div>

    </div>
  )
}