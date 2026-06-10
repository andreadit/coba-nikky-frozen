import { useState } from "react"

import { PRODUCTS } from "../../data/products"

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

  const filtered =
    PRODUCTS.filter(product => {

      const matchesSearch =

        product.name
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesStatus =

        status === "Semua"

        ||

        (
          status === "Menipis" &&
          product.stock <= 10
        )

        ||

        (
          status === "Habis" &&
          product.stock <= 0
        )

        ||

        (
          status === "Aman" &&
          product.stock > 10
        )

      return (
        matchesSearch &&
        matchesStatus
      )
    })

  const lowStockCount =
    PRODUCTS.filter(
      p => p.stock <= 10
    ).length

  const emptyStockCount =
    PRODUCTS.filter(
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

    </div>
  )
}