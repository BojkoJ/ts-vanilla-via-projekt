import { z } from "zod";

// Schéma uživatele
export const userSchema = z.object({
	id: z.number().optional(), // id bude volitelný při vytvoření nového uživatele
	name: z.string().min(1, "Name is required"),
	age: z.number().min(0, "Age must be a positive number"),
	email: z.string().email("Invalid email address"),
});

// Typy pro uživatele na základě Zod schématu
export type User = z.infer<typeof userSchema>;
