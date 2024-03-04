import type { Hono } from "hono";

import {
	getAllProductCategories,
	getProductCategoryById,
	createProductCategory,
	deleteProductCategory,
	updateProductCategory,
} from "../controllers/productCategoryController";

const productCategoriesRoutes = (app: Hono) => {
	app.get("/category", getAllProductCategories);
	app.get("/category", getProductCategoryById);
	app.post("/category", createProductCategory);
	app.put("/category", updateProductCategory);
	app.delete("/category", deleteProductCategory);
};

export default productCategoriesRoutes;
