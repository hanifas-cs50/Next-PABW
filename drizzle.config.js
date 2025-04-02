import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema.js",
  out: "./lib/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DB_FILE_NAME,
  },
});