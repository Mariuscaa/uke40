// Importing React and necessary dependencies
"use client"

import { useEffect, useState } from "react"
import type { Product } from "@/features/types"

import ProductCard from "@/components/ProductCard"
import Products from "@/components/Products"

import "@/features/types"

import { useCart } from "@/hooks/useCart"
import RightDrawer from "@/components/Drawer"

// Importing custom components and types

// Defining the ResponsePage component
export default function ProductPage() {
  // State to store the responses data
  const [products, setProducts] = useState<Product[]>([])

  const {
    handleAddToCart,
    handleDecrease,
    handleDelete,
    handleIncrease,
    handlePurchase,
    cart
  } = useCart()

  // Fetch responses data from an API endpoint when the component mounts
  useEffect(() => {
    // Using async/await to be able to handle the promise coming from fetch
    const getProducts = async () => {
      // Using fetch and the url matchin folder (api/responses/route.ts)
      // Using get since that is what this route handles
      const response = await fetch("/api/product", {
        method: "get",
      })

      // Using a built in method on the fetch-response that converts the "stream" to JSON (object-like data)
      const result = (await response.json()) as { data: Product[] }
      // Using the state-setter to update the state after component is mounted
      setProducts(result.data)
    }

    // Call the fetch function
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getProducts()
  }, [])

  // Function to handle response deletion

  // What to render if no responses
  if (!products.length) {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <p>No products</p>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-screen-2xl">
      {/* Using "children" in Responses to be able to have the flexibility to add whatever we like */}
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
