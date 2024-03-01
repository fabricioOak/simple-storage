import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";

export const runtime = "edge";

import { serve } from "@hono/node-server";
import productRoutes from "./routes/productRoutes";

const PORT = process.env.PORT || 5000;

const app = new Hono();

app.use(cors());
app.use(csrf());

productRoutes(app);

serve({
	port: PORT as number,
	fetch: app.fetch,
});
