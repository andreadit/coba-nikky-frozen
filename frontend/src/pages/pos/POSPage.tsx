// src/pages/pos/POSPage.tsx

import { useState } from "react"

import { PRODUCTS } from "../../data/products"

import {
  ProductGrid,
  CartPanel,
  CategoryFilter,
  SearchBar
} from "../../components/pos"

import type { Product } from "../../types/product"

export interface CartItem extends Product {
  qty: number
}

export default function POSPage() {

  const [search, setSearch] =
    useState("")

  const [category, setCategory] =
    useState("Semua")

  const [cart, setCart] =
    useState<CartItem[]>([])

  const categories = [
    "Semua",

    ...Array.from(
      new Set(
        PRODUCTS.map(
          p => p.category
        )
      )
    )
  ]

  const filteredProducts =
    PRODUCTS.filter(product =>

      (category === "Semua" ||
        product.category === category)

      &&

      (
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())

        ||

        product.sku
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    )

  function addToCart(product: Product) {

    const existing =
      cart.find(
        item => item.id === product.id
      )

    if (existing) {

      setCart(prev =>
        prev.map(item =>

          item.id === product.id
            ? {
                ...item,
                qty: item.qty + 1
              }
            : item

        )
      )

      return
    }

    setCart(prev => [
      ...prev,

      {
        ...product,
        qty: 1
      }
    ])
  }

  function increaseQty(id: number) {

    setCart(prev =>
      prev.map(item =>

        item.id === id
          ? {
              ...item,
              qty: item.qty + 1
            }
          : item

      )
    )
  }

  function decreaseQty(id: number) {

    setCart(prev =>

      prev
        .map(item =>

          item.id === id
            ? {
                ...item,
                qty: item.qty - 1
              }
            : item

        )

        .filter(item => item.qty > 0)

    )
  }

  function removeItem(id: number) {

    setCart(prev =>

      prev.filter(
        item => item.id !== id
      )

    )
  }

  const subtotal =
    cart.reduce(

      (acc, item) =>

        acc + (
          item.price * item.qty
        ),

      0
    )

  return (
    <div className="h-full flex overflow-hidden bg-gray-50">

      {/* LEFT SIDE */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">

        {/* SEARCH */}
        <SearchBar
          value={search}
          onChange={setSearch}
        />

        {/* CATEGORY */}
        <CategoryFilter
          categories={categories}
          selected={category}
          onSelect={setCategory}
        />

        {/* PRODUCT GRID */}
        <ProductGrid
          products={filteredProducts}
          onAdd={addToCart}
        />

      </div>

      {/* RIGHT SIDE */}
      <CartPanel
        items={cart}

        subtotal={subtotal}

        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeItem}
      />

    </div>
  )
}