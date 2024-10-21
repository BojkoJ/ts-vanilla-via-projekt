import axios from "axios";
import { loginSchema } from "./types/userSchema.ts"; // Import Zod schématu pro login

const loginForm = document.getElementById("loginForm") as HTMLFormElement;

loginForm.addEventListener("submit", async (e) => {
	e.preventDefault();

	const formData = new FormData(loginForm);

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	// Validace pomocí Zod
	const validation = loginSchema.safeParse(data);

	console.log(validation.data);

	if (!validation.success) {
		// Pokud validace selže, zobraz chybové zprávy
		const errorMessages = validation.error.errors
			.map((err) => err.message)
			.join(", ");
		document.getElementById(
			"message"
		)!.textContent = `Validation error: ${errorMessages}`;
		return;
	}

	try {
		await axios.post("/api/login", validation.data, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		document.getElementById("message")!.textContent = "Login successful!";
		window.location.href = "/";
	} catch (error) {
		console.error("Error logging in", error);
		document.getElementById("message")!.textContent = "Error logging in!";
	}
});
