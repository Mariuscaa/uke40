import { type Cart } from "@/features/types";
import { type ReactNode } from "react" 

type CartComponentProps = {
  children: ReactNode;
  _cart: Cart;
}

export default function CartComponent({ children, _cart}: CartComponentProps) {
  return (
    <div className="mx-auto mt-4 w-full max-w-4xl">
      <div className="relative mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          {children}
        </table>
      </div>
    </div>
  )
}
