import { db } from "../db";
import type { Context } from "hono";
import { productCategories as PC } from "../db/schema";
import { eq } from "drizzle-orm";

export const getAllProductCategories = async (c: Context) => {
	try {
		return c.json(await db.query.productCategories.findMany());
	} catch (error) {
		return c.json({ error });
	}
};

export const getProductCategoryById = async (c: Context) => {
	try {
		const { id } = c.req.param();

		return c.json(
			await db.query.productCategories.findMany({
				where: (u, { eq }) => eq(u.id, Number(id)),
			})
		);
	} catch (error) {
		return c.json({ error });
	}
};

export const createProductCategory = async (c: Context) => {
	try {
		const body: ProductCategory = await c.req.json();

		if (!body.name) {
			return c.json({ error: "Category 'name' is required." });
		}

		db.insert(PC).values(body).execute();
		return c.json({ success: true, message: "Category created successfully." });
	} catch (error) {
		return c.json({ error });
	}
};

export const updateProductCategory = async (c: Context) => {
	try {
		const { id } = c.req.param();
		const body = await c.req.json();

		await db
			.update(PC)
			.set(body)
			.where(eq(PC.id, Number(id)));

		return c.json({ success: true, message: "Category updated successfully." });
	} catch (error) {
		return c.json({ error });
	}
};

export const deleteProductCategory = async (c: Context) => {
	try {
		const { id } = c.req.param();

		await db.delete(PC).where(eq(PC.id, Number(id)));
		return c.json({ success: true, message: "Category deleted successfully." });
	} catch (error) {
		return c.json({ error });
	}
};
