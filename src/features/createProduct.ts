import type { CreateProducts, Faker } from "./types"

const fakeTitles: string[] = [
  "GlitterGlo Lipstick",
  "QuantumQuench Energy Drink",
  "StellarScent Perfume",
  "PurrfectPillow Pet Bed",
]

const fakeDescriptions: string[] = [
  "The ultimate interactive fish-tank accessory for your furry friend! Watch as your pet mesmerizingly chases colorful LED fish through the water, providing endless entertainment and exercise. With adjustable speed settings and a soothing ambient mode, the AquaGlow PetPal creates an aquatic wonderland that your pets will adore.",
  "This innovative coffee maker not only brews your favorite beans to perfection but also doubles as a plant-growing oasis. Grow your choice of herbs or small plants on its integrated green roof while savoring your freshly brewed coffee. Start your day with a sip of sustainability and a touch of nature.",
  "Immerse yourself in a world of tranquility as you recline in this high-tech chair that features holographic projections of serene natural landscapes and ambient sounds. With its built-in massage functions and customizable holographic scenery, the HoloDream Recliner offers a truly unique escape from the daily hustle and bustle.",
  "This smart mirror revolutionizes your morning routine by providing personalized skincare and fitness recommendations based on your skin's condition and fitness goals. Its integrated AI analyzes your skin and body metrics, offering tailored routines and product suggestions, ensuring you always look and feel your best.",
]

const fakePrices: number[] = [420, 69, 1337, 42]

const fakeCategories: string[] = ["Art", "Hardware", "Book"]

const getRandomItem = <T>(items: T[]) => {
  const randomIndex = Math.floor(Math.random() * items.length)

  return items[randomIndex]
}

const getRandomId = () => {
  return Math.random().toString(36).slice(2)
}

export const faker: Faker = {
  id: () => getRandomId(),

  title: () => getRandomItem(fakeTitles),
  description: () => getRandomItem(fakeDescriptions),
  category: () => getRandomItem(fakeCategories),
  price: () => getRandomItem(fakePrices),
}

const createProducts: CreateProducts = ({ existingProducts, count, faker }) => {
  const products = new Map(existingProducts)

  if (products.size === 0 && count === 0) {
    throw new Error("No product added")
  }

  for (let i = 0; i < count; i++) {
    const product = {
      id: faker.id(),
      title: faker.title(), 
      description: faker.description(),
      category: faker.category(), 
      price: faker.price(), 
    }

    products.set(`response-${i}`, product)
  }

  return products
}

export { createProducts, getRandomId }
