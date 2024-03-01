// routes/productRoutes.ts
import { Hono } from "hono";
import {
	getAllProduts,
	getProductById,
	createProduct,
} from "../controllers/productController";

const productRoutes = (app: Hono) => {
	app.get("/products", getAllProduts);
	app.get("/products/:id", getProductById);
	app.post("/products", createProduct);
};

export default productRoutes;
