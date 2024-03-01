import { db } from "../db";
import type { Context } from "hono";
import { products as P } from "../db/schema";
import { validateProduct } from "../validations/product";
type Product = typeof P.$inferInsert;

export const getAllProduts = async (c: Context) => {
	try {
		const products = await db.query.products.findMany();
		return c.json({ products });
	} catch (error) {
		return c.json({ error });
	}
};

export const getProductById = async (c: Context) => {
	try {
		const { id } = c.req.param();
		const product = await db.query.products.findMany({
			where: (u, { eq }) => eq(u.id, Number(id)),
		});
		return c.json({ product });
	} catch (error) {
		return c.json({ error });
	}
};

export const createProduct = async (c: Context) => {
	const body: Product = await c.req.json();

	try {
		const validation = validateProduct(body);

		if (validation instanceof Error) {
			return c.json({ error: validation.message });
		}

		await db.insert(P).values(body).execute();
		return c.json({ success: true, message: "Product created successfully." });
	} catch (error) {
		return c.json({ error });
	}
};
