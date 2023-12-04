import { type ReactNode } from "react" 

export default function Products({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto mt-4 w-full max-w-7xl">
      <div className="relative mt-4 overflow-x-auto">
        <div className="flex flex-wrap">
          {children}
        </div>
      </div>
    </div>
  )
}
