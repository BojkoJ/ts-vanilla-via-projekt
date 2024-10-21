import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle", // Složka, kde budou migrace
	schema: "./src/db/schema.ts", // Cesta k definovanému schématu
	dialect: "sqlite", // Používáme SQLite
	dbCredentials: {
		url: process.env.DB_FILE_NAME!, // Používáme proměnnou DB_FILE_NAME ze .env
	},
});
