"use client"

import { useEffect, useState } from "react"
import type { Product } from "@/features/types"

import ProductCard from "@/components/ProductCard"
import Products from "@/components/Products"

import "@/features/types"

import { useCart } from "@/hooks/useCart"
import RightDrawer from "@/components/Drawer"


export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([])

  const {
    handleAddToCart,
    handleDecrease,
    handleDelete,
    handleIncrease,
    handlePurchase,
    cart
  } = useCart()

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("/api/product", {
        method: "get",
      })

      const result = (await response.json()) as { data: Product[] }
      setProducts(result.data)
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getProducts()
  }, [])


  if (!products.length) {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <p>No products</p>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-screen-2xl">
      <RightDrawer cart={cart}
        handleDecrease={handleDecrease}
        handleDelete={handleDelete}
        handleIncrease={handleIncrease}
        handlePurchase={handlePurchase}/>
      <Products>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            onAddToCart={handleAddToCart}
            {...product}
          />
        ))}
      </Products>
    </div>
  )
}
