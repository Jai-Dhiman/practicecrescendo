CREATE TABLE IF NOT EXISTS "analyses" (
	"id" serial PRIMARY KEY NOT NULL,
	"recording_id" integer,
	"feedback" text,
	"status" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recordings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"sheet_music_id" integer,
	"title" varchar(255) NOT NULL,
	"file_path" text NOT NULL,
	"duration" integer,
	"recorded_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sheet_music" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"title" varchar(255) NOT NULL,
	"composer" varchar(255),
	"difficulty" varchar(50),
	"file_path" text NOT NULL,
	"uploaded_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"full_name" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "analyses" ADD CONSTRAINT "analyses_recording_id_recordings_id_fk" FOREIGN KEY ("recording_id") REFERENCES "recordings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recordings" ADD CONSTRAINT "recordings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recordings" ADD CONSTRAINT "recordings_sheet_music_id_sheet_music_id_fk" FOREIGN KEY ("sheet_music_id") REFERENCES "sheet_music"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sheet_music" ADD CONSTRAINT "sheet_music_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
