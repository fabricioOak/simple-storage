import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/db/schema.ts",
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.CONNECTION_STRING as string,
	},
	out: "./src/db/migrations",
	strict: true,
});
