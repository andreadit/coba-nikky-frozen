import { useEffect, useState } from "react"
import { getProducts } from "../../services/productService"
import type { Product } from "../../types/product"

import {
  StockStats,
  StockToolbar,
  StockTable
} from "../../components/stock"

export default function StockPage() {

  const [search, setSearch] =
    useState("")

  const [status, setStatus] =
    useState("Semua")

  const [products, setProducts] =
    useState<Product[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        setProducts(await getProducts())
      } catch (error: any) {
        alert(
          error.response?.data?.message ||
            "Gagal memuat stok"
        )
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filtered =
    products.filter(product => {

      const matchesSearch =

        product.name
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesStatus =

        status === "Semua"

        ||

        (
          status === "Menipis" &&
          product.stock <= (product.minimumStock ?? 10) &&
          product.stock > 0
        )

        ||

        (
          status === "Habis" &&
          product.stock <= 0
        )

        ||

        (
          status === "Aman" &&
          product.stock > (product.minimumStock ?? 10)
        )

      return (
        matchesSearch &&
        matchesStatus
      )
    })

  const lowStockCount =
    products.filter(
      p =>
        p.stock <= (p.minimumStock ?? 10) &&
        p.stock > 0
    ).length

  const emptyStockCount =
    products.filter(
      p => p.stock <= 0
    ).length

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* STATS */}
      <StockStats
        lowStockCount={lowStockCount}
        emptyStockCount={emptyStockCount}
      />

      {/* TOOLBAR */}
      <StockToolbar
        search={search}
        setSearch={setSearch}

        status={status}
        setStatus={setStatus}
      />

      {/* TABLE */}
      <StockTable
        products={filtered}
      />

      {loading && (
        <div className="bg-white border border-gray-100 rounded-3xl p-5 text-sm text-gray-500">
          Memuat data stok...
        </div>
      )}

    </div>
  )
}
