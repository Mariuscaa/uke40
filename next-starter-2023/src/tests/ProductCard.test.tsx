import { render } from "@testing-library/react"

import ProductCard from "@/components/ProductCard"

it('should check that title is "title"', () => {
  render(
    <ProductCard
      id={"id"}
      title={"title"}
      description={"description"}
      category={"category"}
      price={1}
    />,
  )

  const header = document.querySelector("h5")
  const paragraphs = document.querySelectorAll("p")

  expect(header).toHaveTextContent("title")
  expect(paragraphs[0]).toHaveTextContent("description")
  expect(paragraphs[1]).toHaveTextContent("Category: category")
  expect(paragraphs[2]).toHaveTextContent("Price: 1 $")
})
