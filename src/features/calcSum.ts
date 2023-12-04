import { type CartItem } from "./types"

export const calcSum = (products: CartItem[]) => {
  let sum = 0
  products.forEach((product) => {
    const amount = product.count * product.product.price
    sum += amount
  })
  return sum
}
