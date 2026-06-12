import { useEffect, useState } from "react"

import { daysFromNow } from "../../utils/date"
import { getProducts } from "../../services/productService"
import type { Product } from "../../types/product"

import {
  ExpiryStats,
  ExpiryToolbar,
  ExpiryTable
} from "../../components/expiry"

export default function ExpiryPage() {

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
        setProducts(
          await getProducts()
        )
      } catch (error: any) {
        alert(
          error.response?.data?.message ||
            "Gagal memuat data kadaluarsa"
        )
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filtered =
    products.filter(product => {

      if (!product.expiry) {
        return status === "Semua"
      }

      const days =
        daysFromNow(
          product.expiry
        )

      const matchesSearch =

        product.name
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesStatus =

        status === "Semua"

        ||

        (
          status === "Expired" &&
          days < 0
        )

        ||

        (
          status === "Hampir Expired" &&
          days >= 0 &&
          days <= 7
        )

        ||

        (
          status === "Aman" &&
          days > 7
        )

      return (
        matchesSearch &&
        matchesStatus
      )
    })

  const expiredCount =
    products.filter(
      p =>
        p.expiry &&
        daysFromNow(
          p.expiry
        ) < 0
    ).length

  const warningCount =
    products.filter(p => {

      if (!p.expiry) {
        return false
      }

      const days =
        daysFromNow(
          p.expiry
        )

      return (
        days >= 0 &&
        days <= 7
      )
    }).length

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* STATS */}
      <ExpiryStats
        expiredCount={expiredCount}
        warningCount={warningCount}
      />

      {/* TOOLBAR */}
      <ExpiryToolbar
        search={search}
        setSearch={setSearch}

        status={status}
        setStatus={setStatus}
      />

      {/* TABLE */}
      <ExpiryTable
        products={filtered}
      />

      {loading && (
        <div className="bg-white border border-gray-100 rounded-3xl p-5 text-sm text-gray-500">
          Memuat data kadaluarsa...
        </div>
      )}

    </div>
  )
}
