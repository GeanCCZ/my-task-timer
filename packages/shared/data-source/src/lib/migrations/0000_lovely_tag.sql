CREATE TABLE IF NOT EXISTS  "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"status" text NOT NULL,
	"due_date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE  IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE  IF NOT EXISTS "time_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"started_at" timestamp NOT NULL,
	"ended_at" timestamp,
	"time_spent" numeric NOT NULL,
	"task_id" uuid NOT NULL
);
--> statement-breakpoint

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'time_logs_task_id_tasks_id_fk'
          AND table_name = 'time_logs'
    ) THEN
ALTER TABLE "time_logs"
  ADD CONSTRAINT "time_logs_task_id_tasks_id_fk"
    FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION;
END IF;
END $$;

DO $$
BEGIN
    -- Verificar se a constraint já existe
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'tasks_user_id_users_id_fk'
          AND table_name = 'tasks'
    ) THEN
        -- Se não existir, adiciona a constraint
ALTER TABLE "tasks"
  ADD CONSTRAINT "tasks_user_id_users_id_fk"
    FOREIGN KEY ("user_id") REFERENCES "public"."users"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION;
END IF;
END $$;
