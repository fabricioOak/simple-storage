import { db } from "../db";
import type { Context } from "hono";
import { orders as O, orderItems as OI, products as P } from "../db/schema";
import { eq } from "drizzle-orm";

type OrderCreation = {
	customerId: number;
	orders: OrderItem[];
};

export const getAllOrders = async (c: Context) => {
	try {
		return c.json(await db.query.orders.findMany());
	} catch (error) {
		return c.json({ error });
	}
};

export const getOrderById = async (c: Context) => {
	try {
		const { id } = c.req.param();

		return c.json(
			await db.query.orders.findMany({
				where: (u, { eq }) => eq(u.id, Number(id)),
			})
		);
	} catch (error) {
		return c.json({ error });
	}
};

export const getOrderDetails = async (c: Context) => {
	try {
		const { id } = c.req.param();

		const order = await db.query.orders.findMany({
			where: (u, { eq }) => eq(u.id, Number(id)),
		});

		const orderItems = await db.query.orderItems.findMany({
			where: (u, { eq }) => eq(u.orderId, Number(id)),
		});

		const orderFixed = await Promise.all(
			order.map(async (o) => {
				return await Promise.all(
					orderItems.map(async (oi) => {
						return {
							id: oi.id,
							product: await db.query.products.findMany({
								where: (u, { eq }) => eq(u.id, oi.productId),
							}),
							quantity: oi.quantity,
							unitPrice: oi.unitPrice,
						};
					})
				);
			})
		);

		const orderDetails = {
			order,
			orderItems: orderFixed,
		};

		return c.json(orderDetails);
	} catch (error) {
		return c.json({ error });
	}
};

export const createOrderWithItems = async (c: Context) => {
	try {
		const body: OrderCreation = await c.req.json();

		const customerId = body.customerId;
		const orders = body.orders;

		if (orders.length === 0) return c.json({ error: "Order cannot be empty." });

		if (orders.some((o) => o.quantity < 0))
			return c.json({ error: "Quantity cannot be negative." });

		if (orders.some((o) => o.unitPrice < 0))
			return c.json({ error: "Price cannot be negative." });

		const order = await db
			.insert(O)
			.values({
				customerId,
			})
			.returning({
				id: O.id,
			});

		const orderId = order[0].id;

		for (let i = 0; i < orders.length; i++) {
			const orderItem = orders[i];
			const product = await db.query.products.findMany({
				where: (u, { eq }) => eq(u.id, orderItem.productId),
			});

			if (product.length === 0) return c.json({ error: "Product not found." });

			const total = orderItem.quantity * product[0].price;
			const updatedStock = product[0].stock - orderItem.quantity;
			await db
				.update(P)
				.set({ stock: updatedStock })
				.where(eq(P.id, product[0].id));

			await db
				.insert(OI)
				.values({
					orderId,
					productId: orderItem.productId,
					quantity: orderItem.quantity,
					unitPrice: total,
				})
				.execute();
		}

		return c.json({ success: true, message: "Order created successfully." });
	} catch (error) {
		return c.json({ error });
	}
};

export const deleteOrder = async (c: Context) => {
	try {
		const { id } = c.req.param();

		await db.delete(O).where(eq(O.id, Number(id)));

		return c.json({ success: true, message: "Order deleted successfully." });
	} catch (error) {
		return c.json({ error });
	}
};
