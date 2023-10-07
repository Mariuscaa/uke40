import { createProducts, getRandomId } from "./createProduct"
import { Faker, Product } from "./types"

const fakerMock: Faker = {
  id: getRandomId,
  title: () => "product",
  description: () => "description",
  category: () => "one",
  price: () => 2,
}

describe.only("Create products", () => {
  it("should create products", () => {
    const products = createProducts({ count: 10, faker: fakerMock })
    expect(products.size).toBe(10)
  })
  it("should have correct data", () => {
    const products = createProducts({ count: 10, faker: fakerMock })
    const firstProduct = Array.from(products.values())[0]

    expect(firstProduct.title).toBe("product")
    expect(firstProduct.description).toBe("description")
    expect(firstProduct.price).toBe(2)
    expect(firstProduct.category).toBe("one")
  })
  it("should add to existing list", () => {
    const initalProducts = new Map<string, Product>([
      [
        "product-initial",
        {
          id: "product-initial",
          price: 25,
          category: "Initial",
          title: "answer",
          description: "1",
        },
      ],
    ])
    const products = createProducts({
      existingProducts: initalProducts,
      count: 10,
      faker: fakerMock,
    })

    expect(products.size).toBe(11)
  })
  it("should fail if no products can be added", () => {
    expect(() =>
      createProducts({
        count: 0,
        faker: fakerMock,
      }),
    ).toThrowError("No product added")
  })
})
