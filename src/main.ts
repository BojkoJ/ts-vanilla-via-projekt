import axios from "axios";
import { userSchema, type User } from "./types/userSchema.ts";

// Funkce pro zavolání API a získání uživatelů
async function fetchUsers() {
	try {
		const response = await axios.get("/api/users");
		const validation = userSchema.array().safeParse(response.data);

		if (!validation.success) {
			console.error("Invalid user data", validation.error.format());
			return [];
		}

		return validation.data;
	} catch (error) {
		console.error("Error fetching users:", error);
		return [];
	}
}

// Funkce pro přidání uživatele
async function addUser() {
	const userData: User = {
		name: "John",
		age: 30,
		email: "john@example.com",
	};

	const validation = userSchema.safeParse(userData);
	if (!validation.success) {
		console.error("Validation failed:", validation.error.format());
		return;
	}

	try {
		const response = await axios.post("/api/users", validation.data);
		console.log(response.data);
	} catch (error) {
		console.error("Error adding user:", error);
	}
}

// Funkce pro aktualizaci uživatele
async function updateUser() {
	try {
		const response = await axios.put("/api/users/john@example.com", {
			age: 31,
		});
		console.log(response.data);
	} catch (error) {
		console.error("Error updating user:", error);
	}
}

// Funkce pro smazání uživatele
async function deleteUser() {
	try {
		const response = await axios.delete("/api/users/john@example.com");
		console.log(response.data);
	} catch (error) {
		console.error("Error deleting user:", error);
	}
}

// Zobrazení uživatelů na stránce
async function displayUsers() {
	const resultDiv = document.createElement("div");
	resultDiv.textContent = "Fetching users from database...";
	document.body.appendChild(resultDiv);

	const users = await fetchUsers();
	resultDiv.textContent = `Users: ${JSON.stringify(users)}`;
}

// Spuštění akcí
async function main() {
	await addUser();
	await displayUsers();
	await updateUser();
	await displayUsers();
	await deleteUser();
	await displayUsers();
}

main();
