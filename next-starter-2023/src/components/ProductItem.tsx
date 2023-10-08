export type CartItemProps = {
    id: string
    title: string
    price: number
    count?: number
    onDelete?: (id: string) => void
  }
  
  export default function ProductItem(props: CartItemProps) {
    const { id, title, price, onDelete } = props
  
    function handleDelete() {
      onDelete?.(id) // Calls the onDelete function if it exists, passing the id as an argument
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
        
      </tr>
    )
  }
  