import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import * as schema from "./schema";
import "dotenv/config";

const connectionString = process.env.CONNECTION_STRING;

if (!connectionString) {
	throw new Error(
		"Please provide a connection string via the CONNECTION_STRING environment variable."
	);
}

const sql = neon(connectionString);

export const db = drizzle(sql as NeonQueryFunction<boolean, boolean>, {
	schema,
});
