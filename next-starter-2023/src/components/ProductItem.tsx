export type ProductItemProps = {
    id: string
    title: string
    description: string
    category: string
    price: number
    count?: number
    onDelete?: (id: string) => void
    onIncrease?: () => void
  }
  
  export default function ProductItem(props: ProductItemProps) {
    const { id, title, description, category, price, count = 1, onDelete, onIncrease } = props
  
    function handleDelete() {
      onDelete?.(id) // Calls the onDelete function if it exists, passing the id as an argument
    }
    
    function handleIncrease() {
      onIncrease?.() // Calls the onDelete function if it exists, passing the id as an argument

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
          {description}
        </td>
        <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
          {category}
        </td>
        <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
          {price}
        </td>
        <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
          {count}
        </td>
        {/* Display a delete button if onDelete prop is provided */}
        {onDelete ? (
          <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
            <button
              // Alternative way to call onDelete inline
              // onClick={() => {
              //   onDelete(id)
              // }}
              onClick={handleDelete} // Call the handleDelete function when the button is clicked
              className="text-red-300"
            >
              Delete
            </button>
          </td>
        ) : null}
        {/* Display a delete button if onDelete prop is provided */}
        {onIncrease ? (
          <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
            <button
              // Alternative way to call onDelete inline
              // onClick={() => {
              //   onDelete(id)
              // }}
              onClick={handleIncrease} // Call the handleDelete function when the button is clicked
              className="text-red-300"
            >
              +
            </button>
          </td>
        ) : null}
      </tr>
    )
  }
  