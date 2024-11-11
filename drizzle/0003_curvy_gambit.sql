ALTER TABLE `users_table` ADD `firstName` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users_table` ADD `lastName` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users_table` DROP COLUMN `name`;--> statement-breakpoint
ALTER TABLE `users_table` DROP COLUMN `age`;