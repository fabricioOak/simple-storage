ALTER TABLE "clients" RENAME TO "customer";--> statement-breakpoint
ALTER TABLE "customer" DROP CONSTRAINT "clients_email_unique";--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_client_id_clients_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_client_id_customer_id_fk" FOREIGN KEY ("client_id") REFERENCES "customer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "customer" ADD CONSTRAINT "customer_email_unique" UNIQUE("email");