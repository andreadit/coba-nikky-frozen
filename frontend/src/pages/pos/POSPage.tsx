// src/pages/pos/POSPage.tsx

import { useEffect, useState } from "react"
import { getProducts } from "../../services/productService"
import { createTransaction } from "../../services/transactionService"
import { createMidtransPayment } from "../../services/paymentService"

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

  const [products, setProducts] =
    useState<Product[]>([])

  const [loading, setLoading] =
    useState(true)

  async function loadProducts() {
    try {
      setLoading(true)
      setProducts(await getProducts())
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Gagal memuat produk POS"
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const [paymentMethod, setPaymentMethod] =
    useState<"cash" | "midtrans">("cash")

  const [checkoutLoading, setCheckoutLoading] =
    useState(false)

  const categories = [
    "Semua",
    ...Array.from(
      new Set(
        products.map(
          p => p.category
        )
      )
    )
  ]

  const filteredProducts =
    products.filter(product =>

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
    if (product.stock <= 0) {
      alert("Stok produk ini habis.")
      return
    }

    const cartBranchId = cart[0]?.branchId
    if (
      cartBranchId &&
      product.branchId &&
      cartBranchId !== product.branchId
    ) {
      alert(
        "Satu transaksi hanya bisa berisi produk dari cabang yang sama."
      )
      return
    }

    const existing =
      cart.find(
        item => item.id === product.id
      )

    if (existing) {
      if (existing.qty >= product.stock) {
        alert("Jumlah di keranjang melebihi stok tersedia.")
        return
      }

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
          ? item.qty >= item.stock
            ? item
            : {
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

  async function checkout() {
    if (cart.length === 0) {
      return
    }

    const savedUser = localStorage.getItem("user")
    const user = savedUser ? JSON.parse(savedUser) : null
    const checkoutBranchId =
      cart[0]?.branchId ??
      user?.branch_id ??
      user?.branch?.id ??
      1

    const hasMixedBranches = cart.some(
      item =>
        item.branchId &&
        item.branchId !== checkoutBranchId
    )

    if (hasMixedBranches) {
      alert(
        "Keranjang berisi produk dari cabang berbeda. Pisahkan transaksi per cabang."
      )
      return
    }

    try {
      setCheckoutLoading(true)

      const transaction =
        await createTransaction({
          branch_id: checkoutBranchId,
          paid_amount:
            paymentMethod === "cash"
              ? subtotal
              : undefined,
          payment_method: paymentMethod,
          items: cart.map(item => ({
            product_id: item.id,
            qty: item.qty
          }))
        })

      if (paymentMethod === "midtrans") {
        const payment =
          await createMidtransPayment(
            transaction.id
          )

        window.location.href =
          payment.redirect_url
        return
      }

      alert(
        `Transaksi ${transaction.invoice_no} berhasil.`
      )
      setCart([])
      await loadProducts()
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          error.response?.data?.errors?.items?.[0] ||
          "Checkout gagal"
      )
    } finally {
      setCheckoutLoading(false)
    }
  }

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

        {loading && (
          <div className="bg-white border border-gray-100 rounded-3xl p-5 text-sm text-gray-500">
            Memuat produk kasir...
          </div>
        )}

      </div>

      {/* RIGHT SIDE */}
      <CartPanel
        items={cart}

        subtotal={subtotal}
        paymentMethod={paymentMethod}
        checkoutLoading={checkoutLoading}

        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeItem}
        onPaymentMethodChange={setPaymentMethod}
        onCheckout={checkout}
      />

    </div>
  )
}
