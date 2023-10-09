import { useState } from "react"
import type { Cart, Product } from "@/features/types"

import { calcSum } from "@/features/calcSum"

export function useCart() {
  const initialCart: Cart = {
    products: [],
  }
  const [cart, setCart] = useState<Cart>(initialCart)

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
      const updatedProducts = prev.products.filter(
        (product) => product.product.id !== id,
      )
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
            return { ...item, count: item.count - 1 }
          } else {
            handleDelete(productId)
          }
        }
        return item
      })
      return { ...prevCart, products: updatedProducts }
    })
  }

  const handlePurchase = () => {
    // eslint-disable-next-line no-console
    console.log("Purchase sum: " + calcSum(cart.products))
    return "Purchase sum: " + calcSum(cart.products)
  }

  return {
    cart,
    handleAddToCart,
    handleDelete,
    handleIncrease,
    handleDecrease,
    handlePurchase,
  }
}
