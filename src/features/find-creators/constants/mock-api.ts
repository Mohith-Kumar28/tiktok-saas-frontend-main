////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from "@faker-js/faker"
import { matchSorter } from "match-sorter" // For filtering

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

// Define the shape of Product data
export type Product = {
  photo_url: string
  name: string
  description: string
  created_at: string
  price: number
  id: number
  category: string
  updated_at: string
}

// Mock product data store
export const fakeProducts = {
  records: [] as Product[], // Holds the list of product objects

  // Initialize with sample data
  initialize() {
    const sampleProducts: Product[] = []
    function generateRandomProductData(id: number): Product {
      const categories = [
        "Electronics",
        "Furniture",
        "Clothing",
        "Toys",
        "Groceries",
        "Books",
        "Jewelry",
        "Beauty Products",
      ]

      return {
        id,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        created_at: faker.date
          .between({ from: "2022-01-01", to: "2023-12-31" })
          .toISOString(),
        price: parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 })),
        photo_url: `https://api.slingacademy.com/public/sample-products/${id}.png`,
        category: faker.helpers.arrayElement(categories),
        updated_at: faker.date.recent().toISOString(),
      }
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleProducts.push(generateRandomProductData(i))
    }

    this.records = sampleProducts
  },

  // Get all products with optional category filtering and search
  async getAll({
    categories = [],
    search,
  }: {
    categories?: string[]
    search?: string
  }) {
    let products = [...this.records]

    // Filter products based on selected categories
    if (categories.length > 0) {
      products = products.filter((product) =>
        categories.includes(product.category)
      )
    }

    // Search functionality across multiple fields
    if (search) {
      products = matchSorter(products, search, {
        keys: ["name", "description", "category"],
      })
    }

    return products
  },

  // Get paginated results with optional category filtering and search
  async getProducts({
    page = 1,
    limit = 10,
    categories,
    search,
  }: {
    page?: number
    limit?: number
    categories?: string
    search?: string
  }) {
    await delay(1000)
    const categoriesArray = categories ? categories.split(".") : []
    const allProducts = await this.getAll({
      categories: categoriesArray,
      search,
    })
    const totalProducts = allProducts.length

    // Pagination logic
    const offset = (page - 1) * limit
    const paginatedProducts = allProducts.slice(offset, offset + limit)

    // Mock current time
    const currentTime = new Date().toISOString()

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: "Sample data for testing and learning purposes",
      total_products: totalProducts,
      offset,
      limit,
      products: paginatedProducts,
    }
  },

  // Get a specific product by its ID
  async getProductById(id: number) {
    await delay(1000) // Simulate a delay

    // Find the product by its ID
    const product = this.records.find((product) => product.id === id)

    if (!product) {
      return {
        success: false,
        message: `Product with ID ${id} not found`,
      }
    }

    // Mock current time
    const currentTime = new Date().toISOString()

    return {
      success: true,
      time: currentTime,
      message: `Product with ID ${id} found`,
      product,
    }
  },
}

// Initialize sample products
fakeProducts.initialize()

// Define the shape of Influencer data
export type Influencer = {
  id: number
  photo_url: string
  name: string
  username: string
  bio: string
  followers_count: number
  engagement_rate: number
  category: string
  location: string
  created_at: string
  updated_at: string
  price_per_post: number
}

// Mock influencer data store
export const fakeInfluencers = {
  records: [] as Influencer[], // Holds the list of influencer objects

  // Initialize with sample data
  initialize() {
    const sampleInfluencers: Influencer[] = []
    function generateRandomInfluencerData(id: number): Influencer {
      const categories = [
        "Fashion",
        "Beauty",
        "Lifestyle",
        "Tech",
        "Gaming",
        "Fitness",
        "Food",
        "Travel",
      ]

      const username = faker.internet.username()
      return {
        id,
        name: faker.person.fullName(),
        username: username.toLowerCase(),
        bio: faker.lorem.paragraph(),
        followers_count: faker.number.int({ min: 10000, max: 1000000 }),
        engagement_rate: parseFloat(
          faker.number.float({ min: 1, max: 8, fractionDigits: 1 }).toFixed(1)
        ),
        category: faker.helpers.arrayElement(categories),
        location: `${faker.location.city()}, ${faker.location.country()}`,
        created_at: faker.date
          .between({ from: "2022-01-01", to: "2023-12-31" })
          .toISOString(),
        updated_at: faker.date.recent().toISOString(),
        price_per_post: parseFloat(
          faker.commerce.price({ min: 100, max: 5000, dec: 0 })
        ),
        photo_url: `https://api.slingacademy.com/public/sample-products/${id}.png`,
      }
    }

    // Generate sample influencers
    for (let i = 1; i <= 20; i++) {
      sampleInfluencers.push(generateRandomInfluencerData(i))
    }

    this.records = sampleInfluencers
  },

  // Get all influencers with optional category filtering and search
  async getAll({
    categories = [],
    search,
  }: {
    categories?: string[]
    search?: string
  }) {
    let influencers = [...this.records]

    // Filter influencers based on selected categories
    if (categories.length > 0) {
      influencers = influencers.filter((influencer) =>
        categories.includes(influencer.category)
      )
    }

    // Search functionality across multiple fields
    if (search) {
      influencers = matchSorter(influencers, search, {
        keys: ["name", "username", "bio", "category", "location"],
      })
    }

    return influencers
  },

  // Get paginated results with optional category filtering and search
  async getInfluencers({
    page = 1,
    limit = 10,
    categories,
    search,
  }: {
    page?: number
    limit?: number
    categories?: string
    search?: string
  }) {
    await delay(1000)
    const categoriesArray = categories ? categories.split(".") : []
    const allInfluencers = await this.getAll({
      categories: categoriesArray,
      search,
    })
    const totalInfluencers = allInfluencers.length

    // Pagination logic
    const offset = (page - 1) * limit
    const paginatedInfluencers = allInfluencers.slice(offset, offset + limit)

    // Mock current time
    const currentTime = new Date().toISOString()

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: "Sample influencer data for testing and learning purposes",
      total_influencers: totalInfluencers,
      offset,
      limit,
      influencers: paginatedInfluencers,
    }
  },

  // Get a specific influencer by their ID
  async getInfluencerById(id: number) {
    await delay(1000) // Simulate a delay

    // Find the influencer by their ID
    const influencer = this.records.find((influencer) => influencer.id === id)

    if (!influencer) {
      return {
        success: false,
        message: `Influencer with ID ${id} not found`,
      }
    }

    // Mock current time
    const currentTime = new Date().toISOString()

    return {
      success: true,
      time: currentTime,
      message: `Influencer with ID ${id} found`,
      influencer,
    }
  },
}

// Initialize sample influencers
fakeInfluencers.initialize()
