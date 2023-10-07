// Importing the 'NextResponse' object from the 'next/server' module.
import { createProducts, faker } from "@/features/createProduct"
import { NextResponse } from "next/server"


// Define the 'GET' handler for your API route.
export function GET() {
  const products = createProducts({ faker, count: 20 })

  // Return a JSON response using 'NextResponse.json' with the data and status code.
  return NextResponse.json(
    { data: Array.from(products.values()) }, // JSON data to send in the response.
    { status: 200 }, // HTTP status code for the response (200 OK in this case).
  )
}
