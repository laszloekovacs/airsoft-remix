CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"avatar_url" text NOT NULL,
	"claims" text[] DEFAULT '{}' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
