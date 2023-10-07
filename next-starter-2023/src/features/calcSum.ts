// Import the Response type from the "types" module.
import { type Product } from "./types"

// Define a function to calculate the average score by category.
export const calcSum = (products: Map<string, Product>) => {
  let sum = 0
  products.forEach((product) => {
    sum += product.price
  })
  return sum
}
