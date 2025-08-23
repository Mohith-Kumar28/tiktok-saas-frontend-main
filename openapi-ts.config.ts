import { writeFileSync } from "fs"
import { join } from "path"

import { defineConfig } from "@hey-api/openapi-ts"

import "dotenv/config"

import fetch from "node-fetch" // Node ≤ 20

const API_URL = "http://localhost:8000"
const BASIC_AUTH_USERNAME = "admin"
const BASIC_AUTH_PASSWORD = "admin-password"

const base64Credential = Buffer.from(
  `${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}`
).toString("base64")

// Fetch the OpenAPI schema with proper error handling
const res = await fetch(`${API_URL}/swagger/json`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${base64Credential}`,
  },
})

if (!res.ok) {
  throw new Error(
    `Failed to fetch OpenAPI spec: ${res.status} ${res.statusText}`
  )
}

const schemaText = await res.text()
console.log("Raw schema response length:", schemaText.length)

let schema
try {
  schema = JSON.parse(schemaText)
  console.log("Schema parsed successfully")
  console.log("Has components:", !!schema.components)
  console.log("Has schemas:", !!schema.components?.schemas)
  console.log(
    "Has HealthCheckDto:",
    !!schema.components?.schemas?.HealthCheckDto
  )

  // Save schema to project file
  const schemaPath = join(process.cwd(), "openapi-schema.json")
  writeFileSync(schemaPath, JSON.stringify(schema, null, 2))
  console.log("Schema saved to:", schemaPath)
} catch (error) {
  console.error("Failed to parse schema JSON:", error)
  throw error
}

export default defineConfig({
  input: {
    path: join(process.cwd(), "openapi-schema.json"),
  },
  output: {
    path: "./src/api/gen",
    format: "prettier", // enable auto-formatting[1]
  },
  plugins: [
    "@tanstack/react-query",
    // you can add others, e.g. "@hey-api/schemas" for Zod/Valibot
  ],
})
