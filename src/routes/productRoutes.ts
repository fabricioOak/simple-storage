// routes/productRoutes.ts
import { Hono } from "hono";
import {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/productController";

const productRoutes = (app: Hono) => {
	app.get("/products", getAllProducts);
	app.get("/products/:id", getProductById);
	app.post("/products", createProduct);
	app.put("/products/:id", updateProduct);
	app.delete("/products/:id", deleteProduct);
};

export default productRoutes;
