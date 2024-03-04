import { db } from "../db";
import type { Context } from "hono";
import { products as P } from "../db/schema";
import { validateProduct } from "../validations/product";
import { eq } from "drizzle-orm";

export const getAllProducts = async (c: Context) => {
	try {
		return c.json(await db.query.products.findMany());
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

export const updateProduct = async (c: Context) => {
	const { id } = c.req.param();

	const body: Product = await c.req.json();
	body.updatedAt = new Date();

	try {
		if (body.stock! < 0) return c.json({ error: "Stock cannot be negative." });
		if (body.price! < 0) return c.json({ error: "Price cannot be negative." });

		await db
			.update(P)
			.set(body)
			.where(eq(P.id, Number(id)));

		return c.json({ success: true, message: "Product updated successfully." });
	} catch (error) {
		return c.json({ error });
	}
};

export const deleteProduct = async (c: Context) => {
	const { id } = c.req.param();

	if (!id) return c.json({ error: "Product 'id' is required." });

	try {
		await db.delete(P).where(eq(P.id, Number(id)));
		return c.json({ success: true, message: "Product deleted successfully." });
	} catch (error) {
		return c.json({ error });
	}
};
