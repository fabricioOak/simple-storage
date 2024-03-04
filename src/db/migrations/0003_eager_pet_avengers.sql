ALTER TABLE "orders" RENAME COLUMN "client_id" TO "customer_id";--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_client_id_customer_id_fk";
--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "price" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "unit_price" real NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "order_number" uuid DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "order_date" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "updated_at";