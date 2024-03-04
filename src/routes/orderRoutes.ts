import { Hono } from "hono";

import {
	getAllOrders,
	getOrderById,
	createOrderWithItems,
	deleteOrder,
	getOrderDetails,
} from "../controllers/orderController";
import {
	getAllOrderItems,
	getOrderItemById,
	deleteOrderItem,
} from "../controllers/orderItemController";

const orderRoutes = (app: Hono) => {
	app.get("/order", getAllOrders);
	app.get("/order/:id", getOrderById);
	app.get("/orderDetails/:id", getOrderDetails);
	app.post("/order", createOrderWithItems);
	app.delete("/order/:id", deleteOrder);
	app.get("/orderItem", getAllOrderItems);
	app.get("/orderItem/:id", getOrderItemById);
	app.delete("/orderItem/:id", deleteOrderItem);
};

export default orderRoutes;
