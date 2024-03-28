import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";

import { serve } from "@hono/node-server";

// Routes
import productRoutes from "./routes/productRoutes";
import productCategoriesRoutes from "./routes/productCategoryRoutes";
import customerRoutes from "./routes/customerRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = new Hono();

app.use(cors());
app.use(csrf());

productRoutes(app);
productCategoriesRoutes(app);
customerRoutes(app);
orderRoutes(app);

serve({
	port: Number(process.env.PORT) || 3000,
	fetch: app.fetch,
});

export const runtime = "edge";
