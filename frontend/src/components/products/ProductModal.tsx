import { useEffect, useState } from "react"
import { X } from "lucide-react"

import type { Product } from "../../types/product"
import type { ApiBranch, ApiCategory, ProductFormPayload } from "../../services/productService"

interface Props {
  open: boolean
  editing: Product | null
  categories: ApiCategory[]
  branches: ApiBranch[]
  loading: boolean
  onClose: () => void
  onSave: (payload: ProductFormPayload) => void
}

export default function ProductModal({
  open,
  editing,
  categories,
  branches,
  loading,
  onClose,
  onSave
}: Props) {
  const [name, setName] = useState("")
  const [sku, setSku] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [branchId, setBranchId] = useState("")
  const [price, setPrice] = useState("")
  const [cost, setCost] = useState("")
  const [stock, setStock] = useState("")
  const [minimumStock, setMinimumStock] = useState("10")
  const [maximumStock, setMaximumStock] = useState("100")
  const [unit, setUnit] = useState("pcs")
  const [expiryDate, setExpiryDate] = useState("")

  useEffect(() => {
    if (!open) return

    setName(editing?.name ?? "")
    setSku(editing?.sku ?? "")
    setCategoryId(
      editing?.categoryId
        ? String(editing.categoryId)
        : categories[0]
          ? String(categories[0].id)
          : ""
    )
    setBranchId(
      editing?.branchId
        ? String(editing.branchId)
        : branches[0]
          ? String(branches[0].id)
          : ""
    )
    setPrice(editing ? String(editing.price) : "")
    setCost(
      editing?.cost != null
        ? String(editing.cost)
        : ""
    )
    setStock(editing ? String(editing.stock) : "")
    setMinimumStock(
      editing?.minimumStock != null
        ? String(editing.minimumStock)
        : "10"
    )
    setMaximumStock(
      editing?.maximumStock != null
        ? String(editing.maximumStock)
        : "100"
    )
    setUnit(editing?.unit ?? "pcs")
    setExpiryDate(editing?.expiry ?? "")
  }, [open, editing, categories, branches])

  if (!open) return null

  function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault()

    onSave({
      category_id: categoryId
        ? Number(categoryId)
        : null,
      branch_id: Number(branchId),
      sku,
      name,
      unit,
      price: Number(price),
      cost: cost ? Number(cost) : 0,
      stock: Number(stock),
      minimum_stock: Number(minimumStock),
      maximum_stock: maximumStock
        ? Number(maximumStock)
        : null,
      expiry_date: expiryDate || null,
      is_active: true
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">

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
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="space-y-1.5">
              <span className="text-xs font-semibold text-gray-500">
                Nama produk
              </span>

              <input
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Contoh: Chicken Nuggets 500g"
                className="w-full px-4 py-3 rounded-xl border border-gray-200"
                required
              />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-semibold text-gray-500">
                SKU
              </span>

              <input
                value={sku}
                onChange={(event) =>
                  setSku(event.target.value)
                }
                placeholder="Contoh: CHK-001"
                className="w-full px-4 py-3 rounded-xl border border-gray-200"
                required
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="space-y-1.5">
              <span className="text-xs font-semibold text-gray-500">
                Kategori
              </span>

              <select
                value={categoryId}
                onChange={(event) =>
                  setCategoryId(event.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200"
                required
              >
                {categories.map(category => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-semibold text-gray-500">
                Cabang
              </span>

              <select
                value={branchId}
                onChange={(event) =>
                  setBranchId(event.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200"
                required
              >
                {branches.map(branch => (
                  <option
                    key={branch.id}
                    value={branch.id}
                  >
                    {branch.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="space-y-1.5">
              <span className="text-xs font-semibold text-gray-500">
                Harga jual
              </span>

              <input
                value={price}
                onChange={(event) =>
                  setPrice(event.target.value)
                }
                type="number"
                min="0"
                placeholder="Contoh: 35000"
                className="w-full px-4 py-3 rounded-xl border border-gray-200"
                required
              />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-semibold text-gray-500">
                Harga modal
              </span>

              <input
                value={cost}
                onChange={(event) =>
                  setCost(event.target.value)
                }
                type="number"
                min="0"
                placeholder="Contoh: 24000"
                className="w-full px-4 py-3 rounded-xl border border-gray-200"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="space-y-1.5">
              <span className="text-xs font-semibold text-gray-500">
                Stok saat ini
              </span>

              <input
                value={stock}
                onChange={(event) =>
                  setStock(event.target.value)
                }
                type="number"
                min="0"
                placeholder="0"
                className="w-full px-4 py-3 rounded-xl border border-gray-200"
                required
              />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-semibold text-gray-500">
                Stok minimum
              </span>

              <input
                value={minimumStock}
                onChange={(event) =>
                  setMinimumStock(event.target.value)
                }
                type="number"
                min="0"
                placeholder="10"
                className="w-full px-4 py-3 rounded-xl border border-gray-200"
                required
              />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-semibold text-gray-500">
                Stok maksimum
              </span>

              <input
                value={maximumStock}
                onChange={(event) =>
                  setMaximumStock(event.target.value)
                }
                type="number"
                min="0"
                placeholder="100"
                className="w-full px-4 py-3 rounded-xl border border-gray-200"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="space-y-1.5">
              <span className="text-xs font-semibold text-gray-500">
                Satuan
              </span>

              <input
                value={unit}
                onChange={(event) =>
                  setUnit(event.target.value)
                }
                placeholder="pcs / pack / kg"
                className="w-full px-4 py-3 rounded-xl border border-gray-200"
                required
              />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-semibold text-gray-500">
                Tanggal kadaluarsa
              </span>

              <input
                value={expiryDate}
                onChange={(event) =>
                  setExpiryDate(event.target.value)
                }
                type="date"
                className="w-full px-4 py-3 rounded-xl border border-gray-200"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold"
          >
            {loading
              ? "Menyimpan..."
              : "Simpan Produk"}
          </button>

        </form>

      </div>

    </div>
  )
}
