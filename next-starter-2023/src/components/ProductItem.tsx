export type CartItemProps = {
  id: string
  title: string
  price: number
  count: number
  onDelete?: (id: string) => void
  onIncrease?: (id: string) => void
  onDecrease?: (id: string) => void
}

export default function ProductItem(props: CartItemProps) {
  const { id, title, price, count, onDelete, onIncrease, onDecrease } = props

  function handleDelete() {
    onDelete?.(id) 
  }

  function handleIncrease() {
    onIncrease?.(id) 
  }

  function handleDecrease() {
    onDecrease?.(id) 
  }

  return (
    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
      <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
        {id}
      </td>
      <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
        {title}
      </td>
      <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
        {price}
      </td>
      <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
        {onDecrease && (
          <button onClick={handleDecrease} className="px-2 py-1 text-red-300">
            -
          </button>
        )}
        <span className="px-2 py-1">{count}</span>
        {onIncrease && (
          <button onClick={handleIncrease} className="px-2 py-1 text-red-300">
            +
          </button>
        )}
      </td>
      {onDelete ? (
        <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
          <button

            onClick={handleDelete} 
            className="text-red-300"
          >
            Delete
          </button>
        </td>
      ) : null}
    </tr>
  )
}
