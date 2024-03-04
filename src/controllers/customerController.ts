import { db } from "../db";
import type { Context } from "hono";
import { customer as C } from "../db/schema";
import { validateCustomer } from "../validations/customer";
import { eq } from "drizzle-orm";

export const getAllCustomers = async (c: Context) => {
	try {
		return c.json(await db.query.customer.findMany());
	} catch (error) {
		return c.json({ error });
	}
};

export const getCostumerById = async (c: Context) => {
	try {
		const { id } = c.req.param();

		return c.json(
			await db.query.customer.findMany({
				where: (u, { eq }) => eq(u.id, Number(id)),
			})
		);
	} catch (error) {
		return c.json({ error });
	}
};

export const createCustomer = async (c: Context) => {
	try {
		const body: Customer = await c.req.json();

		const validation = validateCustomer(body);

		if (validation instanceof Error) {
			return c.json({ error: validation.message });
		}

		await db.insert(C).values(body).execute();
		return c.json({ success: true, message: "Customer created successfully." });
	} catch (error) {
		return c.json({ error });
	}
};

export const updateCustomer = async (c: Context) => {
	try {
		const { id } = c.req.param();
		const body: Customer = await c.req.json();

		body.updatedAt = new Date();

		await db
			.update(C)
			.set(body)
			.where(eq(C.id, Number(id)));

		return c.json({ success: true, message: "Customer updated successfully." });
	} catch (error) {
		return c.json({ error });
	}
};

export const deleteCustomer = async (c: Context) => {
	try {
		const { id } = c.req.param();

		await db.delete(C).where(eq(C.id, Number(id)));

		return c.json({ success: true, message: "Customer deleted successfully." });
	} catch (error) {
		return c.json({ error });
	}
};
