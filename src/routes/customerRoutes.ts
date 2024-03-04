import { Hono } from "hono";

import {
	getAllCustomers,
	getCostumerById,
	createCustomer,
	updateCustomer,
	deleteCustomer,
} from "../controllers/customerController";

const customerRoutes = (app: Hono) => {
	app.get("/customers", getAllCustomers);
	app.get("/customers/:id", getCostumerById);
	app.post("/customers", createCustomer);
	app.put("/customers/:id", updateCustomer);
	app.delete("/customers/:id", deleteCustomer);
};

export default customerRoutes;
