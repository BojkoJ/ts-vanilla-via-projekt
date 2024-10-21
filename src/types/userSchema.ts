import { z } from "zod";

// Schéma uživatele
export const userSchema = z.object({
	id: z.number().optional(), // id bude volitelný při vytvoření nového uživatele
	name: z.string().min(1, "Name is required"),
	age: z.number().min(0, "Age must be a positive number").optional(),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long"), // Přidání hesla
});

export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Typy pro uživatele na základě Zod schématu
export type User = z.infer<typeof userSchema>;
