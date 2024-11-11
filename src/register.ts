import axios from "axios";
import { userSchema } from "./types/userSchema.ts";
import { loginSchema } from "./types/loginSchema.ts";

setTimeout(() => {
	const loginModalTriggerButton = document.querySelector(
		"#navbar a[href='login']"
	) as HTMLAnchorElement;

	loginModalTriggerButton.addEventListener("click", loginModalClick);
}, 200);

function loginModalClick() {
	const registerModalTriggerButton = document.querySelector(
		"a[href='register']"
	) as HTMLAnchorElement;

	registerModalTriggerButton.addEventListener("click", registerModalClick);
}

function registerModalClick() {
	const registerForm = document.getElementById(
		"register-form"
	) as HTMLFormElement;
	const messageElement = document.getElementById(
		"message-reg"
	) as HTMLDivElement;

	registerForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		const firstNameInput = document.getElementById(
			"first-name"
		) as HTMLInputElement;
		const lastNameInput = document.getElementById(
			"last-name"
		) as HTMLInputElement;
		const emailInput = document.getElementById(
			"register-email"
		) as HTMLInputElement;
		const passwordInput = document.getElementById(
			"register-password"
		) as HTMLInputElement;
		const confirmPasswordInput = document.getElementById(
			"confirm-password"
		) as HTMLInputElement;

		// Základní kontrola shody hesel
		if (passwordInput.value !== confirmPasswordInput.value) {
			messageElement.textContent = "Passwords do not match.";
			return;
		}

		const data = {
			firstName: firstNameInput.value,
			lastName: lastNameInput.value,
			email: emailInput.value,
			password: passwordInput.value,
		};

		// Validace pomocí Zod
		const validation = userSchema.safeParse(data);

		if (!validation.success) {
			// Pokud validace selže, zobraz chybové zprávy
			const errorMessages = validation.error.errors
				.map((err) => err.message)
				.join(", ");
			messageElement.textContent = `Validation error: ${errorMessages}`;
			return;
		}

		try {
			const response = await axios.post("/api/users", validation.data, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.status === 201) {
				messageElement.textContent = "User registered successfully!";

				// Po registraci přihlásit
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

					window.location.href = "/";
				} catch (error) {
					console.error("Error logging in", error);
					messageElement.textContent = "Error logging in!";
				}
			} else {
				messageElement.textContent =
					"Registration failed. Please try again.";
			}
		} catch (error: any) {
			// Ošetření konkrétních chyb, například pokud už uživatel existuje
			if (error.response && error.response.status === 400) {
				messageElement.textContent = error.response.data.message;
			} else {
				messageElement.textContent = error.response.data.message;
			}
		}
	});

	// Funkce pro kontrolu přihlášení
	async function main() {
		try {
			const response = await axios.get("/api/check-login");
			const data = response.data;

			// Pokud je uživatel přihlášen, přesměrujeme ho z chráněných rout
			if (data.loggedIn) {
				const currentPath = window.location.pathname;
				if (
					currentPath === "/src/pages/register" ||
					currentPath === "/src/pages/register.html"
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
