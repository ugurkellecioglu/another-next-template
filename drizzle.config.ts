import { defineConfig } from "drizzle-kit"
export default defineConfig({
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
})
