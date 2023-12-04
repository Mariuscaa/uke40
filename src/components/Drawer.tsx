import { useState } from "react"

import { type Cart } from "@/features/types"
import CartComponent from "./CartComponent"
import ProductItem from "./ProductItem"
import { TableHead } from "./table/TableHead"

export default function RightDrawer({
  cart,
  handleDelete,
  handleIncrease,
  handleDecrease,
  handlePurchase,
}: {
  cart: Cart
  handleDelete: (id: string) => void
  handleIncrease: (productId: string) => void
  handleDecrease: (productId: string) => void
  handlePurchase: () => string
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [purchaseStatus, setPurchaseStatus] = useState("")

  const openDrawer = () => {
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  const handlePurchaseButton = () => {
    setPurchaseStatus(handlePurchase)
  }

  const drawerStyle = {
    transform: isDrawerOpen ? "translateX(0)" : "translateX(100%)",
  }

  return (
    // Inspired by Flowbite:
    // https://flowbite.com/docs/components/drawer/
    <>
      <div className="fixed right-0 top-2">
        <button
          className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={openDrawer}
        >
          Cart ({cart.products.length})
        </button>
      </div>

      <div
        className="fixed right-0 top-0 z-40 h-screen w-1/2 overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800"
        style={drawerStyle}
        tabIndex={-1}
        aria-labelledby="drawer-right-label"
      >
        <h5
          id="drawer-right-label"
          className="mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
        >
          <svg
            className="mr-2.5 h-4 w-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          Your cart
        </h5>
        <button
          type="button"
          onClick={closeDrawer}
          className="absolute right-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div>
          <CartComponent _cart={cart}>
            <TableHead
              headers={["Id", "Title", "Price ($)", "Count", "Actions"]}
            />
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
            onClick={handlePurchaseButton}
            className="mx-auto mt-2 block rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Purchase
          </button>
          <div className="flex mt-2 justify-center">
            <p>{purchaseStatus}</p>
          </div>
        </div>
      </div>
    </>
  )
}
