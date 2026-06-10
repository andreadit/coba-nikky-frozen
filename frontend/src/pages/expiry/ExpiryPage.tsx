import { useState } from "react"

import { PRODUCTS } from "../../data/products"

import { daysFromNow } from "../../utils/date"

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

  const filtered =
    PRODUCTS.filter(product => {

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
    PRODUCTS.filter(
      p =>
        daysFromNow(
          p.expiry
        ) < 0
    ).length

  const warningCount =
    PRODUCTS.filter(p => {

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

    </div>
  )
}