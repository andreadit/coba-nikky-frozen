import { useEffect, useState } from "react"

import ProductToolbar from "../../components/products/ProductToolbar"
import ProductTable from "../../components/products/ProductTable"
import ProductModal from "../../components/products/ProductModal"

import {
  createProduct,
  deleteProduct,
  getBranches,
  getCategories,
  getProducts,
  updateProduct
} from "../../services/productService"

import type { Product } from "../../types/product"
import type {
  ApiCategory,
  ApiBranch,
  ProductFormPayload
} from "../../services/productService"

export function ProductPage() {

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("Semua")
  const [products, setProducts] =
    useState<Product[]>([])
  const [categoriesApi, setCategoriesApi] =
    useState<ApiCategory[]>([])
  const [branches, setBranches] =
    useState<ApiBranch[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [showModal, setShowModal] =
    useState(false)

  const [editing, setEditing] =
    useState<Product | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setLoading(true)
      const [
        nextProducts,
        nextCategories,
        nextBranches
      ] = await Promise.all([
        getProducts(),
        getCategories(),
        getBranches()
      ])

      setProducts(nextProducts)
      setCategoriesApi(nextCategories)
      setBranches(nextBranches)
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Gagal memuat produk"
      )
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    "Semua",
    ...Array.from(
      new Set(
        products.map(p => p.category)
      )
    )
  ]

  const filtered = products.filter(p =>
    (category === "Semua" ||
      p.category === category) &&
    (
      p.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      p.sku
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  )

  async function handleSave(
    payload: ProductFormPayload
  ) {
    try {
      setSaving(true)

      if (editing) {
        await updateProduct(editing.id, payload)
      } else {
        await createProduct(payload)
      }

      setShowModal(false)
      setEditing(null)
      await loadData()
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          Object.values(
            error.response?.data?.errors ?? {}
          )
            .flat()
            .join("\n") ||
          "Produk gagal disimpan"
      )
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(
      `Hapus produk ${product.name}?`
    )

    if (!confirmed) return

    try {
      await deleteProduct(product.id)
      await loadData()
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Produk gagal dihapus"
      )
    }
  }

  return (
    <div className="p-4 lg:p-6 space-y-4">

      {/* TOOLBAR */}
      <ProductToolbar
        search={search}
        setSearch={setSearch}

        category={category}
        setCategory={setCategory}

        categories={categories}

        onAdd={() => {
          setEditing(null)
          setShowModal(true)
        }}
      />

      {/* TABLE */}
      <ProductTable
        products={filtered}

        onEdit={(product) => {
          setEditing(product)
          setShowModal(true)
        }}
        onDelete={handleDelete}
      />

      {loading && (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 text-sm text-gray-500">
          Memuat data produk...
        </div>
      )}

      {/* MODAL */}
      <ProductModal
        open={showModal}
        editing={editing}
        categories={categoriesApi}
        branches={branches}
        loading={saving}
        onClose={() => {
          setShowModal(false)
        }}
        onSave={handleSave}
      />

    </div>
  )
}
