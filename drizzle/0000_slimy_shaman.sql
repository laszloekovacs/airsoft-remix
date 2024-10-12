CREATE TABLE IF NOT EXISTS "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"avatar_url" text NOT NULL,
	CONSTRAINT "accounts_email_unique" UNIQUE("email")
);
