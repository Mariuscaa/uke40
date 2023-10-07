// Import necessary types from the "types" module.
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

// Define a function to get a random item from an array.
const getRandomItem = <T>(items: T[]) => {
  // Generate a random index within the array's length.
  const randomIndex = Math.floor(Math.random() * items.length)

  // Return the random item from the array.
  return items[randomIndex]
}

// Define a function to generate a random ID.
const getRandomId = () => {
  // Generate a random decimal number, convert it to base 36, and remove the leading "0.".
  return Math.random().toString(36).slice(2)
}

// Export a "faker" object that provides fake data generation methods.
export const faker: Faker = {
  // Generate a random ID using the getRandomId function.
  id: () => getRandomId(),

  // Get a random answer option from the fakeAnswers array.
  title: () => getRandomItem(fakeTitles),
  description: () => getRandomItem(fakeDescriptions),
  category: () => getRandomItem(fakeCategories),
  price: () => getRandomItem(fakePrices),
}

// Define a function to create responses.
const createProducts: CreateProducts = ({ existingProducts, count, faker }) => {
  // Create a new Map to store responses, initializing it with existing responses.
  const products = new Map(existingProducts)

  // Check if there are no existing responses and the requested count is zero.
  if (products.size === 0 && count === 0) {
    // If both conditions are met, throw an error to indicate no response added.
    throw new Error("No product added")
  }

  // Generate "count" number of fake responses and add them to the map.
  for (let i = 0; i < count; i++) {
    // Generate a unique ID for each response using the faker's id method.
    const product = {
      id: faker.id(),
      title: faker.title(), // Get a random score.
      description: faker.description(),
      category: faker.category(), // Get a random category.
      price: faker.price(), // Get a random answer option.
    }

    // Set a unique key for each response in the map (e.g., "response-0", "response-1").
    products.set(`response-${i}`, product)
  }

  // Return the map of responses.
  return products
}

// Export the "createResponses" function and the "getRandomId" function.
export { createProducts, getRandomId }
