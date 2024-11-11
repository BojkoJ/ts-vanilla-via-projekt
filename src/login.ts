import axios from "axios";
import { loginSchema } from "./types/loginSchema.ts";

setTimeout(() => {
	const loginModalTriggerButton = document.querySelector(
		"#navbar a[href='login']"
	) as HTMLAnchorElement;

	loginModalTriggerButton.addEventListener("click", loginModalClick);
}, 200);

function loginModalClick() {
	const loginForm = document.querySelector(
		"#login-form form"
	) as HTMLFormElement;
	const messageElement = document.getElementById("message") as HTMLDivElement;

	loginForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		const emailInput = document.getElementById("email") as HTMLInputElement;
		const passwordInput = document.getElementById(
			"password"
		) as HTMLInputElement;

		const data = {
			email: emailInput.value,
			password: passwordInput.value,
		};

		// Validace pomocí Zod
		const validation = loginSchema.safeParse(data);

		if (!validation.success) {
			// Pokud validace selže, zobraz chybové zprávy
			const errorMessages = validation.error.errors
				.map((err) => err.message)
				.join(", ");
			messageElement.textContent = `Validation error: ${errorMessages}`;
			return;
		}

		try {
			await axios.post("/api/login", validation.data, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			messageElement.textContent = "Login successful!";
			window.location.href = "/";
		} catch (error) {
			console.error("Error logging in", error);
			messageElement.textContent = "Error logging in!";
		}
	});

	// Funkce pro kontrolu přihlášení
	async function main() {
		console.log(loginForm);
		console.log(messageElement);
		try {
			const response = await axios.get("/api/check-login");
			const data = response.data;

			// Pokud je uživatel přihlášen, přesměrujeme ho z chráněných rout
			if (data.loggedIn) {
				const currentPath = window.location.pathname;
				if (
					currentPath === "/src/pages/login" ||
					currentPath === "/src/pages/login.html"
				) {
					window.location.href = "/";
				}
			}
		} catch (error) {
			console.error("Error checking login status:", error);
		}
	}

	main();
}
