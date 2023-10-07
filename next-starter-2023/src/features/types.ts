export type Product = {
  id: string
  title: string
  description: string
  category: string
  price: number
}

export type Faker = {
  id: () => string
  title: () => string
  description: () => string
  category: () => string
  price: () => number
}

export type CreateProductParams = {
  existingProducts?: Map<string, Product>
  count: number
  faker: Faker
}

export type CreateProducts = (
  params: CreateProductParams,
) => Map<string, Product>
