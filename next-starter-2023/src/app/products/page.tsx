// Importing React and necessary dependencies
"use client"

import { useEffect, useState } from "react"

// Importing custom components and types
import { type Product } from "@/features/types"
import Products from "@/components/Products"
import { TableHead } from "@/components/table/TableHead"
import ProductItem from "@/components/ProductItem"


// Defining the ResponsePage component
export default function ResponsePage() {
  // State to store the responses data
  const [products, setProducts] = useState<Product[]>([])

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
  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((response) => response.id !== id))
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
        <TableHead headers={[...Object.keys(products[0]), "Actions"]} />
        <tbody>
          {!products.length ? (
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <td
                colSpan={5}
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                Ingen data. Vennligst justere filteret
              </td>
            </tr>
          ) : null}
          {/* Using ResponseItem component and provides necessary props to this component */}
          {products.map((product) => (
            <ProductItem
              key={product.id}
              onDelete={handleDelete}
              onIncrease={() => {null}}
              {...product}
            />
          ))}
        </tbody>
      </Products>
    </div>
  )
}
