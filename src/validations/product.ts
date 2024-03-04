export function validateProduct(product: Product) {
	if (!product.name) {
		return new Error("Product name is required.");
	}

	if (!product.price || product.price <= 0) {
		return new Error("Product price must be a positive number.");
	}

	if (!product.description) {
		return new Error("Product description is required.");
	}

	if (!product.categoryId || product.categoryId <= 0) {
		return new Error("Product category is required.");
	}

	return true;
}
