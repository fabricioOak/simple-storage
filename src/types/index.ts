import * as schema from "../db/schema";

declare global {
	export type Customer = typeof schema.customer.$inferInsert;
	export type Product = typeof schema.products.$inferInsert;
	export type ProductCategory = typeof schema.productCategories.$inferInsert;
	export type Order = typeof schema.orders.$inferInsert;
	export type OrderItem = typeof schema.orderItems.$inferInsert;
}

export {};
