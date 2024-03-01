import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const connectionString = process.env.CONNECTION_STRING;

console.log(connectionString);

if (!connectionString) {
	throw new Error(
		"Please provide a connection string via the CONNECTION_STRING environment variable."
	);
}

const sql = neon(connectionString);

export const db = drizzle(sql as NeonQueryFunction<boolean, boolean>);

const main = async () => {
	try {
		await migrate(db, {
			migrationsFolder: "src/db/migrations",
		});

		console.log("Migrations ran successfully");
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

main();
