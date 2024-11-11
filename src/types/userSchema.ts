import { z } from "zod";

// Schéma uživatele
export const userSchema = z.object({
	id: z.number().optional(), // id bude volitelný při vytvoření nového uživatele
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long"), // Přidání hesla
});

// Typy pro uživatele na základě Zod schématu
export type User = z.infer<typeof userSchema>;
