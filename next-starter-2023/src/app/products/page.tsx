// Importing React and necessary dependencies
"use client"

import { useEffect, useState } from "react"
import type { Cart, Product } from "@/features/types"

import ProductCard from "@/components/ProductCard"
import Products from "@/components/Products"

import "@/features/types"

import CartComponent from "@/components/CartComponent"
import ProductItem from "@/components/ProductItem"
import { TableHead } from "@/components/table/TableHead"
import { calcSum } from "@/features/calcSum"

// Importing custom components and types

const initialCart: Cart = {
  products: [],
}

// Defining the ResponsePage component
export default function ProductPage() {
  // State to store the responses data
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState(initialCart)

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

  const handleAddToCart = (product: Product) => {
    setCart((prevCart: Cart) => {
      const existingProduct = prevCart.products.find(
        (item) => item.product.id === product.id,
      )

      if (!existingProduct) {
        // If product does not exist in existing cart, create a new cart object
        const updatedProducts = [
          ...prevCart.products,
          { product: product, count: 1 },
        ]
        return { ...prevCart, products: updatedProducts }
      } else {
        // If product already exists, increment its count
        const updatedProducts = prevCart.products.map((item) =>
          item.product.id === product.id
            ? { ...item, count: item.count + 1 }
            : item,
        )
        return { ...prevCart, products: updatedProducts }
      }
    })
  }

  const handleDelete = (id: string) => {
    setCart((prev) => {
      // Filter out the product with the matching id
      const updatedProducts = prev.products.filter(
        (product) => product.product.id !== id,
      )
      // Return a new cart object with the updated products array
      return { ...prev, products: updatedProducts } as Cart
    })
  }

  const handleIncrease = (productId: string) => {
    setCart((prevCart: Cart) => {
      const updatedProducts = prevCart.products.map((item) =>
        item.product.id === productId
          ? { ...item, count: item.count + 1 }
          : item,
      )
      return { ...prevCart, products: updatedProducts }
    })
  }

  const handleDecrease = (productId: string) => {
    setCart((prevCart: Cart) => {
      const updatedProducts = prevCart.products.map((item) => {
        if (item.product.id === productId) {
          if (item.count > 1) {
            // Decrease the count if it's greater than 1
            return { ...item, count: item.count - 1 }
          } else {
            // Remove the item from the cart if count is 1 or less
            handleDelete(productId)
          }
        }
        return item
      })

      // Filter out null values (removed items) from the updatedProducts array

      return { ...prevCart, products: updatedProducts }
    })
  }

  const handlePurchase = () => {
    // eslint-disable-next-line no-console
    console.log("Purchase sum: " + calcSum(cart.products))
  }

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

      <Products>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            onAddToCart={handleAddToCart}
            {...product}
          />
        ))}
      </Products>
      <div>
        <CartComponent>
          <TableHead headers={["Id", "Title", "Price", "Count", "Actions"]} />
          <tbody>
            {!cart.products.length ? (
              <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                <td
                  colSpan={5}
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  No products in cart.
                </td>
              </tr>
            ) : (
              cart.products.map((product) => (
                <ProductItem
                  key={product.product.id}
                  onDelete={handleDelete}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  count={product.count}
                  {...product.product}
                />
              ))
            )}
          </tbody>
        </CartComponent>
        <button
          onClick={handlePurchase}
          className="mx-auto block rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Purchase
        </button>
      </div>
    </div>
  )
}
