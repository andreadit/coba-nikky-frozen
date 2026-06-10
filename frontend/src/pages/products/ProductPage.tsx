import { useState } from "react"

import ProductToolbar from "../../components/products/ProductToolbar"
import ProductTable from "../../components/products/ProductTable"
import ProductModal from "../../components/products/ProductModal"

import { PRODUCTS } from "../../data"

import type { Product } from "../../types/product"

export function ProductPage() {

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("Semua")

  const [showModal, setShowModal] =
    useState(false)

  const [editing, setEditing] =
    useState<Product | null>(null)

  const categories = [
    "Semua",
    ...Array.from(
      new Set(
        PRODUCTS.map(p => p.category)
      )
    )
  ]

  const filtered = PRODUCTS.filter(p =>
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
      />

      {/* MODAL */}
      <ProductModal
        open={showModal}
        editing={editing}
        onClose={() => {
          setShowModal(false)
        }}
      />

    </div>
  )
}