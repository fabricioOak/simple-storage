import { relations } from "drizzle-orm";
import { pgTable, text, integer, timestamp, serial } from "drizzle-orm/pg-core";

export const customer = pgTable("customer", {
	id: serial("id").primaryKey(),
	email: text("email").notNull().unique(),
	name: text("name").notNull(),
	contact: text("contact").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const productCategories = pgTable("product_categories", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const products = pgTable("products", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	price: integer("price").notNull(),
	description: text("description").notNull().default(""),
	stock: integer("stock").notNull().default(0),
	categoryId: integer("category_id")
		.notNull()
		.references(() => productCategories.id),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const orders = pgTable("orders", {
	id: serial("id").primaryKey(),
	clientId: integer("client_id")
		.notNull()
		.references(() => customer.id),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const orderItems = pgTable("order_items", {
	id: serial("id").primaryKey(),
	orderId: integer("order_id")
		.notNull()
		.references(() => orders.id),
	productId: integer("product_id")
		.notNull()
		.references(() => products.id),
	quantity: integer("quantity").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const productsRelations = relations(products, ({ one }) => ({
	category: one(productCategories, {
		fields: [products.categoryId],
		references: [productCategories.id],
	}),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
	product: one(products, {
		fields: [orderItems.productId],
		references: [products.id],
	}),
	order: one(orders, {
		fields: [orderItems.orderId],
		references: [orders.id],
	}),
}));

export const ordersRelations = relations(orders, ({ many }) => ({
	orderItems: many(orderItems),
}));

export const customerRelations = relations(customer, ({ many }) => ({
	orders: many(orders),
}));

export const productCategoriesRelations = relations(
	productCategories,
	({ many }) => ({
		products: many(products),
	})
);
