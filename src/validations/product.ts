import { products as P } from "../db/schema";

type Product = typeof P.$inferInsert;

export function validateProduct(product: Product) {
	if (!product.name) {
		return new Error("Nome do produto é obrigatório.");
	}

	if (!product.price || product.price <= 0) {
		return new Error("Preço do produto deve ser um número positivo.");
	}

	if (!product.description) {
		return new Error("Descrição do produto é obrigatória.");
	}

	if (!product.categoryId || product.categoryId <= 0) {
		return new Error("ID da categoria deve ser um número inteiro positivo.");
	}

	return true;
}
