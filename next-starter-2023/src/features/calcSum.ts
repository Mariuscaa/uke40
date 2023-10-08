// Import the Response type from the "types" module.
import { type CartItem } from "./types"

// Define a function to calculate the average score by category.
export const calcSum = (products: CartItem[]) => {
  let sum = 0
  products.forEach((product) => {
    const amount = product.count * product.product.price
    sum += amount
  })
  return sum
}
