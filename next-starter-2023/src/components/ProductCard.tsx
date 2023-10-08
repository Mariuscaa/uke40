import { type Product } from "@/features/types"

export type ProductItemProps = {
  id: string
  title: string
  description: string
  category: string
  price: number
  count?: number
  onAddToCart?: (product: Product) => void
}

export default function ProductCard(props: ProductItemProps) {
  const {
    //id,
    title,
    description,
    category,
    price,
    onAddToCart,
  } = props

  function handleAddToCart() {
    onAddToCart?.(props)
  }
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
       {description}
      </p>

      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
       Category: {category}
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
       Price: {price} $
      </p>
      <button
        onClick={handleAddToCart}
        className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add to cart
      </button>
    </div>
  )
}
