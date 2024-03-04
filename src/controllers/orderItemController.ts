import { db } from "../db";
import type { Context } from "hono";
import { orderItems as OI } from "../db/schema";
import { eq } from "drizzle-orm";

export const getAllOrderItems = async (c: Context) => {
	try {
		return c.json(await db.query.orderItems.findMany());
	} catch (error) {
		return c.json({ error });
	}
};

export const getOrderItemById = async (c: Context) => {
	try {
		const { id } = c.req.param();

		return c.json(
			await db.query.orderItems.findMany({
				where: (u, { eq }) => eq(u.id, Number(id)),
			})
		);
	} catch (error) {
		return c.json({ error });
	}
};

export const deleteOrderItem = async (c: Context) => {
	try {
		const { id } = c.req.param();

		await db.delete(OI).where(eq(OI.id, Number(id)));

		return c.json({
			success: true,
			message: "OrderItem deleted successfully.",
		});
	} catch (error) {
		return c.json({ error });
	}
};
